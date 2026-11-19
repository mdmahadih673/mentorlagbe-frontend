import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const userType = request.nextUrl.searchParams.get("userType");
  const dashboardUrl = new URL("/dashboard", request.url);

  if (userType !== "student" && userType !== "tutor") {
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

  const updateResult = await auth.api.updateUser({
    headers: request.headers,
    body: { userType },
  });

  if (!updateResult.status) {
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
