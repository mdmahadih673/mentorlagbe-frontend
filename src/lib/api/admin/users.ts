import type { AccountRole } from "@/lib/types/user";

export async function createAdminUser(input: {
  name: string;
  email: string;
  password: string;
  role: AccountRole;
}) {
  const response = await fetch("/api/admin/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not create this user.");
  }

  return result;
}

export async function deleteUserAccount(userId: string) {
  const response = await fetch(
    `/api/admin/users/${encodeURIComponent(userId)}`,
    { method: "DELETE" },
  );
  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not delete this user.");
  }

  return { success: true, message: result.message };
}
