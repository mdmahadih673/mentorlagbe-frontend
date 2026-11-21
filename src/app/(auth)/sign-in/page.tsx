"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, BookOpenCheck, Eye, EyeOff, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";

import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { toast } from "@/components/ui/toast";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      const { error } = await signIn.email({
        email: String(formData.get("email") ?? "").trim(),
        password: String(formData.get("password") ?? ""),
        rememberMe: formData.get("rememberMe") === "on",
        callbackURL: "/dashboard",
      });

      if (error) {
        const message = error.message || "Invalid email or password.";
        setFormError(message);
        toast.add({ title: "Sign-in failed", description: message, type: "error" });
        return;
      }

      toast.add({ title: "Signed in", description: "Welcome back to MentorLagbe.", type: "success" });
      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setFormError(message);
      toast.add({ title: "Sign-in failed", description: message, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#19342c]">
      <div className="mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-2">
        <section className="flex flex-col px-5 py-6 sm:px-10 lg:px-14 xl:px-20">
          <Link href="/" className="flex w-fit items-center gap-2.5" aria-label="MentorLagbe home">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#d9f36a] text-[#18372e]"><BookOpenCheck size={22} /></span>
            <span className="text-xl font-extrabold tracking-tight">Mentor<span className="text-[#4b7c59]">Lagbe</span></span>
          </Link>

          <div className="flex flex-1 items-center justify-center py-12">
            <div className="w-full max-w-[430px]">
              <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#748078] transition hover:text-[#315b45]"><ArrowLeft size={16} /> Back to home</Link>
              <div className="mb-8">
                <p className="text-sm font-semibold text-[#78934c]">Welcome back</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Sign in to your account</h1>
                <p className="mt-3 text-sm leading-6 text-[#77827b]">Pick up where you left off and keep moving toward your goals.</p>
              </div>

              <SocialAuthButtons />

              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block text-sm font-semibold text-[#354a40]" htmlFor="signin-email">
                  Email address
                  <input id="signin-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required className="mt-2 h-12 w-full rounded-xl border border-[#e0e5dc] bg-white px-4 font-normal text-[#203b31] outline-none transition placeholder:text-[#a0aaa3] focus:border-[#91aa78] focus:ring-4 focus:ring-[#91aa78]/10" />
                </label>
                <label className="block text-sm font-semibold text-[#354a40]" htmlFor="signin-password">
                  Password
                  <span className="relative mt-2 block">
                    <input id="signin-password" name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" autoComplete="current-password" required className="h-12 w-full rounded-xl border border-[#e0e5dc] bg-white px-4 pr-12 font-normal text-[#203b31] outline-none transition placeholder:text-[#a0aaa3] focus:border-[#91aa78] focus:ring-4 focus:ring-[#91aa78]/10" />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword((visible) => !visible)}
                      className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center text-[#98a39b] hover:text-[#456450]"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </span>
                </label>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <label className="inline-flex items-center gap-2 text-[#68766e]"><input name="rememberMe" type="checkbox" defaultChecked className="size-4 rounded border-[#d7dfd4] accent-[#315b45]" /> Remember me</label>
                  <span className="font-medium text-[#a1aaa3]">Forgot password?</span>
                </div>
                {formError && <p role="alert" className="text-sm text-red-700">{formError}</p>}
                <button type="submit" disabled={isSubmitting} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1d3b31] px-5 text-sm font-semibold text-white transition hover:bg-[#315b45] disabled:cursor-not-allowed disabled:opacity-60">
                  {isSubmitting ? "Signing in…" : <>Sign in <ArrowRight size={17} /></>}
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-[#77827b]">New to MentorLagbe? <Link href="/sign-up" className="font-semibold text-[#456b4d] hover:underline">Create an account</Link></p>
              <p className="mt-10 flex items-center justify-center gap-2 text-xs text-[#8a958d]"><ShieldCheck size={15} /> Your learning journey is in safe hands</p>
            </div>
          </div>
        </section>

        <aside className="relative hidden overflow-hidden bg-[#1d3b31] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div className="absolute -right-32 -top-32 size-[480px] rounded-full border border-white/10" />
          <div className="absolute -right-12 -top-12 size-[320px] rounded-full border border-white/10" />
          <div className="relative flex items-center gap-2 text-sm font-medium text-white/70"><GraduationCap size={19} /> A better way to learn</div>
          <div className="relative max-w-lg">
            <span className="mb-7 flex size-14 items-center justify-center rounded-2xl bg-[#d9f36a] text-[#203b31]"><Sparkles size={25} /></span>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">Small steps. Strong foundations. <span className="text-[#d9f36a]">Big futures.</span></h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/65">Find a mentor who understands your goals and helps you build confidence one lesson at a time.</p>
          </div>
          <p className="relative text-xs text-white/45">© 2026 MentorLagbe · Learn with confidence</p>
        </aside>
      </div>
    </main>
  );
}
