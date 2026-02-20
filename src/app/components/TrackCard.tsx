import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import type { Track } from '@/types'
import { TrackIcons, StatusIcons } from '@/lib/track-icons'

interface TrackCardProps {
  track: Track
  onClick?: () => void
}

// Track-specific color mapping (using registered Tailwind classes with safelist)
const trackColors: Record<string, { border: string; badge: string; iconBg: string; gradient: string }> = {
  'ai-beginner': {
    border: 'border-track-ai-beginner',
    badge: 'bg-track-ai-beginner-bg text-track-ai-beginner border-2 border-track-ai-beginner font-bold',
    iconBg: 'bg-gradient-track-ai-beginner',
    gradient: 'bg-gradient-to-br from-track-ai-beginner-50 to-white dark:from-gray-800 dark:to-gray-900'
  },
  'ai-developer': {
    border: 'border-track-ai-developer',
    badge: 'bg-track-ai-developer-bg text-track-ai-developer border-2 border-track-ai-developer font-bold',
    iconBg: 'bg-gradient-track-ai-developer',
    gradient: 'bg-gradient-to-br from-track-ai-developer-50 to-white dark:from-gray-800 dark:to-gray-900'
  },
  'spring-backend': {
    border: 'border-track-spring-backend',
    badge: 'bg-track-spring-backend-bg text-track-spring-backend border-2 border-track-spring-backend font-bold',
    iconBg: 'bg-gradient-track-spring-backend',
    gradient: 'bg-gradient-to-br from-track-spring-backend-50 to-white dark:from-gray-800 dark:to-gray-900'
  }
}

export default function TrackCard({ track, onClick }: TrackCardProps) {
  const colors = trackColors[track.id] || trackColors['ai-developer'] // Default to blue
  const IconComponent = TrackIcons[track.iconName]

  return (
    <button
      onClick={onClick}
      className="block h-full w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      aria-label={`${track.name} 트랙으로 이동`}
    >
      <Card className={`group h-full border-3 ${colors.border} ${colors.gradient} hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer relative overflow-hidden`}>
        <CardHeader>
          <div className="flex items-start justify-between mb-4">
            {/* Icon with Gradient Background */}
            <div className={`w-18 h-18 rounded-2xl ${colors.iconBg} shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all flex items-center justify-center`}>
              <IconComponent className="w-9 h-9 text-white" strokeWidth={3} aria-hidden="true" />
            </div>
            {track.badge && (
              <Badge className={`text-xs ${colors.badge} animate-badge-pulse shadow-md`}>
                {track.badge}
              </Badge>
            )}
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight">{track.name}</CardTitle>
          <CardDescription className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-semibold">
            {track.tagline}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-50 font-semibold">
              <StatusIcons.courses className="w-4 h-4 text-gray-600 dark:text-gray-100" strokeWidth={3} aria-hidden="true" />
              <span>
                {track.courseCount}개 강의
                <span className="sr-only">강의 개수: {track.courseCount}개</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-50 font-semibold">
              <StatusIcons.students className="w-4 h-4 text-gray-600 dark:text-gray-100" strokeWidth={3} aria-hidden="true" />
              <span>
                {track.studentCount?.toLocaleString() || 0}명 수강
                <span className="sr-only">수강생 수: {track.studentCount?.toLocaleString() || 0}명</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-50 font-semibold">
              <StatusIcons.rating className="w-4 h-4 text-gray-600 dark:text-gray-100" strokeWidth={3} aria-hidden="true" />
              <span>
                {track.rating?.toFixed(1) || 'N/A'}
                <span className="sr-only">평점: {track.rating?.toFixed(1) || '정보 없음'}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-50 font-semibold">
              <StatusIcons.duration className="w-4 h-4 text-gray-600 dark:text-gray-100" strokeWidth={3} aria-hidden="true" />
              <span>
                {track.estimatedDuration}
                <span className="sr-only">예상 학습 기간: {track.estimatedDuration}</span>
              </span>
            </div>
          </div>
        </CardContent>
        {/* Left accent border - always visible */}
        <div className={`absolute left-0 top-0 bottom-0 w-2 bg-current rounded-l-lg group-hover:w-3 transition-all ${colors.border}`} style={{ backgroundColor: `hsl(var(--track-${track.id}))` }} />
      </Card>
    </button>
  )
}
