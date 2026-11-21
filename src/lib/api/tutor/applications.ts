"use server";

import { API_BASE_URL } from "@/lib/api/config";
import { protectedMutation } from "@/lib/api/core/server";
import type { TuitionApplicationStatus } from "@/lib/types/tuition";

async function sendApplicationRequest(
  url: string,
  method: "PATCH" | "DELETE",
  teacherId: string,
  status?: TuitionApplicationStatus,
) {
  const response = await protectedMutation(
    url,
    method,
    { teacherId, ...(status ? { status } : {}) },
  );
  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not update this request.");
  }
}

export async function updateTutorApplicationStatus(
  applicationId: string,
  teacherId: string,
  status: TuitionApplicationStatus,
) {
  return sendApplicationRequest(
    `${API_BASE_URL}/tutor/applications/${encodeURIComponent(applicationId)}/status`,
    "PATCH",
    teacherId,
    status,
  );
}

export async function deleteTutorApplication(applicationId: string, teacherId: string) {
  return sendApplicationRequest(
    `${API_BASE_URL}/tutor/applications/${encodeURIComponent(applicationId)}`,
    "DELETE",
    teacherId,
  );
}
