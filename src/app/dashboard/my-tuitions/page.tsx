import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BookOpenCheck, Plus } from "lucide-react";
import { MyTuitionPostsTable } from "@/components/dashboard/my-tuition-posts-table";
import { auth } from "@/lib/auth";
import { getMyTuitions } from "@/lib/api/tuition";
import { getAccountRole } from "@/lib/user-role";

export default async function MyTuitionsPage({
  searchParams,
}: {
  searchParams: Promise<{ refresh?: string }>;
}) {
  await searchParams;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(
      `/sign-in?callbackURL=${encodeURIComponent("/dashboard/my-tuitions")}`,
    );
  }

  if (getAccountRole(session.user) !== "tutor") {
    return (
      <section className="rounded-3xl border border-[#e6e9e1] bg-white p-8 text-center">
        <BookOpenCheck className="mx-auto text-[#78934c]" size={28} />
        <h1 className="mt-4 text-2xl font-semibold text-[#203b31]">
          Tutor account required
        </h1>
        <p className="mt-2 text-sm text-[#77827b]">
          Switch to a tutor account to manage your tuition posts.
        </p>
      </section>
    );
  }

  const tuitions = await getMyTuitions(session.user.id).catch(() => null);

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-5 rounded-3xl bg-[#1d3b31] p-6 text-white sm:flex-row sm:items-end sm:p-8">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#d9f36a]">
            <BookOpenCheck size={15} /> Tutor workspace
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            My tuitions
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Manage the tuition posts you have published.
          </p>
        </div>
        <Link
          href="/dashboard/post-tuition"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#d9f36a] px-5 text-sm font-bold text-[#203b31] transition hover:bg-[#e6fb94]"
        >
          <Plus size={17} /> Post a tuition
        </Link>
      </section>

      {tuitions === null ? (
        <div
          className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
          role="alert"
        >
          Could not load your tuition posts. Make sure the backend is running
          and refresh the page.
        </div>
      ) : tuitions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#d8e0d4] bg-white px-6 py-12 text-center">
          <BookOpenCheck className="mx-auto text-[#78934c]" size={28} />
          <h2 className="mt-4 text-lg font-semibold text-[#203b31]">
            No tuition posts yet
          </h2>
          <p className="mt-2 text-sm text-[#77827b]">
            Tuition posts you create will appear here.
          </p>
          <Link
            href="/dashboard/post-tuition"
            className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#1d3b31] px-5 text-sm font-semibold text-white"
          >
            <Plus size={15} /> Post your first tuition
          </Link>
        </div>
      ) : (
        <MyTuitionPostsTable
          key={tuitions
            .map(
              (tuition) =>
                `${tuition._id || tuition.id || tuition.tuitionId}:${tuition.updatedAt || ""}`,
            )
            .join("|")}
          initialTuitions={tuitions}
          teacherId={session.user.id}
        />
      )}
    </div>
  );
}
