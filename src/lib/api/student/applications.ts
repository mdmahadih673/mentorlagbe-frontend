"use server";

import { API_BASE_URL } from "@/lib/api/config";
import { authFetch, protectedMutation } from "@/lib/api/core/server";
import type { StudentApplicationInput } from "@/lib/types/tuition";

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

export async function createTuitionApplication(
  application: StudentApplicationInput,
) {
  const response = await protectedMutation(
    `${API_BASE_URL}/applications`,
    "POST",
    application,
  );
  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not send tuition request.");
  }
}

export async function cancelStudentApplication(applicationId: string) {
  const response = await protectedMutation(
    `${API_BASE_URL}/student/applications/${encodeURIComponent(applicationId)}`,
    "DELETE",
  );
  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not cancel this request.");
  }
}
