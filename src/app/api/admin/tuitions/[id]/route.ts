import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { auth } from "@/lib/auth";
import { getAccountRole } from "@/lib/user-role";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

async function getAdminSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session && getAccountRole(session.user) === "admin" ? session : null;
}

async function forwardResponse(response: Response) {
  const result = await response.json().catch(() => null);
  return NextResponse.json(
    result || { message: "Tuition request failed." },
    { status: response.status },
  );
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Admin access required." }, { status: 403 });
  }

  const { id } = await params;
  const accessToken = await auth.api.getToken({ headers: await headers() });
  if (!accessToken?.token) {
    return NextResponse.json({ message: "Sign in required." }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as {
    status?: unknown;
  } | null;
  if (!body || !["pending", "approved", "rejected"].includes(String(body.status))) {
    return NextResponse.json({ message: "Invalid tuition status." }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/admin/tuitions/${encodeURIComponent(id)}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken.token}`,
        },
        body: JSON.stringify({ status: body.status }),
        cache: "no-store",
      },
    );
    return await forwardResponse(response);
  } catch {
    return NextResponse.json({ message: "Could not reach the tuition service." }, { status: 502 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Admin access required." }, { status: 403 });
  }

  const { id } = await params;
  const accessToken = await auth.api.getToken({ headers: await headers() });
  if (!accessToken?.token) {
    return NextResponse.json({ message: "Sign in required." }, { status: 401 });
  }
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin/tuitions/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        headers: { authorization: `Bearer ${accessToken.token}` },
        cache: "no-store",
      },
    );
    return await forwardResponse(response);
  } catch {
    return NextResponse.json({ message: "Could not reach the tuition service." }, { status: 502 });
  }
}
