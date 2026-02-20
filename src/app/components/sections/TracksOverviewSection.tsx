import { tracks } from '@/data/tracks'
import { Card, CardContent, CardFooter } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Code, Clock, Target, BarChart, Users, ArrowRight } from 'lucide-react'
import { TrackIcons } from '@/lib/track-icons'

interface TracksOverviewSectionProps {
  onTrackClick: (trackId: string) => void
}

// Comparison feature data structure
interface ComparisonFeature {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  values: Record<string, string>
}

// Feature comparison data
const comparisonFeatures: ComparisonFeature[] = [
  {
    id: 'coding-experience',
    label: '코딩 경험',
    icon: Code,
    values: {
      'ai-beginner': '필요 없음',
      'ai-developer': '있음 (현업)',
      'spring-backend': '조금 있음'
    }
  },
  {
    id: 'duration',
    label: '학습 기간',
    icon: Clock,
    values: {
      'ai-beginner': '4-6주',
      'ai-developer': '4주',
      'spring-backend': '12-16주'
    }
  },
  {
    id: 'goal',
    label: '목표',
    icon: Target,
    values: {
      'ai-beginner': '수익화 💰',
      'ai-developer': '생산성 향상 ⚡',
      'spring-backend': '취업/이직 🎯'
    }
  },
  {
    id: 'difficulty',
    label: '난이도',
    icon: BarChart,
    values: {
      'ai-beginner': '⭐⭐',
      'ai-developer': '⭐⭐⭐⭐',
      'spring-backend': '⭐⭐⭐'
    }
  },
  {
    id: 'target',
    label: '추천 대상',
    icon: Users,
    values: {
      'ai-beginner': '창업, 기획자',
      'ai-developer': '현업 개발자',
      'spring-backend': '취준생, 이직자'
    }
  }
]

// Track-specific colors for comparison cards
const trackComparisonColors: Record<string, {
  headerBg: string
  accentBar: string
  iconBg: string
  border: string
  buttonBg: string
  hoverShadow: string
}> = {
  'ai-beginner': {
    headerBg: 'bg-gradient-to-br from-track-ai-beginner-50 to-primary-50 dark:from-gray-800 dark:to-gray-900',
    accentBar: 'bg-gradient-track-ai-beginner',
    iconBg: 'bg-gradient-track-ai-beginner',
    border: 'border-track-ai-beginner',
    buttonBg: 'bg-track-ai-beginner hover:bg-track-ai-beginner-600 dark:bg-track-ai-beginner dark:hover:bg-track-ai-beginner-600',
    hoverShadow: 'shadow-[0_8px_24px_-4px_hsl(var(--track-ai-beginner)/0.2)]'
  },
  'ai-developer': {
    headerBg: 'bg-gradient-to-br from-track-ai-developer-50 to-primary-50 dark:from-gray-800 dark:to-gray-900',
    accentBar: 'bg-gradient-track-ai-developer',
    iconBg: 'bg-gradient-track-ai-developer',
    border: 'border-track-ai-developer',
    buttonBg: 'bg-track-ai-developer hover:bg-track-ai-developer-600 dark:bg-track-ai-developer dark:hover:bg-track-ai-developer-600',
    hoverShadow: 'shadow-[0_8px_24px_-4px_hsl(var(--track-ai-developer)/0.2)]'
  },
  'spring-backend': {
    headerBg: 'bg-gradient-to-br from-track-spring-backend-50 to-primary-50 dark:from-gray-800 dark:to-gray-900',
    accentBar: 'bg-gradient-track-spring-backend',
    iconBg: 'bg-gradient-track-spring-backend',
    border: 'border-track-spring-backend',
    buttonBg: 'bg-track-spring-backend hover:bg-track-spring-backend-600 dark:bg-track-spring-backend dark:hover:bg-track-spring-backend-600',
    hoverShadow: 'shadow-[0_8px_24px_-4px_hsl(var(--track-spring-backend)/0.2)]'
  }
}

export default function TracksOverviewSection({ onTrackClick }: TracksOverviewSectionProps) {
  return (
    <section id="tracks" className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Track Comparison Section - Modern Card-Based */}
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              학습 트랙
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              3가지 검증된 학습 경로를 비교하고 선택하세요 - 14,556명이 선택했어요
            </p>
          </div>

          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {tracks.map((track, index) => {
              const colors = trackComparisonColors[track.id]
              const IconComponent = TrackIcons[track.iconName]

              return (
                <div
                  key={track.id}
                  className={`animate-fade-slide-up stagger-${Math.min(index + 1, 6)}`}
                >
                  <Card className={`
                    group relative overflow-hidden h-full
                    bg-white dark:bg-gray-900
                    border-2 ${colors.border}
                    rounded-2xl
                    hover:-translate-y-2 hover:scale-[1.02]
                    transition-all duration-300
                    ${colors.hoverShadow}
                  `}>
                    {/* Left Accent Bar */}
                    <div className={`
                      absolute left-0 top-0 bottom-0
                      w-1.5 ${colors.accentBar}
                      group-hover:w-2 transition-all duration-150
                    `} />

                    {/* Track Header - Simplified */}
                    <div className={`p-4 border-b-2 ${colors.border}`}>
                      <div className="flex items-center gap-3">
                        {/* Track Icon - Smaller */}
                        <div className={`
                          w-10 h-10 rounded-lg ${colors.iconBg}
                          flex items-center justify-center flex-shrink-0
                        `}>
                          <IconComponent className="w-5 h-5 text-white" strokeWidth={2.5} aria-hidden="true" />
                        </div>

                        {/* Track Name Only */}
                        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {track.name}
                        </h4>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-3">
                      {/* Feature List */}
                      {comparisonFeatures.map((feature) => {
                        const FeatureIcon = feature.icon
                        return (
                          <div
                            key={feature.id}
                            className="
                              flex items-start gap-3 p-3 rounded-lg
                              bg-gray-50 dark:bg-gray-800
                              border border-gray-200 dark:border-gray-700
                              transition-all duration-200
                            "
                          >
                            {/* Feature Icon */}
                            <div className={`
                              w-8 h-8 rounded-lg ${colors.iconBg}
                              flex items-center justify-center flex-shrink-0
                            `}>
                              <FeatureIcon className="w-4 h-4 text-white" strokeWidth={2.5} aria-hidden="true" />
                            </div>

                            {/* Feature Content */}
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                                {feature.label}
                              </div>
                              <div className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">
                                {feature.values[track.id]}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </CardContent>

                    {/* CTA Footer */}
                    <CardFooter className="p-6 pt-0">
                      <button
                        onClick={() => onTrackClick(`track-${track.id}`)}
                        aria-label={`${track.name} 트랙 자세히 보기`}
                        className={`
                          w-full ${colors.buttonBg}
                          text-white font-semibold
                          px-6 py-3 rounded-lg
                          flex items-center justify-center gap-2
                          transition-all duration-200
                          hover:shadow-lg
                          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                        `}
                      >
                        자세히 보기
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </button>
                    </CardFooter>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Text */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300">
            어떤 트랙을 선택해야 할지 고민이신가요?{' '}
            <button
              onClick={() => {
                const heroSection = document.getElementById('hero')
                heroSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-primary hover:text-primary/80 dark:hover:text-primary/90 underline font-medium transition-colors"
            >
              트랙 추천 퀴즈
            </button>
            를 시작해보세요!
          </p>
        </div>
      </div>
    </section>
  )
}
