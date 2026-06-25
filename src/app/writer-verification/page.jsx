'use client';

import React, { useEffect, useState } from 'react';
import {
    ShieldCheck,
    Sparkles,
    ArrowRight,
    Feather,
    BookOpen,
    Lock,
    Coins,
    Check,
    AlertCircle,
    HelpCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const WriterVerificationPage = () => {
    const router = useRouter();

    // Getting user data from session
    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        if (!user || (user.role !== 'writer')) {
            toast.error('Join as writer to access this page.');
            router.push('/');
        }
    }, [user, router]);
    
    const [loading, setLoading] = useState(false);

    const handleStartVerification = async () => {
        setLoading(true);
        try {
            const { data: tokenData } = await authClient.token();
            const response = await fetch('/api/checkout_sessions/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify({
                    paymentType: 'verification'
                }),
            });

            if (!response.ok) {
                toast.error('Failed to initiate checkout session.');
            }

            const { url } = await response.json();
            if (url) {
                // Redirect to Stripe Secure checkout
                window.location.href = url;
            } else {
                toast.error('Could not resolve checkout gateway URL.');
            }
        } catch (err) {
            toast.error('Gateway initialization error. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col justify-between selection:bg-amber-500/20 overflow-hidden">

            {/* Dynamic ambient glowing background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[15%] w-[450px] h-[450px] bg-amber-500/[0.04] blur-[140px] rounded-full" />
                <div className="absolute top-[10%] right-[15%] w-[450px] h-[450px] bg-orange-600/[0.03] blur-[150px] rounded-full" />
            </div>

            {/* Decorative Top Accent line */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent absolute top-0 left-0 z-10" />

            {/* Main Container */}
            <main className="flex-grow relative z-10 flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8 w-full max-w-4xl mx-auto">

                {/* Verification Alert Badge Header */}
                <div className="text-center space-y-4 mb-10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-lg shadow-amber-950/20">
                        <Lock className="w-6 h-6 stroke-[1.8]" />
                    </div>

                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-widest text-amber-500 uppercase bg-amber-550/5 border border-amber-500/20 px-3 py-1 rounded-full">
                            <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                            <span>Fable Author Registry</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-none">
                            Authorize Your Access
                        </h1>

                        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed font-sans">
                            To keep the Fable bookstore protected against plagiarized copies, AI-slop scripts, and fake listings, we require a verified cryptographic author registry before listing manuscripts.
                        </p>
                    </div>
                </div>

                {/* Dynamic Bento Box Cards */}
                <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">

                    {/* Left Column: Author Benefits & Guarantees */}
                    <div className="md:col-span-7 bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest font-mono text-zinc-500 border-b border-zinc-900 pb-2">
                                Verified Author Advantages
                            </h3>

                            <div className="space-y-4 text-left">
                                {[
                                    {
                                        icon: ShieldCheck,
                                        title: "Verified Badging",
                                        desc: "Gain the prominent emerald badge next to your author profile and catalog lists, signaling reader authenticity."
                                    },
                                    {
                                        icon: Feather,
                                        title: "Unlimited Global Listings",
                                        desc: "Draft, publish, and schedule infinite novels, poetry collections, or manuscripts directly into our shop."
                                    },
                                    {
                                        icon: Coins,
                                        title: "90% Direct Royalties",
                                        desc: "Bypass secondary publishing networks. Retain the absolute highest share of your creative income."
                                    }
                                ].map((benefit, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-amber-500 mt-0.5">
                                            <benefit.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white uppercase tracking-tight">{benefit.title}</h4>
                                            <p className="text-[11px] text-zinc-500 leading-normal">{benefit.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Note on refundability */}
                        <div className="flex items-center gap-2.5 bg-zinc-900/40 border border-zinc-900 px-4 py-3 rounded-xl text-[11px] text-zinc-400 leading-relaxed">
                            <AlertCircle className="w-4 h-4 text-zinc-500 shrink-0" />
                            <span>One-time activation ledger. Free of recursive subscription taxes.</span>
                        </div>
                    </div>

                    {/* Right Column: Premium Invoice Card / Action */}
                    <div className="md:col-span-5 bg-gradient-to-b from-zinc-900/50 to-zinc-950 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl shadow-black/60 relative overflow-hidden">

                        {/* Top decorative badge */}
                        <div className="absolute top-0 right-0 bg-amber-500 text-zinc-950 font-mono font-bold tracking-widest text-[8px] uppercase px-3.5 py-1 rounded-bl-xl">
                            Lifetime Access
                        </div>

                        <div className="space-y-4 text-left pt-2">
                            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Verification Invoice</p>

                            <div className="space-y-1">
                                <span className="text-4xl font-extrabold text-white font-mono">$40.00</span>
                                <span className="text-xs text-zinc-500 ml-1">/ One-time</span>
                            </div>

                            <p className="text-[11px] text-zinc-400 leading-relaxed">
                                Covers identity registry matching, initial sandbox validation, and perpetual backend database hosting costs.
                            </p>

                            <div className="border-t border-zinc-900/80 pt-4 space-y-2">
                                {[
                                    "No automated recurring billing",
                                    "Verified writer cryptographic status",
                                    "Instant dashboard activation",
                                    "Direct Stripe dashboard sync"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-[11px] text-zinc-400">
                                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Verification Trigger Button */}
                        <button
                            onClick={handleStartVerification}
                            disabled={loading}
                            className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-zinc-950 font-bold py-3 text-xs flex items-center justify-center gap-2 transition duration-300 shadow-lg shadow-orange-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Verify Identity & Proceed</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>

                </div>

                {/* Author Help Guide footer links */}
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Need custom onboarding assistance?</span>
                    <a href="mailto:support@fable.co" className="text-amber-500 hover:underline">Support Desk</a>
                </div>

            </main>
        </div>
    );
};

export default WriterVerificationPage;