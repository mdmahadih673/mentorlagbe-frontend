import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { auth, setAppUserRole } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ message: "Sign in required." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    role?: unknown;
  } | null;
  if (body?.role !== "student" && body?.role !== "tutor") {
    return NextResponse.json(
      { message: "Choose a valid account role." },
      { status: 400 },
    );
  }

  const updated = await setAppUserRole(session.user.id, body.role);
  if (!updated) {
    return NextResponse.json(
      { message: "Could not update account role." },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true });
}
