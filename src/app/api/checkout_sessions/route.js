import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { getUser } from '@/lib/api/session';

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

    const user = await getUser();
    const body = await request.json();

    let session;

    if (body?.paymentType == 'verification') {
      session = await stripe.checkout.sessions.create({
        customer_email: user?.email,
        line_items: [
          {
            price: 'price_1TltFVDy80MJSEcZu54gfvRM', 
            quantity: body?.quantity || 1,
          },
        ],
        metadata: {
          paymentType: body?.paymentType || 'verification',
          writerId: user?.id || '',
        },
        mode: 'payment',
        success_url: `${origin}/writer-verification-success?session_id={CHECKOUT_SESSION_ID}`,
      });
    } else {
      session = await stripe.checkout.sessions.create({
        customer_email: user?.email,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: Math.round(body?.totalAmount * 100),
              product_data: {
                name: body?.ebookTitle,
              },
            },
            quantity: body?.quantity || 1,
          },
        ],
        metadata: {
          email: user?.email || '',
          buyerId: user?.id || '',
          buyerName: user?.name || '',
          writerId: body?.writerId || '',
          writerName: body?.writerName || '',
          ebookId: body?.ebookId || '',
          coverImage: body?.coverImage || '',
          ebookTitle: body?.ebookTitle || '',
          price: String(body?.totalAmount || ''),
          purchaseDate: new Date().toISOString(),
        },
        mode: 'payment',
        success_url: `${origin}/book-purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      });
    }

    return NextResponse.json({
      url: session.url,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: err.statusCode || 500,
      }
    );
  }
}