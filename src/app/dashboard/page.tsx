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
import { getAllUsers } from "@/lib/api/admin/users";
import { getStudentApplications } from "@/lib/api/student/applications";
import { getTutorApplications } from "@/lib/api/tutor/applications";
import { getMyTuitions } from "@/lib/api/tutor/tuition";
import { getAllTuitions } from "@/lib/api/tuition";
import type { TuitionApplication } from "@/lib/types/tuition";

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
      getMyTuitions(session.user.id).catch(() => null),
      getTutorApplications(session.user.id).catch(() => null),
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
      "Review platform activity and keep the MentorLagbe community moving forward.";
    action = { label: "Review tuition posts", href: "/dashboard/tuitions" };
    nextStep = "Review tuition posts and keep listings relevant and helpful.";
    recommendation = "Review tuition posts";
    recommendationHref = "/dashboard/tuitions";

    const [users, tuitions] = await Promise.all([
      getAllUsers().catch(() => null),
      getAllTuitions().catch(() => null),
    ]);
    stats = [
      {
        label: "Total users",
        value: count(users?.length),
        note: "Students and tutors",
        icon: UsersRound,
        tint: "bg-[#eaf0dc] text-[#648147]",
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
    ];
  } else {
    const [applications, tuitions] = await Promise.all([
      getStudentApplications(session.user.id).catch(() => null),
      getAllTuitions().catch(() => null),
    ]);
    stats = [
      {
        label: "Applications",
        value: count(applicationCount(applications)),
        note: "Your tuition requests",
        icon: BookOpenCheck,
        tint: "bg-[#eaf0dc] text-[#648147]",
      },
      {
        label: "Accepted",
        value: count(applicationCount(applications, "accepted")),
        note: "Ready for next steps",
        icon: Check,
        tint: "bg-[#e8f3ed] text-[#4f8866]",
      },
      {
        label: "Pending",
        value: count(applicationCount(applications, "pending")),
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

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Dashboard statistics"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article
              key={stat.label}
              className="rounded-3xl border border-[#e6e9e1] bg-white p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-[#77827b]">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-[-.05em] text-[#203b31]">
                    {stat.value}
                  </p>
                </div>
                <span
                  className={`flex size-11 items-center justify-center rounded-2xl ${stat.tint}`}
                >
                  <Icon size={19} />
                </span>
              </div>
              <p className="mt-3 text-xs text-[#9aa39c]">{stat.note}</p>
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
