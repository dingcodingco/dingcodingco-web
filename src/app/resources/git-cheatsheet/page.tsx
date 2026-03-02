'use client'

import { useState, useEffect } from 'react'

/* ──────────────────────────────────────────────────────────────
   Scoped styles: dw-table uses CSS variables (same as db-worksheet)
   ────────────────────────────────────────────────────────────── */
const scopedStyles = `
.dw-table table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.dw-table thead th {
  background: hsl(var(--muted));
  padding: 12px 16px; text-align: left;
  font-weight: 700; font-size: 12px;
  text-transform: uppercase; letter-spacing: 0.05em;
  color: hsl(var(--muted-foreground));
  border-bottom: 1px solid hsl(var(--border));
  white-space: nowrap;
}
.dw-table tbody td {
  padding: 10px 16px;
  border-bottom: 1px solid hsl(var(--border) / 0.5);
  vertical-align: middle;
  color: hsl(var(--foreground));
}
.dw-table tbody tr:last-child td { border-bottom: none; }
.dw-table tbody tr:hover { background: hsl(var(--muted) / 0.5); }
.dw-table td code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12.5px;
  background: hsl(var(--muted));
  padding: 2px 7px; border-radius: 5px;
  border: 1px solid hsl(var(--border));
  color: hsl(var(--primary));
  white-space: nowrap;
}
`

/* ── Sidebar nav ── */
const navGroups = [
  {
    label: 'Git 기본',
    items: [
      { id: 'worldmap', icon: '🗺️', label: 'Git의 세계관' },
      { id: 'daily',    icon: '💾', label: '매일 쓰는 명령어' },
      { id: 'branch',   icon: '🌿', label: '브랜치 (평행우주)' },
      { id: 'undo',     icon: '⏪', label: '되돌리기' },
    ],
  },
  {
    label: '협업',
    items: [
      { id: 'rules',    icon: '🚨', label: '핵심 규칙' },
      { id: 'conflict', icon: '🔥', label: '충돌 해결' },
      { id: 'pr',       icon: '🤝', label: 'PR 순서' },
    ],
  },
  {
    label: '실전',
    items: [
      { id: 'ai',       icon: '🤖', label: 'AI 활용 꿀팁' },
      { id: 'quickref', icon: '🆘', label: '빠른 탈출구' },
    ],
  },
]

/* ── Content data ── */
const dailyCommands = [
  { want: '현재 상태 확인',       cmd: 'git status',              tag: '필수' },
  { want: '파일 대기실에 올리기', cmd: 'git add 파일명  |  git add .', tag: null },
  { want: '변경사항 기록하기',    cmd: 'git commit -m "메시지"',  tag: null },
  { want: 'GitHub에 올리기',      cmd: 'git push',                tag: null },
  { want: 'GitHub에서 가져오기',  cmd: 'git pull',                tag: null },
  { want: '커밋 이력 보기',       cmd: 'git log',                 tag: 'q로 나가기' },
  { want: '뭘 바꿨는지 확인',     cmd: 'git diff',                tag: null },
]

const branchCommands = [
  { want: '브랜치 만들기',      cmd: 'git branch 이름',        tag: null },
  { want: '브랜치 이동',        cmd: 'git checkout 이름',      tag: null },
  { want: '만들면서 바로 이동', cmd: 'git checkout -b 이름',   tag: '⭐ 추천' },
  { want: '브랜치 합치기',      cmd: 'git merge 합칠브랜치',   tag: null },
  { want: '깔끔하게 합치기',    cmd: 'git rebase main',        tag: null },
  { want: '모든 브랜치 보기',   cmd: 'git branch -a',          tag: null },
]

const undoCommands = [
  { want: 'add 취소',                cmd: 'git reset',          tag: '내용 유지' },
  { want: 'add 취소 + 내용도 원복', cmd: 'git reset --hard',   tag: '⚠️ 삭제됨' },
  { want: '직전 커밋에 파일 추가',  cmd: 'git commit --amend', tag: null },
  { want: '커밋 1개 되돌리기',      cmd: 'git reset HEAD~',    tag: '로컬만' },
  { want: '커밋 완전 삭제',         cmd: 'git reset --hard HEAD~', tag: '⚠️ 로컬만' },
  { want: 'push한 커밋 되돌리기',   cmd: 'git revert HEAD',    tag: '✅ 안전' },
]

const conflictSteps = [
  {
    num: '1',
    title: '충돌 파일 열기',
    code: '<<<<<<< HEAD (내 코드)\n내가 쓴 내용\n=======\n팀원이 쓴 내용\n>>>>>>> abc123 (원격)',
    desc: '이렇게 생긴 부분을 찾으세요',
  },
  {
    num: '2',
    title: '정리하기',
    code: '남길 코드만 남기고\n<<<, ===, >>> 줄 전부 삭제!',
    desc: '둘 다 남겨도, 하나만 남겨도 OK',
  },
  {
    num: '3',
    title: '저장 & 커밋',
    code: 'git add . → git commit → git push',
    desc: '끝! 이게 전부입니다 🎉',
  },
]

