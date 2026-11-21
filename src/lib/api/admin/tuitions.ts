import { API_BASE_URL } from "@/lib/api/config";
import { authFetch } from "@/lib/api/core/server";
import type { TuitionFormValues } from "@/lib/types/tuition";

export async function getAdminTuitions(): Promise<TuitionFormValues[]> {
  const response = await authFetch(`${API_BASE_URL}/admin/tuitions`);
  const result = (await response.json().catch(() => null)) as unknown;

  if (!response.ok || !Array.isArray(result)) {
    throw new Error("Could not load tuition listings.");
  }

  return result as TuitionFormValues[];
}
