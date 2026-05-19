import Link from "next/link";
import { site } from "@/data/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink sm:text-xl"
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white shadow-sm"
          >
            S
          </span>
          {site.brandName}
        </Link>
        <nav className="hidden sm:block">
          <ul className="flex items-center gap-1 text-sm font-medium text-muted">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3 py-1.5 transition-colors hover:bg-soft hover:text-brand-deep"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={site.ctaPrimary.href}
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
        >
          무료 상담 신청
        </a>
      </div>
    </header>
  );
}
