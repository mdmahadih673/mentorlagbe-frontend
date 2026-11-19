import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BookOpenCheck, Clock3, FileCheck2, XCircle } from "lucide-react";

import { AdminTuitionsTable } from "@/components/dashboard/admin-tuitions-table";
import { auth } from "@/lib/auth";
import { getAllTuitions } from "@/lib/api/tuition";
import { getAccountRole } from "@/lib/user-role";
import type { TuitionFormValues } from "@/lib/types/tuition";

export const instant = false;

export default async function AdminTuitionsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(
      `/sign-in?callbackURL=${encodeURIComponent("/dashboard/tuitions")}`,
    );
  }
  if (getAccountRole(session.user) !== "admin") redirect("/dashboard");

  let tuitions: TuitionFormValues[] | null = null;
  try {
    tuitions = await getAllTuitions();
  } catch {
    
  }

  const listings = tuitions || [];
  const countStatus = (status: string) =>
    listings.filter(
      (tuition) => tuition.approvalStatus?.toLowerCase() === status,
    ).length;

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-5 rounded-3xl bg-[#1d3b31] p-6 text-white sm:flex-row sm:items-end sm:p-8">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#d9f36a]">
            <BookOpenCheck size={15} /> Admin workspace
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Tuition listings
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
            Review all tuition posts and check their current listing status.
          </p>
        </div>
        <Link
          href="/tuitions"
          className="inline-flex h-10 items-center justify-center rounded-full border border-white/20 px-4 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          View public listings
        </Link>
      </section>

      {tuitions === null ? (
        <div
          className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
          role="alert"
        >
          Could not load tuition listings. Check that the backend is running,
          then refresh this page.
        </div>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Tuition totals">
            <TuitionCountCard
              label="All listings"
              value={listings.length}
              icon={BookOpenCheck}
              tint="bg-[#eaf0dc] text-[#648147]"
            />
            <TuitionCountCard
              label="Pending review"
              value={countStatus("pending")}
              icon={Clock3}
              tint="bg-[#fbf0dc] text-[#b0873b]"
            />
            <TuitionCountCard
              label="Approved"
              value={countStatus("approved")}
              icon={FileCheck2}
              tint="bg-[#e8f3ed] text-[#4f8866]"
            />
            <TuitionCountCard
              label="Rejected"
              value={countStatus("rejected")}
              icon={XCircle}
              tint="bg-[#fbeceb] text-[#a35e55]"
            />
          </section>

          <AdminTuitionsTable tuitions={listings} />
        </>
      )}
    </div>
  );
}

function TuitionCountCard({
  label,
  value,
  icon: Icon,
  tint,
}: {
  label: string;
  value: number;
  icon: typeof BookOpenCheck;
  tint: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e6e9e1] bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#77827b]">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-[#203b31]">
            {new Intl.NumberFormat("en-BD").format(value)}
          </p>
        </div>
        <span className={`flex size-11 items-center justify-center rounded-2xl ${tint}`}>
          <Icon size={19} />
        </span>
      </div>
    </article>
  );
}
