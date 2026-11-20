"use client";

import { use, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowDownUp,
  ArrowLeft,
  BookOpenCheck,
  MapPin,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { TuitionCard } from "@/components/sections/tuition-card";
import { Input } from "@/components/ui/input";
import {
  searchTuitions,
  type TuitionSearchParams,
  type TuitionSearchResult,
} from "@/lib/api/tuition";

const subjects = [
  "Mathematics",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "ICT",
  "Other",
];
const classLevels = ["Class 6–8", "Class 9–10", "HSC", "Admission"];
type SortOrder = "newest" | "fee-low" | "fee-high";
const PAGE_SIZE = 6;

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#68766e]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 rounded border-[#d7dfd4] accent-[#315b45]"
      />
      <span>{label}</span>
    </label>
  );
}

export function TuitionBrowser({
  tuitionsPromise,
}: {
  tuitionsPromise: Promise<{ data: TuitionSearchResult | null; error: string }>;
}) {
  const initialResult = use(tuitionsPromise);
  const [tuitions, setTuitions] = useState(initialResult.data?.data ?? []);
  const [total, setTotal] = useState(initialResult.data?.total ?? 0);
  const [pageCount, setPageCount] = useState(initialResult.data?.totalPages ?? 1);
  const [currentPage, setCurrentPage] = useState(initialResult.data?.page ?? 1);
  const [error, setError] = useState(initialResult.error);
  const [isLoading, setIsLoading] = useState(false);
  const requestId = useRef(0);
  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "";
  const location = searchParams.get("location") || "";
  const selectedSubjects = searchParams.getAll("subject");
  const selectedClasses = searchParams.getAll("class");
  const selectedModes = searchParams.getAll("mode");
  const sortParam = searchParams.get("sort");
  const sortOrder: SortOrder =
    sortParam === "fee-low" || sortParam === "fee-high" ? sortParam : "newest";

  async function fetchListings(params: URLSearchParams) {
    const currentRequest = ++requestId.current;
    const filters: TuitionSearchParams = {
      q: params.get("q") || undefined,
      location: params.get("location") || undefined,
      subject: params.getAll("subject"),
      mode: params.getAll("mode"),
      class: params.getAll("class"),
      sort: ["fee-low", "fee-high"].includes(params.get("sort") || "")
        ? (params.get("sort") as SortOrder)
        : "newest",
      page: Number(params.get("page")) || 1,
      pageSize: PAGE_SIZE,
    };

    setIsLoading(true);
    setError("");
    try {
      const result = await searchTuitions(filters);
      if (currentRequest !== requestId.current) return;
      setTuitions(result.data);
      setTotal(result.total);
      setPageCount(Math.max(1, result.totalPages));
      setCurrentPage(result.page);
    } catch (reason) {
      if (currentRequest !== requestId.current) return;
      setError(reason instanceof Error ? reason.message : "Could not load tuition listings.");
      setTuitions([]);
      setTotal(0);
      setPageCount(1);
      setCurrentPage(1);
    } finally {
      if (currentRequest === requestId.current) setIsLoading(false);
    }
  }

  function updateQuery(
    key: string,
    value: string | string[],
    resetPage = false,
  ) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    } else if (value) {
      params.set(key, value);
    }
    if (resetPage) params.delete("page");

    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      query ? `${window.location.pathname}?${query}` : window.location.pathname,
    );
    void fetchListings(params);
  }

  const locations = useMemo(
    () =>
      [
        ...new Set(
          tuitions
            .filter((item) => item.mode === "Offline")
            .map((item) => item.location.trim())
            .filter(Boolean),
        ),
      ].sort(),
    [tuitions],
  );

  const pageNumbers = Array.from(
    new Set([1, currentPage - 1, currentPage, currentPage + 1, pageCount]),
  )
    .filter((number) => number >= 1 && number <= pageCount)
    .sort((a, b) => a - b);

  function toggleFilter(
    queryKey: string,
    value: string,
    values: string[],
    checked: boolean,
  ) {
    updateQuery(
      queryKey,
      checked ? [...values, value] : values.filter((item) => item !== value),
      true,
    );
  }

  function resetFilters() {
    const params = new URLSearchParams();
    window.history.replaceState(null, "", window.location.pathname);
    void fetchListings(params);
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#19342c]">
      <Navbar />
      <section className="border-b border-[#e8e9e1] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#849087] hover:text-[#456450]"
          >
            <ArrowLeft size={15} /> Home
          </Link>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#78934c]">
                <BookOpenCheck size={15} /> Find your learning match
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
                Find a tutor
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#77827b] sm:text-base">
                Browse real tuition listings and find a class that fits your
                goals.
              </p>
            </div>
            <p className="text-sm text-[#77827b]">
              <strong className="text-[#203b31]">
                {total}
              </strong>{" "}
              tuition listings
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#e6e9e1] bg-[#fbfaf7] p-3 sm:flex-row sm:items-center sm:p-2.5">
            <div className="flex min-w-0 flex-1 items-center gap-3 px-2 sm:px-3">
              <Search size={19} className="shrink-0 text-[#78934c]" />
              <Input
                type="search"
                aria-label="Search tuitions"
                value={search}
                onChange={(event) => {
                  updateQuery("q", event.target.value, true);
                }}
                placeholder="Search by subject, title, or tutor"
                className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
            </div>
            <span className="hidden h-8 w-px bg-[#e3e7df] sm:block" />
            <label className="flex items-center gap-2 px-2 text-sm text-[#89928b] sm:px-3">
              <MapPin size={16} className="text-[#78934c]" />
              <select
                aria-label="Filter by location"
                value={location}
                onChange={(event) => {
                  updateQuery("location", event.target.value, true);
                }}
                className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#68766e] outline-none sm:w-40"
              >
                <option value="">Any location</option>
                <option value="Online">Online</option>
                {locations.map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-7 px-5 py-8 sm:px-8 lg:grid-cols-[245px_1fr] lg:px-10 lg:py-10">
        <aside className="h-fit rounded-3xl border border-[#e6e9e1] bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-[#edf0e9] pb-4">
            <h2 className="flex items-center gap-2 font-semibold text-[#203b31]">
              <SlidersHorizontal size={17} /> Filters
            </h2>
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-semibold text-[#6d8c43]"
            >
              Reset
            </button>
          </div>
          <fieldset className="space-y-3 border-b border-[#edf0e9] py-5">
            <legend className="mb-4 text-sm font-semibold text-[#354a40]">
              Subject
            </legend>
            {subjects.map((subject) => (
              <FilterCheckbox
                key={subject}
                label={subject}
                checked={selectedSubjects.includes(subject)}
                onChange={(checked) =>
                  toggleFilter(
                      "subject",
                    subject,
                    selectedSubjects,
                    checked,
                  )
                }
              />
            ))}
          </fieldset>
          <fieldset className="space-y-3 border-b border-[#edf0e9] py-5">
            <legend className="mb-4 text-sm font-semibold text-[#354a40]">
              Class level
            </legend>
            {classLevels.map((level) => (
              <FilterCheckbox
                key={level}
                label={level}
                checked={selectedClasses.includes(level)}
                onChange={(checked) =>
                  toggleFilter(
                      "class",
                    level,
                    selectedClasses,
                    checked,
                  )
                }
              />
            ))}
          </fieldset>
          <fieldset className="space-y-3 border-b border-[#edf0e9] py-5">
            <legend className="mb-4 text-sm font-semibold text-[#354a40]">
              Learning mode
            </legend>
            {(["Online", "Offline"] as const).map((mode) => (
              <FilterCheckbox
                key={mode}
                label={mode}
                checked={selectedModes.includes(mode)}
                onChange={(checked) =>
                    toggleFilter("mode", mode, selectedModes, checked)
                }
              />
            ))}
          </fieldset>
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-[#203b31]">
                All tuition listings
              </h2>
              <p className="mt-1 text-sm text-[#89928b]">
                {error
                  ? "Listings unavailable"
                  : `${total} tuition listings`}
              </p>
            </div>
            <label className="flex items-center gap-2 self-start rounded-xl border border-[#e3e7df] bg-white px-3 text-xs text-[#89928b]">
              <ArrowDownUp size={14} />
              <span>Sort by</span>
              <select
                aria-label="Sort tuition listings"
                value={sortOrder}
                onChange={(event) => {
                  updateQuery("sort", event.target.value, true);
                }}
                className="h-10 bg-transparent font-semibold text-[#526159] outline-none"
              >
                <option value="newest">Newest</option>
                <option value="fee-low">Fee: low to high</option>
                <option value="fee-high">Fee: high to low</option>
              </select>
            </label>
          </div>
          {isLoading && (
            <p className="mb-3 text-sm text-[#89928b]" role="status">
              Updating tuition listings...
            </p>
          )}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-busy={isLoading}>
            {error ? (
              <div
                className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 sm:col-span-2 xl:col-span-3"
                role="alert"
              >
                {error} Make sure the backend is running and refresh the page.
              </div>
            ) : tuitions.length ? (
              tuitions.map((tuition, index) => (
                <TuitionCard
                  key={
                    tuition._id ||
                    tuition.id ||
                    tuition.tuitionId ||
                    `${tuition.teacherId}-${(currentPage - 1) * PAGE_SIZE + index}`
                  }
                  tuition={tuition}
                  index={index}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-[#e6e9e1] bg-white p-8 text-center sm:col-span-2 xl:col-span-3">
                <p className="text-sm text-[#77827b]">
                  No tuition matches these filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#456450]"
                >
                  Clear filters <X size={14} />
                </button>
              </div>
            )}
          </div>
          {!error && total > PAGE_SIZE && (
            <nav
              aria-label="Tuition listings pages"
              className="mt-8 flex flex-wrap items-center justify-center gap-2"
            >
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => updateQuery("page", String(currentPage - 1))}
                className="flex size-10 items-center justify-center rounded-xl border border-[#e3e7df] bg-white text-[#526159] transition hover:bg-[#f3f5ef] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>
              {pageNumbers.map((pageNumber, index) => (
                <span key={pageNumber} className="contents">
                  {index > 0 && pageNumber - pageNumbers[index - 1] > 1 && (
                    <span className="px-1 text-sm text-[#89928b]">…</span>
                  )}
                  <button
                    type="button"
                    aria-label={`Go to page ${pageNumber}`}
                    aria-current={
                      currentPage === pageNumber ? "page" : undefined
                    }
                    onClick={() => updateQuery("page", String(pageNumber))}
                    className={`flex size-10 items-center justify-center rounded-xl border text-sm font-medium transition ${
                      currentPage === pageNumber
                        ? "border-[#1d3b31] bg-[#1d3b31] text-white"
                        : "border-[#e3e7df] bg-white text-[#526159] hover:bg-[#f3f5ef]"
                    }`}
                  >
                    {pageNumber}
                  </button>
                </span>
              ))}
              <button
                type="button"
                aria-label="Next page"
                disabled={currentPage === pageCount}
                onClick={() => updateQuery("page", String(currentPage + 1))}
                className="flex size-10 items-center justify-center rounded-xl border border-[#e3e7df] bg-white text-[#526159] transition hover:bg-[#f3f5ef] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
