import { stripe } from '@/lib/stripe'
import { ArrowRight, BookOpen, Calendar, CheckCircle2, Compass, CreditCard, Hash, Mail, Sparkles, User } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Purchase Success | Fable"
};

const PurchaseSuccess = async ({ searchParams }) => {
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
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500/20">

      {/* Decorative ambient background mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[350px] h-[350px] bg-amber-550/5 blur-[120px] rounded-full" />
        <div className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-amber-500/5 blur-[150px] rounded-full" />
      </div>

      <main className="flex-grow relative z-10 flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8 w-full max-w-4xl mx-auto">

        {/* Success Announcement Header */}
        <div className="text-center space-y-4 mb-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-950/25">
            <CheckCircle2 className="w-8 h-8 stroke-[1.8]" />
          </div>
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1 text-[10px] font-mono font-black tracking-widest text-amber-500 uppercase bg-amber-500/5 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 animate-spin duration-9000" />
              <span>Access Authorized</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Payment Successful
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
              Your transactional ledger has been validated securely. The ebook manuscript is now added to your digital library.
            </p>
          </div>
        </div>

        {/* Master Details layout card */}
        <div className="w-full rounded-2xl border border-zinc-900 bg-zinc-950 shadow-2xl shadow-black/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-zinc-900 mb-10">

          {/* Left Column: Digital Codex Cover & Summary */}
          <div className="md:col-span-5 p-6 sm:p-8 flex flex-col items-center justify-center text-center bg-zinc-950/40">
            <div className="aspect-[3/4] w-full max-w-[180px] sm:max-w-[200px] relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl shadow-black/60 group mb-5">
              <img
                src={session?.metadata?.coverImage}
                alt={session?.metadata?.ebookTitle}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded">
                Unbound copy
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-md font-extrabold text-white leading-snug">
                {session?.metadata?.ebookTitle}
              </h2>
              <p className="text-xs text-zinc-400">
                By <span className="text-amber-550 font-semibold">{session?.metadata?.writerName}</span>
              </p>
            </div>
          </div>

          {/* Right Column: Transaction Registry & Ledger */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6 bg-zinc-950">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest font-mono text-zinc-400 border-b border-zinc-900 pb-2">
                Purchase Details
              </h3>
            </div>

            {/* Receipt Parameters Grid */}
            <div className="space-y-4">

              <div className="flex items-center justify-between py-1 border-b border-zinc-900/40">
                <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" />
                  <span>Transaction ID</span>
                </span>
                <span className="text-xs font-mono font-bold text-zinc-300 select-all tracking-tight max-w-[170px] sm:max-w-none hover:text-amber-400 transition-colors">
                  {session?.payment_intent?.id}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-900/40">
                <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Reader Account</span>
                </span>
                <span className="text-xs text-zinc-300 font-sans font-medium">
                  {session?.metadata?.buyerName}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-900/40">
                <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>E-Receipt Delivery</span>
                </span>
                <span className="text-xs font-mono text-zinc-300">
                  {session?.customer_details?.email}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-900/40">
                <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Settlement Timestamp</span>
                </span>
                <span className="text-xs font-mono text-zinc-300">
                  {new Date().toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-900/40">
                <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Settlement Status</span>
                </span>
                <span className="text-xs font-mono font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {session?.payment_status}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">
                  Total Compensation Paid
                </span>
                <span className="text-lg font-mono font-black text-white">
                  ${Number(session?.metadata?.price).toFixed(2)}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Call to Actions Grid */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link
            href={`/ebook/${session?.metadata?.ebookId}`}
            className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-xs font-bold text-zinc-950 hover:bg-amber-400 transition shadow-lg shadow-orange-500/5 cursor-pointer flex items-center justify-center gap-1.5 group"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Digital Reader</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/all-ebooks"
            className="w-full sm:w-auto rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-3 text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-700 transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>Catalog Commons</span>
          </Link>
        </div>

      </main>
    </div>
  );
}

export default PurchaseSuccess;