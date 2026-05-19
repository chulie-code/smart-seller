import { features } from "@/data/features";

export default function Features() {
  return (
    <section id="features" className="border-b border-line bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            AI가 채우는 항목
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
            한 번의 의뢰로 6가지가 완성
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            검색 노출부터 구매 전환까지, 상품 페이지에 필요한 모든 콘텐츠를 한
            번에 받아보세요.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <li
              key={f.title}
              className="rounded-2xl border border-line bg-canvas p-6 transition-shadow hover:shadow-md"
            >
              <span
                aria-hidden
                className="inline-grid h-11 w-11 place-items-center rounded-xl bg-soft text-xl"
              >
                {f.icon}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
