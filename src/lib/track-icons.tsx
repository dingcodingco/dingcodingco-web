import {
  // Track icons
  Palette,        // 🎨 → AI 비개발자
  Bot,            // 🤖 → AI 개발자
  Sprout,         // 🌱 → 스프링 백엔드

  // Feature icons
  BookOpen,       // 📚 → 강의 개수
  Users,          // 👥 → 수강생
  Star,           // ⭐ → 평점
  Clock,          // ⏱️ → 학습 기간

  // Badge icons
  Shield,         // 🆓 → FREE
  Sparkles,       // 💎 → PREMIUM
  Clock as ClockSoon, // 🔜 → COMING SOON

  // Other
  Code2,
  GraduationCap,
  Rocket,
  ArrowRight,
  ArrowDown,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

export const TrackIcons = {
  'ai-beginner': Palette,
  'ai-developer': Bot,
  'spring-backend': Sprout,
} as const

export const StatusIcons = {
  courses: BookOpen,
  students: Users,
  rating: Star,
  duration: Clock,
} as const

export const BadgeIcons = {
  free: Shield,
  premium: Sparkles,
  coming_soon: ClockSoon,
} as const

export const UIIcons = {
  code: Code2,
  graduation: GraduationCap,
  rocket: Rocket,
  arrowRight: ArrowRight,
  arrowDown: ArrowDown,
  externalLink: ExternalLink,
  checkCircle: CheckCircle2,
  alertCircle: AlertCircle,
} as const

// Type exports for better type safety
export type TrackIconKey = keyof typeof TrackIcons
export type StatusIconKey = keyof typeof StatusIcons
export type BadgeIconKey = keyof typeof BadgeIcons
export type UIIconKey = keyof typeof UIIcons
