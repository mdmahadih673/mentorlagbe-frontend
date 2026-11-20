import { API_BASE_URL } from "@/lib/api/config";
import type { TuitionApplication } from "@/lib/types/tuition";

export type StudentApplicationCounts = {
  plan: "free" | "pro";
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
  activeApplications: number;
  limit: number | null;
  remaining: number | null;
  canApply: boolean;
};

export async function getStudentApplicationCounts(
  studentId: string,
): Promise<StudentApplicationCounts> {
  const response = await fetch(
    `${API_BASE_URL}/student/application-count/${encodeURIComponent(studentId)}`,
    { cache: "no-store" },
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
