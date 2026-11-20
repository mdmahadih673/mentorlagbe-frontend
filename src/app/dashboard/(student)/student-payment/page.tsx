import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, isStudentPro } from "@/lib/auth";
import { getAccountRole } from "@/lib/user-role";
import { StudentPaymentPage } from "../components/student-payment-page";

export const instant = false;

export default async function StudentPaymentRoute() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/sign-in?callbackURL=${encodeURIComponent("/dashboard/student-payment")}`);
  if (getAccountRole(session.user) !== "student") redirect("/dashboard");

  const isPro = await isStudentPro(session.user.id).catch(() => false);
  return <StudentPaymentPage isPro={isPro} />;
}
