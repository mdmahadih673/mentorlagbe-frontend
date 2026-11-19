import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  BookOpenCheck,
  CalendarDays,
  GraduationCap,
  Mail,
  MessageSquareText,
} from "lucide-react";
import { ApplicationStatusActions } from "@/components/dashboard/application-status-actions";
import { auth } from "@/lib/auth";
import { getAccountRole } from "@/lib/user-role";
import { getTutorApplications } from "@/lib/api/Application";

export const instant = false;

export default async function ApplicantDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(
      `/sign-in?callbackURL=${encodeURIComponent("/dashboard/applicants")}`,
    );
  }
  if (getAccountRole(session.user) !== "tutor") redirect("/dashboard");

  const { id } = await params;
  const applications = await getTutorApplications(session.user.id).catch(
    () => null,
  );
  if (!applications) {
    return (
      <div
        className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
        role="alert"
      >
        Could not load this request. Make sure the backend is running and try
        again.
      </div>
    );
  }

  const application = applications.find((item) => item._id === id);
  if (!application) notFound();
  const status = application.status || "pending";
  const submittedAt = application.createdAt
    ? new Date(application.createdAt).toLocaleString("en-BD", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "Date unavailable";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/dashboard/applicants"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#718078] transition hover:text-[#315b45]"
      >
        <ArrowLeft size={16} /> Back to applicants
      </Link>

      <section className="rounded-3xl border border-[#e6e9e1] bg-white p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-[#78934c]">
              <BookOpenCheck size={15} /> Tuition request
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[#203b31] sm:text-3xl">
              {application.tuitionTitle || "Student request"}
            </h1>
            <p className="mt-2 text-sm text-[#77827b]">
              {application.subject || "Subject not specified"}
            </p>
          </div>
          <span
            className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-semibold capitalize ring-1 ring-inset ${status === "accepted" ? "bg-emerald-50 text-emerald-800 ring-emerald-200" : status === "rejected" ? "bg-red-50 text-red-800 ring-red-200" : "bg-amber-50 text-amber-800 ring-amber-200"}`}
          >
            {status}
          </span>
        </div>

        <div className="mt-7 grid gap-4 border-t border-[#edf0e9] pt-6 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl bg-[#f8f9f6] p-4">
            <GraduationCap size={18} className="mt-0.5 text-[#78934c]" />
            <div className="min-w-0">
              <p className="text-xs text-[#89928b]">Student</p>
              <p className="mt-1 font-semibold text-[#354a40]">
                {application.studentName || "Student"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-[#f8f9f6] p-4">
            <Mail size={17} className="mt-0.5 text-[#78934c]" />
            <div className="min-w-0">
              <p className="text-xs text-[#89928b]">Contact email</p>
              <p className="mt-1 break-all font-semibold text-[#354a40]">
                {application.studentEmail || "Not provided"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-[#f8f9f6] p-4">
            <CalendarDays size={17} className="mt-0.5 text-[#78934c]" />
            <div>
              <p className="text-xs text-[#89928b]">Request received</p>
              <p className="mt-1 font-semibold text-[#354a40]">{submittedAt}</p>
            </div>
          </div>
          {application.preferredTime && (
            <div className="flex items-start gap-3 rounded-2xl bg-[#f8f9f6] p-4">
              <CalendarDays size={17} className="mt-0.5 text-[#78934c]" />
              <div>
                <p className="text-xs text-[#89928b]">Preferred time</p>
                <p className="mt-1 font-semibold text-[#354a40]">
                  {application.preferredTime}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#edf0e9] p-4">
          <MessageSquareText
            size={17}
            className="mt-0.5 shrink-0 text-[#78934c]"
          />
          <div>
            <p className="text-xs text-[#89928b]">Student’s message</p>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-[#526159]">
              {application.message ||
                "No additional note was included with this request."}
            </p>
          </div>
        </div>

        {application.tuitionId && (
          <Link
            href={`/tuitions/${encodeURIComponent(application.tuitionId)}`}
            className="mt-5 inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#dfe5dc] px-3 text-xs font-semibold text-[#354a40] transition hover:bg-[#f7f8f4]"
          >
            View tuition listing <ArrowLeft className="rotate-180" size={14} />
          </Link>
        )}
      </section>

      <section className="rounded-3xl border border-[#e6e9e1] bg-white p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-[#203b31]">
          Review this request
        </h2>
        <p className="mt-1 text-sm text-[#77827b]">
          Keep it pending, approve the student, or reject the request.
        </p>
        <div className="mt-5">
          <ApplicationStatusActions
            applicationId={application._id}
            teacherId={session.user.id}
            initialStatus={status}
          />
        </div>
      </section>
    </div>
  );
}
