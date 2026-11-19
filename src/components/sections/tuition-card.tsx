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

const accents = [
  "bg-[#dbe9c9]",
  "bg-[#f2dfcb]",
  "bg-[#d9e3ec]",
  "bg-[#eaddef]",
  "bg-[#d9ece6]",
  "bg-[#f0e8c8]",
];

export function TuitionCard({
  tuition,
  index = 0,
}: {
  tuition: TuitionFormValues;
  index?: number;
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
        ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
        : rawStatus === "rejected" || rawStatus === "inactive"
          ? "bg-red-50 text-red-800 ring-red-200"
          : rawStatus === "pending"
            ? "bg-amber-50 text-amber-900 ring-amber-200"
            : "bg-white/90 text-[#526159] ring-[#dce3d8]",
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
      className="group block overflow-hidden rounded-[1.6rem] border border-[#e6e9e1] bg-white transition duration-200 hover:-translate-y-1 hover:border-[#cbd7bd] hover:shadow-[0_20px_55px_-35px_rgba(29,59,49,.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#456450]"
    >
      <div
        className={`relative flex h-40 items-end overflow-hidden bg-cover bg-center p-5 ${accents[index % accents.length]}`}
        style={
          tuition.bannerUrl
            ? {
                backgroundImage: `linear-gradient(rgba(255,255,255,.1),rgba(255,255,255,.18)),url("${tuition.bannerUrl}")`,
              }
            : undefined
        }
      >
        <div className="absolute -right-7 -top-12 size-44 rounded-full border-[22px] border-white/15" />
        <div className="absolute right-20 top-8 size-12 rounded-2xl border border-white/30 rotate-12" />
        <div className="absolute left-5 top-5 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[.14em] text-[#3e5947]">
          {tuition.subject || "Tuition"}
        </div>
        <span
          className={`absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold shadow-sm ring-1 ring-inset ${status.className}`}
        >
          <StatusIcon size={13} /> {status.label}
        </span>
        <div className="relative flex w-full items-end justify-between">
          <div>
            <p className="text-xs font-medium text-[#294438]/70">
              {tuition.classLevel || "Class level not set"}
            </p>
            <p className="mt-1 max-w-[250px] text-xl font-semibold leading-tight tracking-tight text-[#203b31]">
              {tuition.title || "Untitled tuition"}
            </p>
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/80 text-[#284239] transition group-hover:bg-[#d9f36a]">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#eaf0dc] text-xs font-bold text-[#496844]">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#354a40]">
                {tutor}
              </p>
              <p className="mt-0.5 truncate text-xs text-[#8a958d]">
                Tutor ID: {tuition.teacherId || "Unavailable"}
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#f3f6ed] px-2.5 py-1.5 text-[11px] font-semibold text-[#567445]">
            {tuition.mode === "Online" ? (
              <Monitor size={13} />
            ) : (
              <MapPin size={13} />
            )}
            {tuition.mode}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#edf0e9] pt-4">
          <p className="text-xs text-[#87928b]">
            Monthly fee{" "}
            <span className="mt-1 block text-lg font-bold tracking-tight text-[#203b31]">
              {fee}
              {tuition.monthlyFee != null && (
                <span className="ml-1 text-xs font-medium text-[#87928b]">
                  / month
                </span>
              )}
            </span>
          </p>
          <div className="text-right text-xs text-[#87928b]">
            <p>{schedule}</p>
            <p className="mt-1 inline-flex items-center justify-end gap-1">
              <MapPin size={12} />
              {location}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
