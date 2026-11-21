import {
  ArrowUpRight,
  BadgeCheck,
  CircleX,
  Clock3,
  Info,
  MapPin,
  Monitor,
} from "lucide-react";
import Link from "next/link";
import type { TuitionFormValues } from "@/lib/types/tuition";

export function TuitionCard({
  tuition,
}: {
  tuition: TuitionFormValues;
}) {
  const tutor =
    tuition.tutorName ||
    (tuition.teacherId
      ? `Tutor · ${tuition.teacherId.slice(0, 8)}`
      : "MentorLagbe tutor");
  const initials = (tuition.tutorName || tuition.teacherId || "T")
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  const fee =
    tuition.monthlyFee == null
      ? "Fee not set"
      : `৳ ${new Intl.NumberFormat("en-BD").format(Number(tuition.monthlyFee))}`;
  const days = Number(tuition.daysPerWeek);
  const schedule =
    Number.isFinite(days) && days > 0
      ? `${days} ${days === 1 ? "day" : "days"} / week`
      : "Schedule to be discussed";
  const location =
    tuition.mode === "Online"
      ? "Online"
      : tuition.location || "Location not provided";
  const tuitionId = tuition._id || tuition.id || tuition.tuitionId;
  const rawStatus =
    tuition.isActive === false
      ? "inactive"
      : tuition.approvalStatus?.toLowerCase() || "unknown";
  const status = {
    label:
      rawStatus === "pending"
        ? "Pending review"
        : rawStatus === "approved"
          ? "Approved"
          : rawStatus === "rejected"
            ? "Rejected"
            : rawStatus === "inactive"
              ? "Inactive"
              : "Status unavailable",
    className:
      rawStatus === "approved"
        ? "bg-[#e8f3ed] text-[#3d7654]"
        : rawStatus === "rejected" || rawStatus === "inactive"
          ? "bg-[#fbeceb] text-[#a35e55]"
          : rawStatus === "pending"
            ? "bg-[#fbf0dc] text-[#956c25]"
            : "bg-[#f3f6ed] text-[#526159]",
  };
  const StatusIcon =
    rawStatus === "approved"
      ? BadgeCheck
      : rawStatus === "rejected" || rawStatus === "inactive"
        ? CircleX
        : rawStatus === "pending"
          ? Clock3
          : Info;

  return (
    <Link
      href={
        tuitionId ? `/tuitions/${encodeURIComponent(tuitionId)}` : "/tuitions"
      }
      aria-label={`View details for ${tuition.title || "tuition listing"}`}
      className="group block overflow-hidden rounded-2xl border border-[#e2e7de] bg-white transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#b8c99f] hover:shadow-[0_20px_48px_-36px_rgba(29,59,49,.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#456450] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div
        className="relative h-40 bg-[#eaf0dc] bg-cover bg-center"
        style={
          tuition.bannerUrl
            ? { backgroundImage: `url("${tuition.bannerUrl}")` }
            : undefined
        }
      >
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <span className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[#354a40]">
            {tuition.subject || "Tuition"}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${status.className}`}
          >
            <StatusIcon size={14} /> {status.label}
          </span>
        </div>
        <span className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-xl bg-white text-[#284239] transition-colors duration-300 group-hover:bg-[#d9f36a]">
          <ArrowUpRight size={18} />
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-xs font-medium text-[#77827b]">
          {tuition.classLevel || "Class level not set"}
        </p>
        <h2 className="mt-1 line-clamp-2 text-xl font-semibold leading-7 tracking-tight text-[#203b31] text-balance">
          {tuition.title || "Untitled tuition"}
        </h2>

        <div className="mt-5 flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf0dc] text-xs font-semibold text-[#496844]">
            {initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#354a40]">
              {tutor}
            </p>
            <p className="mt-0.5 truncate text-xs text-[#8a958d]">
              Tutor ID: {tuition.teacherId || "Unavailable"}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#f3f6ed] px-2.5 py-2 text-xs font-medium text-[#567445]">
            {tuition.mode === "Online" ? (
              <Monitor size={14} />
            ) : (
              <MapPin size={14} />
            )}
            {tuition.mode}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#edf0e9] pt-4">
          <div>
            <p className="text-xs text-[#87928b]">Monthly fee</p>
            <p className="mt-1 text-lg font-semibold tracking-tight text-[#203b31]">
              {fee}
              {tuition.monthlyFee != null && (
                <span className="ml-1 text-xs font-normal text-[#87928b]">
                  / month
                </span>
              )}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#87928b]">Schedule</p>
            <p className="mt-1 text-sm font-medium text-[#354a40]">{schedule}</p>
            <p className="mt-1 inline-flex items-center justify-end gap-1 text-xs text-[#87928b]">
              <MapPin size={12} /> {location}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
