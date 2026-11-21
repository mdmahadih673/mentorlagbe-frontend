import { Suspense } from "react";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

async function SuccessRedirect({ searchParams }: PageProps) {
  const { session_id: sessionId } = await searchParams;
  const query = sessionId
    ? `?session_id=${encodeURIComponent(sessionId)}`
    : "";

  return redirect(`/dashboard/payment/success${query}`);
}

export default function LegacyPaymentSuccessPage(props: PageProps) {
  return (
    <Suspense fallback={null}>
      <SuccessRedirect searchParams={props.searchParams} />
    </Suspense>
  );
}
