import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getStudentApplicationsServer } from "@/lib/api/student/server-applications";
import { getAccountRole } from "@/lib/user-role";
import { StudentApplicationsHeader } from "../components/student-applications-header";
import { StudentApplicationsTable } from "../components/student-applications-table";

export default async function MyApplicationsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(
      `/sign-in?callbackURL=${encodeURIComponent("/dashboard/my-applications")}`,
    );
  }
  if (getAccountRole(session.user) !== "student") redirect("/dashboard");

  const applications = await getStudentApplicationsServer(session.user.id).catch(
    () => null,
  );

  return (
    <div className="space-y-7">
      <StudentApplicationsHeader />

      {applications === null ? (
        <div
          className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
          role="alert"
        >
          Could not load your requests. Make sure the backend is running and
          refresh the page.
        </div>
      ) : (
        <StudentApplicationsTable initialApplications={applications} />
      )}
    </div>
  );
}
