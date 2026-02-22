/**
 * Instructor Data - Central source of truth for instructor information
 * Eliminates duplication across InstructorSection, About page, and Footer
 */

import type {
  InstructorProfile,
  InstructorStat,
  TechStack,
  Timeline,
  PhilosophyMessage,
  TrustIndicator
} from '@/types'

// Profile Information
export const instructorProfile: InstructorProfile = {
  name: '딩코딩코',
  title: 'AI 코딩 교육 전문가 • 백엔드 개발자',
  profileImage: 'https://avatars.githubusercontent.com/u/159892196?v=4',
  inflearnUrl: 'https://www.inflearn.com/users/408812/@dingcodingco',
  youtubeUrl: 'https://www.youtube.com/@딩코딩코',
  youtubeSubscribers: '2.6만',
  verificationBadge: '인프런 공식 인증 강사'
}

// Statistics - Displayed prominently in stats cards
export const instructorStats: InstructorStat[] = [
  {
    icon: 'Award',
    value: '38+',
    label: '대기업 합격',
    subtitle: '네이버, 카카오, 토스, 쿠팡, 배민 등',
    gradient: 'from-primary-500 to-primary-400'
  },
  {
    icon: 'Users',
    value: '14,556+',
    label: '누적 수강생',
    subtitle: '매주 +89명 증가 중',
    gradient: 'from-primary-600 to-primary-400'
  },
  {
    icon: 'Star',
    value: '4.9/5.0',
    label: '평균 만족도',
    subtitle: '1,200+ 리뷰 기반',
    gradient: 'from-yellow-500 to-orange-400'
  }
]

// Trust Indicators - Compact validation badges
export const trustIndicators: TrustIndicator[] = [
  {
    icon: 'CheckCircle',
    label: '백엔드 취업 성공자 다수 배출'
  },
  {
    icon: 'Star',
    label: '평균 4.9/5.0 평점 (인프런 기준)'
  },
  {
    icon: 'Award',
    label: '인프런 베스트셀러 5회'
  },
  {
    icon: 'Youtube',
    label: 'YouTube 2.6만 구독자'
  },
  {
    icon: 'Shield',
    label: '평생 Q&A 지원'
  }
]

// Technical Skills
export const techStack: TechStack[] = [
  { icon: '☕', name: 'Java', color: 'bg-red-500 hover:bg-red-600' },
  { icon: '🔷', name: 'Kotlin', color: 'bg-indigo-500 hover:bg-indigo-600' },
  { icon: '🍃', name: 'Spring', color: 'bg-green-500 hover:bg-green-600' },
  { icon: '🐍', name: 'Python', color: 'bg-blue-500 hover:bg-blue-600' },
  { icon: '🤖', name: 'AI/Claude', color: 'bg-purple-500 hover:bg-purple-600' },
  { icon: '✨', name: 'Cursor', color: 'bg-cyan-500 hover:bg-cyan-600' },
  { icon: '📊', name: 'SQL', color: 'bg-yellow-500 hover:bg-yellow-600' },
  { icon: '🔧', name: 'Git', color: 'bg-orange-500 hover:bg-orange-600' }
]

// Career Timeline
export const timeline: Timeline[] = [
  { year: '2019', milestone: '프로그래밍 교육 시작' },
  { year: '2021', milestone: '인프런 입점, 첫 1,000명 돌파' },
  { year: '2023', milestone: '10,000명 수강생 달성' },
  { year: '2024', milestone: '38개 기업 합격 노하우 정리' }
]

// Philosophy Messages (reusable across pages)
export const philosophyMessages: PhilosophyMessage[] = [
  {
    id: 'main',
    title: '실전 중심 교육 철학',
    message: '"코딩은 누구나 배울 수 있습니다. 하지만 진짜 문제는 \'어떻게\' 배우느냐입니다. 저는 여러분이 단순히 코드를 따라치는 게 아니라, 왜 이렇게 작동하는지 이해하고 설명할 수 있도록 가르칩니다."',
    author: '이론보다 실전, 암기보다 이해',
    usage: 'hero'
  },
  {
    id: 'footer',
    message: '코딩은 단순히 문법을 외우는 것이 아닙니다. 문제를 이해하고, 해결책을 설계하고, 코드로 구현하는 전 과정을 배워야 합니다.',
    usage: 'footer'
  },
  {
    id: 'about',
    title: '왜 딩코딩코인가?',
    message: '저는 수많은 시행착오를 겪으며 개발자가 되었습니다. 그 과정에서 얻은 노하우와 실전 경험을 여러분과 공유하고 싶습니다. 단순히 코드를 가르치는 것이 아니라, 문제 해결 능력과 논리적 사고를 키워드립니다.',
    usage: 'about-page'
  }
]
