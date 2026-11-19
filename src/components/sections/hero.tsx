import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fbfaf7] text-[#19342c]">
      <div className="pointer-events-none absolute -left-40 top-24 size-96 rounded-full bg-[#e9efcf] opacity-70 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:py-24">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dfe4d2] bg-white/80 px-3.5 py-2 text-xs font-semibold text-[#456450] shadow-sm sm:text-sm">
            <Sparkles size={15} className="text-[#8cae36]" />
            Better learning starts with the right guide
          </div>
          <h1 className="text-5xl font-semibold leading-[1.07] tracking-[-0.055em] sm:text-6xl lg:text-[4.4rem]">
            Find the tutor who helps you{" "}
            <span className="font-serif font-medium italic text-[#739346]">move forward.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#69756d] sm:text-lg sm:leading-8">
            Discover trusted tutors for every subject, goal, and learning style.
            Your next breakthrough begins with one good match.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              nativeButton={false}
              className="h-12 rounded-full bg-[#1d3b31] px-6 text-white shadow-lg shadow-[#1d3b31]/10 hover:bg-[#315b45]"
              render={<Link href="/tuitions" />}
            >
              Explore tutors <ArrowRight />
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              className="h-12 rounded-full border-[#d8ded4] bg-white px-6 text-[#284239] hover:bg-[#f5f7ef]"
              render={<Link href="/sign-up" />}
            >
              Become a tutor
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#e6e8df] pt-6 text-sm text-[#68766e]">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#91aa59]" /> Reviewed tutor profiles
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#91aa59]" /> Learning that fits you
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px] lg:justify-self-end">
          <div className="absolute -right-4 top-2 h-[88%] w-[88%] rotate-[6deg] rounded-[2.5rem] bg-[#e8efcf] sm:-right-7" />
          <div className="relative rounded-[2rem] border border-[#e7e8df] bg-white p-4 shadow-[0_30px_80px_-48px_rgba(29,59,49,.42)] sm:rounded-[2.4rem] sm:p-6">
            <div className="flex items-center justify-between px-1 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#829087]">Your learning journey</p>
                <p className="mt-1 text-lg font-semibold tracking-tight">A great match is closer</p>
              </div>
              <span className="flex size-10 items-center justify-center rounded-full bg-[#f1f5e7] text-[#63833f]">
                <Sparkles size={18} />
              </span>
            </div>
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#e9efe1] p-5 sm:p-7">
              <div className="absolute -right-10 -top-12 size-52 rounded-full border-[28px] border-white/35" />
              <div className="relative flex min-h-[220px] flex-col justify-between sm:min-h-[250px]">
                <span className="w-fit rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#456450]">Personalized for you</span>
                <div>
                  <div className="mb-4 flex -space-x-2" aria-label="Tutor community">
                    <span className="flex size-10 items-center justify-center rounded-full border-2 border-[#e9efe1] bg-[#d3a684] text-xs font-bold text-white">RA</span>
                    <span className="flex size-10 items-center justify-center rounded-full border-2 border-[#e9efe1] bg-[#738e74] text-xs font-bold text-white">NS</span>
                    <span className="flex size-10 items-center justify-center rounded-full border-2 border-[#e9efe1] bg-[#ca9565] text-xs font-bold text-white">TM</span>
                  </div>
                  <p className="max-w-xs text-2xl font-semibold leading-tight tracking-tight text-[#203b31] sm:text-3xl">
                    Learn at your pace. Grow with confidence.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[#eceee7] bg-[#fcfcfa] p-4">
              <div>
                <p className="text-sm font-semibold">Find your next lesson</p>
                <p className="mt-0.5 text-xs text-[#89928b]">Tutors for your goals</p>
              </div>
              <Link href="/tuitions" aria-label="Browse tutors" className="flex size-9 items-center justify-center rounded-full bg-[#d9f36a] text-[#243e30] transition hover:scale-105">
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
