import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreditCard, ShieldCheck } from "lucide-react";

import { auth } from "@/lib/auth";
import { getStudentTransactions, getTutorTransactions } from "@/lib/api/admin/transactions";
import { getAccountRole } from "@/lib/user-role";
import { AdminTransactionsTable } from "../components/admin-transactions-table";

export const instant = false;

export default async function AdminTransactionsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/sign-in?callbackURL=${encodeURIComponent("/dashboard/transactions")}`);
  }
  if (getAccountRole(session.user) !== "admin") redirect("/dashboard");

  const [studentResult, tutorResult] = await Promise.all([
    getStudentTransactions().catch(() => null),
    getTutorTransactions().catch(() => null),
  ]);

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-5 rounded-3xl bg-[#1d3b31] p-6 text-white sm:flex-row sm:items-end sm:p-8">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#d9f36a]">
            <ShieldCheck size={15} /> Admin workspace
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Transactions</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
            Review Pro plan payments from students and tutors.
          </p>
        </div>
        <CreditCard size={28} className="text-[#d9f36a]" />
      </section>

      <AdminTransactionsTable
        title="Student transactions"
        roleLabel="Student"
        transactions={studentResult?.data || []}
        error={studentResult === null}
      />
      <AdminTransactionsTable
        title="Tutor transactions"
        roleLabel="Tutor"
        transactions={tutorResult?.data || []}
        error={tutorResult === null}
      />
    </div>
  );
}
