'use client'

import { ScrollReveal } from '@/app/components/ui/scroll-reveal'
import InstructorProfile from '@/app/components/instructor/InstructorProfile'
import InstructorStats from '@/app/components/instructor/InstructorStats'
import {
  instructorProfile,
  instructorStats
} from '@/data/instructor'

export default function InstructorSection() {
  return (
    <section
      id="instructor"
      className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                강사 소개
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300">
                현장에서 검증된 실력과 노하우를 전수합니다
              </p>
            </div>

            {/* Profile */}
            <InstructorProfile profile={instructorProfile} />

            {/* Stats Row */}
            <ScrollReveal delay={100}>
              <InstructorStats stats={instructorStats} />
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
