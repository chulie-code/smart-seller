import { site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-mist">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white"
            >
              S
            </span>
            <span className="text-lg font-bold text-ink">{site.brandName}</span>
          </div>
          <p className="text-sm leading-6 text-muted">{site.shortTagline}</p>
        </div>
        <div className="space-y-2 text-sm text-muted">
          <p className="font-medium text-ink">바로가기</p>
          {site.nav.map((item) => (
            <p key={item.href}>
              <a
                href={item.href}
                className="underline-offset-4 hover:underline"
              >
                {item.label}
              </a>
            </p>
          ))}
        </div>
        <div className="space-y-2 text-sm text-muted">
          <p className="font-medium text-ink">문의</p>
          <p>
            <a
              href={site.channels.kakao.url}
              className="underline-offset-4 hover:underline"
            >
              {site.channels.kakao.label}
            </a>
          </p>
          <p className="text-subtle">{site.channels.kakao.hint}</p>
          <p>
            <a
              href={site.channels.email.url}
              className="underline-offset-4 hover:underline"
            >
              {site.channels.email.hint}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-subtle">
        © {year} {site.brandName}. All rights reserved.
      </div>
    </footer>
  );
}
