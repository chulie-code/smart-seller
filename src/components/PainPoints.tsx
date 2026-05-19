import { painPoints } from "@/data/painPoints";

export default function PainPoints() {
  return (
    <section className="border-b border-line bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            이런 분께 추천합니다
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
            상품 등록, 혼자 다 하느라
            <br className="hidden sm:block" />
            지치셨다면
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            온라인 사업을 막 시작한 1인 셀러가 가장 많이 겪는 네 가지 어려움입니다.
            하나라도 해당된다면, 셀러봇이 도와드릴 수 있어요.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {painPoints.map((pain) => (
            <li
              key={pain.title}
              className="rounded-2xl border border-line bg-canvas p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-2xl" aria-hidden>
                {pain.icon}
              </span>
              <h3 className="mt-3 text-lg font-bold text-ink">{pain.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{pain.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
