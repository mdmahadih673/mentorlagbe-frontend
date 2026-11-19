import { NextResponse, type NextRequest } from "next/server";
import { auth, setAppUserRole } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const role = request.nextUrl.searchParams.get("role");
  const dashboardUrl = new URL("/dashboard", request.url);

  if (role !== "student" && role !== "tutor") {
    return NextResponse.redirect(dashboardUrl);
  }

  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.redirect(
      new URL(
        `/sign-in?callbackURL=${encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search)}`,
        request.url,
      ),
    );
  }

  const didUpdate = await setAppUserRole(session.user.id, role);
  if (!didUpdate) {
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
