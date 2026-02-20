'use client'

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog'
import { Card, CardContent } from '@/app/components/ui/card'
import { tracks } from '@/data/tracks'
import { courses } from '@/data/courses'
import { CheckCircle, TrendingUp, Rocket } from 'lucide-react'

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (trackId: string) => void
}

export default function QuizModal({ isOpen, onClose, onComplete }: QuizModalProps) {
  const [step, setStep] = useState<number | 'result'>(1)
  const [answers, setAnswers] = useState<{
    codingExperience?: string
    goal?: string
    language?: string
  }>({})
  const [recommendedTrackId, setRecommendedTrackId] = useState<string | null>(null)

  // Reset quiz when modal closes
  const handleClose = () => {
    setStep(1)
    setAnswers({})
    setRecommendedTrackId(null)
    onClose()
  }

  const recommendedTrack = recommendedTrackId ? tracks.find(t => t.id === recommendedTrackId) : null

  const handleAnswer = (question: string, answer: string) => {
    const newAnswers = { ...answers, [question]: answer }
    setAnswers(newAnswers)

    let trackId: string | null = null

    // Quiz logic from PRD
    if (step === 1) {
      if (answer === 'none') {
        // 전혀 없음 → AI 비개발자
        trackId = 'ai-beginner'
      } else {
        setStep(2)
        return
      }
    } else if (step === 2) {
      if (answer === 'side-project') {
        trackId = 'ai-beginner'
      } else if (answer === 'job') {
        trackId = 'spring-backend'
      } else if (answer === 'productivity') {
        // 현업 개발자 + 생산성 → Q3
        if (newAnswers.codingExperience === 'developer') {
          setStep(3)
          return
        } else {
          trackId = 'ai-developer'
        }
      }
    } else if (step === 3) {
      if (answer === 'java-spring') {
        trackId = 'spring-backend'
      } else {
        trackId = 'ai-developer'
      }
    }

    // Show result screen
    if (trackId) {
      setRecommendedTrackId(trackId)
      setStep('result')
    }
  }

  const getQuestionTitle = () => {
    if (step === 1) return 'Q1. 프로그래밍 경험이 있으신가요?'
    if (step === 2) return 'Q2. 주요 목표가 무엇인가요?'
    if (step === 3) return 'Q3. 주력 언어/프레임워크가 있나요?'
    if (step === 'result') return '추천 결과'
    return ''
  }

  const getPersonalizedMessage = () => {
    if (answers.codingExperience === 'none') return '코딩 경험 없어도 괜찮아요!'
    if (answers.codingExperience === 'some') return '기존 지식을 바탕으로 빠르게 성장할 수 있어요!'
    if (answers.codingExperience === 'developer') return '전문성을 한 단계 올려보세요!'
    return '당신에게 딱 맞는 트랙입니다!'
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gray-900 dark:text-gray-100">트랙 추천 퀴즈</DialogTitle>
          <DialogDescription>
            3가지 질문으로 맞춤 트랙을 추천해드립니다
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Progress Bar */}
          {step !== 'result' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{getQuestionTitle()}</span>
                <span className="text-muted-foreground">{step}/3</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-primary h-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                  role="progressbar"
                  aria-valuenow={step}
                  aria-valuemin={1}
                  aria-valuemax={3}
                  aria-label={`퀴즈 진행상황: ${step} / 3단계`}
                />
              </div>
            </div>
          )}

          {/* Questions */}
          <Card>
            <CardContent className="pt-6 space-y-3">
              {step === 1 && (
                <>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleAnswer('codingExperience', 'none')}
                  >
                    <div className="text-left">
                      <div className="font-semibold">전혀 없음</div>
                      <div className="text-sm opacity-80">코딩을 한 번도 해본 적이 없어요</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleAnswer('codingExperience', 'some')}
                  >
                    <div className="text-left">
                      <div className="font-semibold">조금 있음</div>
                      <div className="text-sm opacity-80">학원, 부트캠프 등에서 배워봤어요</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleAnswer('codingExperience', 'developer')}
                  >
                    <div className="text-left">
                      <div className="font-semibold">현업 개발자</div>
                      <div className="text-sm opacity-80">실무에서 개발하고 있어요</div>
                    </div>
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleAnswer('goal', 'side-project')}
                  >
                    <div className="text-left">
                      <div className="font-semibold">사이드 프로젝트/창업</div>
                      <div className="text-sm opacity-80">나만의 서비스를 만들고 싶어요</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleAnswer('goal', 'job')}
                  >
                    <div className="text-left">
                      <div className="font-semibold">취업/이직</div>
                      <div className="text-sm opacity-80">개발자로 커리어를 시작하고 싶어요</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleAnswer('goal', 'productivity')}
                  >
                    <div className="text-left">
                      <div className="font-semibold">업무 생산성 향상</div>
                      <div className="text-sm opacity-80">일을 더 효율적으로 하고 싶어요</div>
                    </div>
                  </Button>
                </>
              )}

              {step === 3 && (
                <>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleAnswer('language', 'java-spring')}
                  >
                    <div className="text-left">
                      <div className="font-semibold">Java/Spring</div>
                      <div className="text-sm opacity-80">백엔드 개발에 집중하고 싶어요</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleAnswer('language', 'other')}
                  >
                    <div className="text-left">
                      <div className="font-semibold">기타 언어</div>
                      <div className="text-sm opacity-80">다른 언어/프레임워크를 사용해요</div>
                    </div>
                  </Button>
                </>
              )}

              {/* Result Screen */}
              {step === 'result' && recommendedTrack && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      추천 트랙을 찾았어요!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {getPersonalizedMessage()}
                    </p>
                  </div>

                  {/* Recommended Track Card */}
                  <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border-2 border-primary">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl">
                        {recommendedTrack.iconName === 'ai-beginner' && '🎨'}
                        {recommendedTrack.iconName === 'ai-developer' && '⚡'}
                        {recommendedTrack.iconName === 'spring-backend' && '🌱'}
                      </div>
                      <div>
                        <div className="text-sm text-primary dark:text-blue-400 font-semibold mb-1">추천 트랙</div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">{recommendedTrack.name}</h4>
                      </div>
                    </div>

                    {/* Personalized Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">예상 학습 기간</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{recommendedTrack.estimatedDuration}</div>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">총 투자 비용</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {(() => {
                            const trackCourses = courses.filter(c => c.trackId === recommendedTrack.id)
                            const totalPrice = trackCourses.reduce((sum, c) => sum + c.price, 0)
                            const discountedPrice = Math.round(totalPrice * 0.85)
                            return `₩${discountedPrice.toLocaleString()}`
                          })()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          정가 대비 ₩{(() => {
                            const trackCourses = courses.filter(c => c.trackId === recommendedTrack.id)
                            const totalPrice = trackCourses.reduce((sum, c) => sum + c.price, 0)
                            const discount = Math.round(totalPrice * 0.15)
                            return discount.toLocaleString()
                          })()} 할인
                        </div>
                      </div>
                    </div>

                    {/* Success Rate */}
                    {recommendedTrack.id === 'spring-backend' && (
                      <div className="p-4 bg-success-50 dark:bg-gray-800 rounded-lg border border-success-500/30 dark:border-success-500/50">
                        <div className="flex items-start gap-2">
                          <TrendingUp className="w-5 h-5 text-success-600 dark:text-success-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                              유사 프로필 수강생 성공률
                            </div>
                            <div className="text-xs text-success-600 dark:text-gray-200">
                              백엔드 취업 성공자 다수 (44명 추적 기록)
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {recommendedTrack.id === 'ai-beginner' && (
                      <div className="p-4 bg-badge-premium-50 dark:bg-gray-800 rounded-lg border border-badge-premium-500/30 dark:border-badge-premium-500/50">
                        <div className="flex items-start gap-2">
                          <Rocket className="w-5 h-5 text-badge-premium-600 dark:text-badge-premium-300 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                              평균 달성 결과
                            </div>
                            <div className="text-xs text-badge-premium-text dark:text-gray-200">
                              4주 만에 웹앱 서비스 런칭 (수익화 성공 사례 다수)
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        handleClose()
                        setTimeout(() => {
                          document.getElementById(`track-${recommendedTrack.id}`)?.scrollIntoView({ behavior: 'smooth' })
                        }, 100)
                      }}
                    >
                      상세 로드맵 보기
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-primary"
                      onClick={() => {
                        onComplete(recommendedTrack.id)
                        handleClose()
                      }}
                    >
                      지금 시작하기
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
