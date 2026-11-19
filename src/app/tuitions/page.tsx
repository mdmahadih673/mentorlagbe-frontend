import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { TuitionBrowser } from "@/components/tuition/tuition-browser";
import { getAllTuitions } from "@/lib/api/tuition";
import type { TuitionFormValues } from "@/lib/types/tuition";

type TuitionResult = { data: TuitionFormValues[]; error: string };

function loadTuitions(): Promise<TuitionResult> {
  return getAllTuitions().then(
    (data) => ({ data, error: "" }),
    (reason: unknown) => ({
      data: [],
      error:
        reason instanceof Error
          ? reason.message
          : "Could not load tuition listings.",
    }),
  );
}

function TuitionListingsLoading() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#19342c]">
      <Navbar />
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="h-28 animate-pulse rounded-3xl bg-white" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse rounded-3xl border border-[#e6e9e1] bg-white"
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function TuitionsPage() {
  return (
    <Suspense fallback={<TuitionListingsLoading />}>
      <TuitionBrowser tuitionsPromise={loadTuitions()} />
    </Suspense>
  );
}
