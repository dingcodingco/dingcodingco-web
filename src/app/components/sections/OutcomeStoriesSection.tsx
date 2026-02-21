'use client'

import { useState, useEffect, useRef } from 'react'
import { OutcomeStory } from '@/types'
import { outcomeStories } from '@/data/outcome-stories'
import { Badge } from '@/app/components/ui/badge'
import { Card, CardContent } from '@/app/components/ui/card'
import { Award, ExternalLink, CheckCircle, Star, Play, Pause } from 'lucide-react'
import { cn } from '@/lib/utils'

type Category = 'all' | 'non-developer' | 'developer' | 'career-change'

// Fisher-Yates shuffle algorithm for true randomization
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Generate page numbers with ellipsis for scalable pagination
// Shows: [1] ... [5] [6] [7] ... [34]
function generatePageNumbers(current: number, total: number): (number | string)[] {
  if (total <= 7) {
    // Show all pages if 7 or fewer
    return Array.from({ length: total }, (_, i) => i)
  }

  const pages: (number | string)[] = []

  // Always show first page
  pages.push(0)

  // Add ellipsis if current is far from start
  if (current > 2) {
    pages.push('...')
  }

  // Show current and neighbors
  const start = Math.max(1, current - 1)
  const end = Math.min(total - 2, current + 1)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  // Add ellipsis if current is far from end
  if (current < total - 3) {
    pages.push('...')
  }

  // Always show last page
  pages.push(total - 1)

  return pages
}

export default function OutcomeStoriesSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [currentPage, setCurrentPage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [shuffledStories, setShuffledStories] = useState<OutcomeStory[]>(outcomeStories)
  const [isShuffled, setIsShuffled] = useState(false)
  const autoRotateInterval = useRef<NodeJS.Timeout | null>(null)

  const filteredStories = activeCategory === 'all'
    ? shuffledStories
    : shuffledStories.filter(s => s.category === activeCategory)

  // Pagination logic
  const ITEMS_PER_PAGE = 3
  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE)
  const startIndex = currentPage * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentStories = filteredStories.slice(startIndex, endIndex)

  // Shuffle stories on mount (once per page load) - client-side only
  useEffect(() => {
    if (!isShuffled) {
      setShuffledStories(shuffleArray(outcomeStories))
      setIsShuffled(true)
    }
  }, [])

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(0)
    setIsPaused(false)
  }, [activeCategory])

  // Auto-rotation (5-second interval)
  useEffect(() => {
    if (isPaused || totalPages <= 1) return

    autoRotateInterval.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 5000)

    return () => {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current)
      }
    }
  }, [currentPage, isPaused, totalPages])

  // Navigation handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setIsPaused(false)
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!document.getElementById('outcome-stories')?.contains(document.activeElement)) {
        return
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
          setIsPaused(false)
          break
        case 'ArrowRight':
          e.preventDefault()
          setCurrentPage((prev) => (prev + 1) % totalPages)
          setIsPaused(false)
          break
        case ' ':
          e.preventDefault()
          togglePause()
          break
        case 'Home':
          e.preventDefault()
          setCurrentPage(0)
          break
        case 'End':
          e.preventDefault()
          setCurrentPage(totalPages - 1)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [totalPages, currentPage])

  // Reduced motion detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (mediaQuery.matches) {
      setIsPaused(true)
    }

    const handleChange = () => {
      setIsPaused(mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const categoryLabels: Record<Category, string> = {
    all: '전체',
    'non-developer': '비개발자',
    'developer': '개발자',
    'career-change': '취업 성공'
  }

  return (
    <section id="outcome-stories" className="py-20 bg-white dark:bg-gray-900" aria-label={`실제 수강생 성과 스토리 ${filteredStories.length}개 (무작위 순서)`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">실제 수강생 성과</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            이런 변화를 만들어냈어요
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            인프런 실제 수강평 기반 검증된 후기입니다
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-12">
          {(Object.keys(categoryLabels) as Category[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        {/* Stories Grid with Fade Animation */}
        <div
          key={currentPage}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-stories-fade"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label={`수강평 ${currentPage + 1}/${totalPages} 페이지`}
        >
          {currentStories.map((story) => (
            <Card
              key={story.id}
              className="group relative overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-gray-900"
            >
              <CardContent className="p-8">
                {/* Verification Badge + External Link (Top Right) */}
                {story.isVerified && story.reviewUrl && (
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    {/* Verification Badge */}
                    <Badge variant="secondary" className="text-xs gap-1">
                      <CheckCircle className="w-3 h-3" />
                      실제 수강평
                    </Badge>

                    {/* External Link Icon */}
                    <a
                      href={story.reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="인프런에서 원본 후기 보기"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {/* Hero Metric - Top Priority */}
                {story.metrics && (
                  <div className="mb-4">
                    <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1 font-medium">
                      {story.metrics.label}
                    </div>
                    <div className="text-2xl font-bold text-primary dark:text-primary">
                      {story.metrics.value}
                    </div>
                  </div>
                )}

                {/* Context - Before/After + Duration */}
                <div className="mb-6 text-base text-gray-700 dark:text-gray-300 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{story.duration} 만에</span>
                    <span className="text-gray-400 dark:text-gray-500">•</span>
                    <span>{story.beforeState}</span>
                  </div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    → {story.afterState}
                  </div>
                </div>

                {/* Quote - Readable & Minimal */}
                <blockquote className="text-lg italic text-gray-800 dark:text-gray-200 leading-loose border-l-3 border-gray-300 dark:border-gray-600 pl-6">
                  "{story.quote}"
                  {/* Review Metadata (Author + Rating) */}
                  {story.reviewAuthor && (
                    <footer className="text-sm text-gray-600 dark:text-gray-400 mt-3 not-italic flex items-center gap-2">
                      <span>— {story.reviewAuthor}</span>
                      {story.reviewRating && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {story.reviewRating.toFixed(1)}
                        </span>
                      )}
                    </footer>
                  )}
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Numbered Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12 mb-8">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="이전 페이지"
            >
              ←
            </button>

            {/* Page Numbers */}
            <nav aria-label="수강평 페이지 네비게이션" className="flex gap-2">
              {generatePageNumbers(currentPage, totalPages).map((page, idx) => (
                page === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page as number)}
                    className={cn(
                      "px-4 py-2 rounded-lg border min-w-[44px] transition-all",
                      currentPage === page
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-primary/50"
                    )}
                    aria-label={`${(page as number) + 1}페이지로 이동`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {(page as number) + 1}
                  </button>
                )
              ))}
            </nav>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="다음 페이지"
            >
              →
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePause}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors ml-2"
              aria-label={isPaused ? "자동 재생 시작" : "자동 재생 일시정지"}
            >
              {isPaused ? (
                <Play className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" />
              ) : (
                <Pause className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {/* Screen Reader Status */}
            <div role="status" aria-live="polite" className="sr-only">
              {currentPage + 1}/{totalPages} 페이지
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            당신도 다음 성공 스토리의 주인공이 될 수 있습니다
          </p>
          <button
            onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            나에게 맞는 트랙 찾기
          </button>
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            * 실제 인프런 수강평 21개 + 대표적 학습 패턴 기반 참고 사례 포함
          </p>
        </div>
      </div>
    </section>
  )
}
