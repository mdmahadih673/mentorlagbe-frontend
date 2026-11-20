import { Suspense } from "react";
import { headers } from "next/headers";
import { Navbar } from "@/components/layout/navbar";
import { TuitionDetailsView } from "@/components/tuition/tuition-details-view";
import { auth } from "@/lib/auth";
import { getStudentApplications } from "@/lib/api/student/applications";
import { getTuitionById } from "@/lib/api/tuition";
import { getAccountRole } from "@/lib/user-role";
import type { TuitionApplicationStatus, TuitionFormValues } from "@/lib/types/tuition";

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
      <Suspense fallback={<div className="h-16 border-b border-[#e6e9e1] bg-white" />}>
        <Navbar />
      </Suspense>
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
  const session = await auth.api.getSession({ headers: await headers() });
  let initialRequestStatus: Extract<TuitionApplicationStatus, "pending" | "accepted"> | null = null;

  if (session && getAccountRole(session.user) === "student") {
    const applications = await getStudentApplications(session.user.id).catch(() => []);
    const activeRequest = applications.find(
      (application) =>
        application.tuitionId === id &&
        ["pending", "accepted"].includes(application.status?.toLowerCase() || ""),
    );
    if (activeRequest?.status) {
      initialRequestStatus = activeRequest.status.toLowerCase() as "pending" | "accepted";
    }
  }

  return (
    <TuitionDetailsView
      detailsPromise={loadTuition(id)}
      initialRequestStatus={initialRequestStatus}
    />
  );
}
