import { API_BASE_URL } from "@/lib/api/config";
import { authFetch } from "@/lib/api/core/server";
import type { TuitionFormValues } from "@/lib/types/tuition";

export async function getMyTuitionsServer(
  teacherId: string,
): Promise<TuitionFormValues[]> {
  const response = await authFetch(
    `${API_BASE_URL}/my-tuitions/${encodeURIComponent(teacherId)}`,
  );
  const result = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) throw new Error("Failed to fetch your tuitions.");
  if (!Array.isArray(result)) {
    throw new Error("The my-tuitions API returned an unexpected response.");
  }

  return result as TuitionFormValues[];
}
