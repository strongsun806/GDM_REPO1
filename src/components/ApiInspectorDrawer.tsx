import React from "react";
import { Terminal, X, Cpu, ShieldCheck, CheckCircle2, Copy, Check } from "lucide-react";

interface ApiInspectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wcagScore: number;
  scenarioCode: string;
}

export const ApiInspectorDrawer: React.FC<ApiInspectorDrawerProps> = ({
  isOpen,
  onClose,
  wcagScore,
  scenarioCode,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const sampleAstPayload = {
    model: "gemini-4-argon",
    contextWindow: "1,048,576 tokens",
    telemetry: {
      latencyMs: 142,
      astNodesIngested: 84,
      piiRedactedLocally: true,
      wcagScoreBefore: 28,
      wcagScoreAfter: wcagScore,
    },
    privacyShield: {
      engine: "Gemma 4 Edge (E4B)",
      residentRegistrationNumber: "620315-*******",
      medicalDataClassification: "Protected (HIPAA / PIPA)",
    },
    recompiledComponents: [
      "SemanticAccessibleButton",
      "HighContrastLiveRegion",
      "VoiceIndexedTouchTarget72px",
      "MandatoryVoiceCheckpointGate"
    ]
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(sampleAstPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0A0A0A] text-[#F7F6F2] border-l border-[#222] shadow-2xl flex flex-col font-mono text-xs animate-slideIn">
      {/* Header */}
      <div className="p-4 border-b border-[#222] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#FF3B00]" />
          <h3 className="font-bold uppercase tracking-wider text-white">
            Argon AST & Telemetry Inspector
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 rounded bg-[#222] text-slate-300 hover:text-white"
            title="JSON 복사"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded bg-[#222] text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Model Spec Pills */}
        <div className="p-3 bg-[#171717] rounded border border-[#333] space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Target Pipeline:</span>
            <span className="text-[#059669] font-bold">gemini-4-argon (Track 3)</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Context Window:</span>
            <span className="text-white">1M Tokens (DOM AST Ingestion)</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Edge Privacy:</span>
            <span className="text-white">Gemma 4 (E4B Client Tokenizer)</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Target Scenario:</span>
            <span className="text-[#FF3B00]">{scenarioCode}</span>
          </div>
        </div>

        {/* Live Payload Preview */}
        <div>
          <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">
            Live JSON Telemetry Stream
          </span>
          <pre className="p-3 bg-[#111] rounded border border-[#222] text-[10px] text-emerald-400 overflow-x-auto leading-relaxed">
            <code>{JSON.stringify(sampleAstPayload, null, 2)}</code>
          </pre>
        </div>

        {/* Gemma 4 Privacy Matrix */}
        <div className="p-3 bg-[#171717] rounded border border-[#333] space-y-1.5 text-[11px]">
          <p className="font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#059669]" />
            Gemma 4 Edge Privacy Guarantee
          </p>
          <p className="text-slate-400 leading-relaxed text-[10px]">
            모든 주민등록번호, 질환 이력, 금융 계좌 정보는 클라우드 API 호출 전 브라우저 로컬 단계에서 암호학적으로 마스킹되며, 평문 데이터는 일체 외부로 전송되지 않습니다.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[#222] bg-[#111] text-[10px] text-slate-500 flex justify-between">
        <span>Google DeepMind Hackathon</span>
        <span>Version: Argon-01.8</span>
      </div>
    </div>
  );
};
