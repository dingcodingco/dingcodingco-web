'use client'

import type { Course } from '@/types'
import { Button } from '@/app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog'
import { Badge } from '@/app/components/ui/badge'
import { WaitlistForm } from '@/app/components/WaitlistForm'
import { Clock, DollarSign, ExternalLink } from 'lucide-react'
import { BadgeIcons } from '@/lib/track-icons'
import { CourseImage } from '@/app/components/ui/course-image'
import { calculateDiscountPrice, formatPrice, calculateSavingsAmount, formatSavings } from '@/lib/utils'

interface CourseDetailModalProps {
  course: Course | null
  onClose: () => void
}

export default function CourseDetailModal({ course, onClose }: CourseDetailModalProps) {
  if (!course) return null

  // Only show modal for coming_soon courses (waitlist function)
  if (course.status !== 'coming_soon') return null

  const getStatusBadge = () => {
    if (course.isFree) {
      return (
        <Badge className="bg-[hsl(var(--badge-free-bg))] text-[hsl(var(--badge-free-text))] border-0 text-sm font-medium inline-flex items-center gap-1">
          <BadgeIcons.free className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
          FREE
        </Badge>
      )
    }
    if (course.status === 'coming_soon') {
      return (
        <Badge className="bg-[hsl(var(--badge-soon-bg))] text-[hsl(var(--badge-soon-text))] border-0 text-sm font-medium inline-flex items-center gap-1">
          <BadgeIcons.coming_soon className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
          COMING SOON
        </Badge>
      )
    }
    return (
      <Badge className="bg-[hsl(var(--badge-premium-bg))] text-[hsl(var(--badge-premium-text))] border-0 text-sm font-medium inline-flex items-center gap-1">
        <BadgeIcons.premium className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
        PREMIUM
      </Badge>
    )
  }

  return (
    <Dialog open={!!course} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0">
        {/* Hero Image - 16:9 aspect ratio */}
        {course.thumbnailUrl && (
          <div className="relative w-full aspect-video overflow-hidden">
            <CourseImage
              src={course.thumbnailUrl}
              alt={course.title}
              priority
            />
          </div>
        )}

        <div className="p-6">
          <DialogHeader>
            <div className="flex items-start gap-3 mb-2">
              <Badge variant="outline" className="font-semibold">
                {course.level}
              </Badge>
              {getStatusBadge()}
            </div>
            <DialogTitle className="text-2xl leading-tight">
              {course.title}
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed mt-4">
              {course.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Course Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">강의 시간</div>
                  <div className="font-medium">{course.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">가격</div>
                  {course.isFree ? (
                    <div className="font-medium text-green-600 dark:text-green-400">무료</div>
                  ) : (
                    <div className="space-y-1">
                      {/* Main Price Display */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Discounted Price */}
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatPrice(calculateDiscountPrice(course.price))}
                        </span>

                        {/* Original Price (Strikethrough) */}
                        <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                          {formatPrice(course.price)}
                        </span>
                      </div>

                      {/* Discount Badges */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* 15% Discount Badge */}
                        <Badge className="bg-gradient-discount-v2 text-white text-xs font-bold px-2 py-0.5 shadow-md">
                          15% 할인
                        </Badge>

                        {/* Savings Badge */}
                        <Badge className="bg-savings-badge text-white text-xs font-bold px-2 py-0.5 shadow-md">
                          <span className="text-gradient-savings">
                            🎁 {formatSavings(calculateSavingsAmount(course.price))}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTA or Waitlist */}
            {course.status === 'coming_soon' ? (
              <div className="space-y-4">
                <div className="p-4 bg-[hsl(var(--coming-soon))]/10 rounded-lg border border-[hsl(var(--coming-soon))]/20">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🔜</span>
                    <div>
                      <div className="font-semibold text-[hsl(var(--coming-soon))] mb-1">
                        출시 예정
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {course.expectedRelease && (
                          <>출시 예정일: {course.expectedRelease}<br /></>
                        )}
                        출시 알림을 받으시려면 이메일을 등록해주세요
                      </div>
                    </div>
                  </div>
                </div>
                <WaitlistForm courseId={course.id} />
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  className="w-full h-12 text-lg bg-gradient-primary hover:opacity-90"
                  asChild
                >
                  <a
                    href={course.inflearnUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    인프런에서 수강하기
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  인프런으로 이동하여 강의를 확인하실 수 있습니다
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
