'use client';

import React from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import { useWriterDashboard } from '../layout';

export default function BookmarksPage() {
    const context = useWriterDashboard();
    const bookmarks = context?.bookmarks || [];

    console.log(bookmarks);

    return (
        <div className="space-y-6 text-left">
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-sans">
                    Your Bookmarked Editions
                </h3>
                <p className="text-xs text-zinc-500 font-sans">
                    Ebooks you are tracking for later ingestion or transaction.
                </p>
            </div>

            {bookmarks.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10 space-y-2">
                    <Bookmark className="w-8 h-8 text-zinc-700 mx-auto" />
                    <p className="text-xs text-zinc-400">
                        No bookmarks saved yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {bookmarks.map((bookmark) => {
                        const book = bookmark.ebook;

                        return (
                            <div
                                key={bookmark._id}
                                className="group relative flex flex-col rounded-xl overflow-hidden border border-zinc-900 bg-zinc-950"
                            >
                                <div className="aspect-[3/4] relative overflow-hidden bg-zinc-900">
                                    <img
                                        src={book.coverImage}
                                        alt={book.title}
                                        className="h-full w-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Link
                                            href={`/ebook/${book._id}`}
                                            className="rounded bg-amber-500 text-zinc-950 text-[10px] font-bold px-2.5 py-1 flex items-center gap-1 font-sans"
                                        >
                                            <span>Inspect</span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="p-3">
                                    <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest block font-mono">
                                        {book.genre}
                                    </span>

                                    <h4 className="text-xs font-bold text-white truncate mt-1">
                                        {book.title}
                                    </h4>

                                    <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">
                                        ${book.price}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}