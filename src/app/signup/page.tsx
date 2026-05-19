import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import { signup } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "회원가입",
};

export default async function SignupPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/");

  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <AuthForm mode="signup" action={signup} />
      </div>
    </section>
  );
}
