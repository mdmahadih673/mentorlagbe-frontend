import { API_BASE_URL } from "@/lib/api/config";
import { protectedMutation } from "@/lib/api/core/server";

export async function verifyTutorCheckout(sessionId: string, userId: string) {
  const response = await protectedMutation(
    `${API_BASE_URL}/payments/checkout-vetify`,
    "POST",
    { sessionId, userId },
  );
  const result = (await response.json().catch(() => null)) as
    | { success?: boolean; message?: string }
    | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Payment verification failed.");
  }

  return result;
}

