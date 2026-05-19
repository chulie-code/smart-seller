import { pricingPlans } from "@/data/pricing";

export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-line bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Pricing
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
            등록할 상품 수만큼만 결제
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            구독·약정 없이 필요할 때 필요한 만큼. 첫 상품은 무료 샘플로 확인하고
            결정하세요.
          </p>
        </div>
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <li
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border bg-canvas p-7 shadow-sm ${
                plan.highlight
                  ? "border-brand ring-2 ring-brand/30"
                  : "border-line"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  가장 인기
                </span>
              )}
              <p className="text-sm font-semibold text-subtle">{plan.name}</p>
              <p className="mt-3 font-display text-4xl font-black tracking-tight text-ink">
                {plan.price}
              </p>
              <p className="mt-1 text-xs text-subtle">{plan.unit}</p>
              <p className="mt-4 text-sm leading-6 text-muted">
                {plan.description}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`mt-7 rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-colors ${
                  plan.highlight
                    ? "bg-brand text-white hover:bg-brand-dark"
                    : "border border-line bg-canvas text-ink hover:border-brand hover:text-brand-deep"
                }`}
              >
                {plan.ctaLabel}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-xs text-subtle">
          * 부가세 별도. 결제는 무통장 입금 또는 카드로 안내드립니다.
        </p>
      </div>
    </section>
  );
}
