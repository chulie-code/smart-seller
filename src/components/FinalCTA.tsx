import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SeoGeneratorForm from "./SeoGeneratorForm";

export default async function FinalCTA() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) return <MemberAiSection email={user.email ?? ""} />;
  return <GuestCtaSection />;
}

function MemberAiSection({ email }: { email: string }) {
  return (
    <section id="cta" className="bg-mist">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-soft px-3 py-1 text-xs font-semibold tracking-wider text-brand-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            회원 무료 · 무제한 생성
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
            상품 정보를 입력하면, <span className="text-brand-deep">3사 SEO 자료</span>를 한 번에.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-muted">
            스마트스토어 · 쿠팡 · 11번가 각각의 검색 알고리즘에 맞춰 상품명,
            카테고리, 태그, 상세설명과 추천 키워드, SEO 점수까지 AI가 즉시
            만들어드려요. <span className="font-semibold text-ink">{email}</span> 님,
            지금 바로 사용해 보세요.
          </p>
        </div>

        <SeoGeneratorForm />
      </div>
    </section>
  );
}

function GuestCtaSection() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-brand-deep text-white"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.18)_0%,_transparent_55%),_radial-gradient(ellipse_at_bottom_left,_rgba(37,99,235,0.35)_0%,_transparent_55%)]" />
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-white/90 ring-1 ring-white/20">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          회원 가입 시 전부 무료
        </span>
        <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
          가입만 하면 AI 상품 등록 자료를
          <br />
          무제한으로 받아갈 수 있어요.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
          결제·약정 없이, 스마트스토어 · 쿠팡 · 11번가 SEO 자료를 회원 모두에게
          무료로 제공합니다.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-full bg-white px-7 py-3 text-sm font-bold text-brand-deep shadow-sm transition-transform hover:-translate-y-0.5 sm:text-base"
          >
            회원가입하고 무료로 시작 →
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:text-base"
          >
            이미 회원이에요
          </Link>
        </div>
        <p className="mt-4 text-xs text-white/60">
          가입 무료 · 결제 정보 불필요 · 즉시 생성
        </p>
      </div>
    </section>
  );
}
