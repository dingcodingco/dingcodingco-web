import { TrustBadge as TrustBadgeType } from '@/types'
import * as Icons from 'lucide-react'

interface TrustBadgeProps {
  badge: TrustBadgeType
}

export function TrustBadge({ badge }: TrustBadgeProps) {
  const IconComponent = Icons[badge.icon as keyof typeof Icons] as React.ComponentType<any>

  return (
    <div className={`flex items-center gap-2 px-4 py-2 bg-white rounded-full border-2 border-gray-200 shadow-sm hover:shadow-md transition-all ${
      badge.gradient ? `hover:border-transparent hover:bg-gradient-to-r ${badge.gradient}` : ''
    }`}>
      {IconComponent && <IconComponent className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2.5} />}
      <div className="text-left">
        <div className="text-sm font-bold text-gray-900 whitespace-nowrap">
          {badge.label}
        </div>
        <div className="text-xs text-gray-500 whitespace-nowrap">
          {badge.subtitle}
        </div>
      </div>
    </div>
  )
}
