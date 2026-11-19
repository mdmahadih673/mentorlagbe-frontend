import Link from "next/link";
import { ArrowRight, BookOpenCheck, Sparkles } from "lucide-react";

import { Navbar } from "@/components/layout/navbar";
import { studentSteps, tutorSteps } from "@/lib/how-it-works";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#19342c]">
      <Navbar />

      <section className="relative overflow-hidden border-b border-[#e8e8df]">
        <div className="pointer-events-none absolute -right-28 -top-32 size-[440px] rounded-full bg-[#e9efcf] opacity-70 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#dfe4d2] bg-white/80 px-3.5 py-2 text-xs font-semibold text-[#456450] shadow-sm sm:text-sm">
              <Sparkles size={15} className="text-[#8cae36]" /> Simple steps, meaningful progress
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-.05em] sm:text-6xl">Good learning starts with a <span className="font-serif italic font-medium text-[#739346]">good connection.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#69756d] sm:text-lg sm:leading-8">MentorLagbe helps students find a tutor who fits, and gives tutors a simple way to share opportunities and meet motivated learners.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/tuitions" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1d3b31] px-6 text-sm font-semibold text-white transition hover:bg-[#315b45]">Browse tuitions <ArrowRight size={17} /></Link>
              <Link href="/sign-up" className="inline-flex h-12 items-center justify-center rounded-full border border-[#d8ded4] bg-white px-6 text-sm font-semibold text-[#284239] transition hover:bg-[#f5f7ef]">Join as a tutor</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#78934c]">For students</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">From searching to your first lesson.</h2>
            <p className="mt-4 text-sm leading-6 text-[#77827b]">Take your time comparing options. Your applications and their status are gathered in your student dashboard.</p>
            <div className="mt-7 rounded-3xl bg-[#1d3b31] p-6 text-white">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-[#d9f36a] text-[#203b31]"><BookOpenCheck size={21} /></span>
              <p className="mt-5 text-lg font-semibold">Your goals set the direction.</p>
              <p className="mt-2 text-sm leading-6 text-white/65">Choose a subject, learning mode, and schedule that work for you.</p>
            </div>
          </div>

          <div className="space-y-4">
            {studentSteps.map((step) => (
              <article key={step.number} className="grid gap-4 rounded-3xl border border-[#e5e8df] bg-white p-5 sm:grid-cols-[64px_1fr] sm:gap-6 sm:p-7">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#eaf0dc] text-sm font-bold text-[#567445]">{step.number}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-[#203b31]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#68766e]">{step.description}</p>
                  <p className="mt-3 border-l-2 border-[#d9e4c5] pl-3 text-sm leading-6 text-[#8a958d]">{step.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8e9e1] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#78934c]">For tutors</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Share what you teach. Meet your next student.</h2>
            <p className="mt-4 text-sm leading-6 text-[#77827b]">Create a clear tuition post, then manage applications from your tutor dashboard.</p>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {tutorSteps.map((step) => (
              <article key={step.number} className="rounded-3xl border border-[#e8e9e1] bg-[#fbfaf7] p-6 sm:p-7">
                <span className="text-sm font-bold tracking-[.12em] text-[#91a86a]">{step.number}</span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-[#203b31]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#77827b]">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-[#eaf0dc] px-7 py-9 sm:flex-row sm:items-center sm:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#78934c]">Take the first step</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-[#19342c]">Find a learning match that feels right.</h2>
          </div>
          <Link href="/tuitions" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1d3b31] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#315b45]">Explore tuitions <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
