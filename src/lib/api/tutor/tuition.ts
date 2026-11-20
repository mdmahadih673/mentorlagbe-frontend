import { API_BASE_URL } from "@/lib/api/config";
import type { TuitionFormValues } from "@/lib/types/tuition";

type MutationResponse = { success?: boolean; message?: string } | null;

export async function createTuition(tuitionData: TuitionFormValues) {
  const response = await fetch(`${API_BASE_URL}/tuition`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tuitionData),
  });
  const result = (await response.json().catch(() => null)) as
    | (MutationResponse & { result?: unknown })
    | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Failed to post tuition. Please try again.");
  }

  return result;
}

export async function getMyTuitions(teacherId: string): Promise<TuitionFormValues[]> {
  const response = await fetch(
    `${API_BASE_URL}/my-tuitions/${encodeURIComponent(teacherId)}`,
    { cache: "no-store" },
  );
  const result = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) throw new Error("Failed to fetch your tuitions.");
  if (!Array.isArray(result)) {
    throw new Error("The my-tuitions API returned an unexpected response.");
  }

  return result as TuitionFormValues[];
}

async function sendTuitionMutation(
  id: string,
  teacherId: string,
  method: "PATCH" | "DELETE",
  tuition?: TuitionFormValues,
) {
  const response = await fetch(`${API_BASE_URL}/tuitions/${encodeURIComponent(id)}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...tuition, teacherId }),
  });
  const result = (await response.json().catch(() => null)) as MutationResponse;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not update this tuition.");
  }
}

export function updateTuition(
  id: string,
  teacherId: string,
  tuition: TuitionFormValues,
) {
  return sendTuitionMutation(id, teacherId, "PATCH", tuition);
}

export function deleteTuition(id: string, teacherId: string) {
  return sendTuitionMutation(id, teacherId, "DELETE");
}
