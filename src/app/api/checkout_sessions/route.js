import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { authClient } from '@/lib/auth-client';
import { getUser } from '@/lib/api/session';


export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const user = await getUser();
    const body = await request.json();
    console.log(body);

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data: {
            currency: 'usd',
            unit_amount: body?.totalAmount * 100,
            product_data: {
              name: body?.ebookTitle
            },
          },
          quantity: body?.quantity
        },
      ],
      metadata: {
        email: user?.email || "",
        buyerId: user?.id || "",
        buyerName: user?.name || "",
        writerId: body?.writerId || "",
        writerName: body?.writerName || "",
        ebookId: body?.ebookId || "",
        coverImage: body?.coverImage || "",
        ebookTitle: body?.ebookTitle || "",
        price: body?.totalAmount || "",
        purchaseDate: new Date(),
      },
      mode: 'payment',
      success_url: `${origin}/book-purchase-success?session_id={CHECKOUT_SESSION_ID}`,
    });

    // console.log(session); 

    return NextResponse.json({url: session.url});
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}