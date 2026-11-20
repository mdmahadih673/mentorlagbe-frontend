export type PaymentTransaction = {
  _id?: string;
  userId?: string;
  userName: string;
  userEmail: string;
  userRole: "student" | "tutor";
  planName: string;
  amount: number;
  currency: string;
  transactionId: string;
  paymentStatus: string;
  paidAt: string | null;
  stripeSessionId?: string;
};

export type PaymentTransactionsResult = {
  data: PaymentTransaction[];
  total: number;
};
