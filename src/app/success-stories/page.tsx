'use client'

import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import OutcomeStoriesSection from '@/app/components/sections/OutcomeStoriesSection'
import { outcomeStories } from '@/data/outcome-stories'

export default function SuccessStoriesPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              수강생 성공 사례
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {outcomeStories.length}명의 수강생이 딩코딩코와 함께 성장했습니다
            </p>
          </div>

          {/* Full Page Success Stories */}
          <OutcomeStoriesSection fullPage={true} />
        </div>
      </main>

      <Footer />
    </>
  )
}
