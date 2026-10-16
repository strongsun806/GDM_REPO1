import React, { useState } from "react";
import { LanguageCode } from "../types";
import { 
  Mic, 
  MicOff, 
  Play, 
  Sparkles, 
  Volume2, 
  Send, 
  Globe, 
  ShieldCheck, 
  X,
  Layers,
  ArrowRight
} from "lucide-react";
import { playChime } from "../utils/audioSpeech";

interface DynamicIslandBarProps {
  selectedLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  isNavigating: boolean;
  onRunFullDemo: () => void;
  onDismissPopupsAndFill: () => void;
  onRunSelfHealingLoop: () => void;
  onVoiceCommandSubmit: (cmd: string) => void;
  isSpeakingAudio: boolean;
}

export const DynamicIslandBar: React.FC<DynamicIslandBarProps> = ({
  selectedLanguage,
  onLanguageChange,
  isNavigating,
  onRunFullDemo,
  onDismissPopupsAndFill,
  onRunSelfHealingLoop,
  onVoiceCommandSubmit,
  isSpeakingAudio,
}) => {
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const toggleMic = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = 
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition || 
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const sample = selectedLanguage === "ko" 
        ? "서울대병원 신경과 예약하고 팝업 닫아줘" 
        : "Book neurology appointment and dismiss popups";
      setInputText(sample);
      playChime("focus");
      return;
    }

    try {
      playChime("focus");
      setIsListening(true);
      const rec = new SpeechRecognition();
      const langMap: Record<LanguageCode, string> = {
        ko: "ko-KR",
        en: "en-US",
        vi: "vi-VN",
        zh: "zh-CN",
      };
      rec.lang = langMap[selectedLanguage] || "ko-KR";
      rec.interimResults = true;
      rec.continuous = false;

      rec.onresult = (e: any) => {
        const text = Array.from(e.results).map((r: any) => r[0].transcript).join("");
        setInputText(text);
      };

      rec.onend = () => {
        setIsListening(false);
        if (inputText.trim()) {
          onVoiceCommandSubmit(inputText);
        }
      };

      rec.onerror = () => {
        setIsListening(false);
      };

      rec.start();
    } catch (err) {
      setIsListening(false);
      console.warn("Speech recognition error:", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onVoiceCommandSubmit(inputText);
    setInputText("");
  };

  const languages: { code: LanguageCode; label: string }[] = [
    { code: "ko", label: "한국어" },
    { code: "en", label: "English" },
    { code: "vi", label: "Tiếng Việt" },
    { code: "zh", label: "中文" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl select-none">
      <div className="bg-[#0A0A0A] text-white rounded-full px-5 py-3 border border-white/20 island-shadow flex flex-wrap items-center justify-between gap-3 backdrop-blur-2xl">
        {/* Left: Animated Microphone & Waveform */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMic}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? "bg-[#FF3B00] text-white animate-pulse"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
            title="음성 명령 말하기"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Minimal Sine-Waveform Bars */}
          <div className="hidden sm:flex items-center gap-1 h-5">
            {[18, 50, 85, 35, 95, 60, 40, 80, 45, 25].map((h, i) => {
              const active = isSpeakingAudio || isListening;
              return (
                <div
                  key={i}
                  className={`w-0.5 rounded-full transition-all duration-150 ${
                    active ? "bg-[#059669]" : "bg-white/20"
                  }`}
                  style={{
                    height: active ? `${Math.max(25, h * (0.3 + Math.random() * 0.7))}%` : "30%",
                  }}
                />
              );
            })}
          </div>

          {/* Speech state text */}
          <span className="text-[11px] font-mono text-slate-300 hidden md:inline">
            {isSpeakingAudio ? (
              <span className="text-[#059669] flex items-center gap-1 font-bold">
                <Volume2 className="w-3.5 h-3.5" /> AI TTS Active
              </span>
            ) : isListening ? (
              <span className="text-[#FF3B00] font-bold">Listening...</span>
            ) : (
              <span className="text-slate-400">Argon Voice Hub</span>
            )}
          </span>
        </div>

        {/* Center: Playbook Action Buttons */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <button
            type="button"
            onClick={onRunFullDemo}
            disabled={isNavigating}
            className="px-3.5 py-1.5 bg-[#FF3B00] hover:bg-[#E03500] text-white rounded-full font-bold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Play className="w-3 h-3 fill-current" />
            <span className="hidden sm:inline">▶ Run Full Autonomous Demo</span>
            <span className="sm:hidden">Demo</span>
          </button>

          <button
            type="button"
            onClick={onDismissPopupsAndFill}
            disabled={isNavigating}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors hidden lg:flex items-center gap-1"
          >
            <span>1. Dismiss Popups & Fill</span>
          </button>

          <button
            type="button"
            onClick={onRunSelfHealingLoop}
            disabled={isNavigating}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors hidden lg:flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-[#059669]" />
            <span>2. Self-Healing Loop</span>
          </button>
        </div>

        {/* Right: Language Switcher & Fallback Text Input */}
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="flex items-center bg-white/10 p-0.5 rounded-full border border-white/10 font-mono text-[10px]">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => onLanguageChange(l.code)}
                className={`px-2 py-0.5 rounded-full transition-colors ${
                  selectedLanguage === l.code
                    ? "bg-white text-[#0A0A0A] font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Quick text submit form */}
          <form onSubmit={handleSubmit} className="hidden xl:flex items-center gap-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="명령어 입력..."
              className="w-36 px-2.5 py-1 text-xs rounded-full bg-white/10 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:w-48 transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full disabled:opacity-40"
            >
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
