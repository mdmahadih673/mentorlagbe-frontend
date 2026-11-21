import { API_BASE_URL } from "@/lib/api/config";
import { authFetch } from "@/lib/api/core/server";
import type { TuitionApplication } from "@/lib/types/tuition";
import type { StudentApplicationCounts } from "./applications";

export async function getStudentApplicationCountsServer(
  studentId: string,
): Promise<StudentApplicationCounts> {
  const response = await authFetch(
    `${API_BASE_URL}/student/application-count/${encodeURIComponent(studentId)}`,
  );
  const result = (await response.json().catch(() => null)) as
    | ({ success?: boolean; message?: string } & Partial<StudentApplicationCounts>)
    | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Failed to fetch your application counts.");
  }

  return {
    plan: result.plan === "pro" ? "pro" : "free",
    totalApplications: result.totalApplications ?? 0,
    pendingApplications: result.pendingApplications ?? 0,
    acceptedApplications: result.acceptedApplications ?? 0,
    rejectedApplications: result.rejectedApplications ?? 0,
    activeApplications: result.activeApplications ?? 0,
    limit: result.limit ?? null,
    remaining: result.remaining ?? null,
    canApply: result.canApply ?? false,
  };
}

export async function getStudentApplicationsServer(
  studentId: string,
): Promise<TuitionApplication[]> {
  const response = await authFetch(
    `${API_BASE_URL}/student/applications/${encodeURIComponent(studentId)}`,
  );
  const result = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) throw new Error("Failed to fetch your applications.");
  if (!Array.isArray(result)) {
    throw new Error("The student applications API returned an unexpected response.");
  }

  return result as TuitionApplication[];
}
