'use client'

import type { Track, Course } from '@/types'
import CourseCard from '@/app/components/cards/CourseCard'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { TrustBadge } from '@/app/components/ui/TrustBadge'
import { trustBadges } from '@/data/trust-badges'
import { TrackIcons, StatusIcons } from '@/lib/track-icons'
import { ScrollReveal } from '@/app/components/ui/scroll-reveal'

interface TrackDetailSectionProps {
  track: Track
  courses: Course[]
  onCourseClick: (course: Course) => void
  onQuizStart?: () => void
  isHighlighted?: boolean
}

// Track background color classes
const trackBackgrounds: Record<string, string> = {
  'ai-beginner': 'bg-track-ai-beginner',
  'ai-developer': 'bg-track-ai-developer',
  'spring-backend': 'bg-track-spring-backend'
}

// Track accent color classes for text
const trackAccents: Record<string, string> = {
  'ai-beginner': 'text-track-ai-beginner',
  'ai-developer': 'text-track-ai-developer',
  'spring-backend': 'text-track-spring-backend'
}

export default function TrackDetailSection({
  track,
  courses,
  onCourseClick,
  onQuizStart,
  isHighlighted
}: TrackDetailSectionProps) {
  const bgClass = trackBackgrounds[track.id] || trackBackgrounds['ai-developer']
  const accentClass = trackAccents[track.id] || trackAccents['ai-developer']
  const IconComponent = TrackIcons[track.iconName]

  return (
    <section
      id={`track-${track.id}`}
      className={`py-16 md:py-24 lg:py-32 ${bgClass} ${isHighlighted ? 'highlight-section' : ''}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Track Header */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center mb-12 space-y-6">
            {/* Icon and Badge */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-sm flex items-center justify-center">
                <IconComponent className={`w-12 h-12 sm:w-14 sm:h-14 ${accentClass}`} strokeWidth={2} aria-hidden="true" />
              </div>
              {track.badge && (
                <Badge className={`text-sm ${accentClass} bg-background dark:bg-gray-800 border-2`}>
                  {track.badge}
                </Badge>
              )}
            </div>

            {/* Title and Tagline */}
            <div className="space-y-3">
              <h2 className="text-gray-900 dark:text-gray-100">
                {track.name}
              </h2>
              <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300">
                {track.tagline}
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {track.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
                <StatusIcons.courses className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                <span className="font-medium">
                  {track.courseCount}개 강의
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
                <StatusIcons.students className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                <span className="font-medium">
                  {track.studentCount?.toLocaleString() || 0}명 수강
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
                <StatusIcons.rating className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                <span className="font-medium">
                  {track.rating?.toFixed(1) || 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
                <StatusIcons.duration className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                <span className="font-medium">
                  {track.estimatedDuration}
                </span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {trustBadges[track.id]?.map((badge, index) => (
                <TrustBadge key={index} badge={badge} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Learning Roadmap Diagram */}
        <ScrollReveal delay={150}>
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
              학습 로드맵
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              {/* Group courses by level */}
              {Array.from(new Set(courses.map(c => c.level))).map((level, index, array) => {
                const levelCourses = courses.filter(c => c.level === level)
                const isLast = index === array.length - 1

                return (
                  <div key={level} className="flex items-center gap-4 md:gap-6">
                    {/* Level Box */}
                    <div className="flex flex-col items-center">
                      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border-2 border-primary/30 shadow-md p-4 md:p-6 min-w-[140px] md:min-w-[160px] text-center">
                        <div className="text-primary font-bold text-sm md:text-base mb-2">
                          {level}
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                          {levelCourses.length}개
                        </div>
                        <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                          강의
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    {!isLast && (
                      <div className="text-primary text-2xl md:text-3xl font-bold rotate-90 md:rotate-0">
                        →
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Progress Indicator (placeholder for future feature) */}
            <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
              {track.courseCount}개 강의를 순차적으로 학습하세요
            </div>
          </div>
        </ScrollReveal>

        {/* Course List */}
        <ScrollReveal delay={200}>
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-gray-900 dark:text-gray-100">
              강의 목록
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className={`animate-fade-slide-up stagger-${Math.min(index + 1, 6)}`}
                >
                  <CourseCard
                    course={course}
                    onWaitlistClick={onCourseClick}
                  />
                </div>
              ))}
            </div>

            {/* CTA Box */}
            <div className="mt-12 max-w-2xl mx-auto p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border-2 border-primary shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 text-center">
                {track.name} 트랙을 시작하시겠어요?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                {track.courseCount}개 강의 • {track.estimatedDuration} 완성 • 인프런 환불 정책 적용
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold"
                  onClick={() => {
                    const firstCourse = courses[0]
                    if (firstCourse && firstCourse.inflearnUrl) {
                      window.open(firstCourse.inflearnUrl, '_blank', 'noopener,noreferrer')
                    }
                  }}
                >
                  첫 강의 시작하기 →
                </Button>
                {onQuizStart && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                    onClick={onQuizStart}
                  >
                    다른 트랙 찾기
                  </Button>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
