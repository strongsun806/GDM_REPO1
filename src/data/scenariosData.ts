import { ScenarioDefinition, AccessibilityBarrier, VerificationAssertion } from "../types";

export const SCENARIOS: Record<string, ScenarioDefinition> = {
  hospital: {
    id: "hospital",
    name: "대학병원 중증질환 원격 예약",
    code: "SNU-MED-01",
    url: "https://국민복지의료포털.kr/snu/reserve",
    description: "복잡한 진료과 코드, AnySign4PC 설치 강제 팝업 3종, 10px 그레이 폰트로 가로막힌 병원 포털",
    nightmareTitle: "서울대학교병원 중증·만성질환 통합 외래 진료 예약 시스템 (IE11 호환)",
    popups: [
      {
        id: "popup-sec",
        title: "[필수 보안] AnySign4PC v1.8.4 키보드 보안 플러그인",
        badge: "강제 설치 요구",
        content: "개인정보 보호를 위해 보안 프로그램 설치가 필요합니다. 미설치 시 페이지 입력이 차단됩니다.",
        topPercent: 18,
        leftPercent: 62,
        dismissed: false,
      },
      {
        id: "popup-notice",
        title: "[공지] 본관 엘리베이터 보수 및 주차타워 통제 안내",
        badge: "공지사항",
        content: "10월 20일부터 10월 30일까지 주차타워 정기 점검으로 발렛 서비스가 전면 중단됩니다.",
        topPercent: 32,
        leftPercent: 28,
        dismissed: false,
      },
      {
        id: "popup-tele",
        title: "[약관 동의] 비대면 진료 시범사업 본인부담금 40% 부과",
        badge: "약관 동의",
        content: "의료법 제34조의2에 의거하여 원격 협진 시 추가 가산율이 적용됨에 동의하십니까?",
        topPercent: 48,
        leftPercent: 50,
        dismissed: false,
      },
    ],
    defaultValues: {
      name: "김영수 (만 74세)",
      rrn: "620315-*******",
      option: "신경과 (뇌신경·기억장애 클리닉)",
      date: "2026년 10월 24일 (토) 오전 10:00",
      notes: "혈압약 3개월 복용 중, 최근 가벼운 인지장애 및 두통 증상 상담 희망",
    },
    recompiledTitle: "서울대병원 신경과 안심 진료 예약",
    recompiledSummary: "복잡한 40개 진료과 및 팝업 3종을 제거하고, 1번부터 3번까지 말로 답하면 1분 만에 예약이 완료됩니다.",
    plainLanguagePdfTranslation: "복잡한 '의료법 제34조 시범사업 환자 본인일부부담금 산정특례' 행정 문구를 '65세 이상 어르신 진료비 30% 감면 혜택'으로 재해석 완료.",
  },
  pension: {
    id: "pension",
    name: "정부24 기초연금·돌봄 통합 신청",
    code: "GOV-WEL-02",
    url: "https://국민복지의료포털.kr/gov24/pension",
    description: "40페이지 금융정보 제공 동의서와 공동인증서 요구로 시니어를 포기하게 만드는 행정 서식",
    nightmareTitle: "보건복지부 행정안전부 기초연금 수급 자격 심사 및 금융조회 신청",
    popups: [
      {
        id: "popup-cert",
        title: "[본인인증] 브라우저 공동인증서(구 공인인증서) 필요",
        badge: "인증 오류",
        content: "보안 토큰 또는 HSM 저장매체에 보관된 유효기간 내 인증서를 선택해 주십시오.",
        topPercent: 20,
        leftPercent: 55,
        dismissed: false,
      },
      {
        id: "popup-docs",
        title: "[제출서류] 소득인정액 산정 금융정보 등 제공동의서",
        badge: "서류 28장",
        content: "신청인 및 배우자의 금융기관 예금, 적금, 주식 거래내역 일괄 조회에 동의하십시오.",
        topPercent: 36,
        leftPercent: 30,
        dismissed: false,
      },
      {
        id: "popup-alert",
        title: "[부정수급 경고] 허위 신고 시 징역 3년 이하 또는 벌금",
        badge: "법적 고지",
        content: "기초연금법 제32조에 따라 소득 누락 시 지원금 전액 환수 및 형사 고발 조치됩니다.",
        topPercent: 52,
        leftPercent: 52,
        dismissed: false,
      },
    ],
    defaultValues: {
      name: "박순자 (만 68세)",
      rrn: "580824-*******",
      option: "단독가구 기초연금 (월 최대 334,810원)",
      date: "2026년 11월 01일 지급 개시",
      notes: "기초생활수급 제외 대상, 주택 공시지가 2억 이하 어르신 혜택 신청",
    },
    recompiledTitle: "어르신 매월 기초연금 신청",
    recompiledSummary: "복잡한 재산·소득 계산 서류 40장을 국가 행정망과 자동 대조하여 어르신 본인 확인만으로 매월 연금을 지급합니다.",
    plainLanguagePdfTranslation: "‘소득인정액 산정 공식: 월 소득평가액 + 재산의 소득환산율(연 4%) ÷ 12개월’을 ‘어르신 통장에 매달 334,810원 입금’으로 명확화.",
  },
  banking: {
    id: "banking",
    name: "시니어 비대면 금융 보안 인증",
    code: "FIN-SEC-03",
    url: "https://국민복지의료포털.kr/bank/senior-auth",
    description: "마우스로 클릭할 수 없는 가상 키패드 셔플과 14문항 보이스피싱 설문 벽",
    nightmareTitle: "전자금융거래 안전성 확보 및 보이스피싱 의심 거래 본인확인",
    popups: [
      {
        id: "popup-vkey",
        title: "[보안키패드] mTranskey 실시간 무작위 재배치 가상 키패드",
        badge: "마우스 차단",
        content: "마우스 매크로 방지를 위해 버튼 위치가 매 타수마다 무작위로 변경됩니다.",
        topPercent: 22,
        leftPercent: 60,
        dismissed: false,
      },
      {
        id: "popup-survey",
        title: "[문진표] 보이스피싱 예방 14개 문항 필수 작성",
        badge: "14문항 강제",
        content: "검찰, 금감원, 자녀 사칭 문자를 받으셨습니까? 대출 상환용 상품권 구매 요구를 받았습니까?",
        topPercent: 38,
        leftPercent: 34,
        dismissed: false,
      },
      {
        id: "popup-limit",
        title: "[한도 축소] 70세 이상 고령자 1일 비대면 이체한도 30만원",
        badge: "한도 제한",
        content: "비대면 금융사고 방지 지침에 따라 영업점 방문 전까지 이체 금액이 엄격히 제한됩니다.",
        topPercent: 54,
        leftPercent: 48,
        dismissed: false,
      },
    ],
    defaultValues: {
      name: "이종석 (만 78세)",
      rrn: "481105-*******",
      option: "간병비 및 생활비 안심 이체 (100만원)",
      date: "2026년 10월 22일 (목)",
      notes: "가족 간병인 계좌로 정기 자동이체 승인 희망",
    },
    recompiledTitle: "간병비 안심 이체 승인",
    recompiledSummary: "무작위로 섞이는 난해한 가상 키패드를 없애고, 본인 음성 승인 한 번으로 사기 방지 안심 필터를 거쳐 즉시 이체합니다.",
    plainLanguagePdfTranslation: "전자금융거래 기본약관 제18조 제2항의 면책 조항을 ‘은행이 끝까지 확인하는 안심 보증 거래’로 보호 설계.",
  },
};

