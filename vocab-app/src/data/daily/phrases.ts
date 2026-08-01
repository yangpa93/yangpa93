/**
 * 부모님이 배우는 일상·업무 영어 문장.
 *
 * **이 파일은 scripts/build-daily.mjs 가 만든다. 손으로 고치지 않는다.**
 * 원본은 korean/english_365_dataset.json 이고, 거기 실린 365일치는 8개 주제
 * × 10문장을 되풀이한 것이라 실제로 서로 다른 문장은 80개다.
 *
 * `word` 는 문장에서 그 표현이 실제로 쓰인 자리다. 원본 표제어
 * (`keyExpression`)가 'get back to someone' 처럼 사전 꼴이라 문장에 그대로
 * 들어 있지 않은 경우가 있어서, 빈칸을 만들 수 있도록 쓰인 자리를 따로 잡아
 * 두었다. 자리를 못 잡은 둘은 표제어를 그대로 두었고, 빈칸을 만들 수 있는지는
 * 앱이 clozeSentence 로 그때 판단한다 — 여기에 또 적어 두면 두 곳이 어긋난다.
 */

export interface DailyPhrase {
  id: string;
  /** 문장에서 이 표현이 실제로 쓰인 자리. 빈칸으로 지울 부분이다. */
  word: string;
  /** 원본 표제어. 사전 꼴이라 문장과 다를 수 있다. */
  keyExpression: string;
  en: string;
  ko: string;
  /** 언제 쓰는 표현인지 한 줄 */
  note: string;
}

export interface DailyTheme {
  id: string;
  /** 화면에 쓰는 이름 */
  label: string;
  /** 한 줄 설명 */
  hint: string;
  phrases: DailyPhrase[];
}

