import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CircleHelp,
  LockKeyhole,
  ShieldX,
} from "lucide-react";

export const instant = false;

export default function UnauthorizedPage() {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-3rem)] items-center justify-center overflow-hidden bg-[#f5f6f1] px-5 py-12 text-[#19342c] sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 size-80 rounded-full border border-[#dfe7d6]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full border border-[#e8eddf]"
      />

      <section className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-[#e2e7de] bg-white shadow-[0_28px_90px_-56px_rgba(29,59,49,.3)]">
        <div className="grid md:grid-cols-[.85fr_1.15fr]">
          <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-[#1d3b31] p-8 text-white sm:p-12">
            <div
              aria-hidden="true"
              className="absolute size-64 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute size-44 rounded-full border border-white/10"
            />
            <div className="relative flex size-28 items-center justify-center rounded-[2rem] bg-[#d9f36a] text-[#1d3b31] shadow-[0_20px_60px_-24px_rgba(217,243,106,.65)]">
              <LockKeyhole size={44} strokeWidth={1.5} />
              <span className="absolute -right-2 -top-2 flex size-10 items-center justify-center rounded-2xl border-4 border-[#1d3b31] bg-white text-[#a35e55]">
                <ShieldX size={18} />
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 md:p-12">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f1f5e8] px-3 py-1.5 text-xs font-semibold uppercase tracking-[.12em] text-[#648147]">
              <ShieldX size={14} /> Access restricted
            </p>
            <p className="mt-6 text-sm font-medium text-[#89928b]">Error 403</p>
            <h1 className="mt-2 max-w-lg text-3xl font-semibold leading-tight tracking-tight text-[#203b31] text-balance sm:text-4xl">
              This page isn’t available for your account
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-[#77827b] text-pretty sm:text-base">
              Your account doesn’t have permission to open this area. Head back to your workspace or browse the public tuition listings.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1d3b31] px-5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#315b45] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#648147]"
              >
                Return to workspace <ArrowRight size={16} />
              </Link>
              <Link
                href="/tuitions"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#dfe5dc] bg-white px-5 text-sm font-semibold text-[#354a40] transition-colors duration-300 hover:bg-[#f7f8f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#648147]"
              >
                <BookOpenCheck size={16} /> Browse tuitions
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-2 border-t border-[#edf0e9] pt-5 text-xs text-[#89928b]">
              <CircleHelp size={15} className="shrink-0 text-[#78934c]" />
              <span>If you think this is a mistake, contact MentorLagbe support.</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
