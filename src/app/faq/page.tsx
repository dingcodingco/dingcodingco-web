'use client'

import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import FAQSection from '@/app/components/sections/FAQSection'
import { faqs } from '@/data/faqs'

export default function FAQPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              자주 묻는 질문
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {faqs.length}개 항목으로 여러분의 궁금증을 해결해드립니다
            </p>
          </div>

          {/* Full Page FAQ */}
          <FAQSection fullPage={true} />
        </div>
      </main>

      <Footer />
    </>
  )
}
