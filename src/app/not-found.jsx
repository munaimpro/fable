'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Home } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
            <main className="flex-grow flex flex-col items-center justify-center p-6 text-center space-y-6 relative overflow-hidden">
                {/* Ambient background glow */}
                <div className="absolute inset-0 radial-blur z-0" />

                <div className="relative z-10 space-y-4 max-w-md">
                    {/* Illustration vector panel */}
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-zinc-900 border border-zinc-800 text-zinc-600 scale-95 hover:scale-100 transition-transform duration-300">
                        <BookOpen className="w-12 h-12 text-amber-500 stroke-[1.8]" />
                    </div>

                    <div className="space-y-2">
                        <p className="text-amber-500 font-mono tracking-widest uppercase font-bold text-xs">Error Code: 404</p>
                        <h1 className="text-3xl font-black text-white tracking-tight sm:text-4xl">Page Not Found</h1>
                        <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                            The literary scroll or catalog chapter you requested does not reside in our digital archives. It may have been relocated or purged.
                        </p>
                    </div>

                    <div className="pt-4 flex gap-4 justify-center">
                        <Link
                            href="/"
                            className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-2.5 text-xs font-bold text-zinc-950 flex items-center gap-1.5 shadow"
                        >
                            <Home className="w-4 h-4 text-zinc-950" />
                            <span>Back to Home</span>
                        </Link>

                        <Link
                            href="/browse"
                            className="rounded-lg bg-zinc-900 border border-zinc-800 px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white"
                        >
                            <span>Explore Ebooks</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default NotFoundPage;
