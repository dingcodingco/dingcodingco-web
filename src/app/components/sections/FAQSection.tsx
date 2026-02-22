'use client'

import { useState } from 'react'
import { FAQ } from '@/types'
import { faqs } from '@/data/faqs'
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

type Category = 'all' | 'enrollment' | 'refund' | 'difficulty' | 'outcomes'

interface FAQSectionProps {
  preview?: boolean         // Preview mode (homepage)
  fullPage?: boolean       // Full page mode (/faq)
  trackFilter?: string     // Filter by track (/roadmaps/[trackId])
  maxItems?: number        // Max items to display
  showViewAllButton?: boolean  // Show "View All" button
}

export default function FAQSection({
  preview = false,
  fullPage = false,
  trackFilter,
  maxItems,
  showViewAllButton = false,
}: FAQSectionProps = {}) {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [openFaqId, setOpenFaqId] = useState<string | null>(null)

  // Filter by track if trackFilter is provided
  let baseFaqs = faqs
  if (trackFilter) {
    baseFaqs = faqs.filter(f => f.relatedTrackId === trackFilter)
  }

  const filteredFaqs = activeCategory === 'all'
    ? baseFaqs
    : baseFaqs.filter(f => f.category === activeCategory)

  // Limit items if in preview mode
  const displayFaqs = preview && maxItems
    ? filteredFaqs.slice(0, maxItems)
    : filteredFaqs

  const categoryLabels: Record<Category, string> = {
    all: '전체',
    enrollment: '수강 관련',
    refund: '환불 정책',
    difficulty: '학습 난이도',
    outcomes: '취업/수익화'
  }

  useScrollAnimation()

  return (
    <section id="faq" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="fade-in-up text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 rounded-full mb-4">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">자주 묻는 질문</span>
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-500">
              {fullPage ? 'FAQ 전체 보기' : '궁금하신 점이 있으신가요?'}
            </h2>
            {showViewAllButton && !preview && (
              <a
                href="/faq"
                className="text-primary hover:text-primary/80 font-semibold text-lg flex items-center gap-2"
              >
                전체 보기 ({faqs.length}) <ArrowRight className="w-5 h-5" />
              </a>
            )}
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {trackFilter
              ? '해당 트랙 관련 자주 묻는 질문들입니다'
              : '수강생들이 가장 많이 물어보는 질문들을 모았습니다'
            }
          </p>
        </div>

        {/* Category Filter - Hide in preview mode */}
        {!preview && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {(Object.keys(categoryLabels) as Category[]).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category)
                  setOpenFaqId(null)
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        )}

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {displayFaqs.map((faq, index) => (
            <div
              key={faq.id}
              className="fade-in-up stagger-item border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-primary/50 transition-colors bg-white dark:bg-gray-900"
              style={{ '--stagger-index': index } as React.CSSProperties}
            >
              <button
                onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-base font-semibold text-gray-900 dark:text-gray-100 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 dark:text-gray-300 flex-shrink-0 transition-transform ${
                    openFaqId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openFaqId === faq.id && (
                <div className="px-6 pb-4 pt-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-3">
                    {faq.answer}
                  </p>

                  {/* Proof Links */}
                  {faq.proofLinks && faq.proofLinks.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200 dark:border-gray-600">
                      {faq.proofLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.href}
                          className="text-sm text-primary hover:underline font-medium"
                        >
                          {link.label} →
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl max-w-2xl mx-auto border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-200 mb-4 font-medium">
            더 궁금한 점이 있으신가요?
          </p>
          <a
            href="https://open.kakao.com/o/sXR4MZ8h"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-white dark:bg-gray-700 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors"
          >
            오픈카톡방에서 문의하기
          </a>
        </div>
      </div>
    </section>
  )
}
