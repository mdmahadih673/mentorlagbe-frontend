import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  Check,
  Clock3,
  FilePlus2,
  Sparkles,
  UsersRound,
  XCircle,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { getAccountRole } from "@/lib/user-role";
import { getUsers as getAllUsers } from "@/lib/api/admin/server-users";
import { getAdminApplicationCount } from "@/lib/api/admin/applications";
import { getAdminTuitions } from "@/lib/api/admin/tuitions";
import { getAdminRevenue } from "@/lib/api/admin/transactions";
import { getStudentApplicationCountsServer } from "@/lib/api/student/server-applications";
import { getTutorApplicationsServer } from "@/lib/api/tutor/server-applications";
import { getMyTuitionsServer } from "@/lib/api/tutor/server-tuitions";
import { getAllTuitions } from "@/lib/api/tuition";
import type { TuitionApplication } from "@/lib/types/tuition";

export const instant = false;

type DashboardRole = "student" | "tutor" | "admin";
type DashboardStat = {
  label: string;
  value: string;
  note: string;
  icon: typeof BookOpenCheck;
  tint: string;
};

function count(value: number | undefined) {
  return value === undefined
    ? "—"
    : new Intl.NumberFormat("en-BD").format(value);
}

function applicationCount(
  applications: TuitionApplication[] | null,
  status?: string,
) {
  if (!applications) return undefined;
  return status
    ? applications.filter(
        (application) => application.status?.toLowerCase() === status,
      ).length
    : applications.length;
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in?callbackURL=%2Fdashboard");

  const role = getAccountRole(session.user) as DashboardRole;
  const name = session.user.name?.split(" ")[0] || "there";
  let eyebrow = "Student workspace";
  let description =
    "Keep track of your applications and find the right next step for your learning goals.";
  let action = { label: "Browse tuitions", href: "/tuitions" };
  let nextStep =
    "Explore approved tuitions and apply to the ones that fit your learning goals.";
  let recommendation = "Find your next learning match";
  let recommendationHref = "/tuitions";
  let stats: DashboardStat[];

  if (role === "tutor") {
    eyebrow = "Tutor workspace";
    description =
      "Manage your tuition posts and keep track of incoming student requests.";
    action = { label: "Post a tuition", href: "/dashboard/post-tuition" };
    nextStep =
      "Keep your tuition posts up to date so learners can find the right match.";
    recommendation = "Review student requests";
    recommendationHref = "/dashboard/applicants";

    const [tuitions, applications] = await Promise.all([
      getMyTuitionsServer(session.user.id).catch(() => null),
      getTutorApplicationsServer(session.user.id).catch(() => null),
    ]);
    const approvedCount = tuitions?.filter(
      (tuition) =>
        tuition.approvalStatus?.toLowerCase() === "approved" &&
        tuition.isActive !== false,
    ).length;
    const pendingCount = tuitions?.filter(
      (tuition) => tuition.approvalStatus?.toLowerCase() === "pending",
    ).length;

    stats = [
      {
        label: "Tuition posts",
        value: count(tuitions?.length),
        note: "Your posted listings",
        icon: BookOpenCheck,
        tint: "bg-[#eaf0dc] text-[#648147]",
      },
      {
        label: "Approved",
        value: count(approvedCount),
        note: "Active and visible",
        icon: Check,
        tint: "bg-[#e8f3ed] text-[#4f8866]",
      },
      {
        label: "Applicants",
        value: count(applicationCount(applications)),
        note: "Requests for your posts",
        icon: UsersRound,
        tint: "bg-[#eaf0f5] text-[#66849a]",
      },
      {
        label: "Pending review",
        value: count(pendingCount),
        note: "Waiting for approval",
        icon: Clock3,
        tint: "bg-[#fbf0dc] text-[#b0873b]",
      },
    ];
  } else if (role === "admin") {
    eyebrow = "Platform overview";
    description =
      "Review listings, monitor student requests, and track platform payments.";
    action = { label: "Review tuition posts", href: "/dashboard/tuitions" };
    nextStep = "Review tuition posts and keep listings relevant and helpful.";
    recommendation = "Review tuition posts";
    recommendationHref = "/dashboard/tuitions";

    const [users, tuitions, totalApplications, totalRevenue] = await Promise.all([
      getAllUsers().catch(() => null),
      getAdminTuitions().catch(() => null),
      getAdminApplicationCount().catch(() => undefined),
      getAdminRevenue().catch(() => undefined),
    ]);
    stats = [
      {
        label: "Total users",
        value: count(users?.length),
        note: "All platform accounts",
        icon: UsersRound,
        tint: "bg-[#eaf0dc] text-[#648147]",
      },
      {
        label: "Total tutors",
        value: count(users?.filter((user) => user.role === "tutor").length),
        note: "Tutor accounts",
        icon: UsersRound,
        tint: "bg-[#eaf0f5] text-[#66849a]",
      },
      {
        label: "Pending review",
        value: count(
          tuitions?.filter(
            (tuition) => tuition.approvalStatus?.toLowerCase() === "pending",
          ).length,
        ),
        note: "Tuition posts",
        icon: Clock3,
        tint: "bg-[#fbf0dc] text-[#b0873b]",
      },
      {
        label: "Approved posts",
        value: count(
          tuitions?.filter(
            (tuition) =>
              tuition.approvalStatus?.toLowerCase() === "approved" &&
              tuition.isActive !== false,
          ).length,
        ),
        note: "Currently active",
        icon: Check,
        tint: "bg-[#e8f3ed] text-[#4f8866]",
      },
      {
        label: "Rejected posts",
        value: count(
          tuitions?.filter(
            (tuition) => tuition.approvalStatus?.toLowerCase() === "rejected",
          ).length,
        ),
        note: "Not approved",
        icon: XCircle,
        tint: "bg-[#fbeceb] text-[#a35e55]",
      },
      {
        label: "Applications",
        value: count(totalApplications),
        note: "Student tuition requests",
        icon: BookOpenCheck,
        tint: "bg-[#eaf0f5] text-[#66849a]",
      },
      {
        label: "Total revenue",
        value:
          totalRevenue === undefined
            ? "—"
            : new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
              }).format(totalRevenue),
        note: "Successful payments",
        icon: CalendarDays,
        tint: "bg-[#f4eafa] text-[#8b65a1]",
      },
    ];
  } else {
    const [applicationCounts, tuitions] = await Promise.all([
      getStudentApplicationCountsServer(session.user.id).catch(() => null),
      getAllTuitions().catch(() => null),
    ]);
    stats = [
      {
        label: "Applications",
        value: count(applicationCounts?.totalApplications),
        note: "Your tuition requests",
        icon: BookOpenCheck,
        tint: "bg-[#eaf0dc] text-[#648147]",
      },
      {
        label: "Accepted",
        value: count(applicationCounts?.acceptedApplications),
        note: "Ready for next steps",
        icon: Check,
        tint: "bg-[#e8f3ed] text-[#4f8866]",
      },
      {
        label: "Pending",
        value: count(applicationCounts?.pendingApplications),
        note: "Waiting for a response",
        icon: Clock3,
        tint: "bg-[#fbf0dc] text-[#b0873b]",
      },
      {
        label: "Available tuitions",
        value: count(
          tuitions?.filter(
            (tuition) =>
              tuition.approvalStatus?.toLowerCase() === "approved" &&
              tuition.isActive !== false,
          ).length,
        ),
        note: "Approved listings",
        icon: BookOpenCheck,
        tint: "bg-[#eaf0f5] text-[#66849a]",
      },
    ];
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-6 rounded-[1.8rem] bg-[#1d3b31] px-6 py-7 text-white sm:px-8 sm:py-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#d9f36a]">
            <Sparkles size={14} /> {eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">
            Hello, {name}.
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
            {description}
          </p>
        </div>
        <Link
          href={action.href}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#d9f36a] px-5 text-sm font-bold text-[#203b31] transition hover:bg-[#e6fb94]"
        >
          {action.label}
          <ArrowRight size={16} />
        </Link>
      </section>

      {role === "admin" && (
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#78934c]">
              Platform metrics
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#203b31]">
              At a glance
            </h2>
          </div>
          <p className="text-xs text-[#89928b]">
            Users, listings, requests, and successful payments
          </p>
        </div>
      )}

      <section
        className={`grid gap-4 sm:grid-cols-2 ${role === "admin" ? "xl:grid-cols-3" : "xl:grid-cols-4"}`}
        aria-label="Dashboard statistics"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isRevenue = role === "admin" && stat.label === "Total revenue";
          return (
            <article
              key={stat.label}
              className={`group relative overflow-hidden rounded-3xl border p-5 transition-colors sm:p-6 ${
                isRevenue
                  ? "border-[#1d3b31] bg-[#1d3b31] text-white"
                  : "border-[#e6e9e1] bg-white text-[#203b31] hover:border-[#cbd7c5]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className={`text-sm font-medium ${isRevenue ? "text-white/70" : "text-[#77827b]"}`}
                  >
                    {stat.label}
                  </p>
                  <p
                    className={`mt-3 text-3xl font-semibold tracking-[-.05em] ${isRevenue ? "text-white" : "text-[#203b31]"}`}
                  >
                    {stat.value}
                  </p>
                </div>
                <span
                  className={`flex size-11 items-center justify-center rounded-2xl ${
                    isRevenue ? "bg-[#d9f36a] text-[#1d3b31]" : stat.tint
                  }`}
                >
                  <Icon size={19} />
                </span>
              </div>
              <p
                className={`mt-3 text-xs ${isRevenue ? "text-white/55" : "text-[#9aa39c]"}`}
              >
                {stat.note}
              </p>
            </article>
          );
        })}
      </section>

      <aside className="rounded-3xl border border-[#e6e9e1] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <CalendarDays size={17} className="text-[#78934c]" />
          <h2 className="font-semibold text-[#203b31]">Your next step</h2>
        </div>
        <p className="mt-3 text-sm leading-6 text-[#77827b]">{nextStep}</p>
        <div className="mt-4 rounded-2xl bg-[#f4f6ef] p-4">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-[#7b9258]">
            Recommended
          </p>
          <Link
            href={recommendationHref}
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#354a40] hover:text-[#628044]"
          >
            {recommendation}
            <ArrowRight size={14} />
          </Link>
        </div>
        <Link
          href="/how-it-works"
          className="mt-5 flex items-center gap-2 text-xs font-medium text-[#89928b]"
        >
          <FilePlus2 size={15} /> New here? See how MentorLagbe works
        </Link>
      </aside>
    </div>
  );
}