export const INITIAL_BARRIERS: AccessibilityBarrier[] = [
  {
    id: "bar-1",
    category: "Visual Contrast",
    severity: "CRITICAL",
    wcagRule: "WCAG 2.2 AA 1.4.3",
    elementName: "p.notice-legal (주민번호 입력 유의사항)",
    issueDescription: "회색 바탕(#9E9E9E) 위의 어두운 회색(#737373) 텍스트로 명도 대비율이 1.9:1에 불과하여 백내장/저시력 어르신에게 전혀 보이지 않음.",
    remediationDescription: "새벽 흑백(Paper #F7F6F2 & Obsidian #0A0A0A) 고대비 그리드로 재컴파일하여 명도 대비 14.8:1 달성.",
    metricBefore: "1.9:1 (FAIL)",
    metricAfter: "14.8:1 (AAA PASSED)",
    originalCode: `<p style="color: #737373; background: #9e9e9e; font-size: 10px;">
  *본인확인을 위해 주민등록번호 13자리를 모두 입력해야 공공포털 서비스 조회가 가능합니다.
</p>`,
    patchedCode: `<aside className="p-4 bg-[#0A0A0A] text-[#F7F6F2] border-l-4 border-[#059669] rounded-r-lg font-medium text-base">
  <p><strong className="text-[#059669]">개인정보 안심 보호:</strong> 주민번호 뒷자리는 온디바이스(Gemma 4)에서 자동 마스킹됩니다.</p>
</aside>`,
    selector: "#legacy-notice-box",
  },
  {
    id: "bar-2",
    category: "Screen Reader / ARIA",
    severity: "CRITICAL",
    wcagRule: "WCAG 2.2 A 4.1.2",
    elementName: "div.calendar-trigger (예약 일자 선택)",
    issueDescription: "일반 <div> 태그에 클릭 이벤트만 부여되어 스크린 리더(VoiceOver, NVDA)에서 버튼으로 인식되지 않으며 키보드 Tab 진입이 불가능함.",
    remediationDescription: "시맨틱 <button> 및 aria-label='1번. 진료 희망 일자 선택 달력'과 음성 단축 인덱스 부여.",
    metricBefore: "0% ARIA (VOID)",
    metricAfter: "100% WAI-ARIA (PASSED)",
    originalCode: `<div class="date-box" onclick="showPopup()">
  <span class="ico">📅</span>
</div>`,
    patchedCode: `<button type="button" aria-label="1번. 진료 희망 일자 선택" className="min-h-[72px] px-6 py-4 bg-[#F7F6F2] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-xl font-bold text-lg flex items-center justify-between">
  <span>1번. 2026년 10월 24일 (토) 오전 10:00</span>
  <span className="font-mono text-xs bg-[#0A0A0A] text-white px-2 py-1 rounded">음성 '1번'</span>
</button>`,
    selector: "#legacy-date-field",
  },
  {
    id: "bar-3",
    category: "Motor / Touch Targets",
    severity: "HIGH",
    wcagRule: "WCAG 2.2 AA 2.5.8",
    elementName: "input[type='radio'].dept-radio",
    issueDescription: "선택 버튼이 14x14px에 불과하여 수전증(파킨슨), 미세 운동 장애를 가진 고령자의 오클릭률이 82%에 달함.",
    remediationDescription: "터치 타깃을 72px 이상으로 대폭 확장하고, 음성 번호('1번')만 말해도 자동 선택되도록 설계.",
    metricBefore: "14x14 px (FAIL)",
    metricAfter: "72x320 px (PASSED)",
    originalCode: `<input type="radio" name="dept" value="neuro" style="width: 14px; height: 14px;" /> 신경과`,
    patchedCode: `<button role="radio" aria-checked="true" className="min-h-[72px] px-6 py-4 rounded-xl border-2 font-bold text-lg flex items-center justify-between">
  <span>신경과 (치매·뇌신경 전문)</span>
  <span className="font-mono text-xs text-[#059669]">선택됨 [음성 1번]</span>
</button>`,
    selector: "#legacy-dept-options",
  },
  {
    id: "bar-4",
    category: "Cognitive Overload",
    severity: "CRITICAL",
    wcagRule: "WCAG 2.2 AAA 3.3.4",
    elementName: "form#legacy-form > button[type='submit']",
    issueDescription: "내용 검토 단계 없이 즉시 제출되어 고령자 오입력 사고 유발. 3종의 방해 팝업이 화면을 뒤덮어 시각적 마비 초래.",
    remediationDescription: "팝업 3종을 자율 닫기(Dismiss)하고, 최종 음성 확인 체크포인트(Voice Gate)를 거쳐 안전 제출 보장.",
    metricBefore: "No Guardrail (CRITICAL)",
    metricAfter: "Voice Gate Enforced (SAFE)",
    originalCode: `<button type="submit" onclick="submitWithoutConfirmation()">즉시신청</button>`,
    patchedCode: `<ArgonVoiceConfirmationModal
  summary={bookingSummary}
  spokenPrompt="신경과 10월 24일 오전 10시 예약을 최종 제출할까요? '승인'이라고 말씀해주세요."
  onConfirm={handleFinalSubmission}
/>`,
    selector: "#legacy-submit-container",
  },
];

