import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'

export default async function PurchaseSuccess({ searchParams }) {
  const { session_id } = await searchParams
    console.log(session_id);

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    });

    // console.log(session);


    return (
      <h1 className='text-3xl dark:text-white'>Payment Success</h1>
    )
  }