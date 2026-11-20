import { API_BASE_URL } from "@/lib/api/config";

export type TutorTuitionUsage = {
  count: number;
  plan: "free" | "pro";
  limit: number | null;
  remaining: number | null;
  canPost: boolean;
};

export async function getTutorTuitionUsage(teacherId: string,): Promise<TutorTuitionUsage> {
  const response = await fetch(`${API_BASE_URL}/tutor/tuition-count/${encodeURIComponent(teacherId)}`,
    { cache: "no-store" },
  );
  const result = (await response.json().catch(() => null)) as
    | ({ success?: boolean; message?: string } & Partial<TutorTuitionUsage>)
    | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not load your tuition usage.");
  }

  return {
    count: result.count ?? 0,
    plan: result.plan === "pro" ? "pro" : "free",
    limit: result.limit ?? null,
    remaining: result.remaining ?? null,
    canPost: result.canPost ?? false,
  };
}
