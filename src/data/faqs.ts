import { FAQ } from '@/types'

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "코딩 경험이 전혀 없어도 괜찮나요?",
    answer: "네! 많은 수강생이 코딩 경험 0에서 시작했습니다. [AI 비개발자] 트랙은 완전 초보자를 위해 설계되었으며, 변수부터 차근차근 시작합니다.",
    category: "difficulty",
    relatedTrackId: "ai-beginner",
    proofLinks: [
      { label: "AI 비개발자 트랙 보기", href: "#track-ai-beginner" },
      { label: "초보자 후기 8개", href: "#reviews-beginner" },
      { label: "🎥 코딩 몰라도 만드는 방법 (4분)", href: "https://www.youtube.com/watch?v=gWfnNXwBNNo" }
    ]
  },
  {
    id: "faq-2",
    question: "정말 38개 기업에 합격할 수 있나요?",
    answer: "38개는 강사님의 실제 합격 기록이며, 수강생들은 평균 5-10개 기업에서 합격하고 있습니다. 커리큘럼이 실제 기업 면접 기출을 기반으로 설계되어 있습니다.",
    category: "outcomes",
    relatedTrackId: "spring-backend",
    proofLinks: [
      { label: "합격 후기 모음", href: "#outcome-stories" },
      { label: "면접 강의 상세", href: "#course-interview-challenge" }
    ]
  },
  {
    id: "faq-3",
    question: "완강까지 얼마나 걸리나요?",
    answer: "트랙별로 다릅니다. AI 비개발자는 4-6주, AI 개발자는 6-8주, 스프링 백엔드는 12-16주가 평균 완강 기간입니다. 하루 1-2시간 투자 기준입니다.",
    category: "difficulty",
    proofLinks: [
      { label: "트랙별 상세 일정", href: "#tracks" },
      { label: "🎥 AI 시대 학습법 4가지 (9분)", href: "https://www.youtube.com/watch?v=6HKlkL1ZbBg" }
    ]
  },
  {
    id: "faq-4",
    question: "환불이 가능한가요?",
    answer: "인프런 정책에 따라 구매 후 7일 이내, 진도율 7% 미만일 경우 환불 가능합니다. 단, 강의자료 다운로드 시 환불이 불가하며, 자세한 조건은 인프런 고객센터를 참고해주세요.",
    category: "refund"
  },
  {
    id: "faq-5",
    question: "취업 보장이 되나요?",
    answer: "취업을 보장하지는 않지만, 추적 가능한 완강자 중 다수가 6개월 이내 취업에 성공했습니다 (44명 추적 기록). 이력서 작성부터 면접 준비까지 체계적으로 다룹니다.",
    category: "outcomes",
    relatedTrackId: "spring-backend",
    proofLinks: [
      { label: "취업 성공 사례", href: "#outcome-stories" },
      { label: "이력서 강의", href: "#course-resume-strategy" },
      { label: "🎥 백엔드 면접 완벽 분석 (3분)", href: "https://www.youtube.com/watch?v=x__FGE5UNe8" }
    ]
  },
  {
    id: "faq-6",
    question: "강의는 평생 볼 수 있나요?",
    answer: "네! 한 번 구매하면 평생 소장하며, 강의 업데이트도 무료로 제공됩니다. 수강생 커뮤니티도 평생 이용 가능합니다.",
    category: "enrollment"
  },
  {
    id: "faq-7",
    question: "Claude Code가 뭔가요?",
    answer: "Anthropic사의 AI 코딩 도구로, 자연어로 명령하면 코드를 작성해줍니다. AI 개발자 트랙에서 실전 활용법을 배울 수 있습니다.",
    category: "difficulty",
    relatedTrackId: "ai-developer",
    proofLinks: [
      { label: "🎥 Claude Code 활용법 (6분)", href: "https://www.youtube.com/watch?v=wz7oFfIR7LA" },
      { label: "🎥 Claude + Jira 연동 (9분)", href: "https://www.youtube.com/watch?v=US3SpMT0syA" }
    ]
  },
  {
    id: "faq-8",
    question: "맥북이 없어도 되나요?",
    answer: "네! Windows에서도 모든 강의를 수강할 수 있습니다. 다만 일부 환경설정이 맥과 다를 수 있어 별도 가이드를 제공합니다.",
    category: "difficulty"
  },
  {
    id: "faq-9",
    question: "할인 쿠폰은 어디서 받나요?",
    answer: "각 강의 페이지에서 '쿠폰 받고 수강하기' 버튼을 클릭하면 자동으로 15% 할인이 적용됩니다. 중복 할인은 불가합니다.",
    category: "enrollment"
  },
  {
    id: "faq-10",
    question: "강의 미리보기가 가능한가요?",
    answer: "네! 각 강의 인프런 페이지에서 1-2개 챕터를 무료로 미리 볼 수 있습니다. 무료 강의는 전체 수강 가능합니다.",
    category: "enrollment",
    proofLinks: [
      { label: "🎥 YouTube 채널 (232개 영상)", href: "https://www.youtube.com/@딩코딩코" },
      { label: "무료 강의 보기", href: "#tracks" }
    ]
  }
]
