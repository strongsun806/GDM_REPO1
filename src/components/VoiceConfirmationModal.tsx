import React, { useEffect, useState } from "react";
import { Mic, CheckCircle2, ShieldCheck, Volume2, ArrowRight, X } from "lucide-react";
import { playChime, speakText, stopSpeaking } from "../utils/audioSpeech";

interface VoiceConfirmationModalProps {
  isOpen: boolean;
  appointmentData: {
    name: string;
    rrn: string;
    option: string;
    date: string;
    notes: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
  language?: string;
}

export const VoiceConfirmationModal: React.FC<VoiceConfirmationModalProps> = ({
  isOpen,
  appointmentData,
  onConfirm,
  onCancel,
  language = "ko",
}) => {
  const [speechStatus, setSpeechStatus] = useState<string>("음성 확인 대기 중...");

  useEffect(() => {
    if (isOpen) {
      playChime("checkpoint");
      setSpeechStatus("AI 안내 음성을 재생하고 있습니다...");

      const spokenSummary = `${appointmentData.name}님, ${appointmentData.option} ${appointmentData.date} 건을 최종 제출할까요? 화면의 승인 버튼을 누르거나 '승인'이라고 말씀해주세요.`;

      speakText(
        spokenSummary,
        language,
        () => {
          setSpeechStatus("음성 안내 중: 화면 요약을 낭독하고 있습니다.");
        },
        () => {
          setSpeechStatus("마이크 수신 중: '승인' 또는 '네'라고 말씀하세요.");
          listenForConfirmation();
        }
      );

      // Keyboard listener for Spacebar/Enter
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === "Space" || e.code === "Enter") {
          e.preventDefault();
          playChime("success");
          onConfirm();
        } else if (e.code === "Escape") {
          onCancel();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        stopSpeaking();
      };
    } else {
      stopSpeaking();
    }
  }, [isOpen]);

  const listenForConfirmation = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition = 
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition || 
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language === "ko" ? "ko-KR" : "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.trim().toLowerCase();
          setSpeechStatus(`인식된 음성: "${transcript}"`);
          if (
            transcript.includes("승인") || 
            transcript.includes("네") || 
            transcript.includes("예") || 
            transcript.includes("yes") || 
            transcript.includes("approve")
          ) {
            playChime("success");
            setTimeout(() => {
              onConfirm();
            }, 500);
          }
        };

        recognition.onerror = () => {
          setSpeechStatus("스페이스바를 누르거나 승인 버튼을 클릭하세요.");
        };

        recognition.start();
      } catch (e) {
        console.debug("Web speech recognition skipped", e);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkpoint-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none"
    >
      <div className="w-full max-w-xl bg-[#0A0A0A] text-[#F7F6F2] border-2 border-[#059669] rounded-2xl shadow-2xl overflow-hidden font-mono">
        {/* Header */}
        <div className="px-6 py-4 bg-[#141414] border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#059669] text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#059669]">
                WCAG 2.2 AAA 3.3.4 Safeguard
              </span>
              <h2 id="checkpoint-title" className="text-base font-bold text-white">
                의무 음성 확인 체크포인트 (Voice Gate)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#059669] bg-[#059669]/10 px-2 py-1 rounded">
            <Volume2 className="w-3.5 h-3.5 animate-bounce" />
            <span>음성 낭독 중</span>
          </div>
        </div>

        {/* Summary Card */}
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-xl bg-[#171717] border border-[#2B2B2B] space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-[#262626] pb-2">
              <span className="text-slate-400">신청인 / 환자</span>
              <span className="text-white font-bold text-sm">{appointmentData.name}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#262626] pb-2">
              <span className="text-slate-400">주민번호 (Gemma 4 암호화)</span>
              <span className="text-[#059669] font-bold text-sm">{appointmentData.rrn}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#262626] pb-2">
              <span className="text-slate-400">선택 항목</span>
              <span className="text-white font-bold">{appointmentData.option}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#262626] pb-2">
              <span className="text-slate-400">신청 일시</span>
              <span className="text-amber-300 font-bold">{appointmentData.date}</span>
            </div>

            <div className="flex items-start justify-between pt-1">
              <span className="text-slate-400">비고 메모</span>
              <span className="text-slate-300 text-right max-w-xs truncate">
                {appointmentData.notes}
              </span>
            </div>
          </div>

          {/* Voice Prompt Box */}
          <div className="p-4 rounded-xl bg-[#121212] border border-[#059669]/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#059669]/20 flex items-center justify-center text-[#059669]">
                  <Mic className="w-5 h-5 animate-pulse" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-[#059669] animate-ping opacity-40"></div>
              </div>

              <div>
                <p className="text-xs font-bold text-white">마이크 수신 및 스페이스바 대기</p>
                <p className="text-[11px] text-[#059669]">{speechStatus}</p>
              </div>
            </div>

            <span className="text-xs bg-[#059669]/20 text-[#059669] px-2.5 py-1 rounded font-bold border border-[#059669]/40">
              "승인" 또는 [Space]
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-[#141414] border-t border-[#262626] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-lg border border-[#333] text-slate-300 hover:bg-[#222] text-xs font-semibold transition-colors"
          >
            취소 및 다시 입력
          </button>

          <button
            type="button"
            onClick={() => {
              playChime("success");
              onConfirm();
            }}
            className="flex-1 px-6 py-3 rounded-lg bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-[#059669]/20"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>최종 승인 및 안심 전송 (Spacebar)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
