import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { studentSteps } from "@/lib/how-it-works";

export function HowItWorksPreview() {
  return (
    <section id="how-it-works" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#648147]">How it works</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[#19342c] text-balance sm:text-4xl">From search to a tutor request</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#77827b] text-pretty sm:text-base">Find a listing, send a request, then follow its status from your dashboard.</p>
          </div>
          <Link href="/how-it-works" className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-[#42634c] transition-colors duration-300 hover:text-[#19342c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#648147]">
            See the full guide <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-x-8 md:grid-cols-2">
          {studentSteps.map((step) => (
            <article key={step.number} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-[#e6e9e1] py-6 sm:gap-6">
              <span className="text-2xl font-semibold tracking-tight text-[#8da56b]">{step.number}</span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-[#203b31]">{step.title}</h3>
                <p className="mt-2 max-w-lg text-sm leading-6 text-[#77827b]">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
