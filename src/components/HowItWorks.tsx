import { processSteps } from "@/data/process";

export default function HowItWorks() {
  return (
    <section id="how" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
            사진 보내면, 엑셀로 돌아옵니다
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            셀러가 직접 하는 일은 사진과 키워드 전달뿐.
            <br className="hidden sm:block" />
            나머지는 모두 AI와 운영팀이 처리합니다.
          </p>
        </div>
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, idx) => (
            <li
              key={s.step}
              className="relative rounded-2xl border border-line bg-canvas p-6"
            >
              <span className="font-display text-3xl font-black text-brand">
                {s.step}
              </span>
              {idx < processSteps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute right-3 top-7 hidden text-2xl text-line lg:block"
                >
                  →
                </span>
              )}
              <h3 className="mt-3 text-base font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
