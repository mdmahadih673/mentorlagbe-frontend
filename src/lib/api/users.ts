import type { AccountRole, AdminUser } from "@/lib/types/user";
import { getUserType } from "@/lib/user-role";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

type BackendUser = {
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  userType?: string;
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
      role: isAccountRole(user.role) ? user.role : getUserType(user),
      image: user.image,
      createdAt: user.createdAt,
      emailVerified: user.emailVerified === true,
    }));
}

export const getAllUsers = getUsers;
