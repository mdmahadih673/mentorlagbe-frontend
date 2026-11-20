import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpenCheck, CircleCheck } from "lucide-react";

export default function TutorPaymentSuccessPage() {
  return (
    <main className="min-h-[70vh] bg-[#f5f6f1] px-5 py-12 text-[#19342c] sm:py-20">
      <section className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-[#e3e8dd] bg-white shadow-[0_24px_70px_-48px_rgba(29,59,49,.35)]">
        <div className="relative overflow-hidden bg-[#1d3b31] px-6 py-10 text-center text-white sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -left-20 -bottom-32 size-64 rounded-full border border-white/10" />
          <span className="relative mx-auto flex size-16 items-center justify-center rounded-full bg-[#d9f36a] text-[#1d3b31] shadow-lg shadow-black/10">
            <CircleCheck size={34} strokeWidth={1.8} />
          </span>
          <p className="relative mt-6 text-xs font-bold uppercase tracking-[.18em] text-[#d9f36a]">
            Stripe Checkout
          </p>
          <h1 className="relative mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Payment successful
          </h1>
          <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-white/70">
            Thanks for upgrading your tutor account. Your payment was completed
            through Stripe Checkout.
          </p>
        </div>

        <div className="px-6 py-7 sm:px-10 sm:py-9">
          <div className="flex items-start gap-4 rounded-2xl border border-[#e5ebdc] bg-[#f8faf4] p-4 sm:p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf0dc] text-[#648147]">
              <BadgeCheck size={22} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-[#203b31]">
                Your Pro Tutor upgrade is being confirmed
              </h2>
              <p className="mt-1 text-sm leading-5 text-[#77827b]">
                Once your payment is synced, you can post unlimited tuition
                listings from your dashboard.
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#1d3b31] px-5 text-sm font-semibold text-white transition hover:bg-[#315b45]"
            >
              Go to dashboard <ArrowRight size={16} />
            </Link>
            <Link
              href="/dashboard/my-tuitions"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[#dfe6d8] bg-white px-5 text-sm font-semibold text-[#315b45] transition hover:bg-[#f6f8f2]"
            >
              <BookOpenCheck size={16} /> My tuitions
            </Link>
          </div>
        </div>
      </section>
      <p className="mx-auto mt-5 max-w-2xl text-center text-xs text-[#89928b]">
        Need help with your payment? Contact the MentorLagbe support team.
      </p>
    </main>
  );
}
