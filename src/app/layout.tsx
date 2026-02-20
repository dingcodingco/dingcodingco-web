import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/app/components/ui/toaster"
import { ThemeProvider } from "@/app/providers/ThemeProvider"
import { generateOrganizationJsonLd, generateWebSiteJsonLd } from "@/lib/structured-data"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: {
    default: "딩코딩코 | AI 코딩 교육 플랫폼",
    template: "%s | 딩코딩코"
  },
  description: "비개발자부터 현업 개발자까지. 14,556명이 선택한 AI 코딩 교육. 코딩 몰라도 4주 만에 수익화, 개발자는 10배 생산성, 취업 준비는 검증된 커리큘럼으로. YouTube 2.6만 구독자.",
  keywords: [
    "AI 코딩", "AI 교육", "비개발자 코딩", "백엔드 개발자", "스프링 부트",
    "취업", "인프런", "딩코딩코", "코딩 교육", "프로그래밍 강의",
    "Claude Code", "AI 개발자", "파이썬 강의", "SQL 강의",
    "스프링 부트 강의", "면접 준비", "이력서 작성", "개발자 취업",
    "사이드 프로젝트", "AI 활용법", "생산성 향상", "코딩 입문",
    "YouTube 강의", "온라인 코딩 교육"
  ],
  authors: [{ name: "딩코딩코", url: "https://www.youtube.com/@딩코딩코" }],
  creator: "딩코딩코",
  publisher: "딩코딩코",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "딩코딩코",
    title: "딩코딩코 | AI 코딩 교육 플랫폼",
    description: "코딩 몰라도 4주 만에 수익화. 14,556명이 선택한 검증된 커리큘럼. YouTube 2.6만 구독자, 232개 영상.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "딩코딩코 - AI 코딩 교육 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "딩코딩코 | AI 코딩 교육 플랫폼",
    description: "코딩 몰라도 4주 만에 수익화. 14,556명이 선택한 AI 코딩 교육. YouTube 2.6만 구독자.",
    images: ["/twitter-image"],
    creator: "@dingcodingco",
    site: "@dingcodingco",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // Add when available
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                const root = document.documentElement;
                // Add font variable class
                root.className = '${inter.variable}';
                // Add dark class if needed
                if (theme === 'dark') {
                  root.classList.add('dark');
                }
              })();
            `,
          }}
        />
        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationJsonLd()),
          }}
        />
        {/* WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebSiteJsonLd()),
          }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:ring-2 focus:ring-ring"
          >
            본문으로 건너뛰기
          </a>
          <div id="main-content">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
