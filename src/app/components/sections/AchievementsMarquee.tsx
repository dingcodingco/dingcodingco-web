'use client'

import { Achievement } from '@/types'
import { achievements } from '@/data/achievements'
import * as Icons from 'lucide-react'
import { useEffect, useState } from 'react'

export default function AchievementsMarquee() {
  const [duplicatedAchievements, setDuplicatedAchievements] = useState<Achievement[]>([])
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    // Duplicate array multiple times for seamless infinite scroll
    // 4x duplication ensures smooth looping with no visible gaps
    setDuplicatedAchievements([
      ...achievements,
      ...achievements,
      ...achievements,
      ...achievements
    ])
  }, [])

  return (
    <section className="py-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden border-y border-gray-200 dark:border-gray-800">
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10" />

        {/* Infinite scroll container */}
        <div
          className={`flex gap-8 ${isPaused ? '' : 'animate-marquee'}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicatedAchievements.map((achievement, index) => {
            const IconComponent = Icons[achievement.icon as keyof typeof Icons] as React.ComponentType<any>

            return (
              <div
                key={`${achievement.metric}-${index}`}
                className="flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 whitespace-nowrap"
              >
                <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary-500))] flex items-center justify-center flex-shrink-0">
                  {IconComponent && <IconComponent className="w-5 h-5 text-white" strokeWidth={2.5} />}
                </div>
                <div>
                  <div className={`text-2xl font-extrabold bg-gradient-to-r ${achievement.gradient} bg-clip-text text-transparent`}>
                    {achievement.metric}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {achievement.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
