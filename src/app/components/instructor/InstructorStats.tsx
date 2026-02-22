import { Award, Users, Star } from 'lucide-react'
import type { InstructorStat } from '@/types'

interface InstructorStatsProps {
  stats: InstructorStat[]
}

const iconMap = {
  Award,
  Users,
  Star
}

export default function InstructorStats({ stats }: InstructorStatsProps) {
  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon]
        return (
          <div
            key={index}
            className={`group relative p-6 sm:p-8 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105`}
          >
            <div className="flex items-center justify-center mb-4">
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-base text-white/90 font-medium mb-2">{stat.label}</div>
              <div className="text-xs text-white/70">{stat.subtitle}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
