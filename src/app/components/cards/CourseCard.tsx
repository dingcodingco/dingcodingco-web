import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import type { Course } from '@/types'
import { Clock, ExternalLink, Star } from 'lucide-react'
import { BadgeIcons } from '@/lib/track-icons'
import { CourseImage } from '@/app/components/ui/course-image'
import { calculateDiscountPrice, formatPrice, calculateSavingsAmount, formatSavings } from '@/lib/utils'

interface CourseCardProps {
  course: Course
  onWaitlistClick: (course: Course) => void
}

export default function CourseCard({ course, onWaitlistClick }: CourseCardProps) {
  const handleCardClick = () => {
    if (course.status === 'coming_soon') {
      onWaitlistClick(course)
    } else {
      // Published: Direct redirect to Inflearn with UTM parameters
      const utmParams = '?utm_source=dingcodingko&utm_medium=referral&utm_campaign=course_card'
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

  return (
    <Card
      className="card-hover group h-full flex flex-col overflow-hidden cursor-pointer border border-gray-200 hover:border-primary/30 dark:border-gray-700"
      onClick={handleCardClick}
    >
      {/* Thumbnail - Top 16:9 Full Width with Enhanced Hover */}
      <div className="relative w-full aspect-video overflow-hidden group">
        <CourseImage
          src={course.thumbnailUrl}
          alt={course.title}
          className="transition-transform duration-500 group-hover:scale-110"
          priority={false}
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button Overlay (Published courses only) */}
        {course.status === 'published' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
              <ExternalLink className="w-8 h-8 text-primary-600" />
            </div>
          </div>
        )}

        {/* Enhanced 15% Discount Badge - Top Right with 3D Effect */}
        {!course.isFree && course.price > 0 && course.status === 'published' && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-gradient-discount-v2 text-white text-base font-extrabold px-5 py-2.5 shadow-lg backdrop-blur-sm border-0 transform hover:scale-105 transition-transform">
              15% 할인
            </Badge>
          </div>
        )}
      </div>

      {/* Content Area */}
      <CardHeader className="pb-1">
        <div className="flex items-center gap-1 mb-1">
          <Badge variant="outline" className="text-xs font-semibold">
            {course.level}
          </Badge>
          {getStatusBadge()}
        </div>
        <CardTitle className="text-xl leading-tight">{course.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 py-1">
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>

          {/* Price Section - Simplified without DollarSign icon */}
          <div>
            {course.isFree ? (
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                무료
              </div>
            ) : (
              <div className="flex flex-col gap-0.5">
                {/* Price Row */}
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="line-through text-muted-foreground/60 text-sm">
                    {formatPrice(course.price)}
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(calculateDiscountPrice(course.price))}
                  </span>
                </div>

                {/* Savings Badge Row */}
                <div className="flex items-center gap-1.5">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-savings-badge">
                    <span className="text-xs">🎁</span>
                    <span className="text-xs text-gradient-savings">
                      {formatSavings(calculateSavingsAmount(course.price))}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Review Summary with Expandable */}
        {course.reviews && course.reviews.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-600">
            {/* Aggregate Stats */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {(course.reviews.reduce((sum, r) => sum + r.rating, 0) / course.reviews.length).toFixed(1)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({course.reviews.length}개 후기)
                </span>
              </div>
              <button
                className="text-xs text-primary hover:underline font-medium"
                onClick={(e) => {
                  e.stopPropagation()
                  const utmParams = '?utm_source=dingcodingko&utm_medium=referral&utm_campaign=course_reviews'
                  window.open(`${course.inflearnUrl}${utmParams}#reviews`, '_blank', 'noopener,noreferrer')
                }}
              >
                전체 보기
              </button>
            </div>

            {/* Best Review Preview */}
            <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-[10px]">★</span>
                ))}
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
                "{course.reviews[0].content}"
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                - {course.reviews[0].author}
              </p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <div className="w-full text-center text-xs text-muted-foreground">
          {course.status === 'coming_soon' ? (
            '클릭하여 출시 알림 받기'
          ) : course.isFree ? (
            <span className="flex items-center justify-center gap-1">
              클릭하여 인프런에서 수강하기
              <ExternalLink className="h-3 w-3" />
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1">
              쿠폰 받고 수강하기
              <ExternalLink className="h-3 w-3" />
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
