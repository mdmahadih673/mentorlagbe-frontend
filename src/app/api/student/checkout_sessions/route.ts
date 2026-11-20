import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth, isStudentPro } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { getAccountRole } from "@/lib/user-role";

export async function POST() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    if (getAccountRole(session.user) !== "student") {
      return NextResponse.json({ error: "Student account required." }, { status: 403 });
    }
    const appUrl = new URL(process.env.BETTER_AUTH_URL as string).origin;
    if (await isStudentPro(session.user.id)) {
      return NextResponse.redirect(`${appUrl}/dashboard/student-payment`, 303);
    }

    const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name: "MentorLagbe Pro Student" },
          unit_amount: 1000,
        },
        quantity: 1,
      }],
      client_reference_id: session.user.id,
      customer_email: session.user.email,
      metadata: {
        userId: session.user.id,
        userRole: "student",
        planName: "Pro Student",
      },
      success_url: `${appUrl}/dashboard/student-payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/dashboard/student-payment?canceled=1`,
    });

    if (!checkout.url) {
      return NextResponse.json({ error: "Could not create Stripe checkout." }, { status: 500 });
    }

    return NextResponse.redirect(checkout.url, 303);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed." },
      { status: 500 },
    );
  }
}
