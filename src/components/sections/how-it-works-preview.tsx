import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { studentSteps } from "@/lib/how-it-works";

export function HowItWorksPreview() {
  return (
    <section id="how-it-works" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#78934c]">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-[#19342c] sm:text-4xl">A clearer path to your next lesson.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#77827b] sm:text-base">Find a tutor, apply with confidence, and keep track of every step in one place.</p>
          </div>
          <Link href="/how-it-works" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#42634c] transition hover:gap-3">
            See the full guide <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {studentSteps.map((step) => (
            <article key={step.number} className="rounded-3xl border border-[#e8e9e1] bg-[#fbfaf7] p-6 transition hover:-translate-y-1 hover:border-[#cbd7bd] hover:shadow-lg hover:shadow-[#1d3b31]/5">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-[#eaf0dc] text-sm font-bold text-[#567445]">{step.number}</span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-[#203b31]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#77827b]">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
