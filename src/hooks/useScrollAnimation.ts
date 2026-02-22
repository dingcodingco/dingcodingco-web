'use client'

import { useEffect } from 'react'

/**
 * Scroll-triggered animation hook using Intersection Observer
 *
 * Automatically adds 'is-visible' class to elements with 'fade-in-up' class
 * when they enter the viewport.
 *
 * @example
 * ```tsx
 * 'use client'
 *
 * export default function MyComponent() {
 *   useScrollAnimation()
 *
 *   return (
 *     <div className="fade-in-up">
 *       This will animate when scrolled into view
 *     </div>
 *   )
 * }
 * ```
 */
export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            // Optional: Stop observing after animation triggered (one-time animation)
            // observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px', // Start animation slightly before element enters viewport
      }
    )

    // Function to observe all fade-in-up elements
    const observeElements = () => {
      const elements = document.querySelectorAll('.fade-in-up')
      elements.forEach((el) => {
        if (!el.classList.contains('is-visible')) {
          observer.observe(el)
        }
      })
    }

    // Initial observation
    observeElements()

    // Watch for new elements being added to DOM
    const mutationObserver = new MutationObserver(() => {
      observeElements()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Cleanup
    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])
}
