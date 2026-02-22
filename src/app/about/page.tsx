'use client'

import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import InstructorSection from '@/app/components/sections/InstructorSection'

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen pt-16">
        {/* Extended Instructor Profile */}
        <InstructorSection />

        {/* Additional sections can be added here */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
                강의 철학
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                  코딩 교육은 단순히 문법을 가르치는 것이 아닙니다.
                  실제 문제를 해결하는 능력, 스스로 학습하는 방법, 그리고 지속적으로 성장할 수 있는 마인드셋을 키우는 것이 핵심입니다.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                  저는 이론보다 실전을, 암기보다 이해를 중요시합니다.
                  여러분이 단순히 코드를 따라치는 게 아니라,
                  <strong className="text-primary"> 왜 이렇게 작동하는지 이해하고 설명할 수 있도록</strong> 가르칩니다.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  14,556명 이상의 수강생과 함께하며 검증된 커리큘럼으로,
                  여러분의 성장을 책임지고 함께 걸어가겠습니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
