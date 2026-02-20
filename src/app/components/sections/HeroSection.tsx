'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/app/components/ui/button'
import { TrustBadge } from '@/app/components/ui/TrustBadge'
import { Users, Star, TrendingUp, Play, X } from 'lucide-react'
import { commonTrustBadges } from '@/data/trust-badges'

interface HeroSectionProps {
  onQuizStart: () => void
}

const HEADLINES = [
  { line1: "코딩 몰라도", line2: "4주 만에 수익화 💰" },
  { line1: "38개 기업 합격한", line2: "검증된 커리큘럼 🎓" },
  { line1: "AI로 개발 속도", line2: "10배 향상 ⚡" },
  { line1: "14,556명이 선택한", line2: "AI 코딩 교육 🚀" },
]

export default function HeroSection({ onQuizStart }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % HEADLINES.length)
        setIsTransitioning(false)
      }, 300) // 페이드 아웃 후 전환
    }, 5000) // 5초마다 전환

    return () => clearInterval(interval)
  }, [])

  const currentHeadline = HEADLINES[currentIndex]

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center bg-gradient-hero pt-32 pb-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center space-y-8">

          {/* 회전 헤드라인 (초대형) */}
          <h1
            className={`hero-headline text-gray-900 dark:text-white transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <span className="block">{currentHeadline.line1}</span>
            <span className="block text-primary-600 dark:text-primary-500">{currentHeadline.line2}</span>
          </h1>

          {/* 서브헤드 */}
          <p className="hero-subhead text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            비개발자부터 현업 개발자까지<br />
            당신의 목표에 맞는 AI 코딩 교육
          </p>

          {/* 사회적 증거 (인라인 3개 stat) */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="font-semibold">14,556명 수강</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">4.9/5.0 평점</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="font-semibold">이번 주 +89명</span>
            </div>
          </div>

          {/* 신뢰 배지 */}
          <div className="flex flex-wrap justify-center gap-3">
            {commonTrustBadges.map((badge, index) => (
              <TrustBadge key={index} badge={badge} />
            ))}
          </div>

          {/* CTA (단일, 대형) */}
          <div className="space-y-4">
            <Button
              size="lg"
              onClick={onQuizStart}
              className="text-xl px-12 py-6 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              1분 퀴즈로 내 트랙 찾기 →
            </Button>

            {/* 강의 미리보기 버튼 */}
            <div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsVideoOpen(true)}
                className="text-base px-8 py-4 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-500 dark:text-primary-500 dark:hover:bg-primary-950 font-semibold transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                강의 미리보기 (2분)
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* 비디오 모달 */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              aria-label="닫기"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* YouTube Embed */}
            <iframe
              src="https://www.youtube.com/embed/-F_cuM4ixI0?autoplay=1"
              title="AI를 내 동료처럼 키우는 방법이 있다?"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  )
}
