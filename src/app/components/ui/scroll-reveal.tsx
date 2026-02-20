'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
  delay?: number
}

/**
 * ScrollReveal - Intersection Observer wrapper for scroll animations
 *
 * Features:
 * - Triggers fade-in animation when element enters viewport
 * - Configurable threshold and root margin
 * - Optional delay for sequential reveals
 * - Only animates once (no re-trigger on scroll back)
 * - Respects prefers-reduced-motion
 */
export function ScrollReveal({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  delay = 0
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          // Apply delay if specified
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay)
          } else {
            setIsVisible(true)
          }
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin, isVisible, delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{
        transitionTimingFunction: 'var(--ease-out)'
      }}
    >
      {children}
    </div>
  )
}
