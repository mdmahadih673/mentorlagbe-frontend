import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CircleCheck,
  CircleHelp,
} from "lucide-react";

import { auth, saveTutorProPayment } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { getAccountRole } from "@/lib/user-role";

export const instant = false;

type PageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function TutorPaymentSuccessPage({
  searchParams,
}: PageProps) {
  const userSession = await auth.api.getSession({ headers: await headers() });
  if (!userSession) {
    redirect(
      `/sign-in?callbackURL=${encodeURIComponent("/dashboard/payment/success")}`,
    );
  }
  if (getAccountRole(userSession.user) !== "tutor") redirect("/dashboard");

  const { session_id: sessionId } = await searchParams;
  let paymentConfirmed = false;
  let customerEmail = userSession.user.email;

  if (sessionId) {
    try {
      const checkout = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["payment_intent"],
      });
      customerEmail = checkout.customer_details?.email || customerEmail;

      const belongsToCurrentTutor =
        checkout.client_reference_id === userSession.user.id &&
        checkout.metadata?.userId === userSession.user.id &&
        checkout.metadata?.userRole === "tutor";
      const paymentIntent = checkout.payment_intent;
      const transactionId =
        typeof paymentIntent === "string"
          ? paymentIntent
          : paymentIntent && "id" in paymentIntent
            ? paymentIntent.id
            : checkout.id;

      if (
        belongsToCurrentTutor &&
        checkout.status === "complete" &&
        checkout.mode === "payment" &&
        checkout.payment_status === "paid"
      ) {
        paymentConfirmed = await saveTutorProPayment({
          userId: userSession.user.id,
          stripeSessionId: checkout.id,
          transactionId,
          amount: (checkout.amount_total || 0) / 100,
          currency: checkout.currency || "usd",
          paidAt: new Date(checkout.created * 1000),
        });
      }
    } catch {
      paymentConfirmed = false;
    }
  }

  return (
    <main className="min-h-[70vh] bg-[#f5f6f1] px-5 py-12 text-[#19342c] sm:py-20">
      <section className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-[#e3e8dd] bg-white shadow-[0_24px_70px_-48px_rgba(29,59,49,.35)]">
        <div className="relative overflow-hidden bg-[#1d3b31] px-6 py-10 text-center text-white sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -left-20 -bottom-32 size-64 rounded-full border border-white/10" />
          <span className="relative mx-auto flex size-16 items-center justify-center rounded-full bg-[#d9f36a] text-[#1d3b31] shadow-lg shadow-black/10">
            {paymentConfirmed ? (
              <CircleCheck size={34} strokeWidth={1.8} />
            ) : (
              <CircleHelp size={32} strokeWidth={1.8} />
            )}
          </span>
          <p className="relative mt-6 text-xs font-bold uppercase tracking-[.18em] text-[#d9f36a]">
            Stripe Checkout
          </p>
          <h1 className="relative mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {paymentConfirmed
              ? "Payment successful"
              : "Payment confirmation pending"}
          </h1>
          <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-white/70">
            {paymentConfirmed
              ? "Your payment was verified and your Pro Tutor plan is now active."
              : "We could not verify a completed payment for this session. If you just paid, refresh this page shortly."}
          </p>
        </div>

        <div className="px-6 py-7 sm:px-10 sm:py-9">
          <div className="flex items-start gap-4 rounded-2xl border border-[#e5ebdc] bg-[#f8faf4] p-4 sm:p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf0dc] text-[#648147]">
              <BadgeCheck size={22} />
            </span>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-[#203b31]">
                {paymentConfirmed
                  ? "Unlimited tuition posts unlocked"
                  : "Your plan has not been changed yet"}
              </h2>
              <p className="mt-1 break-words text-sm leading-5 text-[#77827b]">
                {paymentConfirmed
                  ? `A payment confirmation was recorded${customerEmail ? ` for ${customerEmail}` : ""}. You can now post unlimited tuition listings.`
                  : "Only a verified, completed Stripe payment can activate the Pro Tutor plan."}
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#1d3b31] px-5 text-sm font-semibold text-white transition hover:bg-[#315b45]"
            >
              Go to dashboard <ArrowRight size={16} />
            </Link>
            <Link
              href="/dashboard/my-tuitions"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[#dfe6d8] bg-white px-5 text-sm font-semibold text-[#315b45] transition hover:bg-[#f6f8f2]"
            >
              <BookOpenCheck size={16} /> My tuitions
            </Link>
          </div>
        </div>
      </section>
      <p className="mx-auto mt-5 max-w-2xl text-center text-xs text-[#89928b]">
        Need help with your payment? Contact the MentorLagbe support team.
      </p>
    </main>
  );
}
