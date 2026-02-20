'use client'

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { useToast } from '@/app/hooks/use-toast'

interface WaitlistFormProps {
  courseId: string
}

export function WaitlistForm({ courseId }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: '이메일을 입력해주세요',
        variant: 'destructive',
      })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: '올바른 이메일 형식이 아닙니다',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          email,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: '알림 신청이 완료되었습니다! 🎉',
          description: '강의가 출시되면 이메일로 알려드리겠습니다.',
        })
        setEmail('')
      } else if (response.status === 409) {
        toast({
          title: '이미 신청하신 이메일입니다',
          description: '출시 시 알림을 받으실 수 있습니다.',
        })
      } else {
        toast({
          title: '오류가 발생했습니다',
          description: data.error || '다시 시도해주세요.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: '네트워크 오류',
        description: '인터넷 연결을 확인해주세요.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        placeholder="이메일 주소"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? '신청 중...' : '알림 받기'}
      </Button>
    </form>
  )
}
