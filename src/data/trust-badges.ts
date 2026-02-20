import { TrustBadge } from '@/types'

// Common trust badges for all tracks
export const commonTrustBadges: TrustBadge[] = [
  { icon: 'Shield', label: '인프런 환불 정책 적용', subtitle: '구매 후 7일 이내' },
  { icon: 'Infinity', label: '평생 수강 가능', subtitle: '기간 제한 없음' },
  { icon: 'Award', label: '수료증 발급', subtitle: '학습 완료 증명' },
]

export const trustBadges: Record<string, TrustBadge[]> = {
  'ai-beginner': [
    { icon: 'Rocket', label: '4주 완성', subtitle: '빠른 수익화' },
    { icon: 'Users', label: '14,200+ 수강생', subtitle: '검증된 커리큘럼' },
    { icon: 'Star', label: '4.9/5.0', subtitle: '평균 만족도' },
  ],
  'ai-developer': [
    { icon: 'Zap', label: '10배 생산성', subtitle: 'AI 활용 마스터' },
    { icon: 'Users', label: '300+ 개발자', subtitle: '실무 검증' },
    { icon: 'Star', label: '4.9/5.0', subtitle: '평균 만족도' },
  ],
  'spring-backend': [
    { icon: 'Award', label: '38개 기업 검증', subtitle: '실전 면접 통과' },
    { icon: 'Users', label: '2,000+ 수강생', subtitle: '누적 완강' },
    { icon: 'TrendingUp', label: '취업 성공자 다수', subtitle: '44명 추적 기록' },
    { icon: 'Star', label: '4.9/5.0', subtitle: '평균 만족도' },
  ]
}
