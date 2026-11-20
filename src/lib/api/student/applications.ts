import { API_BASE_URL } from "@/lib/api/config";
import type { TuitionApplication } from "@/lib/types/tuition";

export async function getStudentApplications(
  studentId: string,
): Promise<TuitionApplication[]> {
  const response = await fetch(
    `${API_BASE_URL}/student/applications/${encodeURIComponent(studentId)}`,
    { cache: "no-store" },
  );
  const result = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) throw new Error("Failed to fetch your applications.");
  if (!Array.isArray(result)) {
    throw new Error("The student applications API returned an unexpected response.");
  }

  return result as TuitionApplication[];
}

export async function createTuitionApplication(application: {
  tuitionId: string;
  studentId: string;
  studentName: string;
  studentEmail?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  });
  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not send tuition request.");
  }
}
