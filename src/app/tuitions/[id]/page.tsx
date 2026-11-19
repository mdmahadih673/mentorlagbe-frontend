import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { TuitionDetailsView } from "@/components/tuition/tuition-details-view";
import { getTuitionById } from "@/lib/api/tuition";
import type { TuitionFormValues } from "@/lib/types/tuition";

type DetailsResult = { tuition: TuitionFormValues | null; error: string };

function loadTuition(id: string): Promise<DetailsResult> {
  return getTuitionById(id).then(
    (tuition) => ({ tuition, error: "" }),
    (reason: unknown) => ({
      tuition: null,
      error:
        reason instanceof Error
          ? reason.message
          : "Could not load this tuition.",
    }),
  );
}

function DetailsLoading() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#19342c]">
      <Navbar />
      <div className="mx-auto max-w-5xl animate-pulse px-5 py-8 sm:px-8 lg:px-10">
        <div className="h-64 rounded-3xl bg-[#e9ede5]" />
        <div className="mt-5 h-48 rounded-3xl bg-white" />
      </div>
    </main>
  );
}

export default function TuitionDetailsPage({params,}: {params: Promise<{ id: string }>;}) {
  return (
    <Suspense fallback={<DetailsLoading />}>
      <TuitionDetailsFromParams params={params} />
    </Suspense>
  );
}

async function TuitionDetailsFromParams({params,}: {params: Promise<{ id: string }>;}) {
  const { id } = await params;
  return <TuitionDetailsView detailsPromise={loadTuition(id)} />;
}
