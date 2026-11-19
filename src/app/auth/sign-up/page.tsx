"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, BookOpenCheck, Eye, EyeOff, GraduationCap, Sparkles } from "lucide-react";

import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { toast } from "@/components/ui/toast";
import { signUp } from "@/lib/auth-client";

type AuthRole = "student" | "tutor";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<AuthRole>("student");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      const { error } = await signUp.email({
        name: String(formData.get("name") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        password: String(formData.get("password") ?? ""),
        role,
      });

      if (error) {
        const message = error.message || "Unable to create your account.";
        setFormError(message);
        toast.add({ title: "Sign-up failed", description: message, type: "error" });
        return;
      }

      toast.add({ title: "Account created", description: "Welcome to MentorLagbe.", type: "success" });
      router.replace("/");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again.";
      setFormError(message);
      toast.add({ title: "Sign-up failed", description: message, type: "error" });
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
              <Link href="/" className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[#748078] transition hover:text-[#315b45]"><ArrowLeft size={16} /> Back to home</Link>
              <div className="mb-7">
                <p className="text-sm font-semibold text-[#78934c]">Start your journey</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Create your account</h1>
                <p className="mt-3 text-sm leading-6 text-[#77827b]">Join a community that makes learning more personal.</p>
              </div>

              <SocialAuthButtons role={role} />

              <form onSubmit={handleSubmit} className="space-y-4">
                <fieldset>
                  <legend className="mb-2 text-sm font-semibold text-[#354a40]">I want to join as a</legend>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-sm font-semibold transition ${role === "student" ? "border-[#a9bd9e] bg-[#f2f6e9] text-[#315b45]" : "border-[#e0e5dc] bg-white text-[#536159] hover:border-[#a9bd9e]"}`}>
                      <input type="radio" name="role" value="student" checked={role === "student"} onChange={() => setRole("student")} className="accent-[#315b45]" />
                      <span className="flex size-9 items-center justify-center rounded-lg bg-white"><GraduationCap size={19} /></span>
                      Student
                    </label>
                    <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-sm font-semibold transition ${role === "tutor" ? "border-[#a9bd9e] bg-[#f2f6e9] text-[#315b45]" : "border-[#e0e5dc] bg-white text-[#536159] hover:border-[#a9bd9e]"}`}>
                      <input type="radio" name="role" value="tutor" checked={role === "tutor"} onChange={() => setRole("tutor")} className="accent-[#315b45]" />
                      <span className="flex size-9 items-center justify-center rounded-lg bg-white"><BookOpenCheck size={18} /></span>
                      Tutor
                    </label>
                  </div>
                </fieldset>

                <label className="block text-sm font-semibold text-[#354a40]" htmlFor="signup-name">
                  Full name
                  <input id="signup-name" name="name" type="text" placeholder="Your name" autoComplete="name" required className="mt-2 h-11 w-full rounded-xl border border-[#e0e5dc] bg-white px-4 font-normal text-[#203b31] outline-none transition placeholder:text-[#a0aaa3] focus:border-[#91aa78] focus:ring-4 focus:ring-[#91aa78]/10" />
                </label>
                <label className="block text-sm font-semibold text-[#354a40]" htmlFor="signup-email">
                  Email address
                  <input id="signup-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required className="mt-2 h-11 w-full rounded-xl border border-[#e0e5dc] bg-white px-4 font-normal text-[#203b31] outline-none transition placeholder:text-[#a0aaa3] focus:border-[#91aa78] focus:ring-4 focus:ring-[#91aa78]/10" />
                </label>
                <label className="block text-sm font-semibold text-[#354a40]" htmlFor="signup-password">
                  Password
                  <span className="relative mt-2 block">
                    <input id="signup-password" name="password" type={showPassword ? "text" : "password"} placeholder="At least 8 characters" autoComplete="new-password" minLength={8} maxLength={128} required className="h-11 w-full rounded-xl border border-[#e0e5dc] bg-white px-4 pr-12 font-normal text-[#203b31] outline-none transition placeholder:text-[#a0aaa3] focus:border-[#91aa78] focus:ring-4 focus:ring-[#91aa78]/10" />
                    <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center text-[#98a39b] hover:text-[#456450]">
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </span>
                </label>

                {formError && <p role="alert" className="text-sm text-red-700">{formError}</p>}
                <button type="submit" disabled={isSubmitting} className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1d3b31] px-5 text-sm font-semibold text-white transition hover:bg-[#315b45] disabled:cursor-not-allowed disabled:opacity-60">
                  {isSubmitting ? "Creating account…" : <>Create account <ArrowRight size={17} /></>}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-[#77827b]">Already have an account? <Link href="/auth/sign-in" className="font-semibold text-[#456b4d] hover:underline">Sign in</Link></p>
              <p className="mt-4 text-center text-xs leading-5 text-[#929c95]">By joining, you agree to our <span className="font-medium text-[#63776a]">Terms of Service</span> and <span className="font-medium text-[#63776a]">Privacy Policy</span>.</p>
            </div>
          </div>
        </section>

        <aside className="relative hidden overflow-hidden bg-[#1d3b31] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div className="absolute -right-32 -top-32 size-[480px] rounded-full border border-white/10" />
          <div className="absolute -right-12 -top-12 size-[320px] rounded-full border border-white/10" />
          <div className="absolute -bottom-40 -left-20 size-[420px] rounded-full bg-[#78934b]/20 blur-3xl" />
          <div className="relative flex items-center gap-2 text-sm font-medium text-white/70"><GraduationCap size={19} /> A better way to learn</div>
          <div className="relative max-w-lg">
            <span className="mb-7 flex size-14 items-center justify-center rounded-2xl bg-[#d9f36a] text-[#203b31]"><Sparkles size={25} /></span>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-.04em] xl:text-5xl">Make room for <span className="font-serif italic text-[#d9f36a]">what’s possible.</span></h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/65">Whether you’re here to learn or teach, your next meaningful connection starts here.</p>
            <div className="mt-10 grid grid-cols-2 gap-3 border-t border-white/15 pt-6">
              <div><p className="text-2xl font-semibold">1:1</p><p className="mt-1 text-sm text-white/55">Personal guidance</p></div>
              <div><p className="text-2xl font-semibold">Your pace</p><p className="mt-1 text-sm text-white/55">Learning that fits</p></div>
            </div>
          </div>
          <p className="relative text-xs text-white/45">© 2026 MentorLagbe · Learn with confidence</p>
        </aside>
      </div>
    </main>
  );
}
