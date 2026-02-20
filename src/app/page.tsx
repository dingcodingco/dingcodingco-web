'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import type { Course } from '@/types'
import { tracks } from '@/data/tracks'
import { courses } from '@/data/courses'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import HeroSection from '@/app/components/sections/HeroSection'
import AchievementsMarquee from '@/app/components/sections/AchievementsMarquee'
import TracksOverviewSection from '@/app/components/sections/TracksOverviewSection'
import OutcomeStoriesSection from '@/app/components/sections/OutcomeStoriesSection'
import TrackDetailSection from '@/app/components/sections/TrackDetailSection'
import InstructorSection from '@/app/components/sections/InstructorSection'
import FAQSection from '@/app/components/sections/FAQSection'
import StructuredData from '@/app/components/seo/StructuredData'
import { generateCourseJsonLd, generateOrganizationJsonLd, generateWebSiteJsonLd } from '@/lib/structured-data'

// Lazy load modals and interactive components
const QuizModal = dynamic(() => import('@/app/components/modals/QuizModal'), {
  ssr: false,
})
const CourseDetailModal = dynamic(() => import('@/app/components/modals/CourseDetailModal'), {
  ssr: false,
})
const ActivityToast = dynamic(() => import('@/app/components/ui/ActivityToast'), {
  ssr: false,
})
const FloatingCTA = dynamic(() => import('@/app/components/ui/FloatingCTA'), {
  ssr: false,
})

export default function HomePage() {
  // Navigation state
  const [activeSection, setActiveSection] = useState('hero')

  // Modal states
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [waitlistCourse, setWaitlistCourse] = useState<Course | null>(null)

  // Quiz result state
  const [recommendedTrackId, setRecommendedTrackId] = useState<string | null>(null)

  // Flag to prevent Intersection Observer from interfering during programmatic scroll
  const isProgrammaticScrollRef = useRef(false)

  // Intersection Observer for scroll tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Skip hash updates during programmatic scroll
          if (entry.isIntersecting && entry.intersectionRatio > 0.5 && !isProgrammaticScrollRef.current) {
            setActiveSection(entry.target.id)
            // Update URL hash without jumping
            window.history.replaceState(null, '', `#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.5 }
    )

    // Observe all sections
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  // Handle initial anchor on page load
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [])

  // Scroll helper function
  const scrollToSection = (sectionId: string) => {
    // Set flag to prevent Intersection Observer from interfering
    isProgrammaticScrollRef.current = true

    // Manually update the hash immediately
    window.history.replaceState(null, '', `#${sectionId}`)

    // Perform the scroll
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })

    // Clear flag after scroll animation completes (smooth scroll typically takes 500-1000ms)
    setTimeout(() => {
      isProgrammaticScrollRef.current = false
    }, 1000)
  }

  // Quiz completion handler
  const handleQuizComplete = (trackId: string) => {
    setIsQuizOpen(false)
    setRecommendedTrackId(trackId)
    scrollToSection(`track-${trackId}`)

    // Remove highlight after 3 seconds
    setTimeout(() => setRecommendedTrackId(null), 3000)
  }

  // Get courses for a specific track
  const getCoursesByTrack = (trackId: string) => {
    return courses
      .filter(c => c.trackId === trackId)
      .sort((a, b) => a.sortOrder - b.sortOrder)
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={generateOrganizationJsonLd()} />
      <StructuredData data={generateWebSiteJsonLd()} />
      {tracks.map((track) => (
        <StructuredData key={`schema-${track.id}`} data={generateCourseJsonLd(track)} />
      ))}

      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      <main>
        <HeroSection onQuizStart={() => setIsQuizOpen(true)} />

        <AchievementsMarquee />

        <TracksOverviewSection onTrackClick={scrollToSection} />

        <OutcomeStoriesSection />

        <InstructorSection />

        {tracks.map((track) => (
          <TrackDetailSection
            key={track.id}
            track={track}
            courses={getCoursesByTrack(track.id)}
            onCourseClick={setWaitlistCourse}
            onQuizStart={() => setIsQuizOpen(true)}
            isHighlighted={recommendedTrackId === track.id}
          />
        ))}

        <FAQSection />

        <Footer />
      </main>

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onComplete={handleQuizComplete}
      />

      <CourseDetailModal
        course={waitlistCourse}
        onClose={() => setWaitlistCourse(null)}
      />

      <ActivityToast />

      <FloatingCTA onQuizStart={() => setIsQuizOpen(true)} />
    </>
  )
}
