'use client'

import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getTrackById, getCoursesByTrack, getAllTracks } from '@/lib/course-utils'
import { Track, Course } from '@/types'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import TrackDetailSection from '@/app/components/sections/TrackDetailSection'
import OutcomeStoriesSection from '@/app/components/sections/OutcomeStoriesSection'
import FAQSection from '@/app/components/sections/FAQSection'
import { Card, CardContent } from '@/app/components/ui/card'
import { ArrowRight } from 'lucide-react'
import { TrackIcons } from '@/lib/track-icons'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const CourseDetailModal = dynamic(() => import('@/app/components/modals/CourseDetailModal'), {
  ssr: false,
})
const QuizModal = dynamic(() => import('@/app/components/modals/QuizModal'), {
  ssr: false,
})

interface TrackDetailPageProps {
  params: Promise<{ trackId: string }>
}

export default function TrackDetailPage({
  params,
}: TrackDetailPageProps) {
  const [trackId, setTrackId] = useState<string | null>(null)
  const [track, setTrack] = useState<Track | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [otherTracks, setOtherTracks] = useState<Track[]>([])
  const [waitlistCourse, setWaitlistCourse] = useState<Course | null>(null)
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  useEffect(() => {
    params.then((resolvedParams) => {
      const id = resolvedParams.trackId
      setTrackId(id)

      const foundTrack = getTrackById(id)
      if (!foundTrack) {
        notFound()
      }

      setTrack(foundTrack)
      setCourses(getCoursesByTrack(id))

      const allTracks = getAllTracks()
      setOtherTracks(allTracks.filter((t) => t.id !== id))
    })
  }, [params])

  if (!track || !trackId) {
    return null
  }

  return (
    <>
      <Header activeSection="" onNavigate={() => {}} />

      <main className="min-h-screen">
        {/* Track Detail Section */}
        <TrackDetailSection
          track={track}
          courses={courses}
          onCourseClick={setWaitlistCourse}
          onQuizStart={() => setIsQuizOpen(true)}
          isHighlighted={false}
        />

        <CourseDetailModal
          course={waitlistCourse}
          onClose={() => setWaitlistCourse(null)}
        />

        <QuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          onComplete={(recommendedTrackId) => {
            setIsQuizOpen(false)
            // If different track recommended, navigate to it
            if (recommendedTrackId !== trackId) {
              window.location.href = `/roadmaps/${recommendedTrackId}`
            }
          }}
        />

      {/* Related Success Stories */}
      <OutcomeStoriesSection trackFilter={trackId} />

      {/* Related FAQs */}
      <FAQSection trackFilter={trackId} />

        {/* Other Tracks Recommendation */}
        {otherTracks.length > 0 && (
          <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
                다른 트랙도 둘러보세요
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {otherTracks.map((otherTrack) => {
                  const IconComponent = TrackIcons[otherTrack.iconName]
                  return (
                    <Link key={otherTrack.id} href={`/roadmaps/${otherTrack.id}`}>
                      <Card className="group h-full border-2 hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-6 h-6 text-white" strokeWidth={2.5} />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                                {otherTrack.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {otherTrack.tagline}
                              </p>
                              <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                                자세히 보기
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}
