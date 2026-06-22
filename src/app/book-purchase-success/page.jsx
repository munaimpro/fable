import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'

export default async function PurchaseSuccess({ searchParams }) {
  const { session_id } = await searchParams
    // console.log(session_id);

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    });

    console.log(session);

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ebookId: session.metadata.ebookId,
      ebookTitle: session.metadata.ebookTitle,
      coverImage: session.metadata.coverImage,
      buyerId: session.metadata.buyerId,
      buyerName: session.metadata.buyerName,
      writerId: session.metadata.writerId,
      writerName: session.metadata.writerName,
      paymentStatus: session.payment_status,
      transactionId: session.payment_intent.id,
      price: Number(session.metadata.price),
      transactionId: session.payment_intent.id,
      type: "ebook_purchase",
      userEmail: session.customer_details.email,
      amount: Number(session.metadata.price),
      status: "success",
      purchaseDate: session.metadata.purchaseDate,
    })
  });
  const data = await response.json();
  console.log(data);



    return (
      <div className='bg-white'>
        <h1 className='text-3xl dark:text-white'>Payment Success</h1>
        <p>Transaction ID: {session.payment_intent.id}</p>
        <p>ebookId: {session?.metadata?.ebookId}</p>
        <p>ebookTitile: {session?.metadata?.ebookTitle}</p>
        <p>buyerId: {session?.metadata?.buyerId}</p>
        <p>buyerName: {session?.metadata?.buyerName}</p>
        <p>writerId: {session?.metadata?.writerId}</p>
        <p>paymentStatus: {session?.payment_status}</p>
        <p>type: ebook_purchase</p>
        <p>userEmail: {session?.customer_details?.email}</p>
        <p>amount: {Number(session?.metadata?.price)}</p>
        <p>status: success</p>
        <p>purchaseDate: {session?.metadata?.purchaseDate}</p>
        <p>writerName: {session?.metadata?.writerName}</p>
        <p>coverImage: {session?.metadata?.coverImage}</p>
      </div>
    )
  }