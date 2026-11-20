import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe';


export async function POST() {
    try {
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
