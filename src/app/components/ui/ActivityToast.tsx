'use client'

import { useEffect, useState } from 'react'
import { ActivityTemplate } from '@/types'
import { activityTemplates } from '@/data/activity-templates'
import { X } from 'lucide-react'

export default function ActivityToast() {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [timeAgo, setTimeAgo] = useState('')

  useEffect(() => {
    const showActivity = () => {
      // Weighted random selection
      const random = Math.random()
      let cumulative = 0
      let selectedTemplate: ActivityTemplate | null = null

      for (const template of activityTemplates) {
        cumulative += template.weight
        if (random <= cumulative) {
          selectedTemplate = template
          break
        }
      }

      if (!selectedTemplate) return

      // Generate message
      let msg = selectedTemplate.template

      if (selectedTemplate.names) {
        const randomName = selectedTemplate.names[Math.floor(Math.random() * selectedTemplate.names.length)]
        msg = msg.replace('{name}', randomName)
      }

      if (msg.includes('{track}')) {
        const tracks = ['AI 비개발자', 'AI 개발자', '스프링 백엔드']
        msg = msg.replace('{track}', tracks[Math.floor(Math.random() * tracks.length)])
      }

      if (msg.includes('{course}')) {
        const courses = ['파이썬 핵심', 'Spring Boot Lv1', 'AI 바이브코딩', '10x AI-Native Developer']
        msg = msg.replace('{course}', courses[Math.floor(Math.random() * courses.length)])
      }

      if (msg.includes('{achievement}') && selectedTemplate.achievements) {
        const randomAchievement = selectedTemplate.achievements[Math.floor(Math.random() * selectedTemplate.achievements.length)]
        msg = msg.replace('{achievement}', randomAchievement)
      }

      if (msg.includes('{rating}') && selectedTemplate.ratings) {
        const randomRating = selectedTemplate.ratings[Math.floor(Math.random() * selectedTemplate.ratings.length)]
        msg = msg.replace('{rating}', randomRating)
      }

      setMessage(msg)
      setTimeAgo(selectedTemplate.timeRange.split('-')[0] + '분 전')
      setIsVisible(true)

      // Auto-hide after 5 seconds
      setTimeout(() => setIsVisible(false), 5000)
    }

    // Show first toast after 3 seconds for better early engagement
    const initialTimeout = setTimeout(showActivity, 3000)

    // Then show every 20-40 seconds
    const interval = setInterval(() => {
      if (!isVisible) {
        showActivity()
      }
    }, Math.random() * 20000 + 20000) // 20-40 seconds

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-sm flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs">👤</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900 font-medium mb-1">
            {message}
          </p>
          <p className="text-xs text-gray-500">
            {timeAgo}
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
