export type ImpairmentLens = "normal" | "cataracts" | "colorblind" | "tremor";

export type ScenarioId = "hospital" | "pension" | "banking";

export type RightPaneView = "recompiled" | "compiler_loop";

export type LanguageCode = "ko" | "en" | "vi" | "zh";

export interface PopupItem {
  id: string;
  title: string;
  badge: string;
  content: string;
  topPercent: number;
  leftPercent: number;
  dismissed: boolean;
}

export interface AccessibilityBarrier {
  id: string;
  category: "Visual Contrast" | "Screen Reader / ARIA" | "Motor / Touch Targets" | "Cognitive Overload";
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  wcagRule: string;
  elementName: string;
  issueDescription: string;
  remediationDescription: string;
  metricBefore: string;
  metricAfter: string;
  originalCode: string;
  patchedCode: string;
  selector: string;
}

export interface VerificationAssertion {
  testName: string;
  rule: string;
  status: "PASSED" | "FAILED" | "PENDING";
  durationMs: number;
  metric: string;
}

export interface NavigationStep {
  stepIndex: number;
  targetSelector: string;
  actionType: "dismiss_popup" | "type" | "click" | "checkpoint";
  label: string;
  spokenAudioText: string;
  inputValue: string;
  xPercent: number;
  yPercent: number;
}

export interface ScenarioDefinition {
  id: ScenarioId;
  name: string;
  code: string;
  url: string;
  description: string;
  nightmareTitle: string;
  popups: PopupItem[];
  defaultValues: {
    name: string;
    rrn: string;
    option: string;
    date: string;
    notes: string;
  };
  recompiledTitle: string;
  recompiledSummary: string;
  plainLanguagePdfTranslation: string;
}
