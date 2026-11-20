import { API_BASE_URL } from "@/lib/api/config";
import type { PaymentTransaction, PaymentTransactionsResult } from "@/lib/types/payment";

async function getTransactions(
  role: "students" | "tutors",
): Promise<PaymentTransactionsResult> {
  const response = await fetch(`${API_BASE_URL}/admin/transactions/${role}`, {
    cache: "no-store",
  });
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
