import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowUpRight, BookOpenCheck, GraduationCap } from "lucide-react";
import { auth } from "@/lib/auth";
import { getStudentApplications } from "@/lib/api/Application";
import type { TuitionApplicationStatus } from "@/lib/types/tuition";

const statusStyles: Record<TuitionApplicationStatus, string> = {
  pending: "bg-amber-50 text-amber-800 ring-amber-200",
  accepted: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  rejected: "bg-red-50 text-red-800 ring-red-200",
};

export default async function MyApplicationsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(
      `/sign-in?callbackURL=${encodeURIComponent("/dashboard/my-applications")}`,
    );
  }
  if (session.user.role !== "student") redirect("/dashboard");

  const applications = await getStudentApplications(session.user.id).catch(
    () => null,
  );

  return (
    <div className="space-y-7">
      <section className="rounded-3xl bg-[#1d3b31] p-6 text-white sm:p-8">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#d9f36a]">
          <BookOpenCheck size={15} /> Student workspace
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          My applications
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Track the tuition requests you have sent and see each tutor’s
          response.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-[#203b31]">
              Sent requests
            </h2>
            <p className="mt-1 text-sm text-[#89928b]">
              {applications === null
                ? "Requests unavailable"
                : `${applications.length} ${applications.length === 1 ? "request" : "requests"}`}
            </p>
          </div>
          <Link
            href="/tuitions"
            className="text-sm font-semibold text-[#628044] hover:underline"
          >
            Find a tutor
          </Link>
        </div>

        {applications === null ? (
          <div
            className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
            role="alert"
          >
            Could not load your requests. Make sure the backend is running and
            refresh the page.
          </div>
        ) : applications.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#d8e0d4] bg-white px-6 py-12 text-center">
            <BookOpenCheck className="mx-auto text-[#78934c]" size={28} />
            <h3 className="mt-4 text-lg font-semibold text-[#203b31]">
              No requests sent yet
            </h3>
            <p className="mt-2 text-sm text-[#77827b]">
              When you request a tuition, it will appear here with its tutor and
              current status.
            </p>
            <Link
              href="/tuitions"
              className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#1d3b31] px-5 text-sm font-semibold text-white"
            >
              Browse tuitions <ArrowUpRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {applications.map((application) => {
              const status = application.status || "pending";
              const submittedAt = application.createdAt
                ? new Date(application.createdAt).toLocaleDateString("en-BD", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Date unavailable";

              return (
                <article
                  key={application._id}
                  className="rounded-2xl border border-[#e6e9e1] bg-white p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[.12em] text-[#78934c]">
                        {application.subject || "Tuition request"}
                      </p>
                      <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-[#203b31]">
                        {application.tuitionTitle || "Tuition listing"}
                      </h3>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${statusStyles[status]}`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-3 border-t border-[#edf0e9] pt-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#eaf0dc] text-[#648147]">
                      <GraduationCap size={19} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#354a40]">
                        {application.tutorName || "Tutor"}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-[#89928b]">
                        Tutor ID: {application.teacherId}
                      </p>
                    </div>
                    <span className="shrink-0 text-right text-xs text-[#89928b]">
                      Sent {submittedAt}
                    </span>
                  </div>

                  {application.tuitionId && (
                    <Link
                      href={`/tuitions/${encodeURIComponent(application.tuitionId)}`}
                      className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#dfe5dc] px-3 text-xs font-semibold text-[#354a40] transition hover:bg-[#f7f8f4]"
                    >
                      View tuition details <ArrowUpRight size={14} />
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
