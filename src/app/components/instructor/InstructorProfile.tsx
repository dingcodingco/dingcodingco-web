import Image from 'next/image'
import { CheckCircle, ExternalLink, Youtube, Users } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import type { InstructorProfile } from '@/types'

interface InstructorProfileProps {
  profile: InstructorProfile
}

export default function InstructorProfile({ profile }: InstructorProfileProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-8 sm:p-12">
      <div className="max-w-3xl mx-auto text-center">
        {/* Profile Image - Centered, larger size */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-6">
          {/* Glassmorphism glow background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-2xl animate-instructor-glow" />

          {/* Image container */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary shadow-2xl">
            <Image
              src={profile.profileImage}
              alt={`${profile.name} 강사 프로필`}
              width={256}
              height={256}
              priority
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Verification Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
          <CheckCircle className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">{profile.verificationBadge}</span>
        </div>

        {/* Name and Title */}
        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          {profile.name}
        </h3>
        <p className="text-lg sm:text-xl text-primary font-semibold mb-6">
          {profile.title}
        </p>

        {/* Experience & Background */}
        <div className="space-y-3 mb-6 text-gray-700 dark:text-gray-300">
          <p className="text-base font-medium">{profile.experience}</p>
          <p className="text-base">{profile.background}</p>
          <p className="text-base">{profile.opensource}</p>
          <a
            href={profile.communityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-base text-primary hover:text-primary/80 font-medium transition-colors"
          >
            {profile.community}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            onClick={() => window.open(profile.inflearnUrl, '_blank', 'noopener,noreferrer')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            인프런 프로필 보기
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
            onClick={() => window.open(profile.youtubeUrl, '_blank', 'noopener,noreferrer')}
          >
            <Youtube className="w-4 h-4 mr-2" />
            YouTube ({profile.youtubeSubscribers} 구독자)
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            onClick={() => window.open(profile.communityUrl, '_blank', 'noopener,noreferrer')}
          >
            <Users className="w-4 h-4 mr-2" />
            개발자 취업 커뮤니티
          </Button>
        </div>
      </div>
    </div>
  )
}
