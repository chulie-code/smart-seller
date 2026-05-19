import { samplePairs } from "@/data/sample";

export default function BeforeAfter() {
  return (
    <section id="sample" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Before · After
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
            같은 상품, 다른 노출
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            &ldquo;주방용 실리콘 주걱&rdquo; 한 상품을 셀러가 직접 등록한 경우와
            AI 최적화 후를 비교해봤어요.
          </p>
        </div>
        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-canvas shadow-sm">
          <div className="grid grid-cols-[110px_1fr_1fr] border-b border-line bg-mist text-sm font-semibold text-ink sm:grid-cols-[160px_1fr_1fr]">
            <div className="px-4 py-3 sm:px-6">항목</div>
            <div className="border-l border-line px-4 py-3 text-subtle sm:px-6">
              Before · 직접 등록
            </div>
            <div className="border-l border-line bg-soft px-4 py-3 text-brand-deep sm:px-6">
              After · 셀러봇
            </div>
          </div>
          {samplePairs.map((pair, idx) => (
            <div
              key={pair.field}
              className={`grid grid-cols-[110px_1fr_1fr] text-sm sm:grid-cols-[160px_1fr_1fr] ${
                idx < samplePairs.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <div className="px-4 py-4 font-semibold text-ink sm:px-6">
                {pair.field}
              </div>
              <div className="border-l border-line px-4 py-4 leading-6 text-subtle sm:px-6">
                {pair.before}
              </div>
              <div className="border-l border-line bg-soft/40 px-4 py-4 leading-6 text-ink sm:px-6">
                {pair.after}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
