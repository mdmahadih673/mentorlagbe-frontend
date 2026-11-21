import { API_BASE_URL } from "@/lib/api/config";
import { authFetch } from "@/lib/api/core/server";
import type { TuitionApplication } from "@/lib/types/tuition";

export async function getTutorApplicationsServer(
  teacherId: string,
): Promise<TuitionApplication[]> {
  const response = await authFetch(
    `${API_BASE_URL}/tutor/applications/${encodeURIComponent(teacherId)}`,
  );
  const result = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) throw new Error("Failed to fetch student requests.");
  if (!Array.isArray(result)) {
    throw new Error("The tutor applications API returned an unexpected response.");
  }

  return result as TuitionApplication[];
}
