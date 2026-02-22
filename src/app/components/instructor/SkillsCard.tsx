import { Briefcase } from 'lucide-react'
import type { TechStack } from '@/types'

interface SkillsCardProps {
  skills: TechStack[]
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="w-5 h-5 text-primary" />
        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">전문 기술</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`inline-flex items-center gap-1 px-3 py-2 rounded-full text-white text-sm font-medium ${skill.color} transition-colors`}
          >
            <span>{skill.icon}</span>
            <span>{skill.name}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
