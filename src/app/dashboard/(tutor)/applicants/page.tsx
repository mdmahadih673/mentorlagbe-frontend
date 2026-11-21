import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowLeft, UsersRound } from "lucide-react";
import { TutorRequestsTable } from "../components/tutor-requests-table";
import { auth } from "@/lib/auth";
import { getTutorApplicationsServer } from "@/lib/api/tutor/server-applications";
import { getAccountRole } from "@/lib/user-role";

export default async function ApplicantsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(
      `/sign-in?callbackURL=${encodeURIComponent("/dashboard/applicants")}`,
    );
  }

  if (getAccountRole(session.user) !== "tutor") {
    return (
      <section className="rounded-3xl border border-[#e6e9e1] bg-white p-8 text-center">
        <UsersRound className="mx-auto text-[#78934c]" size={28} />
        <h1 className="mt-4 text-2xl font-semibold text-[#203b31]">
          Tutor account required
        </h1>
        <p className="mt-2 text-sm text-[#77827b]">
          Student requests for your posts are available to tutor accounts.
        </p>
        <Link
          href="/dashboard"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#628044]"
        >
          <ArrowLeft size={15} /> Back to dashboard
        </Link>
      </section>
    );
  }

  const applications = await getTutorApplicationsServer(session.user.id).catch(
    () => null,
  );

  return (
    <div className="space-y-7">
      <section className="rounded-3xl bg-[#1d3b31] p-6 text-white sm:p-8">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#d9f36a]">
          <UsersRound size={15} /> Tutor workspace
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Applicants
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Review student requests sent for your tuition posts.
        </p>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-[#203b31]">
            Student requests
          </h2>
          <p className="mt-1 text-sm text-[#89928b]">
            {applications === null
              ? "Requests unavailable"
              : `${applications.length} ${applications.length === 1 ? "request" : "requests"}`}
          </p>
        </div>
        {applications === null ? (
          <div
            className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
            role="alert"
          >
            Could not load student requests. Make sure the backend is running
            and refresh the page.
          </div>
        ) : (
          <TutorRequestsTable
            applications={applications}
            teacherId={session.user.id}
          />
        )}
      </section>
    </div>
  );
}
