export default function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden bg-brand-deep text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.18)_0%,_transparent_55%),_radial-gradient(ellipse_at_bottom_left,_rgba(37,99,235,0.35)_0%,_transparent_55%)]" />
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-white/90 ring-1 ring-white/20">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          첫 상품 무료 샘플
        </span>
        <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
          지금 첫 상품을 보내주시면
          <br />
          AI가 24시간 안에 채워드립니다.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
          상담 신청 후 1영업일 안에 카카오톡으로 회신드려요. 부담 없이 결과물을
          먼저 확인하고 결정하세요.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            className="rounded-full bg-white px-7 py-3 text-sm font-bold text-brand-deep shadow-sm transition-transform hover:-translate-y-0.5 sm:text-base"
          >
            무료 샘플 신청하기 →
          </a>
          <a
            href="#"
            className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:text-base"
          >
            카카오톡으로 상담
          </a>
        </div>
        <p className="mt-6 text-xs text-white/60">
          신청은 무료 · 약정 없음 · 결과물 확인 후 결정하세요
        </p>
      </div>
    </section>
  );
}
