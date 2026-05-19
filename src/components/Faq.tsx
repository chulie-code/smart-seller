import { faqs } from "@/data/faqs";

export default function Faq() {
  return (
    <section id="faq" className="border-b border-line">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
            자주 묻는 질문
          </h2>
        </div>
        <dl className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-bold text-ink sm:text-lg">
                <span>Q. {faq.question}</span>
                <span
                  aria-hidden
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-sm text-subtle transition-transform group-open:rotate-45 group-open:border-brand group-open:text-brand"
                >
                  +
                </span>
              </summary>
              <dd className="mt-3 pr-10 text-sm leading-7 text-muted sm:text-base">
                {faq.answer}
              </dd>
            </details>
          ))}
        </dl>
      </div>
    </section>
  );
}
