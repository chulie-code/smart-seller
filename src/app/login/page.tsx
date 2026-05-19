import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import { login } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "로그인",
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/");

  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <AuthForm mode="login" action={login} />
      </div>
    </section>
  );
}
