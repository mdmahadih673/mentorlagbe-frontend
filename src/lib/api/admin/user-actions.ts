"use server";

import { API_BASE_URL } from "@/lib/api/config";
import { protectedMutation } from "@/lib/api/core/server";
import type { AccountRole } from "@/lib/types/user";

export async function getUserRoleUpdate(userId: string, role: AccountRole) {
  const response = await protectedMutation(
    `${API_BASE_URL}/users/${encodeURIComponent(userId)}/role`,
    "PATCH",
    { role },
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