export const DAILY_THEMES: DailyTheme[] = [
  {
    "id": "w",
    "label": "업무와 협업",
    "hint": "회의·협업에서 매일 오가는 말",
    "phrases": [
      {
        "id": "daily-w-01",
        "word": "on the same page",
        "keyExpression": "on the same page",
        "en": "Let's make sure we're all on the same page.",
        "ko": "우리 모두 같은 이해를 하고 있는지 확인합시다.",
        "note": "생각이나 이해도가 일치함을 나타낼 때 사용"
      },
      {
        "id": "daily-w-02",
        "word": "get back to",
        "keyExpression": "get back to someone",
        "en": "I'll get back to you as soon as I check the details.",
        "ko": "세부 사항을 확인하는 대로 다시 연락드리겠습니다.",
        "note": "확인 후 다시 답신을 주겠다고 할 때 사용"
      },
      {
        "id": "daily-w-03",
        "word": "quick update",
        "keyExpression": "quick update",
        "en": "Could you give me a quick update on the progress?",
        "ko": "진행 상황에 대해 간단히 업데이트해주시겠어요?",
        "note": "부담 없이 현황을 물어볼 때 자주 쓰는 표현"
      },
      {
        "id": "daily-w-04",
        "word": "jump right into",
        "keyExpression": "jump right into",
        "en": "Let's jump right into today's main topic.",
        "ko": "오늘 핵심 주제로 바로 들어가 봅시다.",
        "note": "서론을 줄이고 본론으로 바로 넘어갈 때 사용"
      },
      {
        "id": "daily-w-05",
        "word": "streamlining",
        "keyExpression": "streamline",
        "en": "I'm currently working on streamlining this process.",
        "ko": "저는 현재 이 프로세스를 간소화하는 작업을 하고 있습니다.",
        "note": "공정이나 절차를 효율적으로 다듬는 의미"
      },
      {
        "id": "daily-w-06",
        "word": "hard stop",
        "keyExpression": "hard stop",
        "en": "Do you have a hard stop at 3 PM?",
        "ko": "오후 3시에 반드시 회의를 마쳐야 하나요?",
        "note": "다음 일정 때문에 더 이상 지연할 수 없는 종료 시간"
      },
      {
        "id": "daily-w-07",
        "word": "solid plan",
        "keyExpression": "solid plan",
        "en": "That sounds like a solid plan to me.",
        "ko": "제 생각엔 아주 확실하고 좋은 계획 같네요.",
        "note": "구체적이고 탄탄한 계획을 칭찬할 때 사용"
      },
      {
        "id": "daily-w-08",
        "word": "hear your thoughts",
        "keyExpression": "hear your thoughts",
        "en": "I'd love to hear your thoughts on this matter.",
        "ko": "이 안건에 대한 귀하의 의견을 듣고 싶습니다.",
        "note": "상대방의 의견을 정중하게 물어보는 표현"
      },
      {
        "id": "daily-w-09",
        "word": "pros and cons",
        "keyExpression": "pros and cons",
        "en": "We need to weigh the pros and cons carefully.",
        "ko": "장단점을 신중하게 따져봐야 합니다.",
        "note": "의사결정 시 장점과 단점을 비교할 때 사용"
      },
      {
        "id": "daily-w-10",
        "word": "take the time to",
        "keyExpression": "take the time to",
        "en": "Thanks for taking the time to meet with me today.",
        "ko": "오늘 시간 내어 만나주셔서 감사합니다.",
        "note": "미팅을 시작하거나 마칠 때 감사를 표하는 인사"
      }
    ]
  },
  {
    "id": "it",
    "label": "IT와 개발",
    "hint": "배포·리뷰·장애를 말할 때",
    "phrases": [
      {
        "id": "daily-it-01",
        "word": "optimize",
        "keyExpression": "optimize",
        "en": "We need to optimize the query to improve performance.",
        "ko": "성능을 향상시키기 위해 쿼리를 최적화해야 합니다.",
        "note": "성능이나 효율성을 끌어올릴 때 사용"
      },
      {
        "id": "daily-it-02",
        "word": "staging environment",
        "keyExpression": "staging environment",
        "en": "Let's push this fix to the staging environment first.",
        "ko": "이 수정 사항을 먼저 스테이징 환경에 배포합시다.",
        "note": "운영 반영 전 테스트용 서버/환경"
      },
      {
        "id": "daily-it-03",
        "word": "code review",
        "keyExpression": "code review",
        "en": "We should conduct a code review before merging the pull request.",
        "ko": "풀 리퀘스트를 병합하기 전에 코드 리뷰를 진행해야 합니다.",
        "note": "품질 검증을 위한 동료 코드 점검"
      },
      {
        "id": "daily-it-04",
        "word": "downtime",
        "keyExpression": "downtime",
        "en": "The system experienced unexpected downtime last night.",
        "ko": "지난밤 시스템에 예상치 못한 다운타임이 발생했습니다.",
        "note": "시스템 서비스가 중단된 시간"
      },
      {
        "id": "daily-it-05",
        "word": "refactor",
        "keyExpression": "refactor",
        "en": "We need to refactor this legacy code to enhance maintainability.",
        "ko": "유지보수성을 높이기 위해 이 레거시 코드를 리팩토링해야 합니다.",
        "note": "기능 변경 없이 코드 구조를 개선하는 작업"
      },
      {
        "id": "daily-it-06",
        "word": "cached",
        "keyExpression": "cached",
        "en": "Can you make sure the API response is properly cached?",
        "ko": "API 응답이 적절히 캐싱되었는지 확인해 주시겠어요?",
        "note": "자주 쓰는 데이터를 임시 저장하여 속도 향상"
      },
      {
        "id": "daily-it-07",
        "word": "sprint",
        "keyExpression": "sprint",
        "en": "This feature is scheduled for release in the next sprint.",
        "ko": "이 기능은 다음 스프린트에 출시될 예정입니다.",
        "note": "애자일 개발에서의 단기 작업 주기"
      },
      {
        "id": "daily-it-08",
        "word": "deadlock",
        "keyExpression": "deadlock",
        "en": "We encountered a deadlock while handling concurrent requests.",
        "ko": "동시 요청을 처리하는 동안 데드락(교착 상태)이 발생했습니다.",
        "note": "자원 점유 문제로 프로세스가 멈추는 현상"
      },
      {
        "id": "daily-it-09",
        "word": "document",
        "keyExpression": "document",
        "en": "Please document the interface specs for the frontend team.",
        "ko": "프론트엔드 팀을 위해 인터페이스 명세를 문서화해 주세요.",
        "note": "문서로 기록 및 작성하다"
      },
      {
        "id": "daily-it-10",
        "word": "scaling our infrastructure",
        "keyExpression": "scale infrastructure",
        "en": "We are scaling our infrastructure to handle higher traffic.",
        "ko": "트래픽 증가에 대응하기 위해 인프라를 확장하고 있습니다.",
        "note": "서버 자원을 증설/확장하는 행위"
      }
    ]
  },
  {
    "id": "ai",
    "label": "데이터와 인공지능",
    "hint": "모델·데이터 이야기",
    "phrases": [
      {
        "id": "daily-ai-01",
        "word": "fine-tune",
        "keyExpression": "fine-tune",
        "en": "We need a high-quality dataset to fine-tune the model.",
        "ko": "모델을 파인튜닝하려면 고품질 데이터셋이 필요합니다.",
        "note": "사전 학습 모델을 특정 목적에 맞게 미세 조정"
      },
      {
        "id": "daily-ai-02",
        "word": "overfitting",
        "keyExpression": "overfitting",
        "en": "The algorithm is overfitting to the training data.",
        "ko": "알고리즘이 학습 데이터에 오버피팅(과적합)되고 있습니다.",
        "note": "학습 데이터에는 잘 맞지만 새로운 데이터엔 성능이 저하됨"
      },
      {
        "id": "daily-ai-03",
        "word": "hallucinations",
        "keyExpression": "hallucinations",
        "en": "We should mitigate hallucinations in our AI output.",
        "ko": "AI 출력물에서 환각 현상(hallucination)을 줄여야 합니다.",
        "note": "AI가 허구의 정보를 사실처럼 생성하는 현상"
      },
      {
        "id": "daily-ai-04",
        "word": "Retrieval-Augmented Generation",
        "keyExpression": "Retrieval-Augmented Generation",
        "en": "Retrieval-Augmented Generation helps deliver accurate contexts.",
        "ko": "RAG 기술은 정확한 문맥을 제공하는 데 도움을 줍니다.",
        "note": "외부 지식을 검색하여 LLM 답변의 정확도를 높이는 기법"
      },
      {
        "id": "daily-ai-05",
        "word": "precision and recall",
        "keyExpression": "precision and recall",
        "en": "Let's evaluate the model using precision and recall metrics.",
        "ko": "정밀도와 재현율 지표를 활용해 모델을 평가해 봅시다.",
        "note": "데이터 분류 모델의 성능을 측정하는 대표적인 지표"
      },
      {
        "id": "daily-ai-06",
        "word": "tokens",
        "keyExpression": "tokens",
        "en": "We processed millions of tokens to train the pipeline.",
        "ko": "파이프라인을 학습시키기 위해 수백만 개의 토큰을 처리했습니다.",
        "note": "LLM에서 문장을 처리하는 기본 텍스트 단위"
      },
      {
        "id": "daily-ai-07",
        "word": "Data cleaning",
        "keyExpression": "data cleaning",
        "en": "Data cleaning is a critical step in pipeline design.",
        "ko": "데이터 정제는 파이프라인 설계에서 매우 중요한 단계입니다.",
        "note": "노이즈나 오류 데이터를 제거하고 정리하는 과정"
      },
      {
        "id": "daily-ai-08",
        "word": "latency",
        "keyExpression": "latency",
        "en": "The latency of the model response needs to be reduced.",
        "ko": "모델 응답 지연 시간(latency)을 줄일 필요가 있습니다.",
        "note": "요청 후 응답을 받기까지 걸리는 대기 시간"
      },
      {
        "id": "daily-ai-09",
        "word": "prompt engineering",
        "keyExpression": "prompt engineering",
        "en": "We are implementing prompt engineering techniques.",
        "ko": "우리는 프롬프트 엔지니어링 기법을 적용하고 있습니다.",
        "note": "AI 모델로부터 최적의 결과를 이끌어내는 지시문 설계"
      },
      {
        "id": "daily-ai-10",
        "word": "semantic search",
        "keyExpression": "semantic search",
        "en": "Vector databases allow fast semantic search across documents.",
        "ko": "벡터 데이터베이스를 통해 문서 간 빠른 의미 기반 검색이 가능합니다.",
        "note": "단어 단순 일치가 아닌 의미적 유사성을 기반으로 한 검색"
      }
    ]
  },
  {
    "id": "pm",
    "label": "프로젝트 관리",
    "hint": "일정·자원·위험을 다룰 때",
    "phrases": [
      {
        "id": "daily-pm-01",
        "word": "walk you through",
        "keyExpression": "walk someone through",
        "en": "Let me walk you through the key milestones for Q3.",
        "ko": "3분기 주요 이정표(마일스톤)에 대해 설명해 드리겠습니다.",
        "note": "차근차근 상세히 설명하다"
      },
      {
        "id": "daily-pm-02",
        "word": "mitigate potential risks",
        "keyExpression": "mitigate risks",
        "en": "We need to mitigate potential risks ahead of launch.",
        "ko": "출시 전 잠재적인 리스크를 완화해야 합니다.",
        "note": "위험 요소를 줄이거나 관리하다"
      },
      {
        "id": "daily-pm-03",
        "word": "blockers",
        "keyExpression": "blockers",
        "en": "Are there any blockers preventing you from finishing this task?",
        "ko": "이 작업을 완료하는 데 방해가 되는 블로커(장애 요소)가 있나요?",
        "note": "진행을 막는 문제점이나 걸림돌"
      },
      {
        "id": "daily-pm-04",
        "word": "allocate more resources",
        "keyExpression": "allocate resources",
        "en": "Let's allocate more resources to meet the deadline.",
        "ko": "마감 기한을 맞추기 위해 더 많은 리소스를 배분합시다.",
        "note": "인력이나 예산 등 자원을 배치하다"
      },
      {
        "id": "daily-pm-05",
        "word": "stakeholders",
        "keyExpression": "stakeholders",
        "en": "We should keep key stakeholders informed of any changes.",
        "ko": "주요 이해관계자들에게 변경 사항을 지속적으로 알려야 합니다.",
        "note": "프로젝트의 이해당사자"
      },
      {
        "id": "daily-pm-06",
        "word": "deliverable",
        "keyExpression": "deliverables",
        "en": "This deliverable is due by the end of this week.",
        "ko": "이 인도물(결과물)의 마감일은 이번 주말까지입니다.",
        "note": "프로젝트의 최종 결과물/제출물"
      },
      {
        "id": "daily-pm-07",
        "word": "retrospective",
        "keyExpression": "retrospective",
        "en": "Let's conduct a retrospective meeting to review what went well.",
        "ko": "잘된 점을 돌아보기 위해 회고 회의를 진행해 봅시다.",
        "note": "프로젝트나 스프린트 종료 후 진행하는 회고"
      },
      {
        "id": "daily-pm-08",
        "word": "behind schedule",
        "keyExpression": "behind schedule",
        "en": "We are currently running slightly behind schedule.",
        "ko": "우리는 현재 일정보다 약간 뒤처지고 있습니다.",
        "note": "예정된 일정보다 늦어지는 상황"
      },
      {
        "id": "daily-pm-09",
        "word": "prioritize",
        "keyExpression": "prioritize",
        "en": "Let's prioritize the high-impact tasks first.",
        "ko": "영향력이 큰 작업부터 우선순위를 정해 처리합시다.",
        "note": "우선순위를 매기다"
      },
      {
        "id": "daily-pm-10",
        "word": "follow up",
        "keyExpression": "follow up",
        "en": "I will follow up with the client by tomorrow morning.",
        "ko": "내일 아침까지 고객사 측에 추가로 확인 연락을 취하겠습니다.",
        "note": "이전 건에 대해 후속 조치나 경과를 확인하다"
      }
    ]
  },
  {
    "id": "ld",
    "label": "리더십과 경영진 소통",
    "hint": "방향을 말하고 사람을 움직일 때",
    "phrases": [
      {
        "id": "daily-ld-01",
        "word": "align our strategy with",
        "keyExpression": "align with",
        "en": "We need to align our strategy with long-term company goals.",
        "ko": "우리 전략을 회사의 장기 목표와 일치시켜야 합니다.",
        "note": "목표나 방향을 동일하게 맞추다"
      },
      {
        "id": "daily-ld-02",
        "word": "Empowering",
        "keyExpression": "empowering",
        "en": "Empowering team members leads to higher productivity.",
        "ko": "팀원들에게 권한을 부여하는 것이 더 높은 생산성으로 이어집니다.",
        "note": "권한 이양 및 주도권 부여"
      },
      {
        "id": "daily-ld-03",
        "word": "driving key business metrics",
        "keyExpression": "driving metrics",
        "en": "Let's focus on driving key business metrics this quarter.",
        "ko": "이번 분기에는 핵심 비즈니스 지표를 견인하는 데 집중합시다.",
        "note": "지표나 성과를 향상시키다"
      },
      {
        "id": "daily-ld-04",
        "word": "Transparency",
        "keyExpression": "transparency",
        "en": "Transparency is essential for building mutual trust.",
        "ko": "상호 신뢰를 쌓기 위해서는 투명성이 필수적입니다.",
        "note": "정보 공유 및 의사결정의 투명함"
      },
      {
        "id": "daily-ld-05",
        "word": "embrace innovation",
        "keyExpression": "embrace innovation",
        "en": "We should embrace innovation while managing exposure to risk.",
        "ko": "리스크 노출을 관리하면서 혁신을 적극 수용해야 합니다.",
        "note": "새로운 방식과 혁신을 받아들이다"
      },
      {
        "id": "daily-ld-06",
        "word": "Constructive feedback",
        "keyExpression": "constructive feedback",
        "en": "Constructive feedback helps individuals grow professionally.",
        "ko": "건설적인 피드백은 개인의 전문적 성장을 돕습니다.",
        "note": "발전적이고 도움이 되는 의견 제시"
      },
      {
        "id": "daily-ld-07",
        "word": "foster a culture",
        "keyExpression": "foster a culture",
        "en": "Let's foster a culture of continuous learning.",
        "ko": "지속적인 학습의 문화를 조성해 나갑시다.",
        "note": "좋은 조직 문화나 환경을 육성하다"
      },
      {
        "id": "daily-ld-08",
        "word": "short-term wins",
        "keyExpression": "short-term wins",
        "en": "We must balance short-term wins with sustainable growth.",
        "ko": "단기적 성과와 지속 가능한 성장의 균형을 맞춰야 합니다.",
        "note": "빠르게 달성 가능한 작은 성과"
      },
      {
        "id": "daily-ld-09",
        "word": "Decisive leadership",
        "keyExpression": "decisive leadership",
        "en": "Decisive leadership is critical during market shifts.",
        "ko": "시장 변화의 시기에는 단호한 리더십이 결정적입니다.",
        "note": "명확하고 과감한 의사결정 리더십"
      },
      {
        "id": "daily-ld-10",
        "word": "actively listen",
        "keyExpression": "actively listen",
        "en": "Great leaders actively listen before taking action.",
        "ko": "훌륭한 리더는 행동에 나서기 전에 경청합니다.",
        "note": "상대방의 의견을 집중해서 경청하다"
      }
    ]
  },
  {
    "id": "et",
    "label": "비즈니스 예절",
    "hint": "메일과 인사에 쓰는 정중한 말",
    "phrases": [
      {
        "id": "daily-et-01",
        "word": "prompt response",
        "keyExpression": "prompt response",
        "en": "I appreciate your prompt response to my inquiry.",
        "ko": "제 문의에 신속하게 답변해 주셔서 감사합니다.",
        "note": "빠르고 즉각적인 응답"
      },
      {
        "id": "daily-et-02",
        "word": "sincere apologies",
        "keyExpression": "sincere apologies",
        "en": "Please accept my sincere apologies for the delay.",
        "ko": "지연된 점에 대해 진심으로 사과의 말씀을 드립니다.",
        "note": "진심 어린 사과"
      },
      {
        "id": "daily-et-03",
        "word": "look forward to",
        "keyExpression": "look forward to",
        "en": "I look forward to collaborating with your team.",
        "ko": "귀하의 팀과 함께 협력하기를 기대합니다.",
        "note": "~하는 것을 기대하고 고대하다"
      },
      {
        "id": "daily-et-04",
        "word": "reach out",
        "keyExpression": "reach out",
        "en": "Feel free to reach out if you have any questions.",
        "ko": "궁금한 점이 있으시면 언제든지 편하게 연락해 주세요.",
        "note": "연락을 취하다 / 도움을 청하다"
      },
      {
        "id": "daily-et-05",
        "word": "writing to follow up",
        "keyExpression": "writing to follow up",
        "en": "I am writing to follow up on our previous conversation.",
        "ko": "이전 대화 내용과 관련하여 경과를 확인하고자 메일 드립니다.",
        "note": "이전 건에 대한 후속 문의 표현"
      },
      {
        "id": "daily-et-06",
        "word": "reschedule",
        "keyExpression": "reschedule",
        "en": "Would it be possible to reschedule our meeting to Thursday?",
        "ko": "회의 일정을 목요일로 변경하는 것이 가능할까요?",
        "note": "일정을 재조정하다"
      },
      {
        "id": "daily-et-07",
        "word": "valuable insight",
        "keyExpression": "valuable insight",
        "en": "Thank you for your valuable insight during the discussion.",
        "ko": "토의 과정에서 귀중한 통찰을 공유해 주셔서 감사합니다.",
        "note": "유익하고 깊이 있는 의견/견해"
      },
      {
        "id": "daily-et-08",
        "word": "keep you posted",
        "keyExpression": "keep someone posted",
        "en": "I will keep you posted on any new developments.",
        "ko": "새로운 경과가 발생하는 대로 계속 알려드리겠습니다.",
        "note": "최신 상황을 지속적으로 공유해주다"
      },
      {
        "id": "daily-et-09",
        "word": "clarify",
        "keyExpression": "clarify",
        "en": "Could you please clarify the second point in your proposal?",
        "ko": "제안서의 두 번째 항목에 대해 좀 더 명확히 설명해주실 수 있나요?",
        "note": "명확하게 만들다 / 설명하다"
      },
      {
        "id": "daily-et-10",
        "word": "pleasure speaking with you",
        "keyExpression": "pleasure speaking with you",
        "en": "It was a pleasure speaking with you today.",
        "ko": "오늘 말씀 나누게 되어 정말 즐거웠습니다.",
        "note": "대화를 마무리할 때 건네는 정중한 인사"
      }
    ]
  },
  {
    "id": "ng",
    "label": "협상과 문제 해결",
    "hint": "이견을 좁히고 원인을 찾을 때",
    "phrases": [
      {
        "id": "daily-ng-01",
        "word": "middle ground",
        "keyExpression": "middle ground",
        "en": "We need to find a middle ground that benefits both parties.",
        "ko": "양측 모두에게 이익이 되는 타협점을 찾아야 합니다.",
        "note": "서로 양보하여 도달하는 중간 지점/타협점"
      },
      {
        "id": "daily-ng-02",
        "word": "win-win solution",
        "keyExpression": "win-win solution",
        "en": "Let's look for a win-win solution to this conflict.",
        "ko": "이 갈등에 대해 서로 승리하는(윈윈) 해결책을 모색해 봅시다.",
        "note": "양쪽 모두에게 유익한 해결책"
      },
      {
        "id": "daily-ng-03",
        "word": "outside our current budget",
        "keyExpression": "outside budget",
        "en": "That offer is slightly outside our current budget.",
        "ko": "그 제안은 현재 저희 예산 범위를 약간 벗어납니다.",
        "note": "예산을 초과하는"
      },
      {
        "id": "daily-ng-04",
        "word": "explore alternative options",
        "keyExpression": "explore options",
        "en": "Can we explore alternative options before making a final decision?",
        "ko": "최종 결정을 내리기 전에 다른 대안들도 탐색해 볼 수 있을까요?",
        "note": "여러 대안이나 가능성을 살펴보다"
      },
      {
        "id": "daily-ng-05",
        "word": "compromise",
        "keyExpression": "compromise",
        "en": "We are willing to compromise on the delivery timeline.",
        "ko": "저희는 인도 시기에 대해서는 타협할 용의가 있습니다.",
        "note": "서로 양보하고 합의하다"
      },
      {
        "id": "daily-ng-06",
        "word": "from your perspective",
        "keyExpression": "from your perspective",
        "en": "What are the key priorities from your perspective?",
        "ko": "당신의 관점에서는 어떤 것이 가장 핵심적인 우선순위인가요?",
        "note": "당신의 시각/관점에서는"
      },
      {
        "id": "daily-ng-07",
        "word": "break down",
        "keyExpression": "break down",
        "en": "Let's break down the issue into smaller components.",
        "ko": "문제를 더 작은 단위 요소들로 나누어 살펴봅시다.",
        "note": "복잡한 것을 세분화하다"
      },
      {
        "id": "daily-ng-08",
        "word": "root cause",
        "keyExpression": "root cause",
        "en": "We must address the root cause rather than just the symptoms.",
        "ko": "증상만 치료할 게 아니라 근본 원인을 해결해야 합니다.",
        "note": "문제의 근원적인 원인"
      },
      {
        "id": "daily-ng-09",
        "word": "counteroffer",
        "keyExpression": "counteroffer",
        "en": "I'd like to propose a counteroffer that aligns with our goals.",
        "ko": "저희 목표에 부합하는 수정 제안(카운터 오퍼)을 드리고 싶습니다.",
        "note": "상대의 제안에 대한 역제안"
      },
      {
        "id": "daily-ng-10",
        "word": "revisit",
        "keyExpression": "revisit",
        "en": "Let's take a short break and revisit this topic shortly.",
        "ko": "잠시 휴식을 취한 뒤 이 안건을 다시 다루도록 합시다.",
        "note": "이전 주제로 돌아가 다시 논의하다"
      }
    ]
  },
  {
    "id": "st",
    "label": "가벼운 대화",
    "hint": "일 이야기가 아닌 자리에서",
    "phrases": [
      {
        "id": "daily-st-01",
        "word": "How was your weekend",
        "keyExpression": "how was your weekend",
        "en": "How was your weekend? Did you do anything special?",
        "ko": "주말 잘 보내셨나요? 특별한 일 있으셨나요?",
        "note": "월요일 아침 인사로 널리 쓰이는 표현"
      },
      {
        "id": "daily-st-02",
        "word": "pleasant",
        "keyExpression": "pleasantly",
        "en": "The weather has been amazingly pleasant lately.",
        "ko": "요즘 날씨가 정말 다행스럽게도 참 좋네요.",
        "note": "기분 좋고 쾌적하게"
      },
      {
        "id": "daily-st-03",
        "word": "tried",
        "keyExpression": "tried",
        "en": "Have you tried that new coffee shop across the street?",
        "ko": "길 건너편에 새로 생긴 커피숍 가보셨나요?",
        "note": "(음식/장소를) 시도해보다/가보다"
      },
      {
        "id": "daily-st-04",
        "word": "caught up",
        "keyExpression": "catch up",
        "en": "It's been a while since we last caught up.",
        "ko": "서로 안부를 나누지 못한 지 제법 시간이 지났네요.",
        "note": "밀린 소식이나 안부를 주고받다"
      },
      {
        "id": "daily-st-05",
        "word": "upcoming holiday",
        "keyExpression": "upcoming holiday",
        "en": "Do you have any plans for the upcoming holiday season?",
        "ko": "다가오는 휴가철에 어떤 특별한 계획이 있으신가요?",
        "note": "다가오는 휴일/휴가 시즌"
      },
      {
        "id": "daily-st-06",
        "word": "travel trip",
        "keyExpression": "travel trip",
        "en": "I heard you recently traveled to Japan. How was the trip?",
        "ko": "최근에 일본 여행 다녀오셨다고 들었어요. 여행은 어땠나요?",
        "note": "여행 경험에 대해 물어보기"
      },
      {
        "id": "daily-st-07",
        "word": "Congratulations on",
        "keyExpression": "congratulations on",
        "en": "Congratulations on your recent promotion!",
        "ko": "이번 승진을 진심으로 축하드립니다!",
        "note": "~에 대해 축하하다"
      },
      {
        "id": "daily-st-08",
        "word": "interesting hobby",
        "keyExpression": "interesting hobby",
        "en": "That sounds like an interesting hobby. How long have you done it?",
        "ko": "재미있는 취미네요! 시작하신 지 얼마나 되셨나요?",
        "note": "상대의 취미에 관심을 보일 때"
      },
      {
        "id": "daily-st-09",
        "word": "team dinner",
        "keyExpression": "team dinner",
        "en": "I'm really looking forward to the team dinner tonight.",
        "ko": "오늘 저녁 팀 회식이 정말 기대되네요.",
        "note": "팀 회식/저녁 모임"
      },
      {
        "id": "daily-st-10",
        "word": "have a wonderful weekend",
        "keyExpression": "have a wonderful weekend",
        "en": "Take care and have a wonderful weekend!",
        "ko": "몸 조심하시고 즐거운 주말 보내세요!",
        "note": "주말 전 마치는 정중한 작별 인사"
      }
    ]
  }
];
