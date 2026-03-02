'use client'

import { Card } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import type { Course } from '@/types'
import { Clock, Star } from 'lucide-react'
import { BadgeIcons } from '@/lib/track-icons'
import { CourseImage } from '@/app/components/ui/course-image'
import { calculateDiscountPrice, formatPrice, calculateSavingsAmount, formatSavings } from '@/lib/utils'

interface CourseListItemProps {
  course: Course
  onWaitlistClick: (course: Course) => void
}

export default function CourseListItem({ course, onWaitlistClick }: CourseListItemProps) {
  const handleCardClick = () => {
    if (course.status === 'coming_soon') {
      onWaitlistClick(course)
    } else {
      // Published: Direct redirect to Inflearn with UTM parameters
      const utmParams = '?utm_source=dingcodingko&utm_medium=referral&utm_campaign=course_list'
      window.open(`${course.inflearnUrl}${utmParams}`, '_blank', 'noopener,noreferrer')
    }
  }

  const getStatusBadge = () => {
    if (course.isFree) {
      return (
        <Badge className="bg-gradient-success text-white border-0 font-bold inline-flex items-center gap-1 shadow-md">
          <BadgeIcons.free className="w-3 h-3" strokeWidth={2.5} aria-hidden="true" />
          FREE
        </Badge>
      )
    }
    if (course.status === 'coming_soon') {
      return (
        <Badge className="bg-gradient-soon text-white border-0 font-bold inline-flex items-center gap-1 shadow-md animate-badge-pulse">
          <BadgeIcons.coming_soon className="w-3 h-3" strokeWidth={2.5} aria-hidden="true" />
          COMING SOON
        </Badge>
      )
    }
    return (
      <Badge className="bg-gradient-premium text-white border-0 font-bold inline-flex items-center gap-1 shadow-md">
        <BadgeIcons.premium className="w-3 h-3" strokeWidth={2.5} aria-hidden="true" />
        PREMIUM
      </Badge>
    )
  }

  // Calculate average rating
  const avgRating = course.reviews && course.reviews.length > 0
    ? course.reviews.reduce((sum, r) => sum + r.rating, 0) / course.reviews.length
    : null

  // Use totalReviewCount if available, otherwise use reviews.length
  const displayReviewCount = course.totalReviewCount || course.reviews?.length || 0

  return (
    <Card
      className="flex flex-col md:flex-row gap-4 p-4 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer border border-gray-200 dark:border-gray-700"
      onClick={handleCardClick}
    >
      {/* Image Section (Left) */}
      <div className="w-full md:w-40 md:flex-shrink-0">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <CourseImage
            src={course.thumbnailUrl}
            alt={course.title}
            className="transition-transform duration-300 hover:scale-105"
            priority={false}
          />
        </div>
      </div>

      {/* Content Section (Right) */}
      <div className="flex-1 space-y-3">
        {/* Level + Status Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs font-semibold">
            {course.level}
          </Badge>
          {getStatusBadge()}
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
          {course.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {course.description}
        </p>

        {/* Tech Stack Tags */}
        {course.technologies && course.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {course.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {course.duration}
          </span>

          {/* Price with Discount */}
          {course.isFree ? (
            <span>💰 무료</span>
          ) : (
            <div className="flex items-center gap-3 flex-wrap">
              {/* Discounted Price (Bold) */}
              <span className="text-base font-bold text-gray-900 dark:text-white">
                💰 {formatPrice(calculateDiscountPrice(course.price))}
              </span>

              {/* Original Price (Strikethrough) */}
              <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                {formatPrice(course.price)}
              </span>

              {/* 15% Discount Badge */}
              <Badge className="bg-gradient-discount-v2 text-white text-xs font-bold px-2 py-0.5 shadow-sm">
                15% 할인
              </Badge>

              {/* Savings Badge */}
              <Badge className="bg-savings-badge text-white text-xs font-bold px-2 py-0.5 shadow-sm">
                <span className="text-gradient-savings">
                  🎁 {formatSavings(calculateSavingsAmount(course.price))}
                </span>
              </Badge>
            </div>
          )}

          {course.updatedAt && (
            <span>📅 {course.updatedAt} 업데이트</span>
          )}
        </div>

        {/* Reviews */}
        {avgRating && displayReviewCount > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {avgRating.toFixed(1)}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              ({displayReviewCount}개 후기)
            </span>
            <button
              className="text-xs text-primary hover:underline font-medium ml-auto"
              onClick={(e) => {
                e.stopPropagation()
                const utmParams = '?utm_source=dingcodingko&utm_medium=referral&utm_campaign=course_reviews'
                window.open(`${course.inflearnUrl}${utmParams}#reviews`, '_blank', 'noopener,noreferrer')
              }}
            >
              전체 보기
            </button>
          </div>
        )}
      </div>
    </Card>
  )
}
