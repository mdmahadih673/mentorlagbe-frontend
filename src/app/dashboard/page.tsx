"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { ArrowRight, BookOpenCheck, CalendarDays, Check, Clock3, FilePlus2, Sparkles, UsersRound } from "lucide-react";

type DashboardRole = "student" | "tutor" | "admin";

const dashboardContent: Record<DashboardRole, {
  eyebrow: string;
  title: string;
  description: string;
  action: { label: string; href: string };
  stats: { label: string; value: string; note: string; icon: typeof BookOpenCheck; tint: string }[];
  sectionTitle: string;
  rows: { title: string; subtitle: string; date: string; status: string; statusColor: string }[];
}> = {
  student: {
    eyebrow: "Student workspace",
    title: "Your learning, at a glance.",
    description: "Keep track of your applications and find the right next step for your learning goals.",
    action: { label: "Browse tuitions", href: "/tuitions" },
    stats: [
      { label: "Applications", value: "08", note: "Across your subjects", icon: BookOpenCheck, tint: "bg-[#eaf0dc] text-[#648147]" },
      { label: "Accepted", value: "03", note: "Ready for next steps", icon: Check, tint: "bg-[#e8f3ed] text-[#4f8866]" },
      { label: "Pending", value: "04", note: "Waiting for a response", icon: Clock3, tint: "bg-[#fbf0dc] text-[#b0873b]" },
      { label: "Current plan", value: "Free", note: "Upgrade when you’re ready", icon: Sparkles, tint: "bg-[#f3eaf5] text-[#92709a]" },
    ],
    sectionTitle: "Recent applications",
    rows: [
      { title: "Higher Math · Class 9", subtitle: "Nusrat Jahan · Online", date: "Today", status: "Pending", statusColor: "bg-[#fbf2df] text-[#9d7931]" },
      { title: "English writing · Class 8", subtitle: "Rafi Ahmed · Dhanmondi", date: "May 18", status: "Accepted", statusColor: "bg-[#e8f3ed] text-[#4f8866]" },
      { title: "Physics · HSC", subtitle: "Tahmid Hasan · Online", date: "May 16", status: "Pending", statusColor: "bg-[#fbf2df] text-[#9d7931]" },
    ],
  },
  tutor: {
    eyebrow: "Tutor workspace",
    title: "Grow your teaching practice.",
    description: "Manage your tuition posts, meet new learners, and stay on top of incoming applications.",
    action: { label: "Post a tuition", href: "/dashboard/post-tuition" },
    stats: [
      { label: "Tuition posts", value: "06", note: "Across your subjects", icon: BookOpenCheck, tint: "bg-[#eaf0dc] text-[#648147]" },
      { label: "Approved", value: "04", note: "Visible to students", icon: Check, tint: "bg-[#e8f3ed] text-[#4f8866]" },
      { label: "Applicants", value: "18", note: "Across all active posts", icon: UsersRound, tint: "bg-[#eaf0f5] text-[#66849a]" },
      { label: "Current plan", value: "Pro", note: "Unlimited tuition posts", icon: Sparkles, tint: "bg-[#f3eaf5] text-[#92709a]" },
    ],
    sectionTitle: "Recent applicants",
    rows: [
      { title: "Higher Math · Class 9", subtitle: "Samira Khan · Preferred: Evening", date: "Today", status: "New applicant", statusColor: "bg-[#eaf0f5] text-[#66849a]" },
      { title: "Physics · HSC", subtitle: "Arif Hossain · Preferred: Weekend", date: "May 18", status: "Reviewing", statusColor: "bg-[#fbf2df] text-[#9d7931]" },
      { title: "English · Class 8", subtitle: "Maliha Rahman · Preferred: Afternoon", date: "May 16", status: "Accepted", statusColor: "bg-[#e8f3ed] text-[#4f8866]" },
    ],
  },
  admin: {
    eyebrow: "Platform overview",
    title: "A healthy learning community.",
    description: "Review platform activity and keep the MentorLagbe community moving forward.",
    action: { label: "Review tuition posts", href: "/dashboard/tuitions" },
    stats: [
      { label: "Total users", value: "1,248", note: "Students and tutors", icon: UsersRound, tint: "bg-[#eaf0dc] text-[#648147]" },
      { label: "Pending review", value: "12", note: "Tuition posts", icon: Clock3, tint: "bg-[#fbf0dc] text-[#b0873b]" },
      { label: "Approved posts", value: "186", note: "Currently active", icon: Check, tint: "bg-[#e8f3ed] text-[#4f8866]" },
      { label: "Revenue", value: "$2,460", note: "Pro plan payments", icon: Sparkles, tint: "bg-[#f3eaf5] text-[#92709a]" },
    ],
    sectionTitle: "Needs your review",
    rows: [
      { title: "Chemistry · HSC", subtitle: "Posted by Maliha Chowdhury", date: "Today", status: "Pending review", statusColor: "bg-[#fbf2df] text-[#9d7931]" },
      { title: "English · Class 6–8", subtitle: "Posted by Rafi Ahmed", date: "May 18", status: "Pending review", statusColor: "bg-[#fbf2df] text-[#9d7931]" },
      { title: "Biology · Class 9–10", subtitle: "Posted by Farhana Akter", date: "May 17", status: "Approved", statusColor: "bg-[#e8f3ed] text-[#4f8866]" },
    ],
  },
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const role = ((session?.user.role as DashboardRole | undefined) || "student");
  const content = dashboardContent[role] || dashboardContent.student;
  const name = session?.user.name?.split(" ")[0] || "there";

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-6 rounded-[1.8rem] bg-[#1d3b31] px-6 py-7 text-white sm:px-8 sm:py-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#d9f36a]"><Sparkles size={14} /> {content.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Hello, {name}.</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">{content.description}</p>
        </div>
        <Link href={content.action.href} className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#d9f36a] px-5 text-sm font-bold text-[#203b31] transition hover:bg-[#e6fb94]">
          {content.action.label}<ArrowRight size={16} />
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Dashboard statistics">
        {content.stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label} className="rounded-3xl border border-[#e6e9e1] bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div><p className="text-sm font-medium text-[#77827b]">{stat.label}</p><p className="mt-3 text-3xl font-semibold tracking-[-.05em] text-[#203b31]">{stat.value}</p></div>
                <span className={`flex size-11 items-center justify-center rounded-2xl ${stat.tint}`}><Icon size={19} /></span>
              </div>
              <p className="mt-3 text-xs text-[#9aa39c]">{stat.note}</p>
            </article>
          );
        })}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <section className="overflow-hidden rounded-3xl border border-[#e6e9e1] bg-white">
          <div className="flex items-center justify-between gap-4 border-b border-[#edf0e9] px-5 py-5 sm:px-6">
            <div><h2 className="font-semibold text-[#203b31]">{content.sectionTitle}</h2><p className="mt-1 text-xs text-[#929c95]">A quick look at your latest activity</p></div>
            <Link href={role === "tutor" ? "/dashboard/applicants" : role === "admin" ? "/dashboard/tuitions" : "/dashboard/my-applications"} className="whitespace-nowrap text-xs font-semibold text-[#628044] hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-[#f0f2ed]">
            {content.rows.map((row) => (
              <div key={row.title + row.subtitle} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#f1f5e7] text-[#6c8b43]"><BookOpenCheck size={18} /></span>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-[#354a40]">{row.title}</p><p className="mt-1 truncate text-xs text-[#929c95]">{row.subtitle}</p></div>
                <div className="flex items-center gap-3 pl-[52px] sm:pl-0"><span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${row.statusColor}`}>{row.status}</span><span className="w-12 text-right text-xs text-[#a1aaa3]">{row.date}</span></div>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-3xl border border-[#e6e9e1] bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2"><CalendarDays size={17} className="text-[#78934c]" /><h2 className="font-semibold text-[#203b31]">Your next step</h2></div>
          <p className="mt-4 text-sm leading-6 text-[#77827b]">{role === "tutor" ? "Keep your tuition posts up to date so learners can find the right match." : role === "admin" ? "Review new tuition posts to keep listings relevant and helpful." : "Explore approved tuitions and apply to the ones that fit your learning goals."}</p>
          <div className="mt-5 rounded-2xl bg-[#f4f6ef] p-4">
            <p className="text-xs font-bold uppercase tracking-[.14em] text-[#7b9258]">Recommended</p>
            <p className="mt-2 text-sm font-semibold text-[#354a40]">{role === "tutor" ? "Complete your tutor profile" : role === "admin" ? "12 tuition posts need review" : "Find your next learning match"}</p>
            <Link href={role === "tutor" ? "/dashboard/profile" : role === "admin" ? "/dashboard/tuitions" : "/tuitions"} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#628044]">{role === "tutor" ? "Update profile" : role === "admin" ? "Review posts" : "Browse tuitions"}<ArrowRight size={13} /></Link>
          </div>
          <Link href="/how-it-works" className="mt-5 flex items-center gap-2 text-xs font-medium text-[#89928b]"><FilePlus2 size={15} /> New here? See how MentorLagbe works</Link>
        </aside>
      </div>
    </div>
  );
}
