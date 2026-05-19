import Link from "next/link";
import { logout } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";
import { site } from "@/data/site";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
                  href={`/${item.href}`}
                  className="rounded-full px-3 py-1.5 transition-colors hover:bg-soft hover:text-brand-deep"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {user ? <AuthedActions email={user.email ?? ""} /> : <GuestActions />}
      </div>
    </header>
  );
}

function GuestActions() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-mist hover:text-ink sm:px-4"
      >
        로그인
      </Link>
      <Link
        href="/signup"
        className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
      >
        회원가입
      </Link>
    </div>
  );
}

function AuthedActions({ email }: { email: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="hidden max-w-[180px] truncate text-sm text-muted sm:block">
        {email}
      </span>
      <form action={logout}>
        <button
          type="submit"
          className="rounded-full border border-line bg-canvas px-4 py-2 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-brand hover:text-brand-deep"
        >
          로그아웃
        </button>
      </form>
    </div>
  );
}
