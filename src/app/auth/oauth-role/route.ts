import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const role = request.nextUrl.searchParams.get("role");
  const homeUrl = new URL("/", request.url);

  if (role !== "student" && role !== "tutor") {
    return NextResponse.redirect(homeUrl);
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
    body: { role },
  });

  if (!updateResult.status) {
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
