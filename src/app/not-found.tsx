import Link from "next/link";
import { ArrowLeft, BookOpenCheck } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-[#fbfaf7] px-5 py-16 text-[#19342c]">
      <section className="w-full max-w-xl rounded-3xl border border-[#e6e9e1] bg-white p-8 text-center shadow-sm sm:p-12">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#edf3df] text-[#648147]">
          <BookOpenCheck size={25} />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-[#78934c]">
          Page not found
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          This page isn’t here
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#77827b]">
          The link may be outdated, or the page may have moved. Go back to
          MentorLagbe and find your next lesson.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-[#1d3b31] px-5 text-sm font-semibold text-white transition hover:bg-[#315b45]"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>
      </section>
    </main>
  );
}
