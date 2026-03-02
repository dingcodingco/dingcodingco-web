'use client'

import { useState, useEffect } from 'react'

/* ──────────────────────────────────────────────────────────────
   Scoped styles:
   - Table / flow / checklist / tag → all use CSS variables
   - Syntax highlighting (.kw .fn .st .cm .nb .tb) → always inside
     dark code blocks, so hardcoded dark-theme colors are fine
   ────────────────────────────────────────────────────────────── */
const scopedStyles = `
/* Table wrapper */
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
  vertical-align: top;
  color: hsl(var(--foreground));
}
.dw-table tbody tr:last-child td { border-bottom: none; }
.dw-table tbody tr:hover { background: hsl(var(--muted) / 0.5); }
.dw-table td code, .dw-table th code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12.5px;
  background: hsl(var(--muted));
  padding: 2px 7px; border-radius: 5px;
  border: 1px solid hsl(var(--border));
  color: hsl(var(--primary));
  white-space: nowrap;
}

/* Flow diagram */
.dw-flow-step {
  padding: 6px 14px; border-radius: 7px;
  background: hsl(var(--muted));
  border: 1px solid hsl(var(--border));
  white-space: nowrap; color: hsl(var(--foreground));
  font-size: 13px; font-weight: 600;
}
.dw-flow-step.active {
  background: hsl(var(--primary) / 0.1);
  border-color: hsl(var(--primary) / 0.3);
  color: hsl(var(--primary));
}
.dw-flow-arrow { color: hsl(var(--muted-foreground)); font-size: 12px; }

/* Checklist */
.dw-checklist { list-style: none; margin-bottom: 20px; padding: 0; }
.dw-checklist li {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 10px 14px; border-radius: 8px; font-size: 14px;
  transition: background 0.15s; cursor: default;
  color: hsl(var(--foreground));
}
.dw-checklist li:hover { background: hsl(var(--muted)); }
.dw-checklist li::before {
  content: ''; width: 18px; height: 18px; border-radius: 5px;
  border: 2px solid hsl(var(--border));
  flex-shrink: 0; margin-top: 3px;
}

/* Tag badges */
.tag { display: inline-flex; padding: 2px 8px; border-radius: 5px; font-size: 11.5px; font-weight: 600; letter-spacing: 0.01em; }
.tag-green  { background: hsl(var(--badge-free)   / 0.12); color: hsl(var(--badge-free)); }
.tag-red    { background: hsl(var(--destructive)   / 0.12); color: hsl(var(--destructive)); }
.tag-blue   { background: hsl(var(--primary)       / 0.12); color: hsl(var(--primary)); }
.tag-yellow { background: hsl(var(--badge-soon)    / 0.12); color: hsl(var(--badge-soon)); }
.tag-purple { background: hsl(var(--badge-premium) / 0.12); color: hsl(var(--badge-premium)); }

/* Callout inline code */
.dw-callout code {
  background: rgba(0,0,0,0.08);
  padding: 1px 5px; border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9em;
}
.dark .dw-callout code { background: rgba(255,255,255,0.08); }

/* Syntax highlighting — always inside dark code blocks */
.kw { color: #c792ea; font-weight: 600; }
.fn { color: #82aaff; }
.st { color: #c3e88d; }
.cm { color: #546e7a; font-style: italic; }
.nb { color: #f78c6c; }
.tb { color: #ffcb6b; }
`

/* ──────────────────────────────────────────── */
/* Navigation data                              */
/* ──────────────────────────────────────────── */

const navSections = [
  {
    title: 'SQL 명령어',
    items: [
      { href: '#crud', icon: '✏️', label: 'CRUD 기본' },
      { href: '#select', icon: '🔍', label: 'SELECT 심화' },
      { href: '#join', icon: '🔗', label: 'JOIN' },
      { href: '#transaction', icon: '💰', label: '트랜잭션' },
      { href: '#index', icon: '📚', label: '인덱스' },
    ],
  },
  {
    title: '핵심 개념',
    items: [
      { href: '#terms', icon: '📖', label: '용어집' },
      { href: '#relations', icon: '🔗', label: '연관관계' },
      { href: '#acid', icon: '🛡️', label: 'ACID' },
      { href: '#types', icon: '🏷️', label: '데이터 타입' },
      { href: '#constraints', icon: '🔒', label: '제약조건' },
    ],
  },
  {
    title: '실전',
    items: [{ href: '#ai-check', icon: '🤖', label: 'AI 검증 체크리스트' }],
  },
]

/* ──────────────────────────────────────────── */
/* Components                                   */
/* ──────────────────────────────────────────── */

function CodeBlock({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden mb-5">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900/60 border-b border-gray-800">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-mono">
          {lang}
        </span>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] opacity-60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c841] opacity-60" />
        </div>
      </div>
      <pre
        className="px-5 py-4 overflow-x-auto font-mono text-[13px] leading-[1.65] text-gray-300 m-0"
        dangerouslySetInnerHTML={{ __html: children as string }}
      />
    </div>
  )
}

