import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreditCard } from "lucide-react";
import { auth, isTutorPro } from "@/lib/auth";
import { getAccountRole } from "@/lib/user-role";
import { TutorPaymentPage } from "../components/tutor-payment-page";

export const instant = false;

export default async function TutorPaymentRoute({ searchParams }: { searchParams: Promise<{ canceled?: string }> }) {

  const { canceled } = await searchParams

  if (canceled) {
    console.log(
      'Order canceled -- continue to shop around and check out when you\'re ready.'
    )
  }



  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/sign-in?callbackURL=${encodeURIComponent("/dashboard/payment")}`);
  }

  if (getAccountRole(session.user) !== "tutor") {

    return (
      <section className="rounded-3xl border border-[#e6e9e1] bg-white p-8 text-center">
        <CreditCard className="mx-auto text-[#78934c]" size={28} />
        <h1 className="mt-4 text-2xl font-semibold text-[#203b31]">
          Tutor account required
        </h1>
        <p className="mt-2 text-sm text-[#77827b]">
          Tutor plans and billing are available to tutor accounts.
        </p>
      </section>
    );
  }

  const isPro = await isTutorPro(session.user.id);

  return <TutorPaymentPage isPro={isPro} />;
}
