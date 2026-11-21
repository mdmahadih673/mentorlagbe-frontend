import { API_BASE_URL } from "@/lib/api/config";
import { authFetch } from "@/lib/api/core/server";

export async function getAdminApplicationCount(): Promise<number> {
  const response = await authFetch(`${API_BASE_URL}/admin/applications/count`);
  const result = (await response.json().catch(() => null)) as
    | { success?: boolean; total?: number; message?: string }
    | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not load application count.");
  }

  return result.total ?? 0;
}
