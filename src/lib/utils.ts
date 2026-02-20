import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 15% 할인가 자동 계산
 * @param price 원가
 * @returns 할인가 (천원 단위 반올림)
 */
export function calculateDiscountPrice(price: number): number {
  const discountRate = 0.15
  const discountedPrice = price * (1 - discountRate)
  // 천원 단위 반올림 (예: 84150 → 84000)
  return Math.round(discountedPrice / 1000) * 1000
}

/**
 * 할인율 계산
 */
export function calculateDiscountRate(price: number, salePrice: number): number {
  return Math.round(((price - salePrice) / price) * 100)
}

/**
 * 가격 포맷팅
 */
export function formatPrice(price: number): string {
  return `₩${price.toLocaleString()}`
}

/**
 * Calculate savings amount from 15% discount
 * @param originalPrice Original price in KRW
 * @returns Savings amount in KRW
 */
export function calculateSavingsAmount(originalPrice: number): number {
  const discountedPrice = calculateDiscountPrice(originalPrice)
  return originalPrice - discountedPrice
}

/**
 * Format savings display with currency
 * @param savingsAmount Amount saved in KRW
 * @returns Formatted string "₩XX,XXX 절약!"
 */
export function formatSavings(savingsAmount: number): string {
  return `₩${savingsAmount.toLocaleString()} 절약!`
}
