import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { auth, setAppUserType } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ message: "Sign in required." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    userType?: unknown;
  } | null;
  if (body?.userType !== "student" && body?.userType !== "tutor") {
    return NextResponse.json(
      { message: "Choose a valid account type." },
      { status: 400 },
    );
  }

  const updated = await setAppUserType(session.user.id, body.userType);
  if (!updated) {
    return NextResponse.json({ message: "Could not update account type." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
