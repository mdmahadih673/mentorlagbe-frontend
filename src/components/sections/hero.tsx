import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpenCheck, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const subjects = ["Mathematics", "English", "Physics", "Chemistry"];

export function Hero() {
  return (
    <section className="bg-[#fbfaf7] text-[#19342c]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#648147]">
            <BookOpenCheck size={17} /> MentorLagbe
          </p>
          <h1 className="mt-5 max-w-[680px] text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Find the tutor who fits the way you learn
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#69756d] text-pretty sm:text-lg">
            Browse tuition listings by subject, class, learning mode, and
            location. Send a request when you find the right fit.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button
              nativeButton={false}
              className="h-12 rounded-xl bg-[#1d3b31] px-5 text-base font-semibold text-white transition-colors duration-300 hover:bg-[#315b45] focus-visible:ring-2 focus-visible:ring-[#78934c] focus-visible:ring-offset-2"
              render={<Link href="/tuitions" />}
            >
              Find a tutor <ArrowRight size={17} />
            </Button>
            <Link
              href="/sign-up"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#315b45] transition-colors duration-300 hover:text-[#19342c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#648147]"
            >
              Teach on MentorLagbe <ArrowUpRight size={15} />
            </Link>
          </div>
          <p className="mt-8 border-t border-[#e6e9e1] pt-5 text-sm text-[#77827b]">
            Search by subject, class level, schedule, or location.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:justify-self-end">
          <div className="absolute -bottom-4 -left-4 size-24 rounded-3xl bg-[#d9f36a] sm:-bottom-5 sm:-left-5" />
          <div className="relative rounded-3xl border border-[#dfe5d9] bg-white p-5 shadow-[0_24px_64px_-44px_rgba(29,59,49,.45)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#648147]">Start here</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#203b31]">
                  What would you like to learn?
                </h2>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf0dc] text-[#648147]">
                <Search size={20} />
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {subjects.map((subject) => (
                <Link
                  key={subject}
                  href={`/tuitions?subject=${encodeURIComponent(subject)}`}
                  className="flex min-h-14 items-center justify-between gap-2 rounded-xl border border-[#e6e9e1] bg-[#fbfaf7] px-4 text-sm font-medium text-[#354a40] transition-colors duration-300 hover:border-[#b8c99f] hover:bg-[#f3f6ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#648147]"
                >
                  {subject}
                  <ArrowUpRight size={15} className="shrink-0 text-[#78934c]" />
                </Link>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[#77827b]">
              <span className="font-medium text-[#526159]">Lesson mode</span>
              <span className="rounded-lg bg-[#f3f6ed] px-3 py-2">Online</span>
              <span className="rounded-lg bg-[#f3f6ed] px-3 py-2">In person</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
