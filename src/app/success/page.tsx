import { redirect } from "next/navigation";

export default async function LegacyPaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const query = sessionId
    ? `?session_id=${encodeURIComponent(sessionId)}`
    : "";

  redirect(`/dashboard/payment/success${query}`);
}
