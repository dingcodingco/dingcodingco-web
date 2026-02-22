import { CheckCircle, Star, Award, Youtube, Shield } from 'lucide-react'
import type { TrustIndicator } from '@/types'

interface TrustIndicatorsGridProps {
  indicators: TrustIndicator[]
}

const iconMap = {
  CheckCircle,
  Star,
  Award,
  Youtube,
  Shield,
  TrendingUp: Star // Fallback
}

const iconColorMap = {
  CheckCircle: 'text-green-500',
  Star: 'text-yellow-500',
  Award: 'text-yellow-500',
  Youtube: 'text-red-600',
  Shield: 'text-purple-500',
  TrendingUp: 'text-blue-500'
}

export default function TrustIndicatorsGrid({ indicators }: TrustIndicatorsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {indicators.map((indicator, index) => {
        const Icon = iconMap[indicator.icon]
        const colorClass = iconColorMap[indicator.icon]

        return (
          <div
            key={index}
            className="flex items-center gap-3 p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <Icon className={`w-6 h-6 ${colorClass} flex-shrink-0`} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {indicator.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
