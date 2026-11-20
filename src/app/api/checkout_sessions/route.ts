import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';
import { getAccountRole } from '@/lib/user-role';


export async function POST() {
    try {
        const userSession = await auth.api.getSession({ headers: await headers() });
        if (!userSession) {
            return NextResponse.json({ error: 'Sign in required.' }, { status: 401 });
        }
        if (getAccountRole(userSession.user) !== 'tutor') {
            return NextResponse.json({ error: 'Tutor account required.' }, { status: 403 });
        }

        const appUrl = new URL(process.env.BETTER_AUTH_URL as string).origin

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: 'price_1UdwYyRz3VNA8JJCmCSYGVlm',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            client_reference_id: userSession.user.id,
            customer_email: userSession.user.email,
            metadata: {
                userId: userSession.user.id,
                userRole: 'tutor',
                planName: 'Pro Tutor',
            },
            success_url: `${appUrl}/dashboard/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}/dashboard/payment`,
            // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
            integration_identifier: 'Mentor_Lagbe_web_001',
        });
        return NextResponse.redirect(session.url as string, 303)
    } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
