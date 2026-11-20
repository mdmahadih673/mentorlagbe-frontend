import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight, BadgeCheck, BookOpenCheck, CircleCheck, CircleHelp } from "lucide-react";

import { auth, isStudentPro } from "@/lib/auth";
import { verifyStudentCheckout } from "@/lib/api/payment-api/student-payment";
import { getAccountRole } from "@/lib/user-role";

export const instant = false;

type PageProps = { searchParams: Promise<{ session_id?: string }> };

export default async function StudentPaymentSuccessPage({ searchParams }: PageProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/sign-in?callbackURL=${encodeURIComponent("/dashboard/student-payment/success")}`);
  if (getAccountRole(session.user) !== "student") redirect("/dashboard");

  const { session_id: sessionId } = await searchParams;
  let paymentConfirmed = false;
  let verificationError = "";
  if (sessionId) {
    try {
      await verifyStudentCheckout(sessionId, session.user.id);
      paymentConfirmed = true;
    } catch (error) {
      paymentConfirmed = false;
      verificationError = error instanceof Error ? error.message : "Payment verification failed.";
    }
  } else {
    verificationError = "Stripe session ID is missing from this page URL.";
  }

  const isPro = paymentConfirmed || await isStudentPro(session.user.id).catch(() => false);

  return (
    <main className="min-h-[70vh] bg-[#f5f6f1] px-5 py-12 text-[#19342c] sm:py-20">
      <section className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-[#e3e8dd] bg-white shadow-[0_24px_70px_-48px_rgba(29,59,49,.35)]">
        <div className="relative overflow-hidden bg-[#1d3b31] px-6 py-10 text-center text-white sm:px-10 sm:py-14">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#d9f36a] text-[#1d3b31]">
            {isPro ? <CircleCheck size={34} /> : <CircleHelp size={32} />}
          </span>
          <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-[#d9f36a]">Stripe Checkout</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {isPro ? "Payment successful" : "Payment confirmation pending"}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/70">
            {isPro
              ? "Your Pro Student plan is active. Thanks for choosing MentorLagbe."
              : "We could not verify this payment yet. If you just paid, refresh this page shortly."}
          </p>
        </div>
        <div className="px-6 py-7 sm:px-10 sm:py-9">
          <div className="flex items-start gap-4 rounded-2xl border border-[#e5ebdc] bg-[#f8faf4] p-4 sm:p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf0dc] text-[#648147]"><BadgeCheck size={22} /></span>
            <div>
              <h2 className="text-sm font-semibold text-[#203b31]">{isPro ? "Pro Student plan active" : "Your plan has not changed yet"}</h2>
              <p className="mt-1 text-sm leading-5 text-[#77827b]">
                {isPro
                  ? `Payment confirmation recorded${session.user.email ? ` for ${session.user.email}` : ""}.`
                  : verificationError || "Only a completed, verified Stripe payment can activate Pro."}
              </p>
            </div>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#1d3b31] px-5 text-sm font-semibold text-white">
              Go to dashboard <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard/my-applications" className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[#dfe6d8] bg-white px-5 text-sm font-semibold text-[#315b45]">
              <BookOpenCheck size={16} /> My applications
            </Link>
          </div>
          {!isPro && sessionId && (
            <Link
              href={`/dashboard/student-payment/success?session_id=${encodeURIComponent(sessionId)}`}
              className="mt-4 inline-flex text-sm font-semibold text-[#628044] underline"
            >
              Retry payment verification
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
