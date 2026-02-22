'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/app/components/ui/sheet'
import ThemeToggle from '@/app/components/ThemeToggle'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  activeSection?: string
  onNavigate?: (sectionId: string) => void
}

const navLinks = [
  { href: '/', label: '홈' },
  { href: '/roadmaps/ai-beginner', label: 'AI 비개발자' },
  { href: '/roadmaps/ai-developer', label: 'AI 개발자' },
  { href: '/roadmaps/spring-backend', label: '스프링 백엔드' },
  { href: '/success-stories', label: '성공 사례' },
  { href: '/about', label: '강사 소개' },
  { href: '/faq', label: 'FAQ' },
]

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary-dark transition-colors"
            aria-label="홈으로 이동"
          >
            <Image
              src="/assets/dingco-logo.png"
              alt="딩코딩코 로고"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="hidden sm:inline">딩코딩코 로드맵</span>
            <span className="sm:hidden">딩코딩코</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center gap-1" aria-label="메인 네비게이션">
              {navLinks.map((link) => {
                const isActive = pathname === link.href ||
                  (link.href !== '/' && pathname?.startsWith(link.href))

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="메뉴 열기"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xl font-bold text-primary">
                    <Image
                      src="/assets/dingco-logo.png"
                      alt="딩코딩코 로고"
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                    <span>딩코딩코 로드맵</span>
                  </div>
                  <ThemeToggle />
                </div>
                <nav className="flex flex-col gap-2" aria-label="모바일 네비게이션">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href ||
                      (link.href !== '/' && pathname?.startsWith(link.href))

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`px-4 py-3 rounded-md text-sm font-medium text-left transition-colors ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
