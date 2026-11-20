import { API_BASE_URL } from "@/lib/api/config";
import type { AccountRole, AdminUser } from "@/lib/types/user";

type BackendUser = {
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  image?: string;
  createdAt?: string;
  emailVerified?: boolean;
};

function isAccountRole(role?: string): role is AccountRole {
  return role === "student" || role === "tutor" || role === "admin";
}

export async function getUsers(): Promise<AdminUser[]> {
  const response = await fetch(`${API_BASE_URL}/users`, { cache: "no-store" });
  const result = (await response.json().catch(() => null)) as unknown;

  if (!response.ok || !Array.isArray(result)) {
    throw new Error("Could not load users.");
  }

  return (result as BackendUser[])
    .filter((user) => user.id || user._id)
    .map((user) => ({
      id: user.id || String(user._id),
      name: user.name?.trim() || "Unnamed user",
      email: user.email || "No email",
      role: isAccountRole(user.role) ? user.role : "student",
      image: user.image,
      createdAt: user.createdAt,
      emailVerified: user.emailVerified === true,
    }));
}

export const getAllUsers = getUsers;

export async function getUserRoleUpdate(userId: string, role: AccountRole) {
  const response = await fetch(
    `${API_BASE_URL}/users/${encodeURIComponent(userId)}/role`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    },
  );
  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not update this user's role.");
  }

  return { success: true, message: result.message };
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
