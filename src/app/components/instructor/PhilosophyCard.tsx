import { Heart } from 'lucide-react'
import type { PhilosophyMessage } from '@/types'

interface PhilosophyCardProps {
  philosophy: PhilosophyMessage
}

export default function PhilosophyCard({ philosophy }: PhilosophyCardProps) {
  return (
    <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 rounded-2xl p-8 sm:p-12 border-l-4 border-primary shadow-md">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start gap-4">
          <Heart className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
          <div>
            {philosophy.title && (
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {philosophy.title}
              </h4>
            )}
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
              {philosophy.message.split('왜 이렇게 작동하는지 이해하고 설명할 수 있도록').map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <span className="font-bold text-primary"> 왜 이렇게 작동하는지 이해하고 설명할 수 있도록</span>
                  </span>
                ) : part
              )}
            </p>
            {philosophy.author && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                — {philosophy.author}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
