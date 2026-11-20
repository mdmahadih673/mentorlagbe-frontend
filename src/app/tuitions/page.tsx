import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { TuitionBrowser } from "@/components/tuition/tuition-browser";
import {
  searchTuitions,
  type TuitionSearchParams,
  type TuitionSearchResult,
} from "@/lib/api/tuition";
type TuitionResult = { data: TuitionSearchResult | null; error: string };

function loadTuitions(filters: TuitionSearchParams): Promise<TuitionResult> {
  return searchTuitions({ pageSize: 6, ...filters }).then(
    (data) => ({ data, error: "" }),
    (reason: unknown) => ({
      data: null,
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

function getInitialFilters(
  params: Record<string, string | string[] | undefined>,
): TuitionSearchParams {
  const values = (key: string) => {
    const value = params[key];
    return (Array.isArray(value) ? value : value ? [value] : []).flatMap((item) => item.split(",")).filter(Boolean);
  };
  const sort = values("sort")[0];

  return {
    q: values("q")[0],
    location: values("location")[0],
    subject: values("subject"),
    mode: values("mode"),
    class: values("class"),
    sort: sort === "fee-low" || sort === "fee-high" ? sort : "newest",
    page: Number(values("page")[0]) || 1,
  };
}

async function TuitionsContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filters = getInitialFilters(await searchParams);

  return (
    <Suspense fallback={<TuitionListingsLoading />}>
      <TuitionBrowser tuitionsPromise={loadTuitions(filters)} />
    </Suspense>
  );
}

export default function TuitionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<TuitionListingsLoading />}>
      <TuitionsContent searchParams={searchParams} />
    </Suspense>
  );
}
