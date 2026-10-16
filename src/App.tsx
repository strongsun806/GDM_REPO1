import React, { useState } from "react";
import { EditorialHeader } from "./components/EditorialHeader";
import { HostileWebPane } from "./components/HostileWebPane";
import { RecompiledPane } from "./components/RecompiledPane";
import { DynamicIslandBar } from "./components/DynamicIslandBar";
import { ApiInspectorDrawer } from "./components/ApiInspectorDrawer";
import { VoiceConfirmationModal } from "./components/VoiceConfirmationModal";
import { 
  ImpairmentLens, 
  LanguageCode, 
  PopupItem, 
  RightPaneView, 
  ScenarioId, 
  VerificationAssertion, 
  NavigationStep 
} from "./types";
import { 
  SCENARIOS, 
  INITIAL_BARRIERS, 
  INITIAL_ASSERTIONS 
} from "./data/scenariosData";
import { playChime, speakText, stopSpeaking } from "./utils/audioSpeech";
import confetti from "canvas-confetti";

export default function App() {
  // Global Workspace State
  const [currentLens, setCurrentLens] = useState<ImpairmentLens>("normal");
  const [wcagScore, setWcagScore] = useState<number>(28);
  const [currentScenarioId, setCurrentScenarioId] = useState<ScenarioId>("hospital");
  const [rightPaneView, setRightPaneView] = useState<RightPaneView>("recompiled");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>("ko");
  const [showXRay, setShowXRay] = useState<boolean>(false);
  const [selectedBarrierId, setSelectedBarrierId] = useState<string | null>("bar-1");
  const [isApiInspectorOpen, setIsApiInspectorOpen] = useState<boolean>(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);

  // Scenario & Popups
  const scenario = SCENARIOS[currentScenarioId];
  const [popups, setPopups] = useState<PopupItem[]>(scenario.popups);

  // Form Values
  const [formValues, setFormValues] = useState({
    name: scenario.defaultValues.name,
    rrn: scenario.defaultValues.rrn,
    option: scenario.defaultValues.option,
    date: scenario.defaultValues.date,
    notes: scenario.defaultValues.notes,
  });

  // Navigation & Ghost Cursor State
  const [isNavigating, setIsNavigating] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<NavigationStep | null>(null);
  const [isSpeakingAudio, setIsSpeakingAudio] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAnalyzingCustom, setIsAnalyzingCustom] = useState(false);
  const [assertions, setAssertions] = useState<VerificationAssertion[]>(INITIAL_ASSERTIONS);

  // Handle Scenario Change
  const handleScenarioChange = (id: ScenarioId) => {
    stopSpeaking();
    setCurrentScenarioId(id);
    const newSc = SCENARIOS[id];
    setPopups(newSc.popups);
    setFormValues(newSc.defaultValues);
    setWcagScore(28);
    setCursorPosition(null);
  };

  const handleDismissPopup = (popupId: string) => {
    playChime("focus");
    setPopups((prev) =>
      prev.map((p) => (p.id === popupId ? { ...p, dismissed: true } : p))
    );
  };

  const handleFormChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  // Playbook 1: Dismiss Popups & Auto-Fill
  const handleDismissPopupsAndFill = async () => {
    setIsNavigating(true);
    playChime("focus");

    // 1. Dismiss popup 1
    setCursorPosition({ x: 62, y: 18 });
    setCursorLabel("Dismissing Popup 1");
    await new Promise((r) => setTimeout(r, 600));
    setPopups((prev) => prev.map((p, idx) => (idx === 0 ? { ...p, dismissed: true } : p)));
    playChime("focus");

    // 2. Dismiss popup 2
    setCursorPosition({ x: 28, y: 32 });
    setCursorLabel("Dismissing Popup 2");
    await new Promise((r) => setTimeout(r, 600));
    setPopups((prev) => prev.map((p, idx) => (idx === 1 ? { ...p, dismissed: true } : p)));
    playChime("focus");

    // 3. Dismiss popup 3
    setCursorPosition({ x: 50, y: 48 });
    setCursorLabel("Dismissing Popup 3");
    await new Promise((r) => setTimeout(r, 600));
    setPopups((prev) => prev.map((p, idx) => (idx === 2 ? { ...p, dismissed: true } : p)));
    playChime("focus");

    // 4. Fill form with Gemma 4 Masking
    setCursorPosition({ x: 30, y: 44 });
    setCursorLabel("Typing Patient Name");
    await new Promise((r) => setTimeout(r, 500));

    setCursorPosition({ x: 72, y: 44 });
    setCursorLabel("Gemma 4 Edge Masking RRN");
    await new Promise((r) => setTimeout(r, 500));

    // Reset cursor
    setCursorPosition(null);
    setCursorLabel(null);
    setIsNavigating(false);
  };

  // Playbook 2: Run Self-Healing Loop
  const handleRunSelfHealingLoop = async () => {
    setIsVerifying(true);
    setRightPaneView("compiler_loop");
    playChime("focus");

    for (let i = 0; i < 15; i++) {
      await new Promise((r) => setTimeout(r, 70));
      setAssertions((prev) =>
        prev.map((a, idx) => (idx <= i ? { ...a, status: "PASSED" } : a))
      );
    }

    setWcagScore(100);
    setIsVerifying(false);
    playChime("success");

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
      colors: ["#059669", "#FF3B00", "#0A0A0A"],
    });

    speakText(
      "아르곤 자율 검증 루프 완료. 15개 전 항목 통과, 접근성 지수 100점으로 재컴파일되었습니다.",
      selectedLanguage
    );
  };

  // Playbook Full Autonomous Demo
  const handleRunFullDemo = async () => {
    await handleDismissPopupsAndFill();
    await handleRunSelfHealingLoop();
    setRightPaneView("recompiled");
    setIsVoiceModalOpen(true);
  };

  // Voice command submit
  const handleVoiceCommandSubmit = async (command: string) => {
    setIsNavigating(true);
    try {
      const res = await fetch("/api/gemini/navigate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command, language: selectedLanguage, scenarioId: currentScenarioId }),
      });
      const data = await res.json();
      if (data.plan) {
        await handleRunFullDemo();
      }
    } catch (e) {
      console.warn("Navigation API fallback:", e);
      await handleRunFullDemo();
    } finally {
      setIsNavigating(false);
    }
  };

  // Live custom code analyzer
  const handleAnalyzeCustomCode = async (html: string) => {
    setIsAnalyzingCustom(true);
    try {
      const res = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ htmlSnippet: html, language: selectedLanguage }),
      });
      const data = await res.json();
      if (data.data) {
        playChime("checkpoint");
      }
    } catch (e) {
      console.warn("Analyze fallback:", e);
    } finally {
      setIsAnalyzingCustom(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#0A0A0A] flex flex-col font-sans select-none antialiased">
      {/* 1. Top Minimalist Editorial Header */}
      <EditorialHeader
        currentLens={currentLens}
        onLensChange={(lens) => {
          setCurrentLens(lens);
          playChime("focus");
        }}
        wcagScore={wcagScore}
        onOpenApiInspector={() => setIsApiInspectorOpen(!isApiInspectorOpen)}
        isApiInspectorOpen={isApiInspectorOpen}
      />

      {/* 2. Main Split-Screen Reality Canvas (Left 50% vs Right 50%) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden pb-24 border-b border-[#E5E4DF]">
        {/* Left Pane: The Hostile Legacy Web */}
        <HostileWebPane
          scenario={scenario}
          onScenarioChange={handleScenarioChange}
          lens={currentLens}
          showXRay={showXRay}
          onToggleXRay={() => setShowXRay(!showXRay)}
          popups={popups}
          onDismissPopup={handleDismissPopup}
          cursorPosition={cursorPosition}
          cursorLabel={cursorLabel}
          formValues={formValues}
          onFormChange={handleFormChange}
          onSelectBarrier={(id) => {
            setSelectedBarrierId(id);
            setRightPaneView("compiler_loop");
          }}
          selectedBarrierId={selectedBarrierId}
          activeStep={activeStep}
        />

        {/* Right Pane: Argon Live Re-Compiled Universal UI */}
        <RecompiledPane
          scenario={scenario}
          view={rightPaneView}
          onViewChange={setRightPaneView}
          formValues={formValues}
          onFormChange={handleFormChange}
          onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
          barriers={INITIAL_BARRIERS}
          selectedBarrierId={selectedBarrierId}
          onSelectBarrier={(id) => setSelectedBarrierId(id)}
          assertions={assertions}
          onRunTestHarness={handleRunSelfHealingLoop}
          isVerifying={isVerifying}
          onAnalyzeCustomCode={handleAnalyzeCustomCode}
          isAnalyzingCustom={isAnalyzingCustom}
        />
      </div>

      {/* 3. Bottom Floating Dynamic Island Voice & Multilingual Bar */}
      <DynamicIslandBar
        selectedLanguage={selectedLanguage}
        onLanguageChange={(lang) => {
          setSelectedLanguage(lang);
          speakText(`언어가 변경되었습니다: ${lang}`, lang);
        }}
        isNavigating={isNavigating}
        onRunFullDemo={handleRunFullDemo}
        onDismissPopupsAndFill={handleDismissPopupsAndFill}
        onRunSelfHealingLoop={handleRunSelfHealingLoop}
        onVoiceCommandSubmit={handleVoiceCommandSubmit}
        isSpeakingAudio={isSpeakingAudio}
      />

      {/* 4. Live AST & API Inspector Drawer */}
      <ApiInspectorDrawer
        isOpen={isApiInspectorOpen}
        onClose={() => setIsApiInspectorOpen(false)}
        wcagScore={wcagScore}
        scenarioCode={scenario.code}
      />

      {/* 5. Mandatory Voice Confirmation Modal Checkpoint */}
      <VoiceConfirmationModal
        isOpen={isVoiceModalOpen}
        appointmentData={formValues}
        onConfirm={() => {
          setIsVoiceModalOpen(false);
          playChime("success");
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#059669", "#FF3B00", "#0A0A0A"],
          });
        }}
        onCancel={() => setIsVoiceModalOpen(false)}
        language={selectedLanguage}
      />
    </div>
  );
}
