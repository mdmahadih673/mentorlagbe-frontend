import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getAccountRole } from "@/lib/user-role";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ message: "Sign in required." }, { status: 401 });
  }
  if (getAccountRole(session.user) !== "admin") {
    return NextResponse.json({ message: "Admin access required." }, { status: 403 });
  }

  const { userId } = await params;
  if (userId === session.user.id) {
    return NextResponse.json(
      { message: "You cannot delete your own account here." },
      { status: 400 },
    );
  }

  const accessToken = await auth.api.getToken({ headers: await headers() });
  if (!accessToken?.token) {
    return NextResponse.json({ message: "Sign in required." }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/users/${encodeURIComponent(userId)}`,
      {
        method: "DELETE",
        headers: { authorization: `Bearer ${accessToken.token}` },
        cache: "no-store",
      },
    );
    const result = (await response.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;

    return NextResponse.json(
      result || { message: "Could not delete this user." },
      { status: response.status },
    );
  } catch (error) {
    console.error("Failed to delete admin-managed user", error);
    return NextResponse.json(
      { message: "Could not reach the user service." },
      { status: 502 },
    );
  }
}
