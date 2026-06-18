'use client';

import React from 'react';
import { UserCheck, BookMarked } from 'lucide-react';

const TOP_WRITERS = [
    {
        name: "Jane Austen AI",
        avatar: "https://picsum.photos/seed/jane/200",
        booksSold: "48 Copies",
        genre: "Romance & Mystery",
        desc: "Merging classic Regency prose structure with modern speculative mystery paradigms."
    },
    {
        name: "H.P. Lovecraft",
        avatar: "https://picsum.photos/seed/hp/200",
        booksSold: "37 Copies",
        genre: "Sci-Fi & Cosmic Horror",
        desc: "Delving into non-Euclidean terror and stranded digital space-faring expeditions."
    },
    {
        name: "Margaret Atwood Mock",
        avatar: "https://picsum.photos/seed/atwood/200",
        booksSold: "29 Copies",
        genre: "Speculative Fiction",
        desc: "Socio-political thriller cycles analyzing near-future human survival networks."
    }
];

export default function TopWriters() {
    return (
        <section className="py-16 bg-zinc-950 border-y border-zinc-900/60" id="writers-section">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="space-y-2 mb-10 max-w-xl">
                    <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase tracking-widest font-semibold">
                        <UserCheck className="w-4 h-4" />
                        <span>Fable Top Solds</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                        Top Active Writers
                    </h2>
                    <p className="text-sm text-zinc-400 font-sans">
                        These emerging authors host the most highly-collected original ebooks platform-wide.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TOP_WRITERS.map((writer, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col rounded-2xl border border-zinc-900 bg-zinc-950 p-6 space-y-4 hover:border-zinc-800 transition-colors duration-300 relative overflow-hidden group"
                        >
                            <div className="absolute right-0 top-0 h-24 w-24 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

                            <div className="flex items-center gap-4">
                                <img
                                    src={writer.avatar}
                                    alt={writer.name}
                                    className="h-14 w-14 rounded-full object-cover border border-zinc-800"
                                />
                                <div>
                                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                                        {writer.name}
                                    </h3>
                                    <p className="text-xs font-mono text-amber-500 font-semibold flex items-center gap-1.5">
                                        <BookMarked className="w-3.5 h-3.5 shrink-0" />
                                        <span>{writer.booksSold} Sold</span>
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs font-semibold text-zinc-400 uppercase font-mono bg-zinc-900 px-2 py-0.5 rounded w-fit">
                                    {writer.genre}
                                </p>
                                <p className="text-xs text-zinc-400 leading-relaxed font-sans font-normal">
                                    {writer.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}