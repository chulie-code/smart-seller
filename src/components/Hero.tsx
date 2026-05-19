import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--color-soft)_0%,_transparent_55%),_radial-gradient(ellipse_at_bottom_left,_var(--color-accent-soft)_0%,_transparent_55%)]" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-soft px-3 py-1 text-xs font-semibold tracking-wider text-brand-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            스마트스토어 · 쿠팡 · 11번가 전용
          </span>
          <h1 className="text-4xl font-black leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
            매출에 집중하세요.
            <br />
            <span className="text-brand-deep">상품 등록은 AI</span>가 합니다.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted sm:text-lg">
            {site.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href={site.ctaPrimary.href}
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark sm:text-base"
            >
              {site.ctaPrimary.label} →
            </a>
            <a
              href={site.ctaSecondary.href}
              className="rounded-full border border-line bg-canvas px-6 py-3 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-brand hover:text-brand-deep sm:text-base"
            >
              {site.ctaSecondary.label}
            </a>
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-subtle">
            <li className="flex items-center gap-1.5">
              <span className="text-brand">✓</span> 첫 상품 무료 샘플
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-brand">✓</span> 24시간 이내 납품
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-brand">✓</span> 일괄등록 엑셀 제공
            </li>
          </ul>
        </div>
        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand/15 via-accent/10 to-transparent blur-2xl" />
      <div className="rounded-2xl border border-line bg-canvas p-5 shadow-xl shadow-ink/5">
        <div className="flex items-center gap-1.5 border-b border-line pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-2 text-xs text-subtle">상품등록_샘플.xlsx</span>
        </div>
        <div className="mt-4 space-y-3 text-sm">
          <Row label="상품명">
            <Highlight>[1+1] 열에 강한 식품용 실리콘 주걱 230℃ 베이킹 요리 도구</Highlight>
          </Row>
          <Row label="카테고리">
            주방용품 &gt; 조리도구 &gt; 주걱·뒤집개 &gt; <Highlight>실리콘주걱</Highlight>
          </Row>
          <Row label="태그">
            실리콘주걱 · 베이킹주걱 · 내열주걱 · 1+1주걱 · 식품용실리콘
          </Row>
          <Row label="상세설명">
            230℃까지 견디는 식품용 실리콘으로 뜨거운 팬에서도 변형 없이…
          </Row>
        </div>
        <div className="mt-5 flex items-center justify-between rounded-lg bg-soft px-3 py-2 text-xs font-medium text-brand-deep">
          <span>AI 채움 완료 · 4/4 필드</span>
          <span>24h 안에 납품</span>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[80px_1fr] items-start gap-2">
      <span className="rounded bg-mist px-2 py-1 text-xs font-medium text-subtle">
        {label}
      </span>
      <span className="leading-6 text-ink/90">{children}</span>
    </div>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="rounded bg-soft px-1 text-brand-deep">{children}</span>;
}
