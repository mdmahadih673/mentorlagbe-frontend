"use server";

import { API_BASE_URL } from "@/lib/api/config";
import { protectedMutation } from "@/lib/api/core/server";
import type { TuitionFormValues } from "@/lib/types/tuition";

type MutationResponse = { success?: boolean; message?: string } | null;

export async function createTuition(tuitionData: TuitionFormValues) {
  const response = await protectedMutation(
    `${API_BASE_URL}/tuition`,
    "POST",
    tuitionData,
  );
  const result = (await response.json().catch(() => null)) as
    | (MutationResponse & { result?: unknown })
    | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Failed to post tuition. Please try again.");
  }

  return result;
}

async function sendTuitionMutation(
  id: string,
  teacherId: string,
  method: "PATCH" | "DELETE",
  tuition?: TuitionFormValues,
) {
  const response = await protectedMutation(
    `${API_BASE_URL}/tuitions/${encodeURIComponent(id)}`,
    method,
    { ...tuition, teacherId },
  );
  const result = (await response.json().catch(() => null)) as MutationResponse;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not update this tuition.");
  }
}

export async function updateTuition(
  id: string,
  teacherId: string,
  tuition: TuitionFormValues,
) {
  return sendTuitionMutation(id, teacherId, "PATCH", tuition);
}

export async function deleteTuition(id: string, teacherId: string) {
  return sendTuitionMutation(id, teacherId, "DELETE");
}

export async function setTuitionActive(
  id: string,
  isActive: boolean,
): Promise<void> {
  const response = await protectedMutation(
    `${API_BASE_URL}/tuitions/${encodeURIComponent(id)}/active`,
    "PATCH",
    { isActive },
  );
  const result = (await response.json().catch(() => null)) as MutationResponse;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not update tuition visibility.");
  }
}
