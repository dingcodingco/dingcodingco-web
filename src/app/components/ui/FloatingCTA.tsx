'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/app/components/ui/button'
import { Sparkles, X } from 'lucide-react'

interface FloatingCTAProps {
  onQuizStart: () => void
}

export default function FloatingCTA({ onQuizStart }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled 50% of the page
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

      if (scrollPercentage > 50 && !isDismissed) {
        setIsVisible(true)
      } else if (scrollPercentage <= 50) {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (!isVisible || isDismissed) return null

  return (
    <>
      {/* Desktop: Bottom-right floating */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40 animate-slide-up">
        <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl shadow-2xl p-6 max-w-sm border-2 border-white/20">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white drop-shadow-md" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-1 drop-shadow-md">
                나에게 맞는 트랙이 궁금하신가요?
              </h3>
              <p className="text-white text-sm drop-shadow-md">
                1분 퀴즈로 최적의 학습 경로를 찾아보세요
              </p>
            </div>
          </div>

          <Button
            onClick={onQuizStart}
            size="lg"
            className="w-full bg-white text-primary hover:bg-white/90 font-bold shadow-lg"
          >
            1분 퀴즈 시작하기 →
          </Button>
        </div>
      </div>

      {/* Mobile: Bottom fixed */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 animate-slide-up">
        <div className="bg-gradient-to-r from-primary to-primary-light p-4 shadow-2xl border-t-2 border-white/20">
          <div className="container mx-auto px-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Sparkles className="w-6 h-6 text-white flex-shrink-0 drop-shadow-md" />
              <div className="min-w-0">
                <h3 className="text-white font-bold text-sm truncate drop-shadow-md">
                  나에게 맞는 트랙 찾기
                </h3>
                <p className="text-white text-xs truncate drop-shadow-md">
                  1분 퀴즈로 추천
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                onClick={onQuizStart}
                size="sm"
                className="bg-white text-primary hover:bg-white/90 font-bold"
              >
                시작
              </Button>
              <button
                onClick={handleDismiss}
                className="text-white/70 hover:text-white transition-colors p-1"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
