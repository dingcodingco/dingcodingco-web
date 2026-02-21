'use client'

import Image from 'next/image'
import { Award, Briefcase, Heart, ExternalLink, CheckCircle, Users, Star, TrendingUp, Shield, Youtube } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { ScrollReveal } from '@/app/components/ui/scroll-reveal'

export default function InstructorSection() {
  return (
    <section
      id="instructor"
      className="py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                강사 소개
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                현장에서 검증된 실력과 노하우를 전수합니다
              </p>
            </div>

            {/* Hero Card - Profile Focus */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-8 sm:p-12">
              <div className="max-w-2xl mx-auto text-center">
                {/* Profile Image - Centered, larger size */}
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-6">
                  {/* Glassmorphism glow background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-2xl animate-instructor-glow" />

                  {/* Image container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary shadow-2xl">
                    <Image
                      src="https://avatars.githubusercontent.com/u/159892196?v=4"
                      alt="딩코딩코 강사 프로필"
                      width={256}
                      height={256}
                      priority
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Verification Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">인프런 공식 인증 강사</span>
                </div>

                {/* Name and Title */}
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  딩코딩코
                </h3>
                <p className="text-lg sm:text-xl text-primary font-semibold mb-6">
                  AI 코딩 교육 전문가 • 백엔드 개발자
                </p>

                {/* Social Links */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                    onClick={() => window.open('https://www.inflearn.com/users/408812/@dingcodingco', '_blank', 'noopener,noreferrer')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    인프런 프로필 보기
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                    onClick={() => window.open('https://www.youtube.com/@딩코딩코', '_blank', 'noopener,noreferrer')}
                  >
                    <Youtube className="w-4 h-4 mr-2" />
                    YouTube (2.6만 구독자)
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Row - Move from bottom to directly below Hero */}
            <ScrollReveal delay={100}>
              <div className="grid sm:grid-cols-3 gap-6">
                {/* 38+ 대기업 합격 */}
                <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-primary-500 to-primary-400 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <div className="flex items-center justify-center mb-4">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-bold text-white mb-2">38+</div>
                    <div className="text-base text-white/90 font-medium mb-2">대기업 합격</div>
                    <div className="text-xs text-white/70">네이버, 카카오, 토스, 쿠팡, 배민 등</div>
                  </div>
                </div>

                {/* 14,556+ 누적 수강생 */}
                <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-primary-600 to-primary-400 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <div className="flex items-center justify-center mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-bold text-white mb-2">14,556+</div>
                    <div className="text-base text-white/90 font-medium mb-2">누적 수강생</div>
                    <div className="text-xs text-white/70">매주 +89명 증가 중</div>
                  </div>
                </div>

                {/* 4.9/5.0 평균 만족도 */}
                <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-yellow-500 to-orange-400 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <div className="flex items-center justify-center mb-4">
                    <Star className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-bold text-white mb-2">4.9/5.0</div>
                    <div className="text-base text-white/90 font-medium mb-2">평균 만족도</div>
                    <div className="text-xs text-white/70">1,200+ 리뷰 기반</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Philosophy Card - Highlighted */}
            <ScrollReveal delay={150}>
              <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 rounded-2xl p-8 sm:p-12 border-l-4 border-primary shadow-md">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-start gap-4">
                    <Heart className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        실전 중심 교육 철학
                      </h4>
                      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
                        "코딩은 누구나 배울 수 있습니다. 하지만 진짜 문제는 '어떻게' 배우느냐입니다.
                        저는 여러분이 단순히 코드를 따라치는 게 아니라,
                        <span className="font-bold text-primary"> 왜 이렇게 작동하는지 이해하고 설명할 수 있도록</span> 가르칩니다."
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                        — 이론보다 실전, 암기보다 이해
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Skills & Timeline Row */}
            <ScrollReveal delay={200}>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Tech Stack Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">전문 기술</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-white text-sm font-medium bg-red-500 hover:bg-red-600 transition-colors">
                      <span>☕</span>
                      <span>Java</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-white text-sm font-medium bg-indigo-500 hover:bg-indigo-600 transition-colors">
                      <span>🔷</span>
                      <span>Kotlin</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-white text-sm font-medium bg-green-500 hover:bg-green-600 transition-colors">
                      <span>🍃</span>
                      <span>Spring</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 transition-colors">
                      <span>🐍</span>
                      <span>Python</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-white text-sm font-medium bg-purple-500 hover:bg-purple-600 transition-colors">
                      <span>🤖</span>
                      <span>AI/Claude</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-white text-sm font-medium bg-cyan-500 hover:bg-cyan-600 transition-colors">
                      <span>✨</span>
                      <span>Cursor</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-white text-sm font-medium bg-yellow-500 hover:bg-yellow-600 transition-colors">
                      <span>📊</span>
                      <span>SQL</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-white text-sm font-medium bg-orange-500 hover:bg-orange-600 transition-colors">
                      <span>🔧</span>
                      <span>Git</span>
                    </span>
                  </div>
                </div>

                {/* Education Timeline Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-primary" />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">주요 이력</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <span className="text-primary font-bold text-base">2019</span>
                      <span className="text-base text-gray-600 dark:text-gray-400">프로그래밍 교육 시작</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-primary font-bold text-base">2021</span>
                      <span className="text-base text-gray-600 dark:text-gray-400">인프런 입점, 첫 1,000명 돌파</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-primary font-bold text-base">2023</span>
                      <span className="text-base text-gray-600 dark:text-gray-400">10,000명 수강생 달성</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-primary font-bold text-base">2024</span>
                      <span className="text-base text-gray-600 dark:text-gray-400">38개 기업 합격 노하우 정리</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Trust Indicators - Keep existing pattern, position at bottom */}
            <ScrollReveal delay={250}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="flex items-center gap-3 p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">백엔드 취업 성공자 다수 배출</span>
                </div>
                <div className="flex items-center gap-3 p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <Star className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">평균 4.9/5.0 평점 (인프런 기준)</span>
                </div>
                <div className="flex items-center gap-3 p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <Award className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">인프런 베스트셀러 5회</span>
                </div>
                <div className="flex items-center gap-3 p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <Youtube className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">YouTube 2.6만 구독자</span>
                </div>
                <div className="flex items-center gap-3 p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <Shield className="w-6 h-6 text-purple-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">평생 Q&A 지원</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
