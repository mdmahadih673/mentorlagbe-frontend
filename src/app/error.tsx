"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCw, TriangleAlert } from "lucide-react";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-[#fbfaf7] px-5 py-16 text-[#19342c]">
      <section className="w-full max-w-xl rounded-3xl border border-[#e6e9e1] bg-white p-8 text-center shadow-sm sm:p-12">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#fbefeb] text-[#a35e55]">
          <TriangleAlert size={25} />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-[#a35e55]">
          Something went wrong
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          We couldn’t load this page
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#77827b]">
          Try loading it again. If the problem continues, return to the home
          page and try again later.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={retry}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1d3b31] px-5 text-sm font-semibold text-white transition hover:bg-[#315b45]"
          >
            <RefreshCw size={15} /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[#dfe5dc] px-5 text-sm font-semibold text-[#354a40] transition hover:bg-[#f7f8f4]"
          >
            <ArrowLeft size={15} /> Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
