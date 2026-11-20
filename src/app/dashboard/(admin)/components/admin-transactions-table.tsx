import { CalendarDays, CreditCard, UserRound } from "lucide-react";
import type { PaymentTransaction } from "@/lib/types/payment";

type AdminTransactionsTableProps = {
  title: string;
  roleLabel: "Student" | "Tutor";
  transactions: PaymentTransaction[];
  error?: boolean;
};

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("en-BD", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
}

function formatAmount(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

export function AdminTransactionsTable({
  title,
  roleLabel,
  transactions,
  error = false,
}: AdminTransactionsTableProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-[#e6e9e1] bg-white">
      <header className="flex items-center justify-between gap-4 border-b border-[#edf0e9] px-5 py-4 sm:px-6">
        <div>
          <h2 className="font-semibold text-[#203b31]">{title}</h2>
          <p className="mt-1 text-xs text-[#89928b]">
            {error
              ? "Transactions unavailable"
              : `${transactions.length} ${transactions.length === 1 ? "transaction" : "transactions"}`}
          </p>
        </div>
        <CreditCard size={19} className="text-[#78934c]" />
      </header>

      {error ? (
        <div className="p-6 text-sm text-red-700" role="alert">
          Could not load {roleLabel.toLowerCase()} transactions. Check the backend and refresh.
        </div>
      ) : transactions.length === 0 ? (
        <div className="px-6 py-10 text-center text-sm text-[#89928b]">
          No {roleLabel.toLowerCase()} transactions yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-[#f7f8f4] text-[11px] uppercase tracking-wide text-[#7a867e]">
              <tr>
                <th className="px-5 py-3 font-semibold sm:px-6">{roleLabel}</th>
                <th className="px-5 py-3 font-semibold">Plan</th>
                <th className="px-5 py-3 font-semibold">Transaction ID</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Payment date</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf0e9]">
              {transactions.map((transaction, index) => (
                <tr key={transaction._id || transaction.transactionId || `${roleLabel}-${index}`}>
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-start gap-2.5">
                      <UserRound size={16} className="mt-0.5 shrink-0 text-[#78934c]" />
                      <div className="min-w-0">
                        <p className="font-medium text-[#354a40]">{transaction.userName || "Unknown user"}</p>
                        <p className="mt-0.5 break-all text-xs text-[#89928b]">{transaction.userEmail || "No email"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#526159]">{transaction.planName || "Pro plan"}</td>
                  <td className="max-w-48 break-all px-5 py-4 font-mono text-xs text-[#68766e]">
                    {transaction.transactionId || "—"}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-[#203b31]">
                    {formatAmount(transaction.amount, transaction.currency)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-[#68766e]">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={14} className="text-[#91a08f]" />
                      {formatDate(transaction.paidAt)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-[#e8f3ed] px-2.5 py-1 text-xs font-semibold capitalize text-[#43805c]">
                      {transaction.paymentStatus || "Unknown"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
