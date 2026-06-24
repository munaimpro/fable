import { stripe } from '@/lib/stripe'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Compass,
  CreditCard,
  Hash,
  Mail,
  Sparkles,
  User,
  Award,
  ChevronRight,
  PenTool,
  Check,
  BadgeCheck
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export const metadata = {
  title: "Writer Verification Success | Fable"
};

const VerificationSuccess = async ({ searchParams }) => {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  // Retrieve stripe session
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  console.log(session);
  console.log(session?.metadata.writerId);

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/verified-writers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      writerId: session?.metadata?.writerId || "",
      paymentStatus: session?.payment_status,
      transactionId: session?.payment_intent?.id,
      type: "writer_verification_fee",
      writerEmail: session?.customer_details?.email,
      status: "success",
      verificationDate: new Date().toLocaleDateString(),
    })
  });

  const data = await response.json();
  console.log(data);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500/20 relative overflow-hidden">

      {/* Premium ambient light meshes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[10%] w-[450px] h-[450px] bg-amber-500/[0.04] blur-[150px] rounded-full" />
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-orange-600/[0.03] blur-[180px] rounded-full" />
      </div>

      <main className="flex-grow relative z-10 flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8 w-full max-w-4xl mx-auto">

        {/* Master Success Announcement Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/10 text-amber-500 border border-amber-500/30 shadow-2xl shadow-amber-950/20 relative">
            <Award className="w-9 h-9 stroke-[1.5]" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-amber-500 uppercase bg-amber-550/10 border border-amber-500/20 px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Fable Certified Creator</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Verification Successful
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Congratulations! Your administrative verification ledger is validated and authorized. Your Fable creator dashboard access is active.
            </p>
          </div>
        </div>

        {/* Master Ledger Layout Box */}
        <div className="w-full rounded-2xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-md shadow-2xl shadow-black/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-zinc-900 mb-8">

          {/* Left Column: Author Seal / Dynamic Cover Visual */}
          <div className="md:col-span-5 p-8 flex flex-col items-center justify-center text-center bg-zinc-950/40 relative group">

            {session?.metadata?.coverImage ? (
              // Case A: Book Cover present
              <div className="space-y-4 w-full flex flex-col items-center">
                <div className="aspect-[3/4] w-full max-w-[170px] relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/80 group-hover:border-amber-500/30 transition-all duration-500">
                  <img
                    src={session?.metadata?.coverImage}
                    alt={session?.metadata?.ebookTitle || "Manuscript Cover"}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-mono font-black tracking-widest text-amber-450 uppercase bg-amber-950/80 border border-amber-550/30 px-2 py-0.5 rounded whitespace-nowrap">
                    Active Catalog
                  </span>
                </div>
                <div className="space-y-1">
                  <h2 className="text-sm font-bold text-white uppercase tracking-tight line-clamp-1">
                    {session?.metadata?.ebookTitle}
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Registered Manuscript
                  </p>
                </div>
              </div>
            ) : (
              // Case B: General Verification (Fall-back to Gorgeous Creator Seal)
              <div className="space-y-5 py-6">
                <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                  {/* Subtle spinning outer orbit dial */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/20 animate-[spin_50s_linear_infinite]" />
                  <div className="absolute inset-2 rounded-full border border-zinc-900" />
                  <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center relative shadow-xl shadow-black/50">
                    <PenTool className="w-8 h-8 text-amber-500 animate-pulse" />
                    <BadgeCheck className="w-5 h-5 text-emerald-400 absolute bottom-1 right-1 bg-zinc-950 rounded-full" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Fable Quill Seal
                  </h2>
                  <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                    Authorized Identity
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Transaction Ledger details */}
          <div className="md:col-span-7 p-8 space-y-6 bg-zinc-950">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest font-mono text-zinc-500 border-b border-zinc-900 pb-2.5 flex items-center gap-2">
                <span>Verification Receipts Ledger</span>
              </h3>
            </div>

            {/* Receipts List */}
            <div className="space-y-3.5">

              <div className="flex items-center justify-between py-1 border-b border-zinc-900/40">
                <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Transaction ID</span>
                </span>
                <span className="text-xs font-mono font-bold text-zinc-300 select-all tracking-tight max-w-[150px] sm:max-w-none hover:text-amber-500 transition-colors">
                  {session?.payment_intent?.id || "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-900/40">
                <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Creator Account</span>
                </span>
                <span className="text-xs text-zinc-300 font-sans font-semibold">
                  {session?.metadata?.buyerName || session?.customer_details?.name || "Verified Author"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-900/40">
                <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Verified Email</span>
                </span>
                <span className="text-xs font-mono text-zinc-300">
                  {session?.customer_details?.email}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-900/40">
                <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Settlement Timestamp</span>
                </span>
                <span className="text-xs font-mono text-zinc-300">
                  {new Date().toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-900/40">
                <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Payment Gateway</span>
                </span>
                <span className="text-xs font-mono font-bold uppercase text-emerald-450 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/20">
                  {session?.payment_status || "Paid"}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                  Verification Fee Settled
                </span>
                <span className="text-lg font-mono font-black text-amber-550">
                  ${Number((session?.amount_total || 1000) / 100).toFixed(2)}
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Dynamic Road Map (Next Steps Timeline) */}
        <div className="w-full bg-zinc-950/40 border border-zinc-900 rounded-xl p-5 mb-10 text-left space-y-4">
          <p className="text-[9.5px] font-mono tracking-widest uppercase text-zinc-500 font-bold">Your Writer Onboarding Checklist</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">License Verified</p>
                <p className="text-[10px] text-zinc-500 leading-snug">Verification deposit received and logged.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-black">
                2
              </div>
              <div>
                <p className="text-xs font-bold text-white">Add Manuscripts</p>
                <p className="text-[10px] text-zinc-500 leading-snug">List first original drafts on Fable Bookstore.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px]">
                3
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-400">Claim Royalties</p>
                <p className="text-[10px] text-zinc-500 leading-snug">Configure collector logs to withdraw sales.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Actions Segment */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link
            href="/dashboard/writer"
            className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-7 py-3.5 text-xs font-bold text-zinc-950 hover:from-amber-400 hover:to-orange-500 transition shadow-lg shadow-orange-500/5 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>Open Writer Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/all-ebooks"
            className="w-full sm:w-auto rounded-xl border border-zinc-800 bg-zinc-900/50 px-7 py-3.5 text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-700 transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Compass className="w-4 h-4 text-zinc-500" />
            <span>Marketplace Commons</span>
          </Link>
        </div>

      </main>
    </div>
  );
};

export default VerificationSuccess;