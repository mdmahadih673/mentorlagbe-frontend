"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  Search,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import {
  deleteAdminTuition,
  updateAdminTuitionStatus,
  type AdminTuitionStatus,
} from "@/lib/api/admin/tuition";
import type { TuitionFormValues } from "@/lib/types/tuition";

type ListingFilter = "all" | "pending" | "approved" | "rejected";

const filters: { label: string; value: ListingFilter }[] = [
  { label: "All listings", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const statusOptions: AdminTuitionStatus[] = ["pending", "approved", "rejected"];
const PAGE_SIZE = 6;

function getListingId(tuition: TuitionFormValues) {
  return tuition._id || tuition.id || tuition.tuitionId;
}

function getListingStatus(tuition: TuitionFormValues) {
  if (tuition.isActive === false) return "inactive";
  return tuition.approvalStatus?.toLowerCase() || "unknown";
}

function getApprovalStatus(tuition: TuitionFormValues): AdminTuitionStatus {
  const status = tuition.approvalStatus?.toLowerCase();
  return statusOptions.includes(status as AdminTuitionStatus)
    ? (status as AdminTuitionStatus)
    : "pending";
}

function statusStyle(status: string) {
  if (status === "approved") return "bg-emerald-50 text-emerald-800";
  if (status === "rejected" || status === "inactive") {
    return "bg-red-50 text-red-800";
  }
  if (status === "pending") return "bg-amber-50 text-amber-900";
  return "bg-[#f3f4f1] text-[#77827b]";
}

function getPageItems(pageCount: number, currentPage: number) {
  const visiblePages =
    pageCount <= 5
      ? Array.from({ length: pageCount }, (_, index) => index + 1)
      : [...new Set([1, currentPage - 1, currentPage, currentPage + 1, pageCount])]
          .filter((pageNumber) => pageNumber >= 1 && pageNumber <= pageCount)
          .sort((a, b) => a - b);

  return visiblePages.flatMap((pageNumber, index) => {
    const previousPage = visiblePages[index - 1];
    return [
      ...(previousPage && pageNumber - previousPage > 1 ? ["ellipsis" as const] : []),
      pageNumber,
    ];
  });
}

export function AdminTuitionsTable({
  tuitions,
}: {
  tuitions: TuitionFormValues[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ListingFilter>("all");
  const [page, setPage] = useState(1);
  const [statusDrafts, setStatusDrafts] = useState<
    Record<string, AdminTuitionStatus>
  >({});
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleStatusUpdate(
    tuition: TuitionFormValues,
    id: string,
  ) {
    const status = statusDrafts[id] || getApprovalStatus(tuition);
    if (status === getApprovalStatus(tuition) || updatingId || deletingId) return;

    setUpdatingId(id);
    try {
      await updateAdminTuitionStatus(id, status);
      setStatusDrafts((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
      toast.add({
        title: "Status updated",
        description: `Tuition listing is now ${status}.`,
        type: "success",
      });
      router.refresh();
    } catch (error) {
      toast.add({
        title: "Status update failed",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete(tuition: TuitionFormValues, id: string) {
    const title = tuition.title || "this tuition listing";
    if (!window.confirm(`Delete ${title} and its applications? This cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteAdminTuition(id);
      toast.add({
        title: "Tuition deleted",
        description: `${title} was removed.`,
        type: "success",
      });
      router.refresh();
    } catch (error) {
      toast.add({
        title: "Delete failed",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setDeletingId(null);
    }
  }

  const filteredTuitions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tuitions.filter((tuition) => {
      const matchesStatus =
        statusFilter === "all" || getListingStatus(tuition) === statusFilter;
      const searchable = [
        tuition.title,
        tuition.subject,
        tuition.classLevel,
        tuition.tutorName,
        tuition.teacherId,
        tuition.location,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStatus && searchable.includes(normalizedQuery);
    });
  }, [query, statusFilter, tuitions]);

  const pageCount = Math.max(1, Math.ceil(filteredTuitions.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleTuitions = filteredTuitions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <section className="overflow-hidden rounded-3xl border border-[#e6e9e1] bg-white">
      <div className="flex flex-col justify-between gap-4 border-b border-[#edf0e9] p-5 sm:flex-row sm:items-center sm:px-6">
        <div>
          <h2 className="font-semibold text-[#203b31]">All tuition posts</h2>
          <p className="mt-1 text-xs text-[#89928b]">
            Showing {filteredTuitions.length} of {tuitions.length} listings
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <label className="flex h-10 w-full items-center gap-2 rounded-xl border border-[#e1e6de] bg-[#fdfdfb] px-3 sm:w-64">
            <Search size={16} className="shrink-0 text-[#91a087]" />
            <Input
              type="search"
              aria-label="Search tuition posts"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search title, tutor, subject"
              className="h-8 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
            />
          </label>
          <label className="sr-only" htmlFor="tuition-status-filter">
            Filter by listing status
          </label>
          <select
            id="tuition-status-filter"
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value as ListingFilter);
              setPage(1);
            }}
            className="h-10 rounded-xl border border-[#e1e6de] bg-white px-3 text-sm text-[#526159] outline-none focus:border-[#91aa78] focus:ring-2 focus:ring-[#91aa78]/15"
          >
            {filters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredTuitions.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <BookOpenCheck className="mx-auto text-[#9aaa8c]" size={28} />
          <h3 className="mt-3 font-semibold text-[#354a40]">
            {tuitions.length ? "No listings match your filters" : "No tuition posts yet"}
          </h3>
          <p className="mt-1 text-sm text-[#89928b]">
            {tuitions.length
              ? "Try another search term or status."
              : "New tuition posts will appear here."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead className="bg-[#f7f8f4] text-[11px] uppercase tracking-[.12em] text-[#78847c]">
              <tr>
                <th className="px-5 py-3.5 font-semibold sm:px-6">Tuition</th>
                <th className="px-5 py-3.5 font-semibold">Tutor</th>
                <th className="px-5 py-3.5 font-semibold">Monthly fee</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf0e9]">
              {visibleTuitions.map((tuition, index) => {
                const id = getListingId(tuition);
                const status = getListingStatus(tuition);
                const approvalStatus = getApprovalStatus(tuition);
                const selectedStatus = id
                  ? statusDrafts[id] || approvalStatus
                  : approvalStatus;
                const hasStatusChange = selectedStatus !== approvalStatus;

                return (
                  <tr
                    key={id || `${tuition.title}-${index}`}
                    className="text-sm text-[#526159]"
                  >
                    <td className="px-5 py-4 sm:px-6">
                      <p className="font-semibold text-[#203b31]">
                        {tuition.title || "Untitled tuition"}
                      </p>
                      <p className="mt-1 text-xs text-[#89928b]">
                        {[tuition.subject, tuition.classLevel]
                          .filter(Boolean)
                          .join(" · ") || "Subject not set"}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#354a40]">
                        {tuition.tutorName || "Tutor"}
                      </p>
                      <p className="mt-1 text-xs text-[#89928b]">
                        ID: {tuition.teacherId || "—"}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-[#354a40]">
                      {tuition.monthlyFee === "" || tuition.monthlyFee == null
                        ? "—"
                        : `৳ ${new Intl.NumberFormat("en-BD").format(Number(tuition.monthlyFee))}`}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          aria-label={`Listing status for ${tuition.title || "tuition"}`}
                          value={selectedStatus}
                          disabled={!id || updatingId !== null || deletingId !== null}
                          onChange={(event) =>
                            id &&
                            setStatusDrafts((current) => ({
                              ...current,
                              [id]: event.target.value as AdminTuitionStatus,
                            }))
                          }
                          className={`h-9 rounded-lg border border-[#dfe5dc] px-2.5 text-xs font-semibold capitalize outline-none focus:border-[#91aa78] focus:ring-2 focus:ring-[#91aa78]/15 ${statusStyle(status)}`}
                        >
                          {statusOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <Button
                          type="button"
                          size="sm"
                          disabled={!id || !hasStatusChange || updatingId !== null || deletingId !== null}
                          onClick={() => id && void handleStatusUpdate(tuition, id)}
                          className="h-9 rounded-lg bg-[#1d3b31] px-3 text-xs text-white hover:bg-[#315b45]"
                        >
                          {updatingId === id ? "Saving…" : "Save"}
                        </Button>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {id ? (
                          <Link
                            href={`/tuitions/${encodeURIComponent(id)}`}
                            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#dfe5dc] px-3 text-xs font-semibold text-[#354a40] transition hover:bg-[#f5f7f1]"
                          >
                            Details <ArrowUpRight size={14} />
                          </Link>
                        ) : null}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={!id || updatingId !== null || deletingId !== null}
                          onClick={() => id && void handleDelete(tuition, id)}
                          className="h-9 gap-1.5 rounded-lg border-red-200 px-3 text-xs text-red-700 hover:bg-red-50 hover:text-red-800"
                        >
                          <Trash2 size={14} />
                          {deletingId === id ? "Deleting…" : "Delete"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {filteredTuitions.length > PAGE_SIZE && (
        <div className="flex flex-col gap-3 border-t border-[#edf0e9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs text-[#89928b]">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–
            {Math.min(currentPage * PAGE_SIZE, filteredTuitions.length)} of{" "}
            {filteredTuitions.length} listings
          </p>
          <nav aria-label="Tuition table pages" className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              className="flex size-10 items-center justify-center rounded-xl border border-[#e2e7df] bg-white text-[#526159] transition hover:bg-[#f5f7f1] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={16} />
            </button>
            {getPageItems(pageCount, currentPage).map((pageItem, index) =>
              pageItem === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="flex size-10 items-center justify-center text-sm text-[#89928b]"
                  aria-hidden="true"
                >
                  …
                </span>
              ) : (
                <button
                  key={pageItem}
                  type="button"
                  aria-label={`Page ${pageItem}`}
                  aria-current={currentPage === pageItem ? "page" : undefined}
                  onClick={() => setPage(pageItem)}
                  className={`flex size-10 items-center justify-center rounded-xl border text-sm font-medium transition ${
                    currentPage === pageItem
                      ? "border-[#1d3b31] bg-[#1d3b31] text-white"
                      : "border-[#e2e7df] bg-white text-[#526159] hover:bg-[#f5f7f1]"
                  }`}
                >
                  {pageItem}
                </button>
              ),
            )}
            <button
              type="button"
              aria-label="Next page"
              disabled={currentPage === pageCount}
              onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
              className="flex size-10 items-center justify-center rounded-xl border border-[#e2e7df] bg-white text-[#526159] transition hover:bg-[#f5f7f1] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowRight size={16} />
            </button>
          </nav>
        </div>
      )}
    </section>
  );
}
