import React from "react";
import { ImpairmentLens, PopupItem, ScenarioDefinition, NavigationStep } from "../types";
import { 
  AlertTriangle, 
  X, 
  ShieldAlert, 
  ExternalLink, 
  Layers, 
  MousePointer, 
  Sparkles,
  Lock,
  Calendar,
  Info
} from "lucide-react";

interface HostileWebPaneProps {
  scenario: ScenarioDefinition;
  onScenarioChange: (id: "hospital" | "pension" | "banking") => void;
  lens: ImpairmentLens;
  showXRay: boolean;
  onToggleXRay: () => void;
  popups: PopupItem[];
  onDismissPopup: (popupId: string) => void;
  cursorPosition: { x: number; y: number } | null;
  cursorLabel: string | null;
  formValues: {
    name: string;
    rrn: string;
    option: string;
    date: string;
    notes: string;
  };
  onFormChange: (field: string, value: string) => void;
  onSelectBarrier: (barrierId: string) => void;
  selectedBarrierId: string | null;
  activeStep: NavigationStep | null;
}

export const HostileWebPane: React.FC<HostileWebPaneProps> = ({
  scenario,
  onScenarioChange,
  lens,
  showXRay,
  onToggleXRay,
  popups,
  onDismissPopup,
  cursorPosition,
  cursorLabel,
  formValues,
  onFormChange,
  onSelectBarrier,
  selectedBarrierId,
  activeStep,
}) => {
  // Apply visual lens classes
  const lensClass = 
    lens === "cataracts" 
      ? "lens-cataracts" 
      : lens === "colorblind" 
      ? "lens-colorblind" 
      : lens === "tremor" 
      ? "lens-tremor" 
      : "";

  return (
    <div className="w-full lg:w-1/2 flex flex-col h-full bg-[#EFEFEA] border-r border-[#E5E4DF] relative overflow-hidden">
      {/* Pane Top Header Bar */}
      <div className="p-3 bg-[#E5E4DF] border-b border-[#D8D7D0] flex items-center justify-between gap-2 select-none">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-[#FF3B00] text-white">
            LEFT 50%
          </span>
          <span className="text-xs font-bold text-[#0A0A0A] font-mono uppercase tracking-tight">
            The Hostile Legacy Web (WCAG 28/100)
          </span>
        </div>

        {/* X-Ray Violation Toggle */}
        <button
          type="button"
          onClick={onToggleXRay}
          className={`px-2.5 py-1 text-[11px] font-mono rounded font-semibold border transition-all flex items-center gap-1.5 ${
            showXRay
              ? "bg-[#FF3B00] text-white border-[#FF3B00] shadow-sm"
              : "bg-white text-[#0A0A0A] border-[#D8D7D0] hover:bg-[#F7F6F2]"
          }`}
        >
          <Layers className="w-3 h-3" />
          <span>{showXRay ? "X-RAY ON (#FF3B00)" : "X-Ray Overlay"}</span>
        </button>
      </div>

      {/* Scenario Selector Pill Strip */}
      <div className="px-3 py-2 bg-[#F3F2ED] border-b border-[#E5E4DF] flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
        <span className="text-slate-500 text-[10px] uppercase">Nightmare Portal:</span>
        {[
          { id: "hospital", label: "01. 대학병원 중증외래 예약" },
          { id: "pension", label: "02. 정부24 기초연금 서류" },
          { id: "banking", label: "03. 시니어 비대면 금융인증" },
        ].map((tab) => {
          const isSelected = scenario.id === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onScenarioChange(tab.id as any)}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                isSelected
                  ? "bg-[#0A0A0A] text-white font-semibold"
                  : "bg-white border border-[#E5E4DF] text-[#0A0A0A] hover:bg-stone-100"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Legacy Browser Chrome URL & Banner */}
      <div className="px-3 py-1.5 bg-[#E5E4DF]/70 border-b border-[#D8D7D0] flex items-center justify-between text-[10px] font-mono text-slate-600">
        <div className="flex items-center gap-1.5 truncate">
          <span className="w-2 h-2 rounded-full bg-red-400"></span>
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-slate-400 ml-1">URL:</span>
          <span className="text-[#0A0A0A] underline truncate">{scenario.url}</span>
        </div>
        <span className="text-red-700 font-semibold bg-red-100 px-1 rounded">IE11 Only</span>
      </div>

      {/* Main Target Web Viewport with Impairment Lens Filter */}
      <div 
        tabIndex={0}
        aria-label="Legacy Portal Container"
        className={`flex-1 overflow-y-auto p-4 transition-all duration-300 relative select-none ${lensClass}`}
      >
        {/* Floating Hostile Popups */}
        {popups.map((popup) => {
          if (popup.dismissed) return null;
          return (
            <div
              key={popup.id}
              id={popup.id}
              style={{
                top: `${popup.topPercent}%`,
                left: `${popup.leftPercent}%`,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute z-30 w-72 bg-[#FFFDE8] border-2 border-[#D97706] shadow-2xl p-3 rounded-none text-[#1C1917] animate-fadeIn"
            >
              <div className="flex items-center justify-between border-b border-[#D97706]/40 pb-1 mb-1.5">
                <span className="text-[10px] font-bold font-mono text-[#B45309] uppercase">
                  {popup.badge}
                </span>
                <button
                  type="button"
                  onClick={() => onDismissPopup(popup.id)}
                  aria-label="팝업 닫기"
                  className="p-1 bg-[#D97706] text-white hover:bg-[#92400E] font-mono text-[9px] font-bold"
                >
                  ✕ [닫기]
                </button>
              </div>
              <h4 className="text-[11px] font-bold leading-snug text-[#78350F] mb-1">
                {popup.title}
              </h4>
              <p className="text-[10px] text-slate-700 leading-tight">
                {popup.content}
              </p>
              <div className="mt-2 text-right">
                <span className="text-[9px] text-slate-500 underline cursor-pointer">
                  오늘 하루 이 창을 열지 않음
                </span>
              </div>
            </div>
          );
        })}

        {/* AI Ghost Cursor (Vector Computer Use Overlay) */}
        {cursorPosition && (
          <div
            className="absolute z-40 pointer-events-none transition-all duration-700 ease-out flex items-center gap-2"
            style={{
              left: `${cursorPosition.x}%`,
              top: `${cursorPosition.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative">
              <div className="w-7 h-7 rounded-full bg-[#FF3B00]/20 border-2 border-[#FF3B00] flex items-center justify-center animate-ping absolute inset-0"></div>
              <div className="w-6 h-6 rounded-full bg-[#0A0A0A] border-2 border-[#FF3B00] flex items-center justify-center shadow-2xl relative z-10">
                <MousePointer className="w-3 h-3 text-[#FF3B00] fill-[#FF3B00]" />
              </div>
            </div>
            <div className="px-2 py-0.5 rounded bg-[#0A0A0A] border border-[#FF3B00] text-white text-[10px] font-mono font-bold whitespace-nowrap shadow-xl">
              [Argon Ghost: {cursorLabel || "Navigating"}]
            </div>
          </div>
        )}

        {/* Legacy Webpage Structure */}
        <div className="bg-white border border-[#D1D5DB] shadow-sm p-4 space-y-3 font-sans text-xs text-[#374151]">
          {/* Top Banner Notice */}
          <div className="p-2 bg-[#FEE2E2] border border-[#F87171] text-[#991B1B] text-[10px] flex items-center justify-between">
            <span>[필독] 2026 전자정부 프레임워크 v2.7 업그레이드에 따른 키보드 보안 프로그램 재설치 요망</span>
            <span className="text-[9px] underline">다운로드</span>
          </div>

          <div className="border-b border-[#E5E7EB] pb-2">
            <h2 className="text-sm font-bold text-[#111827]">
              {scenario.nightmareTitle}
            </h2>
            <p className="text-[10px] text-slate-500">
              신청 번호: 2026-KR-{scenario.code} | 소관 부처: 보건복지부 / 행정안전부
            </p>
          </div>

          {/* Barrier 1: Contrast Notice Box */}
          <div
            id="legacy-notice-box"
            onClick={() => onSelectBarrier("bar-1")}
            className={`p-2.5 transition-all cursor-pointer relative ${
              showXRay || selectedBarrierId === "bar-1"
                ? "border-2 border-[#FF3B00] bg-orange-50"
                : "border border-[#9E9E9E] bg-[#9E9E9E]"
            }`}
          >
            {showXRay && (
              <div className="absolute -top-3 right-2 bg-[#FF3B00] text-white font-mono text-[9px] font-bold px-1.5 py-0.2 rounded shadow">
                CONTRAST 1.9:1 // WCAG 1.4.3 FAIL
              </div>
            )}
            <p style={{ color: "#737373", fontSize: "10px", lineHeight: "1.3" }}>
              *본인확인을 위해 주민등록번호 13자리를 모두 입력해야 공공포털 서비스 조회가 가능합니다. 허위 정보 기재 시 공공기록물 관리에 관한 법률에 따라 처벌받을 수 있습니다.
            </p>
          </div>

          {/* Form Fields: Dense & Tiny */}
          <div className="space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label 
                  htmlFor="legacy-input-name"
                  className="block text-[10px] font-bold text-slate-600 mb-0.5"
                >
                  성명(실명)
                </label>
                <input
                  id="legacy-input-name"
                  type="text"
                  value={formValues.name}
                  onChange={(e) => onFormChange("name", e.target.value)}
                  placeholder="성명 입력"
                  className="w-full px-2 py-1 text-[11px] border border-[#CBD5E1] bg-[#F8FAFC] text-slate-800 outline-none"
                />
              </div>

              <div>
                <label 
                  htmlFor="legacy-input-rrn"
                  className="block text-[10px] font-bold text-slate-600 mb-0.5"
                >
                  주민등록번호 (13자리)
                </label>
                <input
                  id="legacy-input-rrn"
                  type="text"
                  value={formValues.rrn}
                  onChange={(e) => onFormChange("rrn", e.target.value)}
                  placeholder="주민번호"
                  className="w-full px-2 py-1 text-[11px] font-mono border border-[#CBD5E1] bg-[#F8FAFC] text-slate-800 outline-none"
                />
              </div>
            </div>

            {/* Barrier 3: Tiny Radio Hitboxes */}
            <div
              id="legacy-dept-options"
              onClick={() => onSelectBarrier("bar-3")}
              className={`p-2 transition-all cursor-pointer relative ${
                showXRay || selectedBarrierId === "bar-3"
                  ? "border-2 border-[#FF3B00] bg-orange-50"
                  : "border border-transparent"
              }`}
            >
              {showXRay && (
                <div className="absolute -top-3 right-2 bg-[#FF3B00] text-white font-mono text-[9px] font-bold px-1.5 py-0.2 rounded shadow">
                  TARGET 14px // WCAG 2.5.8 FAIL
                </div>
              )}
              <span className="block text-[10px] font-bold text-slate-600 mb-1">
                신청 구분 / 진료과목 선택 (14px 라디오)
              </span>
              <div className="flex items-center gap-4 text-[11px] text-slate-700">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    id="legacy-dept-neuro"
                    type="radio"
                    name="dept-choice"
                    checked={formValues.option.includes("신경과") || formValues.option.includes("기초연금") || formValues.option.includes("간병비")}
                    onChange={() => onFormChange("option", scenario.defaultValues.option)}
                    style={{ width: "14px", height: "14px" }}
                  />
                  <span>{scenario.defaultValues.option.split(" ")[0]} (권장)</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="dept-choice"
                    style={{ width: "14px", height: "14px" }}
                  />
                  <span>일반 대기 접수</span>
                </label>
              </div>
            </div>

            {/* Barrier 2: Unlabeled Button / Non-semantic Div */}
            <div
              id="legacy-date-field"
              onClick={() => onSelectBarrier("bar-2")}
              className={`p-2 transition-all cursor-pointer relative ${
                showXRay || selectedBarrierId === "bar-2"
                  ? "border-2 border-[#FF3B00] bg-orange-50"
                  : "border border-transparent"
              }`}
            >
              {showXRay && (
                <div className="absolute -top-3 right-2 bg-[#FF3B00] text-white font-mono text-[9px] font-bold px-1.5 py-0.2 rounded shadow">
                  NO ARIA-LABEL // WCAG 4.1.2 VOID
                </div>
              )}
              <span className="block text-[10px] font-bold text-slate-600 mb-1">
                일정 조율 (달력 트리거)
              </span>
              <div className="flex items-center justify-between p-1.5 border border-[#CBD5E1] bg-[#F8FAFC] text-[11px] text-slate-600">
                <span>{formValues.date}</span>
                {/* Non-semantic div icon button */}
                <div 
                  className="px-1.5 py-0.5 bg-slate-300 text-[10px] font-mono cursor-pointer"
                  title="달력 열기"
                >
                  📅
                </div>
              </div>
            </div>

            {/* Notes field */}
            <div>
              <label 
                htmlFor="legacy-textarea-notes"
                className="block text-[10px] font-bold text-slate-600 mb-0.5"
              >
                증상 또는 사유 (최대 500자)
              </label>
              <textarea
                id="legacy-textarea-notes"
                rows={2}
                value={formValues.notes}
                onChange={(e) => onFormChange("notes", e.target.value)}
                className="w-full p-1.5 text-[11px] border border-[#CBD5E1] bg-[#F8FAFC] text-slate-800 outline-none"
              />
            </div>

            {/* Barrier 4: Direct Submit Button without Confirmation */}
            <div
              id="legacy-submit-container"
              onClick={() => onSelectBarrier("bar-4")}
              className={`pt-2 transition-all cursor-pointer relative ${
                showXRay || selectedBarrierId === "bar-4"
                  ? "border-2 border-[#FF3B00] bg-orange-50 p-1"
                  : ""
              }`}
            >
              {showXRay && (
                <div className="absolute -top-3 right-2 bg-[#FF3B00] text-white font-mono text-[9px] font-bold px-1.5 py-0.2 rounded shadow">
                  NO VOICE GATE // WCAG 3.3.4 RISK
                </div>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  id="legacy-btn-submit"
                  className="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-sm rounded-none"
                >
                  즉시 전자신청서 제출
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
