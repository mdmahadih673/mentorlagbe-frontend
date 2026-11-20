import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth, setAppUserRole } from "@/lib/auth";
import { getAccountRole } from "@/lib/user-role";
import type { AccountRole } from "@/lib/types/user";

const allowedRoles: AccountRole[] = ["student", "tutor", "admin"];

export async function POST(request: Request) {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });
  if (!session) {
    return NextResponse.json({ message: "Sign in required." }, { status: 401 });
  }
  if (getAccountRole(session.user) !== "admin") {
    return NextResponse.json({ message: "Admin access required." }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
  } | null;

  const name = body?.name?.trim();
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password;
  const role = body?.role;

  if (!name || !email || !password || !role || !allowedRoles.includes(role as AccountRole)) {
    return NextResponse.json(
      { message: "Name, email, password, and a valid role are required." },
      { status: 400 },
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { message: "Password must be at least 8 characters." },
      { status: 400 },
    );
  }

  try {
    const result = await auth.api.createUser({
      headers: requestHeaders,
      body: { name, email, password },
    });
    const roleUpdated = await setAppUserRole(result.user.id, role as AccountRole);
    if (!roleUpdated) {
      return NextResponse.json(
        { message: "Account was created, but its role could not be set." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, user: { ...result.user, role } },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Could not create this user.",
      },
      { status: 400 },
    );
  }
}
