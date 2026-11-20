import {
  ArrowUpRight,
  BadgeCheck,
  BookOpenCheck,
  Check,
  CreditCard,
  Infinity as InfinityIcon,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function TutorPaymentPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#78934c]">
            <CreditCard size={15} /> Tutor workspace
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#203b31] sm:text-4xl">
            Plans &amp; billing
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#77827b]">
            Choose a plan that fits your tutoring journey and grow your reach
            with MentorLagbe.
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
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#89928b]">
                Starter plan
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[#203b31]">Free</h2>
            </div>
            <span className="flex size-11 items-center justify-center rounded-2xl bg-[#f1f4eb] text-[#65824b]">
              <BookOpenCheck size={20} />
            </span>
          </div>
          <p className="mt-5 text-sm leading-6 text-[#77827b]">
            Start sharing your tuition listings and meet learners looking for
            your guidance.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-[#526159]">
            <PlanFeature>Up to 2 tuition posts</PlanFeature>
            <PlanFeature>Manage student requests</PlanFeature>
            <PlanFeature>Standard tutor profile</PlanFeature>
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
                <Sparkles size={12} /> For growing tutors
              </span>
              <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Pro Tutor</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-white/65">
                More room to grow your student community and showcase your
                tutoring experience.
              </p>
            </div>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-[#d9f36a]">
              <BadgeCheck size={23} />
            </span>
          </div>
          <div className="relative mt-7 flex items-end gap-2">
            <span className="text-5xl font-semibold tracking-tight">$15</span>
            <span className="pb-1.5 text-sm text-white/60">/ month</span>
          </div>
          <ul className="relative mt-7 grid gap-3 text-sm text-white/85 sm:grid-cols-2">
            <PlanFeature pro>Unlimited tuition posts</PlanFeature>
            <PlanFeature pro>Verified tutor badge</PlanFeature>
            <PlanFeature pro>Manage all applicants</PlanFeature>
            <PlanFeature pro>More room to grow</PlanFeature>
          </ul>
          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              disabled
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#d9f36a] px-5 text-sm font-bold text-[#203b31] opacity-70"
            >
              Upgrade to Pro <ArrowUpRight size={16} />
            </button>
            <span className="text-xs text-white/50">Checkout will be available soon</span>
          </div>
          <div className="relative mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/60">
            <ShieldCheck size={14} className="text-[#d9f36a]" />
            <span>Secure checkout powered by</span>
            <span className="font-bold tracking-wide text-white">stripe</span>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-[#e3e8dd] bg-white p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef3e5] text-[#65824b]">
            <ShieldCheck size={21} />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-[#203b31]">Secure payments powered by Stripe</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#77827b]">
              Your plan and billing details will appear here after checkout is
              connected. Payments are designed to be processed securely.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function PlanFeature({
  children,
  pro = false,
}: {
  children: React.ReactNode;
  pro?: boolean;
}) {
  return (
    <li className="flex items-start gap-2.5">
      {pro ? (
        <Check size={16} className="mt-0.5 shrink-0 text-[#d9f36a]" />
      ) : children === "Up to 2 tuition posts" ? (
        <InfinityIcon size={16} className="mt-0.5 shrink-0 text-[#78934c]" />
      ) : (
        <Check size={16} className="mt-0.5 shrink-0 text-[#78934c]" />
      )}
      <span>{children}</span>
    </li>
  );
}
