import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ShieldCheck, UserRound, UsersRound } from "lucide-react";
import { AdminUsersTable } from "../../components/admin-users-table";
import { AdminCreateUserForm } from "../../components/admin-create-user-form";
import { auth } from "@/lib/auth";
import { getUsers } from "@/lib/api/admin/server-users";
import { getAccountRole } from "@/lib/user-role";

export const instant = false;

export default async function AdminUsersPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(
      `/sign-in?callbackURL=${encodeURIComponent("/dashboard/admin/users")}`,
    );
  }

  if (getAccountRole(session.user) !== "admin") {
    redirect("/dashboard");
  }

  const users = await getUsers().catch(() => null);
  const students = users?.filter((user) => user.role === "student").length;
  const tutors = users?.filter((user) => user.role === "tutor").length;
  const admins = users?.filter((user) => user.role === "admin").length;

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-5 rounded-3xl bg-[#1d3b31] p-6 text-white sm:flex-row sm:items-end sm:p-8">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#d9f36a]">
            <ShieldCheck size={15} /> Admin workspace
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            User management
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
            Review account details and manage student, tutor, and admin access.
          </p>
        </div>
        <p className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80">
          {users === null
            ? "User list unavailable"
            : `${users.length} accounts`}
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3" aria-label="User totals">
        <UserCountCard
          label="Students"
          value={students}
          icon={UserRound}
          tint="bg-[#eaf0dc] text-[#648147]"
        />
        <UserCountCard
          label="Tutors"
          value={tutors}
          icon={UsersRound}
          tint="bg-[#eaf0f5] text-[#66849a]"
        />
        <UserCountCard
          label="Admins"
          value={admins}
          icon={ShieldCheck}
          tint="bg-[#f3eaf5] text-[#92709a]"
        />
      </section>

      <AdminCreateUserForm />

      {users === null ? (
        <div
          className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
          role="alert"
        >
          Could not load users. Check that the backend is running, then refresh
          this page.
        </div>
      ) : (
        <AdminUsersTable users={users} currentUserId={session.user.id} />
      )}
    </div>
  );
}

function UserCountCard({
  label,
  value,
  icon: Icon,
  tint,
}: {
  label: string;
  value?: number;
  icon: typeof UserRound;
  tint: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e6e9e1] bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#77827b]">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-[#203b31]">
            {value === undefined
              ? "—"
              : new Intl.NumberFormat("en-BD").format(value)}
          </p>
        </div>
        <span
          className={`flex size-11 items-center justify-center rounded-2xl ${tint}`}
        >
          <Icon size={19} />
        </span>
      </div>
    </article>
  );
}