function Callout({
  type,
  icon,
  children,
}: {
  type: 'warning' | 'tip' | 'danger' | 'info'
  icon: string
  children: React.ReactNode
}) {
  const styles = {
    warning:
      'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800/50 dark:text-amber-200',
    tip: 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800/50 dark:text-emerald-200',
    danger:
      'bg-red-50 border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-800/50 dark:text-red-200',
    info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-800/50 dark:text-blue-200',
  }
  return (
    <div className={`dw-callout flex gap-3 px-4 py-4 rounded-lg border mb-5 text-[13.5px] leading-relaxed ${styles[type]}`}>
      <span className="text-lg shrink-0 mt-0.5">{icon}</span>
      <div>{children}</div>
    </div>
  )
}

/* ──────────────────────────────────────────── */
/* Page                                         */
/* ──────────────────────────────────────────── */

export default function DBWorksheetPage() {
  const [activeSection, setActiveSection] = useState('crud')

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]')
    function updateNav() {
      let current = ''
      sections.forEach((s) => {
        const top = s.getBoundingClientRect().top
        if (top < 160) current = s.getAttribute('data-section') || ''
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', updateNav, { passive: true })
    updateNav()
    return () => window.removeEventListener('scroll', updateNav)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scopedStyles }} />

      {/* Hero */}
      <div className="relative text-center px-8 py-14 border-b border-border overflow-hidden">
        <div
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-[13px] font-semibold tracking-wide mb-5"
        >
          🗄️ BONUS CONTENT
        </div>
        <h1 className="text-[clamp(28px,5vw,44px)] font-extrabold tracking-[-0.03em] leading-[1.2] mb-3 text-foreground">
          DB 완강 <span className="text-primary">요약 워크시트</span>
        </h1>
        <p className="text-muted-foreground text-base max-w-[480px] mx-auto">
          강의에서 배운 핵심 내용을 한눈에. DBeaver 옆에 띄워놓고 바로 참고하세요!
        </p>
      </div>

      {/* Layout */}
      <div className="flex max-w-[1200px] mx-auto min-h-[calc(100vh-200px)]">
        {/* Sidebar */}
        <nav
          className="hidden lg:block w-60 shrink-0 sticky top-[56px] h-[calc(100vh-56px)] overflow-y-auto py-5 pl-4 border-r border-border [scrollbar-width:none]"
          style={{ scrollbarWidth: 'none' }}
        >
          {navSections.map((section) => (
            <div className="mb-2" key={section.title}>
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground px-3 py-2">
                {section.title}
              </div>
              {section.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-colors border-l-2 mr-4 no-underline ${
                    activeSection === item.href.slice(1)
                      ? 'text-primary bg-primary/8 border-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted border-transparent'
                  }`}
                >
                  <span className="text-[15px] w-[22px] text-center shrink-0">{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </nav>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-5 lg:px-10 py-8 pb-20">

          {/* ─── CRUD ─── */}
          <section className="mb-12" data-section="crud" id="crud">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: 'hsl(var(--badge-soon) / 0.1)' }}
              >
                ✏️
              </div>
              <h2 className="text-[22px] font-[750] tracking-[-0.02em] m-0 text-foreground">CRUD 기본</h2>
              <span className="text-[13px] text-muted-foreground font-normal ml-auto">
                생성 · 조회 · 수정 · 삭제
              </span>
            </div>

            <div className="mb-7">
              <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-foreground">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-[12px] font-extrabold">
                  1
                </span>{' '}
                데이터베이스 조작
              </h3>
              <div className="dw-table overflow-x-auto rounded-xl border border-border mb-5 bg-card">
                <table>
                  <thead>
                    <tr>
                      <th>하고 싶은 것</th>
                      <th>SQL</th>
                      <th>예시</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>DB 목록 보기</td>
                      <td><code>SHOW databases;</code></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>DB 만들기</td>
                      <td><code>CREATE DATABASE 이름;</code></td>
                      <td><code>CREATE DATABASE school;</code></td>
                    </tr>
                    <tr>
                      <td>DB 선택하기</td>
                      <td><code>USE 이름;</code></td>
                      <td><code>USE school;</code></td>
                    </tr>
                    <tr>
                      <td>DB 삭제하기</td>
                      <td><code>DROP DATABASE 이름;</code></td>
                      <td><code>DROP DATABASE school;</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-7">
              <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-foreground">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-[12px] font-extrabold">
                  2
                </span>{' '}
                테이블 조작
              </h3>
              <div className="dw-table overflow-x-auto rounded-xl border border-border mb-5 bg-card">
                <table>
                  <thead>
                    <tr>
                      <th>하고 싶은 것</th>
                      <th>SQL</th>
                      <th>예시</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>테이블 목록 보기</td>
                      <td><code>SHOW tables;</code></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>테이블 만들기</td>
                      <td><code>CREATE TABLE 이름 (...);</code></td>
                      <td>아래 참고 👇</td>
                    </tr>
                    <tr>
                      <td>칼럼 추가</td>
                      <td><code>ALTER TABLE 이름 ADD 칼럼 타입;</code></td>
                      <td><code>ALTER TABLE student ADD email VARCHAR(50);</code></td>
                    </tr>
                    <tr>
                      <td>칼럼 삭제</td>
                      <td><code>ALTER TABLE 이름 DROP 칼럼;</code></td>
                      <td><code>ALTER TABLE student DROP email;</code></td>
                    </tr>
                    <tr>
                      <td>칼럼 수정</td>
                      <td><code>ALTER TABLE 이름 MODIFY COLUMN ...;</code></td>
                      <td><code>ALTER TABLE student MODIFY name VARCHAR(30) NOT NULL;</code></td>
                    </tr>
                    <tr>
                      <td>테이블 삭제</td>
                      <td><code>DROP TABLE 이름;</code></td>
                      <td><code>DROP TABLE student;</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <CodeBlock lang="SQL — 테이블 생성 예시">
                {`<span class="kw">CREATE TABLE</span> <span class="tb">student</span> (
    id      <span class="fn">INT</span> <span class="kw">AUTO_INCREMENT PRIMARY KEY</span>,
    name    <span class="fn">VARCHAR</span>(<span class="nb">30</span>) <span class="kw">NOT NULL</span>,
    age     <span class="fn">INT</span> <span class="kw">NOT NULL</span>,
    class   <span class="fn">INT</span>,
    height  <span class="fn">FLOAT</span>
);`}
              </CodeBlock>
            </div>

            <div className="mb-7">
              <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-foreground">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-[12px] font-extrabold">
                  3
                </span>{' '}
                CRUD 4종 세트
              </h3>
              <div className="dw-table overflow-x-auto rounded-xl border border-border mb-5 bg-card">
                <table>
                  <thead>
                    <tr>
                      <th>작업</th>
                      <th>SQL</th>
                      <th>예시</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="tag tag-green">C</span> 생성</td>
                      <td><code>INSERT INTO 테이블(칼럼) VALUES(값);</code></td>
                      <td><code>INSERT INTO student(name, age) VALUES(&quot;딩코&quot;, 17);</code></td>
                    </tr>
                    <tr>
                      <td><span className="tag tag-blue">R</span> 조회</td>
                      <td><code>SELECT 칼럼 FROM 테이블 [WHERE];</code></td>
                      <td><code>SELECT * FROM student WHERE age = 17;</code></td>
                    </tr>
                    <tr>
                      <td><span className="tag tag-yellow">U</span> 수정</td>
                      <td><code>UPDATE 테이블 SET 칼럼=값 [WHERE];</code></td>
                      <td><code>UPDATE student SET age = 18 WHERE name = &apos;딩코&apos;;</code></td>
                    </tr>
                    <tr>
                      <td><span className="tag tag-red">D</span> 삭제</td>
                      <td><code>DELETE FROM 테이블 [WHERE];</code></td>
                      <td><code>DELETE FROM student WHERE name = &apos;딩코&apos;;</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Callout type="danger" icon="🚨">
                <strong>UPDATE, DELETE에서 WHERE를 빼먹으면 전체 레코드가 변경/삭제됩니다!</strong>
                <br />
                실무에서 가장 무서운 실수. 항상 WHERE를 먼저 확인하세요.
              </Callout>
            </div>
          </section>

          {/* ─── SELECT ─── */}
          <section className="mb-12" data-section="select" id="select">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: 'hsl(var(--primary) / 0.1)' }}
              >
                🔍
              </div>
              <h2 className="text-[22px] font-[750] tracking-[-0.02em] m-0 text-foreground">SELECT 심화</h2>
              <span className="text-[13px] text-muted-foreground font-normal ml-auto">
                다양하게 데이터 뽑기
              </span>
            </div>

            <div className="dw-table overflow-x-auto rounded-xl border border-border mb-5 bg-card">
              <table>
                <thead>
                  <tr>
                    <th>하고 싶은 것</th>
                    <th>SQL</th>
                    <th>예시</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['중복 제거', 'SELECT DISTINCT 칼럼 FROM 테이블;', 'SELECT DISTINCT name FROM student;'],
                    ['개수 세기', 'SELECT COUNT(*) FROM 테이블;', 'SELECT COUNT(*) FROM student;'],
                    ['최솟값 / 최댓값', 'MIN(칼럼), MAX(칼럼)', 'SELECT MAX(height) FROM student;'],
                    ['합계 / 평균', 'SUM(칼럼), AVG(칼럼)', 'SELECT AVG(height) FROM student;'],
                    ['그룹으로 묶기', 'GROUP BY 칼럼', 'SELECT class, AVG(height) FROM student GROUP BY class;'],
                    ['그룹 조건', 'HAVING 조건', 'HAVING AVG(height) > 175'],
                    ['정렬', 'ORDER BY 칼럼 DESC/ASC', 'ORDER BY height DESC'],
                    ['개수 제한', 'LIMIT 숫자', 'LIMIT 3'],
                    ['별칭', 'AS 별칭', 'SELECT AVG(height) AS avg_height'],
                  ].map(([want, sql, ex]) => (
                    <tr key={want}>
                      <td>{want}</td>
                      <td><code>{sql}</code></td>
                      <td><code>{ex}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Callout type="info" icon="💡">
              <strong>WHERE vs HAVING</strong> — WHERE는 그룹화 <em>전에</em> 필터링, HAVING은 그룹화{' '}
              <em>후에</em> 필터링! 면접 단골 질문입니다.
            </Callout>

            <div className="mb-7">
              <h3 className="text-base font-bold mb-3 text-foreground">SQL 실행 순서</h3>
              <p className="text-[13px] text-muted-foreground mb-2.5">
                작성 순서와 다릅니다! DB가 내부적으로 처리하는 순서:
              </p>
              <div className="flex items-center flex-wrap gap-1.5 mb-5 px-4 py-4 bg-card rounded-xl border border-border font-mono">
                {['FROM', 'ON', 'JOIN', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'DISTINCT', 'ORDER BY', 'LIMIT'].map(
                  (step, i) => (
                    <div key={step} className="flex items-center gap-1.5">
                      <span
                        className={`dw-flow-step${step === 'FROM' || step === 'SELECT' ? ' active' : ''}`}
                      >
                        {step}
                      </span>
                      {i < 9 && <span className="dw-flow-arrow">→</span>}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mb-7">
              <h3 className="text-base font-bold mb-3 text-foreground">서브쿼리</h3>
              <CodeBlock lang="SQL — WHERE절 서브쿼리">
                {`<span class="cm">-- "수학" 수업을 듣는 학생의 id 찾기</span>
<span class="kw">SELECT</span> student.id <span class="kw">FROM</span> <span class="tb">student</span>
<span class="kw">INNER JOIN</span> <span class="tb">student_class</span> <span class="kw">ON</span> student.id = student_class.student_id
<span class="kw">WHERE</span> student_class.class_id = (
    <span class="kw">SELECT</span> id <span class="kw">FROM</span> <span class="tb">class</span> <span class="kw">WHERE</span> name = <span class="st">"수학"</span>
);`}
              </CodeBlock>
              <CodeBlock lang="SQL — FROM절 서브쿼리 (별칭 필수!)">
                {`<span class="kw">SELECT</span> <span class="fn">AVG</span>(avg_height) <span class="kw">FROM</span> (
    <span class="kw">SELECT</span> class, <span class="fn">AVG</span>(height) <span class="kw">AS</span> avg_height
    <span class="kw">FROM</span> <span class="tb">student</span> <span class="kw">GROUP BY</span> class
) <span class="kw">AS</span> avg_height_per_class;`}
              </CodeBlock>
            </div>
          </section>

          {/* ─── JOIN ─── */}
          <section className="mb-12" data-section="join" id="join">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: 'hsl(var(--badge-premium) / 0.1)' }}
              >
                🔗
              </div>
              <h2 className="text-[22px] font-[750] tracking-[-0.02em] m-0 text-foreground">JOIN</h2>
              <span className="text-[13px] text-muted-foreground font-normal ml-auto">테이블 합치기</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
              {[
                {
                  emoji: '🎯',
                  title: 'INNER JOIN',
                  desc: '양쪽 테이블에 <strong>모두 있는</strong> 데이터만 가져와!<br><span style="color:hsl(var(--muted-foreground))">"정보가 다 채워진 것만 보여줘"</span>',
                },
                {
                  emoji: '⬅️',
                  title: 'LEFT JOIN',
                  desc: '왼쪽 테이블은 <strong>전부</strong> + 오른쪽은 있으면 붙여!<br><span style="color:hsl(var(--muted-foreground))">"없어도 일단 전부 보여줘"</span>',
                },
                {
                  emoji: '➡️',
                  title: 'RIGHT JOIN',
                  desc: 'LEFT JOIN의 반대.<br><span style="color:hsl(var(--muted-foreground))">실무에서는 거의 안 씀</span>',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="p-5 rounded-xl bg-card border border-border hover:border-border/80 transition-all hover:-translate-y-0.5"
                >
                  <div className="text-2xl mb-2">{card.emoji}</div>
                  <div className="font-bold text-[15px] mb-1 text-foreground">{card.title}</div>
                  <div
                    className="text-[13px] text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: card.desc }}
                  />
                </div>
              ))}
            </div>

            <CodeBlock lang="SQL — JOIN 기본 문법">
              {`<span class="cm">-- class와 class_info를 합쳐서 조회</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> <span class="tb">class</span>
<span class="kw">INNER JOIN</span> <span class="tb">class_info</span>
  <span class="kw">ON</span> class.id = class_info.class_id;`}
            </CodeBlock>
          </section>

          {/* ─── 트랜잭션 ─── */}
          <section className="mb-12" data-section="transaction" id="transaction">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: 'hsl(var(--badge-soon) / 0.1)' }}
              >
                💰
              </div>
              <h2 className="text-[22px] font-[750] tracking-[-0.02em] m-0 text-foreground">트랜잭션</h2>
              <span className="text-[13px] text-muted-foreground font-normal ml-auto">
                메이플 거래창은 왜 안전할까?
              </span>
            </div>

            <CodeBlock lang="SQL — 트랜잭션 기본 흐름">
              {`<span class="kw">SET</span> AUTOCOMMIT=<span class="nb">0</span>;          <span class="cm">-- 자동커밋 끄기</span>
<span class="kw">START TRANSACTION</span>;         <span class="cm">-- 트랜잭션 시작</span>

<span class="kw">UPDATE</span> <span class="tb">student</span> <span class="kw">SET</span> name = <span class="st">"서빈2"</span> <span class="kw">WHERE</span> id = <span class="nb">8</span>;
<span class="kw">DELETE FROM</span> <span class="tb">student</span> <span class="kw">WHERE</span> id = <span class="nb">9</span>;

<span class="kw">COMMIT</span>;                     <span class="cm">-- ✅ 확정! DB에 반영</span>
<span class="cm">-- 또는</span>
<span class="kw">ROLLBACK</span>;                   <span class="cm">-- ⏪ 되돌려! 이전 상태로 복구</span>`}
            </CodeBlock>

            <Callout type="warning" icon="⚠️">
              <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>은 ROLLBACK으로 되돌릴 수
              없습니다! 테이블 구조 변경은 신중하게.
            </Callout>
          </section>

          {/* ─── 인덱스 ─── */}
          <section className="mb-12" data-section="index" id="index">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: 'hsl(var(--badge-free) / 0.1)' }}
              >
                📚
              </div>
              <h2 className="text-[22px] font-[750] tracking-[-0.02em] m-0 text-foreground">인덱스</h2>
              <span className="text-[13px] text-muted-foreground font-normal ml-auto">
                두꺼운 책의 책갈피 🔖
              </span>
            </div>

            <div className="dw-table overflow-x-auto rounded-xl border border-border mb-5 bg-card">
              <table>
                <thead>
                  <tr>
                    <th>하고 싶은 것</th>
                    <th>SQL</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['인덱스 만들기', 'CREATE INDEX 인덱스이름 ON 테이블(칼럼);'],
                    ['복합 인덱스 만들기', 'CREATE INDEX 인덱스이름 ON 테이블(칼럼1, 칼럼2);'],
                    ['인덱스 삭제', 'DROP INDEX 인덱스이름 ON 테이블;'],
                    ['실행계획 확인', 'EXPLAIN SELECT * FROM 테이블 WHERE 조건;'],
                  ].map(([want, sql]) => (
                    <tr key={want}>
                      <td>{want}</td>
                      <td><code>{sql}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-7">
              <h3 className="text-base font-bold mb-3 text-foreground">인덱스 언제 걸고 / 안 걸고?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <div
                  className="p-5 rounded-xl bg-card border transition-all hover:-translate-y-0.5"
                  style={{ borderColor: 'hsl(var(--badge-free) / 0.3)' }}
                >
                  <div
                    className="font-bold text-[15px] mb-2"
                    style={{ color: 'hsl(var(--badge-free))' }}
                  >
                    ✅ 걸면 좋은 경우
                  </div>
                  <div className="text-[13px] text-muted-foreground leading-relaxed">
                    • SELECT가 <strong>자주</strong> 일어나는 칼럼
                    <br />
                    • WHERE, JOIN, ORDER BY에 자주 쓰이는 칼럼
                    <br />• <strong>카디널리티가 높은</strong> 칼럼 (값이 다양한 것)
                  </div>
                </div>
                <div
                  className="p-5 rounded-xl bg-card border transition-all hover:-translate-y-0.5"
                  style={{ borderColor: 'hsl(var(--destructive) / 0.3)' }}
                >
                  <div
                    className="font-bold text-[15px] mb-2"
                    style={{ color: 'hsl(var(--destructive))' }}
                  >
                    ❌ 안 걸어야 할 경우
                  </div>
                  <div className="text-[13px] text-muted-foreground leading-relaxed">
                    • INSERT/UPDATE/DELETE가 <strong>매우 빈번</strong>한 테이블
                    <br />
                    • 데이터 수가 <strong>적은</strong> 테이블
                    <br />• <strong>카디널리티가 낮은</strong> 칼럼 (성별처럼 2~3개뿐)
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-7">
              <h3 className="text-base font-bold mb-3 text-foreground">복합 인덱스 순서</h3>
              <CodeBlock lang="카디널리티가 높은 칼럼을 앞에!">
                {`<span class="cm">-- ✅ category 종류가 더 다양 → 앞에!</span>
<span class="kw">CREATE INDEX</span> idx <span class="kw">ON</span> <span class="tb">book</span> (category, is_adult);

<span class="cm">-- ❌ is_adult는 true/false 2개뿐 → 분류 효과 낮음</span>
<span class="kw">CREATE INDEX</span> idx <span class="kw">ON</span> <span class="tb">book</span> (is_adult, category);`}
              </CodeBlock>
            </div>

            <div className="mb-7">
              <h3 className="text-base font-bold mb-3 text-foreground">EXPLAIN으로 풀스캔 확인하기</h3>
              <div className="dw-table overflow-x-auto rounded-xl border border-border mb-5 bg-card">
                <table>
                  <thead>
                    <tr>
                      <th>type 값</th>
                      <th>의미</th>
                      <th>판정</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['ALL', '테이블 전체를 처음부터 끝까지 뒤짐', 'tag-red', '🚨 풀스캔'],
                      ['index', '인덱스 전체를 스캔', 'tag-yellow', '⚠️ 주의'],
                      ['range', '인덱스 범위 검색', 'tag-green', '✅ 양호'],
                      ['ref', '인덱스로 매칭되는 행 탐색', 'tag-green', '✅ 좋음'],
                      ['eq_ref', 'PK/UNIQUE로 정확히 1건 매칭', 'tag-green', '✅ 매우 좋음'],
                      ['const', 'PK로 딱 1건 찾음', 'tag-green', '✅ 최고'],
                    ].map(([type, desc, tagClass, label]) => (
                      <tr key={type}>
                        <td><code>{type}</code></td>
                        <td>{desc}</td>
                        <td><span className={`tag ${tagClass}`}>{label}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ─── 용어집 ─── */}
          <section className="mb-12" data-section="terms" id="terms">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: 'hsl(var(--track-ai-developer) / 0.1)' }}
              >
                📖
              </div>
              <h2 className="text-[22px] font-[750] tracking-[-0.02em] m-0 text-foreground">핵심 용어집</h2>
              <span className="text-[13px] text-muted-foreground font-normal ml-auto">
                강의 속 비유와 함께
              </span>
            </div>
            <div className="dw-table overflow-x-auto rounded-xl border border-border bg-card">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '140px' }}>용어</th>
                    <th>한줄 설명</th>
                    <th>강의 속 비유</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['데이터베이스', '정형화된 데이터들의 묶음', '엑셀 파일 모음 📁'],
                    ['DBMS', 'DB를 관리하는 시스템 (MySQL 등)', '엑셀 프로그램 자체'],
                    ['테이블', '칼럼과 타입이 정의된 데이터 명세서', '"학생", "선생님", "수업"'],
                    ['레코드', '테이블에 들어가는 실제 데이터 한 줄', '딩코, 12살, 1반, 156cm'],
                    ['필드', '테이블의 각 열 (= 칼럼 = 속성)', '이름, 나이, 반, 키'],
                    ['기본 키 (PK)', '레코드를 고유하게 식별. 중복·NULL 불가', '학생 번호 (1번 딩코, 2번 딩코)'],
                    ['외래 키 (FK)', '다른 테이블의 PK를 가리키는 칼럼', '수업의 "담당 선생님 번호"'],
                    ['스키마', 'DB의 구조 + 제약조건의 전체 설계도', '학교의 전체 운영 규칙'],
                    ['NULL', '아직 정해지지 않은 빈 값', '아직 반 배정 안 된 학생'],
                    ['풀스캔', '테이블 전체를 처음부터 끝까지 뒤지는 것', '두꺼운 책 1페이지부터 끝까지 📚'],
                    ['인덱스', '자주 찾는 값의 위치를 미리 저장', '두꺼운 책의 책갈피 🔖'],
                    ['카디널리티', '칼럼 값의 고유한 종류 수', '"성별"보다 "카테고리"가 높음'],
                    ['트랜잭션', '하나의 작업 단위로 묶인 SQL 묶음', '메이플 거래: 동시에 교환 💰'],
                    ['COMMIT', '트랜잭션 결과를 DB에 확정 반영', '확정 도장 쾅! 🔨'],
                    ['ROLLBACK', '트랜잭션 결과를 되돌림', 'Ctrl + Z ⏪'],
                    ['갱신 이상', '중복 데이터 일부만 수정 → 불일치', '조정식 → 조증식 일부만 변경'],
                  ].map(([term, desc, analogy]) => (
                    <tr key={term}>
                      <td><strong>{term}</strong></td>
                      <td>{desc}</td>
                      <td>{analogy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ─── 연관관계 ─── */}
          <section className="mb-12" data-section="relations" id="relations">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: 'hsl(var(--track-ai-beginner) / 0.1)' }}
              >
                🔗
              </div>
              <h2 className="text-[22px] font-[750] tracking-[-0.02em] m-0 text-foreground">
                연관관계 한눈에 보기
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
              {[
                {
                  emoji: '💑',
                  title: '1:1 관계',
                  desc: '하나의 레코드가 상대방 테이블의 <strong>딱 하나</strong>와 연결<br><br><span style="color:hsl(var(--muted-foreground))">예: 수업 ↔ 수업 상세정보</span><br><span style="color:hsl(var(--muted-foreground))">FK 위치: 어느 쪽이든 OK</span>',
                },
                {
                  emoji: '👨‍👦‍👦',
                  title: '1:N 관계',
                  desc: '하나의 레코드가 상대방의 <strong>여러 개</strong>와 연결<br><br><span style="color:hsl(var(--muted-foreground))">예: 선생님(1) → 수업(N)</span><br><span style="color:hsl(var(--muted-foreground))">FK 위치: <strong>N쪽</strong> 테이블에!</span>',
                },
                {
                  emoji: '👨‍👨‍👧‍👧',
                  title: 'M:N 관계',
                  desc: '양쪽 모두 상대방의 <strong>여러 개</strong>와 연결<br><br><span style="color:hsl(var(--muted-foreground))">예: 학생(M) ↔ 수업(N)</span><br><span style="color:hsl(var(--muted-foreground))">→ <strong>연결 테이블</strong> 별도 생성!</span>',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="p-5 rounded-xl bg-card border border-border hover:border-border/80 transition-all hover:-translate-y-0.5"
                >
                  <div className="text-2xl mb-2">{card.emoji}</div>
                  <div className="font-bold text-[15px] mb-1 text-foreground">{card.title}</div>
                  <div
                    className="text-[13px] text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: card.desc }}
                  />
                </div>
              ))}
            </div>
            <CodeBlock lang="SQL — 1:N 관계 (FK를 N쪽에)">
              {`<span class="kw">CREATE TABLE</span> <span class="tb">class</span> (
    id         <span class="fn">INT</span> <span class="kw">AUTO_INCREMENT PRIMARY KEY</span>,
    name       <span class="fn">VARCHAR</span>(<span class="nb">30</span>) <span class="kw">NOT NULL</span>,
    teacher_id <span class="fn">INT</span> <span class="kw">NOT NULL</span>,
    <span class="kw">FOREIGN KEY</span> (teacher_id) <span class="kw">REFERENCES</span> <span class="tb">teacher</span>(id)
);`}
            </CodeBlock>
            <CodeBlock lang="SQL — M:N 관계 (연결 테이블)">
              {`<span class="kw">CREATE TABLE</span> <span class="tb">student_class</span> (
    student_id <span class="fn">INT</span> <span class="kw">NOT NULL</span>,
    class_id   <span class="fn">INT</span> <span class="kw">NOT NULL</span>,
    <span class="kw">FOREIGN KEY</span> (student_id) <span class="kw">REFERENCES</span> <span class="tb">student</span>(id),
    <span class="kw">FOREIGN KEY</span> (class_id)   <span class="kw">REFERENCES</span> <span class="tb">class</span>(id)
);`}
            </CodeBlock>
          </section>

          {/* ─── ACID ─── */}
          <section className="mb-12" data-section="acid" id="acid">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: 'hsl(var(--badge-premium) / 0.1)' }}
              >
                🛡️
              </div>
              <h2 className="text-[22px] font-[750] tracking-[-0.02em] m-0 text-foreground">ACID 성질</h2>
              <span className="text-[13px] text-muted-foreground font-normal ml-auto">
                트랜잭션의 4가지 안전 보장
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {[
                {
                  letter: 'A',
                  color: 'hsl(var(--badge-soon))',
                  title: '원자성',
                  desc: '전부 반영되거나, 전혀 반영 안 되거나.<br><strong>All or Nothing</strong>',
                  note: '🎮 메이플 거래: 돈만 빠지고 아이템 안 오는 일은 없다',
                },
                {
                  letter: 'C',
                  color: 'hsl(var(--primary))',
                  title: '일관성',
                  desc: '작업 전후로 데이터 규칙이 항상 지켜짐',
                  note: '🍛 배민: 재고보다 더 많이 주문되면 안 된다',
                },
                {
                  letter: 'I',
                  color: 'hsl(var(--badge-free))',
                  title: '격리성',
                  desc: '동시 실행되는 트랜잭션끼리 서로 간섭 불가',
                  note: '🏧 내 거래 끝나기 전에 다른 사람이 끼어들 수 없다',
                },
                {
                  letter: 'D',
                  color: 'hsl(var(--badge-premium))',
                  title: '지속성',
                  desc: '커밋된 결과는 영구적으로 보존',
                  note: '💾 DB가 꺼져도 데이터는 살아있다',
                },
              ].map((item) => (
                <div
                  key={item.letter}
                  className="p-5 rounded-xl bg-card border border-border hover:border-border/80 transition-all"
                >
                  <div className="font-bold text-[15px] mb-2 text-foreground">
                    <span style={{ color: item.color, fontSize: '18px' }}>{item.letter}</span>
                    &ensp;{item.title}
                  </div>
                  <div
                    className="text-[13px] text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: `${item.desc}<br><br><span style="color:hsl(var(--muted-foreground))">${item.note}</span>`,
                    }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ─── 데이터 타입 ─── */}
          <section className="mb-12" data-section="types" id="types">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: 'hsl(var(--track-ai-developer) / 0.1)' }}
              >
                🏷️
              </div>
              <h2 className="text-[22px] font-[750] tracking-[-0.02em] m-0 text-foreground">데이터 타입 요약</h2>
              <span className="text-[13px] text-muted-foreground font-normal ml-auto">자주 쓰는 것만!</span>
            </div>
            <div className="dw-table overflow-x-auto rounded-xl border border-border bg-card">
              <table>
                <thead>
                  <tr>
                    <th>저장할 데이터</th>
                    <th>추천 타입</th>
                    <th>예시</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['정수 (나이, 번호)', 'INT', 'age INT'],
                    ['실수 (키, 가격)', 'FLOAT / DOUBLE', 'height FLOAT'],
                    ['짧은 문자열 (이름)', 'VARCHAR(길이)', 'name VARCHAR(30)'],
                    ['긴 문자열 (설명)', 'TEXT', 'description TEXT'],
                    ["정해진 값만 (성별)", "ENUM", "gender ENUM('M','F')"],
                    ['날짜', 'DATE', 'birth_date DATE'],
                    ['날짜 + 시간', 'DATETIME', 'created_at DATETIME'],
                    ['참 / 거짓', 'BOOLEAN', 'is_graduated BOOLEAN'],
                  ].map(([what, type, ex]) => (
                    <tr key={what}>
                      <td>{what}</td>
                      <td><code>{type}</code></td>
                      <td><code>{ex}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ─── 제약조건 ─── */}
          <section className="mb-12" data-section="constraints" id="constraints">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: 'hsl(var(--destructive) / 0.1)' }}
              >
                🔒
              </div>
              <h2 className="text-[22px] font-[750] tracking-[-0.02em] m-0 text-foreground">제약조건 요약</h2>
            </div>
            <div className="dw-table overflow-x-auto rounded-xl border border-border bg-card">
              <table>
                <thead>
                  <tr>
                    <th>제약조건</th>
                    <th>효과</th>
                    <th>예시</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['NOT NULL', '빈 값(NULL) 저장 불가', 'name VARCHAR(30) NOT NULL'],
                    ['UNIQUE', '중복 값 저장 불가 (NULL은 허용)', 'email VARCHAR(50) UNIQUE'],
                    ['PRIMARY KEY', 'NOT NULL + UNIQUE. 테이블당 1개', 'id INT PRIMARY KEY'],
                    ['FOREIGN KEY', '다른 테이블의 PK를 참조', 'FOREIGN KEY (teacher_id) REFERENCES teacher(id)'],
                    ['DEFAULT', '값 안 넣으면 기본값 자동 저장', 'is_graduated BOOLEAN DEFAULT FALSE'],
                    ['AUTO_INCREMENT', '레코드 생성 시 숫자 자동 증가', 'id INT AUTO_INCREMENT PRIMARY KEY'],
                  ].map(([constraint, effect, ex]) => (
                    <tr key={constraint}>
                      <td><code>{constraint}</code></td>
                      <td>{effect}</td>
                      <td><code>{ex}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ─── AI 검증 체크리스트 ─── */}
          <section className="mb-12" data-section="ai-check" id="ai-check">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: 'hsl(var(--badge-soon) / 0.1)' }}
              >
                🤖
              </div>
              <h2 className="text-[22px] font-[750] tracking-[-0.02em] m-0 text-foreground">
                AI 검증 체크리스트
              </h2>
              <span className="text-[13px] text-muted-foreground font-normal ml-auto">
                실행 전 5초 확인!
              </span>
            </div>

            <Callout type="tip" icon="👑">
              AI가 쿼리를 짜줬다면, <strong>복사해서 바로 실행하지 마세요!</strong>
              <br />
              아래 5가지만 빠르게 확인하면 대참사를 막을 수 있습니다.
            </Callout>

            <ul className="dw-checklist">
              {[
                'JOIN 종류가 맞는가? — 교집합이면 INNER, 한쪽 전부면 LEFT',
                'WHERE 조건이 있는가? — UPDATE/DELETE에 WHERE 없으면 🚨 전체 변경',
                'LIMIT이 있는가? — 데이터 많은 테이블에서 SELECT * 하면 서버 과부하',
                '테이블 관계가 맞는가? — M:N인데 FK 하나만 있으면 설계 오류',
                'EXPLAIN 떠봤는가? — type이 ALL이면 인덱스 필요',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="mt-7 mb-7">
              <h3 className="text-base font-bold mb-3 text-foreground">AI한테 더 똑똑하게 질문하는 법</h3>
              <CodeBlock lang="❌ 나쁜 프롬프트">
                {`<span class="cm">"학생 데이터 조회하는 쿼리 짜줘"</span>`}
              </CodeBlock>
              <CodeBlock lang="✅ 좋은 프롬프트">
                {`<span class="st">"student 테이블에서 class가 1이고 height가 170 이상인
학생의 name과 height를 키 내림차순으로 상위 10명만
조회하는 쿼리 짜줘.
인덱스는 (class, height)에 복합 인덱스가 걸려있어."</span>`}
              </CodeBlock>
              <Callout type="info" icon="🎯">
                <strong>핵심:</strong> 테이블 구조 + 조건 + 정렬 + 제한 + 인덱스 정보를 같이 주면
                AI가 훨씬 정확한 쿼리를 짜줍니다!
              </Callout>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <div className="text-center px-8 py-10 border-t border-border text-[13px] text-muted-foreground">
        <p>
          여러분은 이제 AI가 짜준 쿼리를 검증하는{' '}
          <strong className="text-foreground">&apos;사령관&apos;</strong>입니다 🔥
        </p>
        <p className="mt-1.5">
          이 치트시트를 옆에 두고, AI의 결과물을 평가하고 승인하는 연습을 해보세요.
        </p>
      </div>
    </>
  )
}
