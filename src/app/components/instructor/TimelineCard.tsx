import { Award } from 'lucide-react'
import type { Timeline } from '@/types'

interface TimelineCardProps {
  timeline: Timeline[]
}

export default function TimelineCard({ timeline }: TimelineCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-primary" />
        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">주요 이력</h4>
      </div>
      <div className="space-y-4">
        {timeline.map((item, index) => (
          <div key={index} className="flex gap-4">
            <span className="text-primary font-bold text-base">{item.year}</span>
            <span className="text-base text-gray-600 dark:text-gray-400">{item.milestone}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
