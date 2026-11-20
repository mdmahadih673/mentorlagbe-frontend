import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { EditTuitionForm } from "../../../components/edit-tuition-form";
import { auth } from "@/lib/auth";
import { getAccountRole } from "@/lib/user-role";
import { getTuitionById } from "@/lib/api/tuition";

export const instant = false;

export default async function EditMyTuitionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(
      `/sign-in?callbackURL=${encodeURIComponent("/dashboard/my-tuitions")}`,
    );
  }
  if (getAccountRole(session.user) !== "tutor") redirect("/dashboard");

  const { id } = await params;
  const tuition = await getTuitionById(id).catch(() => null);
  if (!tuition || tuition.teacherId !== session.user.id) notFound();

  return (
    <EditTuitionForm
      tuition={tuition}
      tuitionId={id}
      teacherId={session.user.id}
    />
  );
}
