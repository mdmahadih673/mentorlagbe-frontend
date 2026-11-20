import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpenCheck,
  Check,
  CreditCard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function StudentPaymentPage({ isPro }: { isPro: boolean }) {
  if (isPro) {
    return (
      <div className="mx-auto max-w-3xl">
        <section className="overflow-hidden rounded-3xl bg-[#1d3b31] p-8 text-white sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#d9f36a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#203b31]">
            <BadgeCheck size={15} /> Pro plan active
          </span>
          <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">You’re already on the Pro plan</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
            Your one-time payment is complete. Your Pro Student plan is active and ready to use.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/tuitions" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#d9f36a] px-5 text-sm font-bold text-[#203b31]">
              Browse tuitions <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard/my-applications" className="inline-flex h-11 items-center rounded-full border border-white/20 px-5 text-sm font-semibold text-white">
              My applications
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#78934c]">
            <CreditCard size={15} /> Student workspace
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#203b31] sm:text-4xl">
            Plans &amp; payment
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#77827b]">
            Choose a plan to support your learning journey with MentorLagbe.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#dce5d3] bg-white px-3.5 py-2 text-xs font-semibold text-[#526159]">
          <span className="size-2 rounded-full bg-[#91aa78]" /> Current plan: Free
        </span>
      </header>

      <section className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
        <article className="flex flex-col rounded-3xl border border-[#e3e8dd] bg-white p-6 sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#89928b]">Starter plan</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#203b31]">Free</h2>
            </div>
            <span className="flex size-11 items-center justify-center rounded-2xl bg-[#f1f4eb] text-[#65824b]">
              <BookOpenCheck size={20} />
            </span>
          </div>
          <p className="mt-5 text-sm leading-6 text-[#77827b]">
            Browse tuition listings and send applications to tutors.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-[#526159]">
            <PlanFeature>Browse tuition listings</PlanFeature>
            <PlanFeature>Apply to tuition posts</PlanFeature>
            <PlanFeature>Track your applications</PlanFeature>
          </ul>
          <div className="mt-auto border-t border-[#edf0e9] pt-5">
            <p className="text-sm font-semibold text-[#526159]">Your current plan</p>
          </div>
        </article>

        <article className="relative overflow-hidden rounded-3xl bg-[#1d3b31] p-6 text-white sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-10 -top-14 size-52 rounded-full border border-white/10" />
          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d9f36a] px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-[#203b31]">
                <Sparkles size={12} /> For dedicated learners
              </span>
              <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Pro Student</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-white/65">
                Get more from your tutor search with the Pro Student plan.
              </p>
            </div>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-[#d9f36a]">
              <BadgeCheck size={23} />
            </span>
          </div>
          <div className="relative mt-7 flex items-end gap-2">
            <span className="text-5xl font-semibold tracking-tight">$10</span>
            <span className="pb-1.5 text-sm text-white/60">one-time payment</span>
          </div>
          <ul className="relative mt-7 grid gap-3 text-sm text-white/85 sm:grid-cols-2">
            <PlanFeature pro>Pro Student plan access</PlanFeature>
            <PlanFeature pro>Track your applications</PlanFeature>
            <PlanFeature pro>One-time payment</PlanFeature>
            <PlanFeature pro>Secure Stripe checkout</PlanFeature>
          </ul>
          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <form action="/api/student/checkout_sessions" method="POST">
              <button type="submit" className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#d9f36a] px-5 text-sm font-bold text-[#203b31] transition hover:bg-[#e5ff82]">
                Upgrade to Pro <ArrowUpRight size={16} />
              </button>
            </form>
            <span className="text-xs text-white/50">One-time secure payment with Stripe</span>
          </div>
          <div className="relative mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/60">
            <ShieldCheck size={14} className="text-[#d9f36a]" />
            <span>Secure checkout powered by</span>
            <span className="font-bold tracking-wide text-white">Stripe</span>
          </div>
        </article>
      </section>
    </div>
  );
}

function PlanFeature({ children, pro = false }: { children: React.ReactNode; pro?: boolean }) {
  return (
    <li className="flex items-start gap-2.5">
      <Check size={16} className={`mt-0.5 shrink-0 ${pro ? "text-[#d9f36a]" : "text-[#78934c]"}`} />
      <span>{children}</span>
    </li>
  );
}
