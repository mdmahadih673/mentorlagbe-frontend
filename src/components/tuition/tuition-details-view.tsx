"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  Clock3,
  MapPin,
  Monitor,
  Wallet,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  createTuitionApplication,
  getStudentApplicationCounts,
} from "@/lib/api/student/applications";
import { useSession } from "@/lib/auth-client";
import { getAccountRole } from "@/lib/user-role";
import type { TuitionApplicationStatus, TuitionFormValues } from "@/lib/types/tuition";

type DetailsResult = { tuition: TuitionFormValues | null; error: string };

export function TuitionDetailsView({
  detailsPromise,
  initialRequestStatus,
}: {
  detailsPromise: Promise<DetailsResult>;
  initialRequestStatus: Extract<TuitionApplicationStatus, "pending" | "accepted"> | null;
}) {
  const { tuition, error } = use(detailsPromise);
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isRequesting, setIsRequesting] = useState(false);
  const [activeRequestStatus, setActiveRequestStatus] = useState(initialRequestStatus);
  const fee =
    tuition?.monthlyFee == null
      ? "Not specified"
      : `৳ ${new Intl.NumberFormat("en-BD").format(Number(tuition.monthlyFee))}`;
  const days = Number(tuition?.daysPerWeek);
  const schedule =
    Number.isFinite(days) && days > 0
      ? `${days} ${days === 1 ? "day" : "days"} per week`
      : "To be discussed";
  const meetingUrl = (() => {
    if (!tuition?.meetingLink) return "";
    try {
      const parsed = new URL(tuition.meetingLink);
      return parsed.protocol === "http:" || parsed.protocol === "https:"
        ? parsed.href
        : "";
    } catch {
      return "";
    }
  })();

  async function handleRequestTuition() {
    if (isPending) return;
    if (!session) {
      const tuitionId = tuition?._id || tuition?.id || tuition?.tuitionId;
      const callbackPath = tuitionId ? `/tuitions/${tuitionId}` : "/tuitions";
      router.push(`/sign-in?callbackURL=${encodeURIComponent(callbackPath)}`);
      return;
    }
    if (getAccountRole(session.user) !== "student") {
      toast.add({
        title: "Student account required",
        description: "Sign in with a student account to request this tuition.",
        type: "error",
      });
      return;
    }

    const tuitionId = tuition?._id || tuition?.id || tuition?.tuitionId;
    if (!tuitionId) {
      toast.add({
        title: "Request unavailable",
        description: "This tuition listing does not have a valid ID.",
        type: "error",
      });
      return;
    }

    setIsRequesting(true);
    try {
      const counts = await getStudentApplicationCounts(session.user.id);
      if (!counts.canApply) {
        toast.add({
          title: "Free request limit reached",
          description: "Upgrade to Pro to send more tuition requests.",
          type: "error",
        });
        router.push("/dashboard/student-payment");
        return;
      }

      await createTuitionApplication({
        tuitionId,
        studentId: session.user.id,
        studentName: session.user.name || "Student",
        studentEmail: session.user.email,
      });
      setActiveRequestStatus("pending");
      toast.add({
        title: "Request sent",
        description: "The tutor will review your tuition request.",
        type: "success",
      });
    } catch (requestError) {
      toast.add({
        title: "Could not send request",
        description:
          requestError instanceof Error
            ? requestError.message
            : "Please try again.",
        type: "error",
      });
    } finally {
      setIsRequesting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#19342c]">
      <Navbar />
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10">
        <Link
          href="/tuitions"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#718078] transition hover:text-[#315b45]"
        >
          <ArrowLeft size={16} /> Back to Find a tutor
        </Link>

        {error || !tuition ? (
          <section className="mt-8 rounded-3xl border border-[#e6e9e1] bg-white p-8 text-center">
            <h1 className="text-2xl font-semibold text-[#203b31]">
              Tuition not found
            </h1>
            <p className="mt-2 text-sm text-[#77827b]">
              {error || "This tuition listing may have been removed."}
            </p>
            <Link
              href="/tuitions"
              className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-[#1d3b31] px-5 text-sm font-semibold text-white"
            >
              Browse all tuitions
            </Link>
          </section>
        ) : (
          <div className="mt-6 space-y-5">
            <section
              className="relative flex min-h-64 items-end overflow-hidden rounded-3xl border border-[#e6e9e1] bg-[#dbe9c9] bg-cover bg-center p-6 sm:p-9"
              style={
                tuition.bannerUrl
                  ? {
                      backgroundImage: `url("${tuition.bannerUrl}")`,
                    }
                  : undefined
              }
            >
              {tuition.bannerUrl && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#19342c]/50"
                />
              )}
              {!tuition.bannerUrl && (
                <div className="absolute -right-10 -top-20 size-72 rounded-full border-[35px] border-white/30" />
              )}
              <div className="relative max-w-3xl">
                <p className="inline-flex rounded-full bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#456450]">
                  {tuition.subject}
                </p>
                <h1
                  className={`mt-4 text-3xl font-semibold tracking-tight sm:text-4xl ${tuition.bannerUrl ? "text-white" : "text-[#19342c]"}`}
                >
                  {tuition.title}
                </h1>
                <p
                  className={`mt-2 text-sm ${tuition.bannerUrl ? "text-white/85" : "text-[#526159]"}`}
                >
                  {tuition.classLevel}
                </p>
              </div>
            </section>

            <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
              <section className="rounded-3xl border border-[#e6e9e1] bg-white p-6 sm:p-8">
                <div className="flex items-center gap-2 text-[#78934c]">
                  <BookOpenCheck size={18} />
                  <h2 className="font-semibold text-[#203b31]">
                    About this tuition
                  </h2>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[#66746b]">
                  {tuition.description ||
                    "The tutor has not added a description yet."}
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <DetailItem
                    icon={<Monitor size={17} />}
                    label="Learning mode"
                    value={tuition.mode}
                  />
                  <DetailItem
                    icon={<CalendarDays size={17} />}
                    label="Schedule"
                    value={schedule}
                  />
                  <DetailItem
                    icon={<Wallet size={17} />}
                    label="Monthly fee"
                    value={fee}
                  />
                  <DetailItem
                    icon={<MapPin size={17} />}
                    label="Location"
                    value={
                      tuition.mode === "Online"
                        ? "Online"
                        : tuition.location || "Not specified"
                    }
                  />
                  {tuition.preferredTime && (
                    <DetailItem
                      icon={<Clock3 size={17} />}
                      label="Preferred time"
                      value={tuition.preferredTime}
                    />
                  )}
                </div>
                {tuition.mode === "Online" && tuition.meetingLink && (
                  <div className="mt-6 rounded-2xl bg-[#f5f7f1] p-4">
                    <p className="text-xs font-semibold text-[#526159]">
                      Online lesson URL
                    </p>
                    {meetingUrl ? (
                      <a
                        href={meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 block break-all text-sm font-medium text-[#456450] underline"
                      >
                        {meetingUrl}
                      </a>
                    ) : (
                      <p className="mt-1 break-all text-sm text-[#66746b]">
                        {tuition.meetingLink}
                      </p>
                    )}
                  </div>
                )}
              </section>

              <aside className="h-fit rounded-3xl border border-[#e6e9e1] bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-[.15em] text-[#78934c]">
                  Tutor
                </p>
                <h2 className="mt-3 text-lg font-semibold text-[#203b31]">
                  {tuition.tutorName || "MentorLagbe tutor"}
                </h2>
                <p className="mt-1 break-all text-xs text-[#89928b]">
                  Tutor ID: {tuition.teacherId || "Unavailable"}
                </p>
                <Button
                  type="button"
                  onClick={() => void handleRequestTuition()}
                  disabled={isPending || isRequesting || Boolean(activeRequestStatus)}
                  className="mt-6 h-11 w-full rounded-xl bg-[#1d3b31] text-sm font-semibold text-white hover:bg-[#315b45] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isRequesting
                    ? "Sending request…"
                    : activeRequestStatus
                      ? `Request ${activeRequestStatus}`
                      : "Request this tuition"}
                  {!activeRequestStatus && <ArrowRight size={16} />}
                </Button>
                <div className="mt-5 border-t border-[#edf0e9] pt-4">
                  <p className="text-xs text-[#89928b]">Listing status</p>
                  <p className="mt-1 text-sm font-semibold capitalize text-[#526159]">
                    {tuition.approvalStatus || "Pending review"}
                  </p>
                </div>
              </aside>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-[#f8f9f6] p-4">
      <span className="mt-0.5 text-[#78934c]">{icon}</span>
      <div>
        <p className="text-xs text-[#89928b]">{label}</p>
        <p className="mt-1 text-sm font-semibold text-[#354a40]">
          {value || "Not specified"}
        </p>
      </div>
    </div>
  );
}
