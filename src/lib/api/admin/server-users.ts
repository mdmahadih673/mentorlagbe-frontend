import { API_BASE_URL } from "@/lib/api/config";
import { authFetch } from "@/lib/api/core/server";
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
  const response = await authFetch(`${API_BASE_URL}/users`);
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
