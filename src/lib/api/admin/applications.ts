import { API_BASE_URL } from "@/lib/api/config";

export async function getAdminApplicationCount(): Promise<number> {
  const response = await fetch(`${API_BASE_URL}/admin/applications/count`, {
    cache: "no-store",
  });
  const result = (await response.json().catch(() => null)) as
    | { success?: boolean; total?: number; message?: string }
    | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not load application count.");
  }

  return result.total ?? 0;
}