const prSteps = [
  { emoji: '🌿', text: 'git checkout -b feature/기능이름' },
  { emoji: '💾', text: 'git add . → git commit -m "메시지"' },
  { emoji: '🚀', text: 'git push --set-upstream origin feature/기능이름' },
  { emoji: '🔀', text: 'GitHub에서 PR 생성 (base: main ← compare: feature)' },
  { emoji: '👀', text: '코드리뷰 받기 & 피드백 반영' },
  { emoji: '✅', text: 'Merge pull request 클릭!' },
]

const aiTips = [
  { situation: '커밋 메시지 고민', prompt: 'git diff 결과 줄 테니까 Conventional Commits 규칙으로 커밋 메시지 써줘' },
  { situation: 'PR 설명 작성',     prompt: 'main ← feature 변경사항 보고 PR 제목, 요약, 테스트 포인트 정리해줘' },
  { situation: '충돌 해결',        prompt: 'HEAD는 내 코드, 아래는 팀원 코드야. 둘 다 살리는 방향으로 해결해줘' },
  { situation: '.gitignore 생성',  prompt: 'React + Node.js 프로젝트용 .gitignore 만들어줘' },
]

const quickRefs = [
  { cmd: 'git status',      desc: '지금 상태 모를 때' },
  { cmd: 'git log --oneline', desc: '이력 한눈에 보기' },
  { cmd: 'git diff',        desc: '뭘 바꿨는지 확인' },
  { cmd: 'git stash',       desc: '임시 저장 (브랜치 이동 전)' },
  { cmd: 'git branch -a',   desc: '모든 브랜치 보기' },
  { cmd: 'git remote -v',   desc: '원격 저장소 확인' },
]

/* ── Sub-components ── */

function SectionCard({
  id, icon, num, title, subtitle, iconBg, children,
}: {
  id: string
  icon: string
  num: string
  title: string
  subtitle?: string
  iconBg: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 mb-12">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        <h2 className="text-[22px] font-[750] tracking-[-0.02em] m-0 text-foreground flex items-center gap-1.5">
          <span className="text-primary text-[18px] font-extrabold">{num}</span>
          {title}
        </h2>
        {subtitle && (
          <span className="text-[13px] text-muted-foreground font-normal ml-auto">{subtitle}</span>
        )}
      </div>
      <div>{children}</div>
    </section>
  )
}

