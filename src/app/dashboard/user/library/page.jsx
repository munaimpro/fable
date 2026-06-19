'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { useUserDashboard } from '../layout';

export default function SavedEbooksPage() {
    const context = useUserDashboard();
    const purchases = context?.purchases || [];
    const dataLoading = context?.dataLoading || false;

    return (
        <div className="space-y-6 text-left">
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-sans">Your Unlocked Collection</h3>
                <p className="text-xs text-zinc-500">Click on any gathered copy below to unlock and enjoy the full digital publication.</p>
            </div>

            {dataLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 animate-pulse">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="aspect-[3/4] bg-zinc-900 rounded-xl" />
                    ))}
                </div>
            ) : purchases.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10 space-y-3">
                    <BookOpen className="w-8 h-8 text-zinc-700 mx-auto" />
                    <p className="text-xs text-zinc-400">You haven&apos;t unlocked any ebook common copies yet.</p>
                    <Link href="/all-ebooks" className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-zinc-950 font-semibold text-xs rounded-lg hover:bg-amber-400">
                        Browse Ebooks
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {purchases.map((pc) => (
                        <div key={pc.id} className="group flex flex-col rounded-xl overflow-hidden border border-zinc-900 bg-zinc-950 hover:border-zinc-800 transition-colors">
                            <div className="aspect-[3/4] relative overflow-hidden bg-zinc-900">
                                <img
                                    src={pc.ebookCover}
                                    alt={pc.ebookTitle}
                                    className="h-full w-full object-cover group-hover:scale-102 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                    <Link
                                        href={`/ebook/${pc.ebookId}`}
                                        className="rounded-lg bg-amber-500 text-zinc-950 text-xs font-bold px-3 py-1.5 flex items-center gap-1 hover:bg-amber-400 font-sans"
                                    >
                                        <span>Read Ebook</span>
                                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[2]" />
                                    </Link>
                                </div>
                            </div>
                            <div className="p-3.5 space-y-1">
                                <h4 className="text-xs font-bold text-white truncate">{pc.ebookTitle}</h4>
                                <p className="text-[10px] text-zinc-500 truncate">By {pc.writerName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
