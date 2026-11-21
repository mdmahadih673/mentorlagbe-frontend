import { API_BASE_URL } from "@/lib/api/config";
import { protectedMutation } from "@/lib/api/core/server";

export async function verifyStudentCheckout(sessionId: string, userId: string) {
  const response = await protectedMutation(
    `${API_BASE_URL}/payments/student/checkout-verify`,
    "POST",
    { sessionId, userId },
  );
  const result = (await response.json().catch(() => null)) as
    | { success?: boolean; message?: string }
    | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Student payment verification failed.");
  }

  return result;
}