export const INITIAL_ASSERTIONS: VerificationAssertion[] = [
  { testName: "axe-core: color-contrast", rule: "WCAG 2.2 AA 1.4.3", status: "FAILED", durationMs: 12, metric: "1.9:1 (Req: 4.5:1)" },
  { testName: "axe-core: button-name", rule: "WCAG 2.2 A 4.1.2", status: "FAILED", durationMs: 8, metric: "0 / 4 Labeled" },
  { testName: "axe-core: target-size", rule: "WCAG 2.2 AA 2.5.8", status: "FAILED", durationMs: 9, metric: "14x14px (Req: 44x44px)" },
  { testName: "axe-core: focus-visible", rule: "WCAG 2.2 AA 2.4.7", status: "FAILED", durationMs: 14, metric: "outline: none" },
  { testName: "axe-core: heading-order", rule: "WCAG 2.2 A 1.3.1", status: "PASSED", durationMs: 7, metric: "Strict H1 > H2" },
  { testName: "axe-core: bypass-blocks", rule: "WCAG 2.2 A 2.4.1", status: "PASSED", durationMs: 6, metric: "Skip Links" },
  { testName: "axe-core: aria-live-region", rule: "WCAG 2.2 AA 4.1.3", status: "FAILED", durationMs: 11, metric: "Silent Mutations" },
  { testName: "gemma-4: on-device-pii", rule: "E4B Privacy By Design", status: "PASSED", durationMs: 15, metric: "RRN Masked" },
  { testName: "argon: voice-checkpoint-gate", rule: "WCAG 2.2 AAA 3.3.4", status: "PASSED", durationMs: 5, metric: "Verbal Gate Required" },
  { testName: "argon: popup-blocker-dismissal", rule: "WCAG 2.2 AAA 2.2.4", status: "FAILED", durationMs: 18, metric: "3 Popups Blocking Screen" },
  { testName: "argon: plain-language-audit", rule: "WCAG 2.2 AAA 3.1.5", status: "FAILED", durationMs: 22, metric: "Bureaucratic PDF Jargon" },
  { testName: "wcag: screen-reader-synthesis", rule: "Speech Audio 1.1", status: "PASSED", durationMs: 16, metric: "Web Speech API" },
  { testName: "axe-core: landmark-one-main", rule: "WCAG 2.2 A 1.3.1", status: "PASSED", durationMs: 8, metric: "Semantic Main" },
  { testName: "axe-core: keyboard-trap-prevention", rule: "WCAG 2.2 A 2.1.2", status: "FAILED", durationMs: 10, metric: "Popup Focus Trapped" },
  { testName: "argon: zero-flicker-recompilation", rule: "WCAG 2.2 A 2.3.1", status: "PASSED", durationMs: 24, metric: "0% Seizure Risk" },
];
