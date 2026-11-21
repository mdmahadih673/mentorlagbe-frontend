"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  LoaderCircle,
  Pencil,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";
import { toast } from "@/components/ui/toast";
import { deleteTuition, setTuitionActive } from "@/lib/api/tutor/tuition";
import type { TuitionFormValues } from "@/lib/types/tuition";

export function MyTuitionPostsTable({
  initialTuitions,
  teacherId,
}: {
  initialTuitions: TuitionFormValues[];
  teacherId: string;
}) {
  const [tuitions, setTuitions] = useState(initialTuitions);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function handleToggleActive(id: string, isActive: boolean) {
    setUpdatingId(id);
    try {
      await setTuitionActive(id, isActive);
      setTuitions((current) =>
        current.map((tuition) =>
          (tuition._id || tuition.id || tuition.tuitionId) === id
            ? { ...tuition, isActive }
            : tuition,
        ),
      );
      toast.add({
        title: isActive ? "Tuition listing reopened" : "Tuition listing closed",
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: "Could not update listing",
        description: error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this tuition post? This cannot be undone."))
      return;
    setDeletingId(id);
    try {
      await deleteTuition(id, teacherId);
      setTuitions((current) =>
        current.filter(
          (tuition) => (tuition._id || tuition.id || tuition.tuitionId) !== id,
        ),
      );
      toast.add({ title: "Tuition deleted", type: "success" });
    } catch (error) {
      toast.add({
        title: "Could not delete tuition",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setDeletingId(null);
    }
  }

  if (tuitions.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-[#d8e0d4] bg-white px-6 py-12 text-center">
        <p className="text-sm font-semibold text-[#203b31]">
          No tuition posts left
        </p>
        <p className="mt-2 text-sm text-[#77827b]">
          Create a new post whenever you are ready.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e6e9e1] bg-white">
      <div className="border-b border-[#edf0e9] px-5 py-4 sm:px-6">
        <h2 className="font-semibold text-[#203b31]">Your tuition posts</h2>
        <p className="mt-1 text-xs text-[#89928b]">
          {tuitions.length} {tuitions.length === 1 ? "listing" : "listings"}
        </p>
      </div>
      <div>
        <table className="w-full table-fixed border-collapse text-left">
          <thead className="bg-[#f7f8f4] text-[10px] uppercase tracking-wide text-[#78847c] sm:text-xs">
            <tr>
              <th className="w-[42%] px-3 py-3 font-semibold sm:px-5 sm:py-4">
                Tuition
              </th>
              <th className="w-[20%] px-2 py-3 font-semibold sm:px-5 sm:py-4">
                Listing status
              </th>
              <th className="w-[38%] px-2 py-3 font-semibold sm:px-5 sm:py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf0e9]">
            {tuitions.map((tuition, index) => {
              const id = tuition._id || tuition.id || tuition.tuitionId;
              const status = tuition.approvalStatus || "pending";
              const isActive = tuition.isActive !== false;
              const statusStyle =
                status.toLowerCase() === "approved" && !isActive
                  ? "bg-slate-100 text-slate-700"
                  : status.toLowerCase() === "approved" ||
                      status.toLowerCase() === "accepted"
                    ? "bg-emerald-50 text-emerald-800"
                    : status.toLowerCase() === "rejected"
                      ? "bg-red-50 text-red-800"
                      : "bg-amber-50 text-amber-800";

              return (
                <tr
                  key={id || `${tuition.title}-${index}`}
                  className="align-middle text-sm text-[#526159]"
                >
                  <td className="px-3 py-3 sm:px-5 sm:py-4">
                    <p className="truncate font-semibold text-[#203b31]">
                      {tuition.title || "Untitled tuition"}
                    </p>
                    <p className="mt-1 truncate text-xs text-[#89928b]">
                      {[tuition.subject, tuition.classLevel]
                        .filter(Boolean)
                        .join(" · ") || "Subject details unavailable"}
                    </p>
                  </td>
                  <td className="px-2 py-3 sm:px-5 sm:py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold capitalize sm:px-2.5 sm:text-xs ${statusStyle}`}
                    >
                      {status.toLowerCase() === "approved" && !isActive
                        ? "Closed"
                        : status}
                    </span>
                  </td>
                  <td className="px-2 py-3 sm:px-5 sm:py-4">
                    {id ? (
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        {status.toLowerCase() === "approved" && (
                          <button
                            type="button"
                            disabled={updatingId === id}
                            onClick={() => void handleToggleActive(id, !isActive)}
                            className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#dfe5dc] px-2 text-[11px] font-semibold text-[#354a40] transition hover:bg-[#f7f8f4] disabled:opacity-50 sm:gap-1.5 sm:px-2.5 sm:text-xs"
                          >
                            {updatingId === id ? (
                              <LoaderCircle size={13} className="animate-spin" />
                            ) : isActive ? (
                              <ToggleRight size={14} />
                            ) : (
                              <ToggleLeft size={14} />
                            )}
                            {isActive ? "Close" : "Reopen"}
                          </button>
                        )}
                        <Link
                          href={`/tuitions/${encodeURIComponent(id)}`}
                          className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#dfe5dc] px-2 text-[11px] font-semibold text-[#354a40] transition hover:bg-[#f7f8f4] sm:gap-1.5 sm:px-2.5 sm:text-xs"
                        >
                          <Eye size={13} /> Details
                        </Link>
                        <Link
                          href={`/dashboard/my-tuitions/${encodeURIComponent(id)}/edit`}
                          className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#dfe5dc] px-2 text-[11px] font-semibold text-[#354a40] transition hover:bg-[#f7f8f4] sm:gap-1.5 sm:px-2.5 sm:text-xs"
                        >
                          <Pencil size={13} /> Edit
                        </Link>
                        <button
                          type="button"
                          aria-label="Delete tuition post"
                          disabled={deletingId === id}
                          onClick={() => void handleDelete(id)}
                          className="inline-flex h-8 items-center gap-1 rounded-lg border border-red-200 px-2 text-[11px] font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50 sm:gap-1.5 sm:px-2.5 sm:text-xs"
                        >
                          {deletingId === id ? (
                            <LoaderCircle size={13} className="animate-spin" />
                          ) : (
                            <Trash2 size={13} />
                          )}{" "}
                          Delete
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-[#89928b]">No ID</span>
                    )}
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
