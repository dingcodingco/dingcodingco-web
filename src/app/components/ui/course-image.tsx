import Image from 'next/image'
import { BookOpen } from 'lucide-react'

interface CourseImageProps {
  src?: string
  alt: string
  className?: string
  priority?: boolean
  fill?: boolean
  width?: number
  height?: number
}

/**
 * CourseImage - Next.js Image wrapper with fallback
 *
 * Features:
 * - Optimized image loading with Next.js Image component
 * - Automatic fallback to BookOpen icon when src is undefined
 * - Supports both fill and fixed dimensions
 * - Priority loading for above-the-fold content
 */
export function CourseImage({
  src,
  alt,
  className = '',
  priority = false,
  fill = true,
  width,
  height
}: CourseImageProps) {
  // Fallback UI when no thumbnail available
  if (!src) {
    return (
      <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className}`}>
        <BookOpen className="w-12 h-12 text-gray-400" aria-hidden="true" />
        <span className="sr-only">{alt}</span>
      </div>
    )
  }

  // Check if image is GIF (animated images should not be optimized)
  const isGif = src.toLowerCase().endsWith('.gif')

  // Render Next.js Image with optimization
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        unoptimized={isGif}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width!}
      height={height!}
      className={`object-cover ${className}`}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      unoptimized={isGif}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
