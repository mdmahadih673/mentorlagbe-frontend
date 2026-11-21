import { API_BASE_URL } from "@/lib/api/config";
import { authFetch } from "@/lib/api/core/server";
import type { PaymentTransaction, PaymentTransactionsResult } from "@/lib/types/payment";

async function getTransactions(
  role: "students" | "tutors",
): Promise<PaymentTransactionsResult> {
  const response = await authFetch(`${API_BASE_URL}/admin/transactions/${role}`);
  const result = (await response.json().catch(() => null)) as
    | {
        success?: boolean;
        message?: string;
        data?: PaymentTransaction[];
        total?: number;
      }
    | null;

  if (!response.ok || !result?.success || !Array.isArray(result.data)) {
    throw new Error(result?.message || `Could not load ${role} transactions.`);
  }

  return { data: result.data, total: result.total ?? result.data.length };
}

export function getStudentTransactions() {
  return getTransactions("students");
}

export function getTutorTransactions() {
  return getTransactions("tutors");
}

export async function getAdminRevenue(): Promise<number> {
  const response = await authFetch(`${API_BASE_URL}/admin/transactions/revenue`);
  const result = (await response.json().catch(() => null)) as
    | { success?: boolean; totalRevenue?: number; message?: string }
    | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Could not load total revenue.");
  }

  return result.totalRevenue ?? 0;
}
