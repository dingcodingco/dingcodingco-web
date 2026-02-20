import { Achievement } from '@/types'

export const achievements: Achievement[] = [
  // PRIMARY BRAND GRADIENTS (43% = 3/7)
  { metric: "14,556+", label: "수강생이 함께 성장", icon: "Users", gradient: "from-primary-500 to-primary-light" },
  { metric: "4.9/5.0", label: "평균 만족도", icon: "Star", gradient: "from-primary-600 to-primary-400" },
  { metric: "2,000+", label: "백엔드 취업 성공", icon: "Briefcase", gradient: "from-primary-500 to-primary-300", trackId: "spring-backend" },

  // TRACK COLOR ACCENTS (57% = 4/7)
  { metric: "38개", label: "기업 합격 (최다)", icon: "Award", gradient: "from-purple-500 to-pink-500", trackId: "spring-backend" },
  { metric: "27시간", label: "풀스택 개발 마스터", icon: "Code", gradient: "from-green-500 to-teal-500", trackId: "ai-beginner" },
  { metric: "4주", label: "수익화 서비스 런칭", icon: "Rocket", gradient: "from-red-500 to-pink-500", trackId: "ai-beginner" },
  { metric: "10배", label: "개발 생산성 향상", icon: "TrendingUp", gradient: "from-orange-500 to-red-500", trackId: "ai-developer" },
]
