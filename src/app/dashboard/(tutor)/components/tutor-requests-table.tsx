"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, LoaderCircle, Phone, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { deleteTutorApplication } from "@/lib/api/tutor/applications";
import type {
  TuitionApplication,
  TuitionApplicationStatus,
} from "@/lib/types/tuition";

type Props = {
  applications: TuitionApplication[];
  teacherId: string;
};

const statusLabels: Record<TuitionApplicationStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
};

const statusClasses: Record<TuitionApplicationStatus, string> = {
  pending: "bg-amber-50 text-amber-800 ring-amber-200",
  accepted: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  rejected: "bg-red-50 text-red-800 ring-red-200",
};

export function TutorRequestsTable({ applications, teacherId }: Props) {
  const [rows, setRows] = useState(applications);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function removeRequest(applicationId: string) {
    if (!window.confirm("Delete this student request?")) return;
    setBusyId(applicationId);
    try {
      await deleteTutorApplication(applicationId, teacherId);
      setRows((current) => current.filter((row) => row._id !== applicationId));
      toast.add({ title: "Request deleted", type: "success" });
    } catch (error) {
      toast.add({
        title: "Could not delete request",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setBusyId(null);
    }
  }

  if (!rows.length) {
    return (
      <div className="rounded-3xl border border-dashed border-[#d8e0d4] bg-white px-6 py-12 text-center">
        <h3 className="text-lg font-semibold text-[#203b31]">
          No student requests yet
        </h3>
        <p className="mt-2 text-sm text-[#77827b]">
          Requests for your tuition posts will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e6e9e1] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-left">
          <thead className="bg-[#f7f8f4] text-xs uppercase tracking-wide text-[#78847c]">
            <tr>
              <th className="px-5 py-4 font-semibold">Student</th>
              <th className="px-5 py-4 font-semibold">Tuition</th>
              <th className="px-5 py-4 font-semibold">Request details</th>
              <th className="px-5 py-4 font-semibold">Received</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf0e9]">
            {rows.map((application) => {
              const status = application.status || "pending";
              const isBusy = busyId === application._id;
              const submittedAt = application.createdAt
                ? new Date(application.createdAt).toLocaleDateString("en-BD", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "—";

              return (
                <tr
                  key={application._id}
                  className="align-top text-sm text-[#526159]"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#203b31]">
                      {application.studentName || "Student"}
                    </p>
                    <p className="mt-1 text-xs text-[#89928b]">
                      {application.studentEmail ||
                        application.studentId ||
                        "Contact details unavailable"}
                    </p>
                    {application.studentPhone && (
                      <a
                        href={`tel:${application.studentPhone}`}
                        className="mt-1 inline-flex items-center gap-1 text-xs text-[#89928b]"
                      >
                        <Phone size={12} /> {application.studentPhone}
                      </a>
                    )}
                  </td>
                  <td className="max-w-56 px-5 py-4">
                    <p className="font-semibold text-[#354a40]">
                      {application.tuitionTitle || "Tuition request"}
                    </p>
                    <p className="mt-1 text-xs text-[#89928b]">
                      {application.subject ||
                        `Tuition ID: ${application.tuitionId}`}
                    </p>
                    {application.monthlyFee != null && (
                      <p className="mt-1 text-xs text-[#89928b]">
                        Monthly fee: ৳{" "}
                        {new Intl.NumberFormat("en-BD").format(
                          Number(application.monthlyFee),
                        )}
                      </p>
                    )}
                  </td>
                  <td className="max-w-64 px-5 py-4">
                    <p className="line-clamp-2 text-xs leading-5 text-[#68766e]">
                      {application.message || "No note included"}
                    </p>
                    {application.preferredTime && (
                      <p className="mt-1 text-xs text-[#89928b]">
                        Preferred: {application.preferredTime}
                      </p>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-[#78847c]">
                    {submittedAt}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusClasses[status]}`}
                    >
                      {statusLabels[status]}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/dashboard/applicants/${encodeURIComponent(application._id)}`}
                        className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#dfe5dc] bg-white px-2.5 text-xs font-medium text-[#354a40] transition hover:bg-[#f7f8f4]"
                      >
                        <Eye size={14} /> Details
                      </Link>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        aria-label="Delete student request"
                        disabled={isBusy}
                        onClick={() => void removeRequest(application._id)}
                        className="text-red-700 hover:bg-red-50 hover:text-red-800"
                      >
                        {isBusy ? (
                          <LoaderCircle className="animate-spin" />
                        ) : (
                          <Trash2 />
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
