"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { AuthState } from "@/app/auth/actions";

type Props = {
  mode: "login" | "signup";
  action: (
    state: AuthState | undefined,
    formData: FormData,
  ) => Promise<AuthState>;
};

const COPY = {
  login: {
    title: "다시 만나서 반가워요",
    subtitle: "이메일과 비밀번호로 로그인하세요.",
    submit: "로그인",
    altPrompt: "아직 계정이 없으신가요?",
    altLabel: "회원가입",
    altHref: "/signup",
  },
  signup: {
    title: "셀러봇 시작하기",
    subtitle: "이메일로 가입하면 첫 상품 무료 샘플을 받을 수 있어요.",
    submit: "회원가입",
    altPrompt: "이미 계정이 있으신가요?",
    altLabel: "로그인",
    altHref: "/login",
  },
} as const;

export default function AuthForm({ mode, action }: Props) {
  const [state, formAction, isPending] = useActionState<
    AuthState | undefined,
    FormData
  >(action, undefined);
  const copy = COPY[mode];

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-line bg-canvas p-7 shadow-sm sm:p-9">
        <h1 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">
          {copy.title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">{copy.subtitle}</p>

        <form action={formAction} className="mt-7 space-y-4">
          <Field
            label="이메일"
            name="email"
            type="email"
            placeholder="hello@example.com"
            autoComplete="email"
            required
          />
          <Field
            label="비밀번호"
            name="password"
            type="password"
            placeholder="6자 이상"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            minLength={mode === "signup" ? 6 : undefined}
            required
          />

          {state?.error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {state.error}
            </p>
          )}
          {state?.message && (
            <p
              role="status"
              className="rounded-lg border border-brand/30 bg-soft px-3 py-2 text-sm text-brand-deep"
            >
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-brand py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "처리 중..." : copy.submit}
          </button>
        </form>
      </div>

      <p className="mt-5 text-center text-sm text-muted">
        {copy.altPrompt}{" "}
        <Link
          href={copy.altHref}
          className="font-semibold text-brand-deep underline-offset-4 hover:underline"
        >
          {copy.altLabel}
        </Link>
      </p>
    </div>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  const { label, name, ...rest } = props;
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink">{label}</span>
      <input
        name={name}
        {...rest}
        className="mt-1.5 block w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-subtle focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}
