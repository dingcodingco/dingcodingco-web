import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Skeleton loading component with shimmer animation
 *
 * @example
 * ```tsx
 * <Skeleton className="h-12 w-full" />
 * <Skeleton className="h-4 w-3/4 mt-2" />
 * ```
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800',
        'before:absolute before:inset-0',
        'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
        'before:animate-shimmer',
        className
      )}
      {...props}
    />
  )
}

/**
 * Skeleton variants for common use cases
 */
export const SkeletonVariants = {
  TrackCard: () => (
    <div className="space-y-4 p-6 border border-gray-200 dark:border-gray-800 rounded-2xl">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-10 w-full mt-4" />
    </div>
  ),

  CourseCard: () => (
    <div className="space-y-3">
      <Skeleton className="aspect-video w-full rounded-lg" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2 mt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  ),

  StatCard: () => (
    <div className="space-y-2 text-center">
      <Skeleton className="h-8 w-24 mx-auto" />
      <Skeleton className="h-4 w-32 mx-auto" />
    </div>
  ),
}
