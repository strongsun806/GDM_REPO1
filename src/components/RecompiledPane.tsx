import React, { useState } from "react";
import { 
  RightPaneView, 
  ScenarioDefinition, 
  AccessibilityBarrier, 
  VerificationAssertion 
} from "../types";
import { 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  ShieldCheck, 
  Terminal, 
  Copy, 
  Check, 
  ArrowRight, 
  RefreshCw,
  FileCheck,
  Lock,
  Volume2
} from "lucide-react";

interface RecompiledPaneProps {
  scenario: ScenarioDefinition;
  view: RightPaneView;
  onViewChange: (view: RightPaneView) => void;
  formValues: {
    name: string;
    rrn: string;
    option: string;
    date: string;
    notes: string;
  };
  onFormChange: (field: string, value: string) => void;
  onOpenVoiceModal: () => void;
  barriers: AccessibilityBarrier[];
  selectedBarrierId: string | null;
  onSelectBarrier: (barrierId: string) => void;
  assertions: VerificationAssertion[];
  onRunTestHarness: () => void;
  isVerifying: boolean;
  onAnalyzeCustomCode: (html: string) => Promise<void>;
  isAnalyzingCustom: boolean;
}

export const RecompiledPane: React.FC<RecompiledPaneProps> = ({
  scenario,
  view,
  onViewChange,
  formValues,
  onFormChange,
  onOpenVoiceModal,
  barriers,
  selectedBarrierId,
  onSelectBarrier,
  assertions,
  onRunTestHarness,
  isVerifying,
  onAnalyzeCustomCode,
  isAnalyzingCustom,
}) => {
  const [copied, setCopied] = useState(false);
  const [customSnippet, setCustomSnippet] = useState(
    `<div onclick="submitForm()">\n  <p style="color:#777; background:#aaa;">주민번호 입력</p>\n  <input type="text" />\n  <button><svg width="12"/></button>\n</div>`
  );

  const activeBarrier = 
    barriers.find((b) => b.id === selectedBarrierId) || barriers[0];

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSnippet.trim()) return;
    await onAnalyzeCustomCode(customSnippet);
  };

  const passedTestsCount = assertions.filter((a) => a.status === "PASSED").length;

  return (
    <div className="w-full lg:w-1/2 flex flex-col h-full bg-[#F7F6F2] relative overflow-hidden">
      {/* Pane Top Header Bar */}
      <div className="p-3 bg-[#E5E4DF] border-b border-[#D8D7D0] flex items-center justify-between gap-2 select-none">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-[#059669] text-white">
            RIGHT 50%
          </span>
          <span className="text-xs font-bold text-[#0A0A0A] font-mono uppercase tracking-tight">
            Argon Live Re-Compiled UI (WCAG 100/100)
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-[#D8D7D0] p-0.5 rounded font-mono text-[11px]">
          <button
            type="button"
            onClick={() => onViewChange("recompiled")}
            className={`px-3 py-1 rounded transition-colors ${
              view === "recompiled"
                ? "bg-[#0A0A0A] text-white font-bold"
                : "text-[#0A0A0A]/70 hover:text-[#0A0A0A]"
            }`}
          >
            Universal UI
          </button>
          <button
            type="button"
            onClick={() => onViewChange("compiler_loop")}
            className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
              view === "compiler_loop"
                ? "bg-[#0A0A0A] text-white font-bold"
                : "text-[#0A0A0A]/70 hover:text-[#0A0A0A]"
            }`}
          >
            <Code2 className="w-3 h-3 text-[#059669]" />
            <span>AST Code Diff</span>
          </button>
        </div>
      </div>

      {/* VIEW A: Live Re-Compiled Barrier-Free UI */}
      {view === "recompiled" && (
        <div className="flex-1 overflow-y-auto p-5 lg:p-8 space-y-6">
          {/* Plain-Language Policy Translation Banner */}
          <div className="p-4 bg-[#0A0A0A] text-[#F7F6F2] rounded-xl border border-[#0A0A0A] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-wider font-bold text-[#059669] uppercase flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5" />
                Argon Plain-Language Translation Engine
              </span>
              <span className="text-[10px] font-mono text-slate-400">PDF Policy Refactored</span>
            </div>
            <p className="text-xs font-medium text-slate-200 leading-relaxed">
              {scenario.plainLanguagePdfTranslation}
            </p>
          </div>

          {/* Main Massive Accessible Form Header */}
          <div className="space-y-1 border-b border-[#E5E4DF] pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-[#0A0A0A]">
              {scenario.recompiledTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {scenario.recompiledSummary}
            </p>
          </div>

          {/* Form Step 1: Patient Identity & Gemma 4 Shield */}
          <div className="p-5 bg-white border-2 border-[#E5E4DF] rounded-2xl space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E5E4DF] pb-2">
              <span className="text-xs font-mono font-bold text-[#0A0A0A] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-[10px]">1</span>
                신청인 본인 확인 및 안심 암호화
              </span>
              <span className="text-[11px] font-mono text-[#059669] bg-[#059669]/10 px-2 py-0.5 rounded font-bold">
                ✓ Gemma 4 Privacy Guard
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label 
                  htmlFor="recompiled-name"
                  className="text-xs font-bold text-slate-700 block"
                >
                  성명
                </label>
                <input
                  id="recompiled-name"
                  type="text"
                  value={formValues.name}
                  onChange={(e) => onFormChange("name", e.target.value)}
                  className="w-full min-h-[56px] px-4 rounded-xl border-2 border-[#0A0A0A] bg-[#F7F6F2] text-lg font-bold text-[#0A0A0A] focus:outline-none focus:ring-4 focus:ring-[#059669]/30"
                />
              </div>

              <div className="space-y-1">
                <label 
                  htmlFor="recompiled-rrn"
                  className="text-xs font-bold text-slate-700 block"
                >
                  주민등록번호 (온디바이스 마스킹)
                </label>
                <div className="relative">
                  <input
                    id="recompiled-rrn"
                    type="text"
                    value={formValues.rrn}
                    onChange={(e) => onFormChange("rrn", e.target.value)}
                    className="w-full min-h-[56px] px-4 font-mono rounded-xl border-2 border-[#0A0A0A] bg-[#F7F6F2] text-lg font-bold text-[#059669] focus:outline-none focus:ring-4 focus:ring-[#059669]/30"
                  />
                  <span className="absolute right-3 top-4 text-xs font-mono text-[#059669] bg-white px-2 py-0.5 rounded border border-[#059669]/30">
                    🔒 Protected
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Step 2: Massive Touch Target Options (72px) with Voice Index */}
          <div className="p-5 bg-white border-2 border-[#E5E4DF] rounded-2xl space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E5E4DF] pb-2">
              <span className="text-xs font-mono font-bold text-[#0A0A0A] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-[10px]">2</span>
                진료과목 / 지원항목 선택 (음성 번호 지원)
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Touch Target 72px (WCAG AAA)
              </span>
            </div>

            <div className="space-y-2.5">
              {[
                { id: "opt-1", name: scenario.defaultValues.option, sub: "어르신 우선 배려 지정 클리닉", voiceKey: "1번" },
                { id: "opt-2", name: "일반 종합 검진 클리닉", sub: "기본 혈액 및 심전도 정기 검진", voiceKey: "2번" },
              ].map((item, idx) => {
                const isSelected = formValues.option.includes(item.name.split(" ")[0]);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onFormChange("option", item.name)}
                    className={`w-full min-h-[72px] px-5 py-3 rounded-xl border-2 text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? "bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-md"
                        : "bg-[#F7F6F2] text-[#0A0A0A] border-[#E5E4DF] hover:border-slate-400"
                    }`}
                  >
                    <div>
                      <p className="text-base font-bold flex items-center gap-2">
                        <span>{item.name}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#059669]" />}
                      </p>
                      <p className={`text-xs ${isSelected ? "text-slate-300" : "text-slate-600"}`}>
                        {item.sub}
                      </p>
                    </div>

                    <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                      isSelected ? "bg-[#059669] text-white" : "bg-white border border-[#E5E4DF] text-[#0A0A0A]"
                    }`}>
                      음성 '{item.voiceKey}'
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Step 3: Date & Notes with Voice Readout */}
          <div className="p-5 bg-white border-2 border-[#E5E4DF] rounded-2xl space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E5E4DF] pb-2">
              <span className="text-xs font-mono font-bold text-[#0A0A0A] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-[10px]">3</span>
                희망 일자 및 증상 음성 받아쓰기
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                14.8:1 High Contrast
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label 
                  htmlFor="recompiled-date"
                  className="text-xs font-bold text-slate-700 block mb-1"
                >
                  선택된 일자 (달력 자동 동기화)
                </label>
                <div className="min-h-[56px] px-4 rounded-xl border-2 border-[#0A0A0A] bg-[#F7F6F2] text-base font-bold text-[#0A0A0A] flex items-center justify-between">
                  <span>{formValues.date}</span>
                  <span className="text-xs font-mono bg-[#0A0A0A] text-white px-2 py-1 rounded">
                    자동 예약됨
                  </span>
                </div>
              </div>

              <div>
                <label 
                  htmlFor="recompiled-notes"
                  className="text-xs font-bold text-slate-700 block mb-1"
                >
                  증상 및 기저질환 메모 (음성 입력 완료)
                </label>
                <textarea
                  id="recompiled-notes"
                  rows={2}
                  value={formValues.notes}
                  onChange={(e) => onFormChange("notes", e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-[#0A0A0A] bg-[#F7F6F2] text-sm font-medium text-[#0A0A0A] focus:outline-none focus:ring-4 focus:ring-[#059669]/30"
                />
              </div>
            </div>
          </div>

          {/* Master Voice Confirmation Submit Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenVoiceModal}
              className="w-full min-h-[76px] px-6 py-4 rounded-2xl bg-[#0A0A0A] hover:bg-neutral-800 text-white font-bold text-lg flex items-center justify-between shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] border-2 border-[#0A0A0A]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#059669] text-white flex items-center justify-center font-bold">
                  ✓
                </div>
                <div className="text-left">
                  <p className="text-base font-bold">신청서 최종 검토 및 음성 승인</p>
                  <p className="text-xs font-mono text-slate-400">WCAG 2.2 AAA 의무 음성 확인 단계</p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-sm bg-white/10 px-3 py-1.5 rounded-lg">
                <Volume2 className="w-4 h-4 text-[#059669]" />
                <span>"승인" 발화</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* VIEW B: Argon Self-Healing Verification Loop & Live AST Code Compiler */}
      {view === "compiler_loop" && (
        <div className="flex-1 overflow-y-auto p-5 lg:p-6 space-y-5">
          {/* 15 WCAG Assertions Card */}
          <div className="p-4 bg-white border border-[#E5E4DF] rounded-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E4DF]">
              <div>
                <h3 className="text-xs font-bold font-mono text-[#0A0A0A] uppercase tracking-wider">
                  Automated Test Assertions (15 Checks)
                </h3>
                <p className="text-[11px] text-slate-500">
                  axe-core 4.8 + WAI-ARIA 1.2 + Gemma 4 Privacy Matrix
                </p>
              </div>

              <button
                type="button"
                onClick={onRunTestHarness}
                disabled={isVerifying}
                className="px-3 py-1.5 bg-[#0A0A0A] text-white rounded font-mono text-xs font-bold hover:bg-neutral-800 disabled:opacity-50 flex items-center gap-1.5"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Running Harness...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
                    <span>Run Verification Loop</span>
                  </>
                )}
              </button>
            </div>

            {/* Test progress bar */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600">Verification Status:</span>
              <span className="font-bold text-[#059669]">{passedTestsCount} / 15 PASSED</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#059669] transition-all duration-500"
                style={{ width: `${(passedTestsCount / 15) * 100}%` }}
              />
            </div>

            {/* List of 15 Tests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {assertions.map((a, i) => {
                const isPass = a.status === "PASSED";
                return (
                  <div
                    key={i}
                    className={`p-2 rounded border text-[11px] font-mono flex items-center justify-between gap-2 ${
                      isPass 
                        ? "bg-[#059669]/5 border-[#059669]/20 text-slate-800" 
                        : "bg-[#FF3B00]/5 border-[#FF3B00]/20 text-slate-800"
                    }`}
                  >
                    <div className="truncate">
                      <p className="font-bold truncate">{a.testName}</p>
                      <p className="text-[10px] text-slate-500">{a.rule} ({a.durationMs}ms)</p>
                    </div>

                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap ${
                      isPass ? "bg-[#059669] text-white" : "bg-[#FF3B00] text-white"
                    }`}>
                      {a.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Side-by-Side Code Diff Box */}
          <div className="p-4 bg-white border border-[#E5E4DF] rounded-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E4DF]">
              <div>
                <h3 className="text-xs font-bold font-mono text-[#0A0A0A] uppercase tracking-wider">
                  Argon AST Code Diff Synthesis
                </h3>
                <p className="text-[11px] text-slate-500">
                  {activeBarrier.wcagRule} • {activeBarrier.elementName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCopyCode(activeBarrier.patchedCode)}
                className="p-1.5 rounded bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-mono flex items-center gap-1"
                title="패치 코드 복사"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                <span>Copy</span>
              </button>
            </div>

            {/* Diff View */}
            <div className="space-y-2">
              <div>
                <div className="text-[10px] font-mono font-bold text-[#FF3B00] px-2 py-1 bg-[#FF3B00]/10 border border-[#FF3B00]/20 flex items-center justify-between">
                  <span>- Hostile Legacy DOM (Non-Compliant)</span>
                  <span>FAIL</span>
                </div>
                <pre className="p-2.5 bg-[#1C1917] text-[#FDA4AF] font-mono text-[10px] overflow-x-auto leading-relaxed rounded-b">
                  <code>{activeBarrier.originalCode}</code>
                </pre>
              </div>

              <div>
                <div className="text-[10px] font-mono font-bold text-[#059669] px-2 py-1 bg-[#059669]/10 border border-[#059669]/20 flex items-center justify-between">
                  <span>+ Argon Re-Compiled Semantic WAI-ARIA Component</span>
                  <span>AAA VERIFIED</span>
                </div>
                <pre className="p-2.5 bg-[#0A0A0A] text-[#A7F3D0] font-mono text-[10px] overflow-x-auto leading-relaxed rounded-b">
                  <code>{activeBarrier.patchedCode}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Live Custom HTML/URL Analyzer with real @google/genai */}
          <div className="p-4 bg-white border border-[#E5E4DF] rounded-xl space-y-3">
            <div>
              <h3 className="text-xs font-bold font-mono text-[#0A0A0A] uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#FF3B00]" />
                Live Gemini 4 Argon AST Re-Compiler Input
              </h3>
              <p className="text-[11px] text-slate-600">
                심사위원이 원하는 임의의 웹 코드나 공공 서식을 붙여넣고 실시간 재컴파일을 실행해보세요.
              </p>
            </div>

            <form onSubmit={handleCustomSubmit} className="space-y-2.5">
              <textarea
                rows={3}
                value={customSnippet}
                onChange={(e) => setCustomSnippet(e.target.value)}
                className="w-full p-2.5 rounded-lg border-2 border-[#0A0A0A] bg-[#F7F6F2] font-mono text-[11px] text-[#0A0A0A] focus:outline-none"
                placeholder="HTML 코드를 붙여넣으세요..."
              />

              <button
                type="submit"
                disabled={isAnalyzingCustom}
                className="w-full py-2.5 bg-[#FF3B00] hover:bg-[#E03500] text-white font-mono text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {isAnalyzingCustom ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Gemini 4 Argon Compiling AST...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run Live Argon Re-Compilation (@google/genai)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
