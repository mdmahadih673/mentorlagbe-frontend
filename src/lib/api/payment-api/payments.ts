import { API_BASE_URL } from "@/lib/api/config";

export async function verifyTutorCheckout(sessionId: string, userId: string) {
  const response = await fetch(`${API_BASE_URL}/payments/checkout-vetify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, userId }),
    cache: "no-store",
  });
  const result = (await response.json().catch(() => null)) as
    | { success?: boolean; message?: string }
    | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Payment verification failed.");
  }

  return result;
}