function CommandTable({
  commands,
}: {
  commands: { want: string; cmd: string; tag: string | null }[]
}) {
  return (
    <div className="dw-table">
      <table>
        <thead>
          <tr>
            <th>하고 싶은 것</th>
            <th>명령어</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {commands.map((cmd, i) => (
            <tr key={i}>
              <td className="text-muted-foreground">{cmd.want}</td>
              <td>
                <code>{cmd.cmd}</code>
              </td>
              <td>
                {cmd.tag && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
                      cmd.tag.includes('⚠️')
                        ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30'
                        : cmd.tag.includes('✅')
                          ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
                          : cmd.tag.includes('⭐')
                            ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30'
                            : 'text-muted-foreground bg-muted'
                    }`}
                  >
                    {cmd.tag}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function WorldMap() {
  const stages = [
    { label: 'Working Dir', sub: '내 작업 폴더',  bg: 'hsl(var(--destructive) / 0.07)', border: 'hsl(var(--destructive) / 0.3)', cls: 'text-red-600 dark:text-red-400' },
    { label: 'Staging',     sub: '대기실',         bg: 'hsl(var(--badge-soon) / 0.07)',  border: 'hsl(var(--badge-soon) / 0.3)',  cls: 'text-amber-600 dark:text-amber-400' },
    { label: 'Local Repo',  sub: '내 PC 저장소',   bg: 'hsl(var(--badge-free) / 0.07)', border: 'hsl(var(--badge-free) / 0.3)', cls: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Remote',      sub: 'GitHub',          bg: 'hsl(var(--primary) / 0.07)',     border: 'hsl(var(--primary) / 0.3)',     cls: 'text-primary' },
  ]
  const arrows = [
    { fwd: 'git add',    bwd: 'git reset' },
    { fwd: 'git commit', bwd: 'reset HEAD~' },
    { fwd: 'git push',   bwd: 'git pull' },
  ]

  return (
    <div className="flex items-center justify-center flex-wrap gap-0 py-3 font-mono overflow-x-auto">
      {stages.map((s, i) => (
        <div key={i} className="flex items-center">
          <div
            className="rounded-xl px-4 py-3 text-center min-w-[96px] border"
            style={{ background: s.bg, borderColor: s.border }}
          >
            <div className={`${s.cls} font-bold text-[12px]`}>{s.label}</div>
            <div className="text-muted-foreground text-[10px] mt-0.5">{s.sub}</div>
          </div>
          {i < 3 && (
            <div className="mx-2 flex flex-col items-center gap-0.5 leading-tight text-muted-foreground">
              <span className="text-[9px] text-primary">{arrows[i].fwd}</span>
              <span className="text-sm">→</span>
              <span className="text-[9px] text-red-500 dark:text-red-400">{arrows[i].bwd}</span>
              <span className="text-sm">←</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Page ── */
export default function GitCheatsheetPage() {
  const [active, setActive] = useState('worldmap')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      <style>{scopedStyles}</style>

      {/* ── Hero ── */}
      <div className="relative text-center px-8 py-14 border-b border-border overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-[13px] font-semibold tracking-wide mb-5">
          🎮 Git 생존 치트시트
        </div>
        <h1 className="text-[clamp(28px,5vw,44px)] font-extrabold tracking-[-0.03em] leading-[1.2] mb-3 text-foreground">
          Git <span className="text-primary">생존</span> 치트시트
        </h1>
        <p className="text-muted-foreground text-base max-w-[480px] mx-auto">
          막힐 때마다 여기로 돌아오세요.{' '}
          <span className="text-primary font-medium">세이브 포인트</span>입니다!
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex max-w-[1200px] mx-auto min-h-[calc(100vh-200px)]">

        {/* Sidebar */}
        <nav
          className="hidden lg:block w-60 shrink-0 sticky top-[56px] h-[calc(100vh-56px)] overflow-y-auto py-5 pl-4 border-r border-border [scrollbar-width:none]"
          style={{ scrollbarWidth: 'none' }}
        >
          {navGroups.map((group) => (
            <div key={group.label} className="mb-2">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground px-3 py-2">
                {group.label}
              </div>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-colors w-full text-left border-l-2 mr-4 ${
                    active === item.id
                      ? 'text-primary bg-primary/[0.08] border-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted border-transparent'
                  }`}
                >
                  <span className="text-[15px] w-[22px] text-center shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Main */}
        <main id="main-content" className="flex-1 min-w-0 px-5 lg:px-10 py-8 pb-20">

          {/* 01 Git의 세계관 */}
          <SectionCard
            id="worldmap" icon="🗺️" num="01"
            title="Git의 세계관"
            subtitle="파일이 어떻게 이동하는지 이해하기"
            iconBg="hsl(var(--primary) / 0.08)"
          >
            <WorldMap />
            <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm text-muted-foreground">
              <span className="text-primary font-semibold">💡 핵심:</span>{' '}
              git add → commit → push 순서로 파일이 이동합니다. pull은 Remote에서 Local로 가져오는 것!
            </div>
          </SectionCard>

          {/* 02 매일 쓰는 명령어 */}
          <SectionCard
            id="daily" icon="💾" num="02"
            title="매일 쓰는 명령어"
            subtitle="이것만 알면 90% 해결"
            iconBg="hsl(var(--badge-soon) / 0.1)"
          >
            <CommandTable commands={dailyCommands} />
          </SectionCard>

          {/* 03 브랜치 */}
          <SectionCard
            id="branch" icon="🌿" num="03"
            title="브랜치 (평행우주)"
            subtitle="기능별로 분리해서 작업하기"
            iconBg="hsl(var(--badge-free) / 0.1)"
          >
            <CommandTable commands={branchCommands} />
          </SectionCard>

          {/* 04 되돌리기 */}
          <SectionCard
            id="undo" icon="⏪" num="04"
            title="되돌리기 (실수 복구)"
            subtitle="당황하지 말고 차근차근"
            iconBg="hsl(var(--destructive) / 0.08)"
          >
            <CommandTable commands={undoCommands} />
          </SectionCard>

          {/* 05 핵심 규칙 */}
          <SectionCard
            id="rules" icon="🚨" num="05"
            title="핵심 규칙 (이것만 기억!)"
            iconBg="hsl(var(--destructive) / 0.08)"
          >
            <div className="p-5 bg-gradient-to-br from-destructive/5 to-amber-500/5 border border-destructive/20 rounded-xl text-center">
              <div className="text-sm text-foreground leading-[2.2]">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">로컬에서만 작업한 거</span>
                {' → '}
                <code className="font-mono text-amber-600 dark:text-amber-400 text-xs bg-amber-50 dark:bg-amber-950/30 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800/40">
                  reset
                </code>
                {' OK'}
              </div>
              <div className="text-muted-foreground/40 text-xs my-0.5">|</div>
              <div className="text-sm text-foreground leading-[2.2]">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">이미 push 한 거</span>
                {' → 반드시 '}
                <code className="font-mono text-amber-600 dark:text-amber-400 text-xs bg-amber-50 dark:bg-amber-950/30 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800/40">
                  revert
                </code>
              </div>
            </div>
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-lg text-xs text-amber-700 dark:text-amber-400">
              ⚠️ <strong>push한 커밋을 reset하면</strong> 팀원의 히스토리와 충돌이 납니다. 공유된 커밋은 항상 revert!
            </div>
          </SectionCard>

          {/* 06 충돌 해결 */}
          <SectionCard
            id="conflict" icon="🔥" num="06"
            title="충돌(Conflict) 해결 3단계"
            subtitle="두렵지 않아! 단계별로 해결하기"
            iconBg="hsl(var(--destructive) / 0.08)"
          >
            <div className="flex flex-col gap-4">
              {conflictSteps.map((step) => (
                <div key={step.num} className="flex gap-3 items-start">
                  <div className="w-7 h-7 bg-destructive rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0 mt-0.5">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-foreground mb-1.5">{step.title}</div>
                    <pre className="bg-gray-950 text-gray-100 rounded-lg px-3 py-2.5 text-[11px] font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto border border-gray-800 mb-1.5">
                      {step.code}
                    </pre>
                    <div className="text-xs text-muted-foreground">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* 07 PR 순서 */}
          <SectionCard
            id="pr" icon="🤝" num="07"
            title="PR(Pull Request) 순서"
            subtitle="협업의 정석 플로우"
            iconBg="hsl(var(--primary) / 0.08)"
          >
            <div className="flex flex-col gap-1.5">
              {prSteps.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg ${i % 2 === 0 ? 'bg-primary/5' : ''}`}
                >
                  <span className="text-lg shrink-0">{step.emoji}</span>
                  <span className="text-primary font-bold font-mono text-xs w-5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <code className="font-mono text-foreground text-sm tracking-tight">
                    {step.text}
                  </code>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* 08 AI 꿀팁 */}
          <SectionCard
            id="ai" icon="🤖" num="08"
            title="AI 활용 꿀팁"
            subtitle="10배 빨리 퇴근하기"
            iconBg="hsl(var(--track-ai-developer) / 0.08)"
          >
            <div className="flex flex-col gap-2 mb-4">
              {aiTips.map((tip, i) => (
                <div
                  key={i}
                  className="px-4 py-3 bg-muted/40 rounded-lg border-l-[3px]"
                  style={{ borderLeftColor: 'hsl(var(--track-ai-developer))' }}
                >
                  <div
                    className="text-[11px] font-bold mb-1"
                    style={{ color: 'hsl(var(--track-ai-developer))' }}
                  >
                    {tip.situation}
                  </div>
                  <div className="text-sm text-muted-foreground font-mono leading-relaxed">
                    &quot;{tip.prompt}&quot;
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-lg text-xs text-amber-700 dark:text-amber-400 text-center">
              ⚡ AI가 써준 결과물이 맞는지{' '}
              <strong>검증할 수 있는 사람</strong>이 진짜 고수입니다.
            </div>
          </SectionCard>

          {/* 09 빠른 탈출구 */}
          <SectionCard
            id="quickref" icon="🆘" num="09"
            title='"뭐였더라?" 빠른 탈출구'
            subtitle="막힐 때 여기서 먼저 찾기"
            iconBg="hsl(var(--badge-soon) / 0.1)"
          >
            <div className="dw-table mb-5">
              <table>
                <thead>
                  <tr>
                    <th>명령어</th>
                    <th>언제 쓰나</th>
                  </tr>
                </thead>
                <tbody>
                  {quickRefs.map((item, i) => (
                    <tr key={i}>
                      <td><code>{item.cmd}</code></td>
                      <td className="text-muted-foreground">{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '🛡️', title: '.gitignore', desc: '관리 안 할 파일 목록' },
                { icon: '🔐', title: 'SSH 설정',   desc: 'push 시 비번 안 물어봄' },
                { icon: '🌳', title: 'SourceTree', desc: '브랜치 흐름 눈으로 보기' },
              ].map((item, i) => (
                <div key={i} className="px-3 py-4 bg-muted/30 border border-border rounded-xl text-center">
                  <div className="text-2xl mb-1.5">{item.icon}</div>
                  <div className="font-bold text-xs text-foreground">{item.title}</div>
                  <div className="text-muted-foreground text-[10px] mt-1 leading-snug">{item.desc}</div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Footer */}
          <div className="text-center mt-4 pt-5 border-t border-border text-xs text-muted-foreground">
            Made with 🔥 by{' '}
            <span className="text-amber-600 dark:text-amber-400 font-bold">딩코딩코</span>
          </div>
        </main>
      </div>
    </>
  )
}
