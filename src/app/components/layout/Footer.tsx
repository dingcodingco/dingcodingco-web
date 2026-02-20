export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted border-t border-border mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold">
              <span className="text-2xl">👨‍💻</span>
              <span>딩코딩코 로드맵</span>
            </div>
            <p className="text-sm text-muted-foreground">
              나에게 맞는 학습 경로를 찾아보세요
            </p>

            {/* Teaching Philosophy */}
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-300 italic leading-relaxed mb-2">
                "코딩을 배우면 인생이 달라집니다.
                <br />
                14,556명과 함께 증명한 체계적인 로드맵으로 시작하세요."
              </p>
              <button
                onClick={() => {
                  // TODO: Open instructor bio modal or scroll to about section
                  console.log('Show instructor bio')
                }}
                className="text-xs text-primary hover:underline font-medium"
              >
                강사 소개 자세히 보기 →
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">학습 트랙</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#track-ai-beginner"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  🎨 AI 비개발자
                </a>
              </li>
              <li>
                <a
                  href="#track-ai-developer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  🤖 AI 개발자
                </a>
              </li>
              <li>
                <a
                  href="#track-spring-backend"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  🌱 스프링 백엔드
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">문의</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.inflearn.com/users/408812/@dingcodingco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  인프런 강의
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@dingcodingco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  유튜브 채널
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} 딩코딩코 로드맵. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
