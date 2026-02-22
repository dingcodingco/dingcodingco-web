import { test, expect } from '@playwright/test'

test.describe('페이지 분리 리팩토링 검증', () => {
  test.beforeEach(async ({ page }) => {
    // 각 테스트 전에 홈페이지로 이동
    await page.goto('http://localhost:3001')
  })

  test.describe('Header & Footer 존재 확인', () => {
    test('홈페이지에 Header와 Footer가 있어야 함', async ({ page }) => {
      // Header 확인
      const header = page.locator('header')
      await expect(header).toBeVisible()

      // Footer 확인
      const footer = page.locator('footer')
      await expect(footer).toBeVisible()
    })

    test('트랙 상세 페이지에 Header와 Footer가 있어야 함', async ({ page }) => {
      await page.goto('http://localhost:3001/roadmaps/ai-beginner')

      // Header 확인
      const header = page.locator('header')
      await expect(header).toBeVisible()

      // Footer 확인
      const footer = page.locator('footer')
      await expect(footer).toBeVisible()
    })

    test('성공 사례 페이지에 Header와 Footer가 있어야 함', async ({ page }) => {
      await page.goto('http://localhost:3001/success-stories')

      const header = page.locator('header')
      await expect(header).toBeVisible()

      const footer = page.locator('footer')
      await expect(footer).toBeVisible()
    })

    test('강사 소개 페이지에 Header와 Footer가 있어야 함', async ({ page }) => {
      await page.goto('http://localhost:3001/about')

      const header = page.locator('header')
      await expect(header).toBeVisible()

      const footer = page.locator('footer')
      await expect(footer).toBeVisible()
    })

    test('FAQ 페이지에 Header와 Footer가 있어야 함', async ({ page }) => {
      await page.goto('http://localhost:3001/faq')

      const header = page.locator('header')
      await expect(header).toBeVisible()

      const footer = page.locator('footer')
      await expect(footer).toBeVisible()
    })
  })

  test.describe('홈페이지 간소화 검증', () => {
    test('홈페이지에서 TrackDetailSection이 제거되었어야 함', async ({ page }) => {
      // TrackDetailSection의 특징적인 요소가 없는지 확인
      // (강의 카드가 홈페이지에 직접 표시되지 않아야 함)
      const courseCards = page.locator('[data-testid="course-card"]')
      await expect(courseCards).toHaveCount(0)
    })

    test('홈페이지에서 성공 스토리가 3개만 표시되어야 함', async ({ page }) => {
      // 성공 스토리 섹션으로 스크롤
      await page.locator('#outcome-stories').scrollIntoViewIfNeeded()

      // 성공 스토리 카드 개수 확인
      const storyCards = page.locator('#outcome-stories .grid > div')
      const count = await storyCards.count()

      // 3개 또는 그 이하여야 함 (카테고리 필터링 가능)
      expect(count).toBeLessThanOrEqual(3)
    })

    test('홈페이지에서 "전체 보기" 버튼이 있어야 함', async ({ page }) => {
      // 성공 스토리 "전체 보기" 버튼 확인
      const successStoriesViewAll = page.getByRole('link', { name: /전체 보기.*34/i })
      await expect(successStoriesViewAll).toBeVisible()

      // FAQ "전체 보기" 버튼 확인
      await page.locator('#faq').scrollIntoViewIfNeeded()
      const faqViewAll = page.getByRole('link', { name: /전체 보기/i }).last()
      await expect(faqViewAll).toBeVisible()
    })
  })

  test.describe('네비게이션 동작 확인', () => {
    test('홈페이지에서 "자세히 보기" 클릭 시 트랙 페이지로 이동', async ({ page }) => {
      // AI 비개발자 트랙의 "자세히 보기" 버튼 찾기
      const detailButton = page.getByRole('link', { name: /자세히 보기/i }).first()
      await detailButton.click()

      // URL이 /roadmaps/로 시작하는지 확인
      await expect(page).toHaveURL(/\/roadmaps\//)
    })

    test('홈페이지에서 "전체 보기" 클릭 시 성공 사례 페이지로 이동', async ({ page }) => {
      await page.locator('#outcome-stories').scrollIntoViewIfNeeded()

      const viewAllButton = page.getByRole('link', { name: /전체 보기.*34/i })
      await viewAllButton.click()

      await expect(page).toHaveURL('/success-stories')
    })

    test('트랙 페이지에서 다른 트랙 카드 클릭 시 해당 트랙으로 이동', async ({ page }) => {
      await page.goto('http://localhost:3001/roadmaps/ai-beginner')

      // "다른 트랙도 둘러보세요" 섹션으로 스크롤
      await page.locator('text=다른 트랙도 둘러보세요').scrollIntoViewIfNeeded()

      // 첫 번째 다른 트랙 카드 클릭
      const otherTrackCard = page.locator('a[href^="/roadmaps/"]').last()
      const href = await otherTrackCard.getAttribute('href')
      await otherTrackCard.click()

      // 해당 트랙 페이지로 이동했는지 확인
      await expect(page).toHaveURL(href!)
    })
  })

  test.describe('트랙 상세 페이지 검증', () => {
    test('AI 비개발자 트랙 페이지가 로드되어야 함', async ({ page }) => {
      await page.goto('http://localhost:3001/roadmaps/ai-beginner')

      // 페이지 제목 확인
      await expect(page).toHaveTitle(/AI 비개발자/)

      // 트랙 이름이 표시되는지 확인
      const trackName = page.locator('h2, h3').filter({ hasText: 'AI 비개발자' }).first()
      await expect(trackName).toBeVisible()
    })

    test('AI 개발자 트랙 페이지가 로드되어야 함', async ({ page }) => {
      await page.goto('http://localhost:3001/roadmaps/ai-developer')

      await expect(page).toHaveTitle(/AI 개발자/)

      const trackName = page.locator('h2, h3').filter({ hasText: 'AI 개발자' }).first()
      await expect(trackName).toBeVisible()
    })

    test('스프링 백엔드 트랙 페이지가 로드되어야 함', async ({ page }) => {
      await page.goto('http://localhost:3001/roadmaps/spring-backend')

      await expect(page).toHaveTitle(/스프링 백엔드/)

      const trackName = page.locator('h2, h3').filter({ hasText: '스프링 백엔드' }).first()
      await expect(trackName).toBeVisible()
    })

    test('트랙 페이지에 "다른 트랙도 둘러보세요" 섹션이 있어야 함', async ({ page }) => {
      await page.goto('http://localhost:3001/roadmaps/ai-beginner')

      await page.locator('text=다른 트랙도 둘러보세요').scrollIntoViewIfNeeded()

      const otherTracksSection = page.locator('text=다른 트랙도 둘러보세요')
      await expect(otherTracksSection).toBeVisible()

      // 다른 트랙 카드가 2개 있어야 함 (전체 3개 중 현재 트랙 제외)
      const otherTrackCards = page.locator('a[href^="/roadmaps/"]').filter({ has: page.locator('text=자세히 보기') })
      const count = await otherTrackCards.count()
      expect(count).toBeGreaterThanOrEqual(2)
    })
  })

  test.describe('새 페이지 검증', () => {
    test('성공 사례 전체 페이지가 로드되어야 함', async ({ page }) => {
      await page.goto('http://localhost:3001/success-stories')

      await expect(page).toHaveTitle(/성공 사례/)

      const heading = page.locator('h1').filter({ hasText: '수강생 성공 사례' })
      await expect(heading).toBeVisible()
    })

    test('강사 소개 페이지가 로드되어야 함', async ({ page }) => {
      await page.goto('http://localhost:3001/about')

      await expect(page).toHaveTitle(/강사 소개/)

      const heading = page.locator('h2').filter({ hasText: '강사 소개' })
      await expect(heading).toBeVisible()
    })

    test('FAQ 페이지가 로드되어야 함', async ({ page }) => {
      await page.goto('http://localhost:3001/faq')

      await expect(page).toHaveTitle(/자주 묻는 질문/)

      const heading = page.locator('h1').filter({ hasText: '자주 묻는 질문' })
      await expect(heading).toBeVisible()
    })
  })

  test.describe('스크롤 길이 개선 검증', () => {
    test('홈페이지 스크롤 높이가 합리적이어야 함', async ({ page }) => {
      // 페이지 전체 높이 측정
      const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight)
      const viewportHeight = await page.evaluate(() => window.innerHeight)

      // 스크롤 비율 계산 (몇 배의 화면 높이인지)
      const scrollRatio = scrollHeight / viewportHeight

      // 약 3배 화면 높이 이하여야 함 (여유를 두어 5배 이하로 설정)
      expect(scrollRatio).toBeLessThan(5)

      console.log(`홈페이지 스크롤 비율: ${scrollRatio.toFixed(2)}배 화면`)
    })
  })
})
