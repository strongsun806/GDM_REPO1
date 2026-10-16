import React from "react";
import { ImpairmentLens } from "../types";
import { Eye, Activity, Terminal, ShieldCheck } from "lucide-react";

interface EditorialHeaderProps {
  currentLens: ImpairmentLens;
  onLensChange: (lens: ImpairmentLens) => void;
  wcagScore: number;
  onOpenApiInspector: () => void;
  isApiInspectorOpen: boolean;
}

export const EditorialHeader: React.FC<EditorialHeaderProps> = ({
  currentLens,
  onLensChange,
  wcagScore,
  onOpenApiInspector,
  isApiInspectorOpen,
}) => {
  const isHigh = wcagScore >= 90;

  const lenses: { id: ImpairmentLens; label: string; tag: string }[] = [
    { id: "normal", label: "Normal Vision", tag: "1.0" },
    { id: "cataracts", label: "Severe Cataracts", tag: "Optical Blur" },
    { id: "colorblind", label: "Color / Contrast Loss", tag: "Monochrome" },
    { id: "tremor", label: "Parkinson's Tremor", tag: "Motor Jitter" },
  ];

  return (
    <header className="h-14 border-b border-[#E5E4DF] bg-[#F7F6F2] px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* 1. Left: Bold Swiss Typography Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#FF3B00] rounded-none"></span>
          <h1 className="text-sm font-bold tracking-tight text-[#0A0A0A] font-mono uppercase">
            ACCESSPILOT // ARGON-01
          </h1>
        </div>

        <span className="text-[#E5E4DF] hidden sm:inline">|</span>

        <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-[#059669] bg-[#059669]/10 border border-[#059669]/30 px-2 py-0.5 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse"></span>
          <span>GEMINI 4 ARGON 1M-CONTEXT ACTIVE</span>
        </div>
      </div>

      {/* 2. Center: Interactive Impairment Lens Switcher */}
      <div className="hidden lg:flex items-center bg-[#E5E4DF]/60 p-0.5 rounded-lg border border-[#E5E4DF]">
        <div className="px-2 py-1 text-[10px] font-mono uppercase text-[#0A0A0A]/60 font-semibold flex items-center gap-1">
          <Eye className="w-3 h-3 text-[#FF3B00]" />
          <span>Lens:</span>
        </div>

        {lenses.map((lens) => {
          const isActive = currentLens === lens.id;
          return (
            <button
              key={lens.id}
              type="button"
              onClick={() => onLensChange(lens.id)}
              className={`px-2.5 py-1 text-[11px] font-mono transition-all rounded ${
                isActive
                  ? "bg-[#0A0A0A] text-[#F7F6F2] font-semibold shadow-sm"
                  : "text-[#0A0A0A]/70 hover:text-[#0A0A0A] hover:bg-white/40"
              }`}
            >
              <span>{lens.label}</span>
              {isActive && (
                <span className="ml-1 text-[9px] opacity-60">[{lens.tag}]</span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Right: WCAG 2.2 Verification Loop Score & Inspector Toggle */}
      <div className="flex items-center gap-3">
        {/* Score Meter */}
        <div className="flex items-center gap-2 bg-[#0A0A0A] text-[#F7F6F2] px-3 py-1 rounded border border-[#0A0A0A] text-xs font-mono">
          <span className="text-[#A3A3A3] text-[10px] uppercase">WCAG 2.2</span>
          <span className={`font-bold transition-all duration-700 ${isHigh ? "text-[#059669]" : "text-[#FF3B00]"}`}>
            {wcagScore} / 100
          </span>
          <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isHigh ? "bg-[#059669]/20 text-[#059669]" : "bg-[#FF3B00]/20 text-[#FF3B00]"}`}>
            {isHigh ? "ARGON COMPILED" : "HOSTILE DOM"}
          </span>
        </div>

        {/* API Inspector Drawer Button */}
        <button
          type="button"
          onClick={onOpenApiInspector}
          className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors flex items-center gap-1.5 ${
            isApiInspectorOpen
              ? "bg-[#FF3B00] text-white border-[#FF3B00]"
              : "bg-white border-[#E5E4DF] text-[#0A0A0A] hover:bg-[#E5E4DF]/40"
          }`}
          title="Live Gemini 4 Argon AST & API Inspector Drawer"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AST Inspector</span>
        </button>
      </div>
    </header>
  );
};
