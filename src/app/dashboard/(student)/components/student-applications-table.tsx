"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CircleAlert, LoaderCircle, X } from "lucide-react";
import { toast } from "@/components/ui/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cancelStudentApplication } from "@/lib/api/student/applications";
import type {
  TuitionApplication,
  TuitionApplicationStatus,
} from "@/lib/types/tuition";

const statusStyles: Record<TuitionApplicationStatus, string> = {
  pending: "bg-amber-50 text-amber-800 ring-amber-200",
  accepted: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  rejected: "bg-red-50 text-red-800 ring-red-200",
};

export function StudentApplicationsTable({
  initialApplications,
}: {
  initialApplications: TuitionApplication[];
}) {
  const [applications, setApplications] = useState(initialApplications);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] =
    useState<TuitionApplication | null>(null);

  async function handleCancel() {
    if (!selectedApplication) return;

    setCancellingId(selectedApplication._id);
    try {
      await cancelStudentApplication(selectedApplication._id);
      setApplications((current) =>
        current.filter((item) => item._id !== selectedApplication._id),
      );
      setSelectedApplication(null);
      toast.add({
        title: "Request cancelled",
        description: "Your tuition request has been cancelled.",
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: "Could not cancel request",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setCancellingId(null);
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-[#203b31]">
            Sent requests
          </h2>
          <p className="mt-1 text-sm text-[#89928b]">
            {applications.length} {applications.length === 1 ? "request" : "requests"}
          </p>
        </div>
        <Link
          href="/tuitions"
          className="text-sm font-semibold text-[#628044] hover:underline"
        >
          Find a tutor
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#d8e0d4] bg-white px-6 py-12 text-center">
          <h3 className="text-lg font-semibold text-[#203b31]">
            No requests sent yet
          </h3>
          <p className="mt-2 text-sm text-[#77827b]">
            Tuition requests you send will appear here.
          </p>
          <Link
            href="/tuitions"
            className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#1d3b31] px-5 text-sm font-semibold text-white"
          >
            Browse tuitions <ArrowUpRight size={15} />
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#e6e9e1] bg-white">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead className="bg-[#f7f8f4] text-xs uppercase tracking-wide text-[#78847c]">
              <tr>
                <th className="px-5 py-4 font-semibold">Tuition</th>
                <th className="px-5 py-4 font-semibold">Tutor</th>
                <th className="px-5 py-4 font-semibold">Sent</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf0e9]">
              {applications.map((application) => {
                const status = application.status || "pending";
                const submittedAt = application.createdAt
                  ? new Intl.DateTimeFormat("en-BD", {
                      dateStyle: "medium",
                      timeZone: "Asia/Dhaka",
                    }).format(new Date(application.createdAt))
                  : "—";

                return (
                  <tr key={application._id} className="text-sm text-[#526159]">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-[#203b31]">
                        {application.tuitionTitle || "Tuition listing"}
                      </p>
                      <p className="mt-1 text-xs text-[#89928b]">
                        {application.subject || "Subject not specified"}
                      </p>
                      {application.tuitionId && (
                        <Link
                          href={`/tuitions/${encodeURIComponent(application.tuitionId)}`}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#628044] hover:underline"
                        >
                          View details <ArrowUpRight size={13} />
                        </Link>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#354a40]">
                        {application.tutorName || "Tutor"}
                      </p>
                      <p className="mt-1 text-xs text-[#89928b]">
                        {application.tutorEmail || `ID: ${application.teacherId}`}
                      </p>
                      {application.monthlyFee != null && (
                        <p className="mt-1 text-xs font-medium text-[#526159]">
                          ৳ {new Intl.NumberFormat("en-BD").format(Number(application.monthlyFee))} / month
                        </p>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-[#77827b]">
                      {submittedAt}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${statusStyles[status]}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {status === "pending" ? (
                        <button
                          type="button"
                          onClick={() => setSelectedApplication(application)}
                          disabled={cancellingId !== null}
                          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
                        >
                          {cancellingId === application._id ? (
                            <LoaderCircle className="animate-spin" size={14} />
                          ) : (
                            <X size={14} />
                          )}
                          Cancel
                        </button>
                      ) : (
                        <span className="text-xs text-[#89928b]">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <AlertDialog
        open={selectedApplication !== null}
        onOpenChange={(open) => {
          if (!open && cancellingId === null) setSelectedApplication(null);
        }}
      >
        <AlertDialogContent className="max-w-md overflow-hidden rounded-3xl border border-[#e5e9df] bg-white p-0 text-[#203b31] shadow-[0_24px_80px_-36px_rgba(29,59,49,.45)]">
          <AlertDialogHeader className="place-items-start gap-4 p-6 pb-5 text-left sm:p-7 sm:pb-6">
            <AlertDialogMedia className="mb-0 size-12 rounded-2xl bg-[#fbeceb] text-[#a35e55] [&_svg:not([class*='size-'])]:size-5">
              <CircleAlert />
            </AlertDialogMedia>
            <div className="space-y-2">
              <AlertDialogTitle className="text-xl font-semibold tracking-tight text-[#203b31]">
                Cancel this request?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm leading-6 text-[#77827b]">
                Your request for {selectedApplication?.tuitionTitle || "this tuition"} will be withdrawn. You can apply again if the listing is still available.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-0 bg-[#f8f9f5] p-5 sm:px-7 sm:py-5">
            <AlertDialogCancel
              disabled={cancellingId !== null}
              className="h-10 rounded-xl border-[#dfe5dc] px-4 text-[#354a40] hover:bg-white"
            >
              Keep request
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              disabled={cancellingId !== null}
              className="h-10 rounded-xl bg-[#a8433c] px-4 text-white hover:bg-[#913a34]"
            >
              {cancellingId ? (
                <LoaderCircle className="animate-spin" size={15} />
              ) : (
                <X size={15} />
              )}
              {cancellingId ? "Cancelling" : "Yes, cancel request"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
