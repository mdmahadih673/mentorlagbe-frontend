import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getAccountRole } from "@/lib/user-role";
import { PostTuitionPageClient } from "../components/post-tuition-page-client";

export const instant = false;

export default async function PostTuitionPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(
      `/sign-in?callbackURL=${encodeURIComponent("/dashboard/post-tuition")}`,
    );
  }
  if (getAccountRole(session.user) !== "tutor") redirect("/dashboard");

  return <PostTuitionPageClient />;
}
