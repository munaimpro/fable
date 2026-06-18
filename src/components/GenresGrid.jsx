'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Tag } from 'lucide-react';

const GENRES = [
    { name: 'Mystery', count: 3, bg: 'from-purple-900/40 to-indigo-950/40', text: 'text-purple-400', border: 'border-purple-500/20' },
    { name: 'Sci-Fi', count: 2, bg: 'from-cyan-900/40 to-blue-950/40', text: 'text-cyan-400', border: 'border-cyan-500/20' },
    { name: 'Romance', count: 4, bg: 'from-rose-900/40 to-pink-950/40', text: 'text-rose-400', border: 'border-rose-500/20' },
    { name: 'Fantasy', count: 3, bg: 'from-amber-900/40 to-orange-950/40', text: 'text-amber-400', border: 'border-amber-500/20' },
    { name: 'Horror', count: 1, bg: 'from-red-900/40 to-stone-950/40', text: 'text-red-400', border: 'border-red-500/20' },
    { name: 'Fiction', count: 2, bg: 'from-emerald-900/40 to-teal-950/40', text: 'text-emerald-400', border: 'border-emerald-500/20' },
];

export default function GenresGrid() {
    return (
        <section className="py-16 bg-zinc-950 border-t border-zinc-900/60" id="genres-section">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="space-y-2 mb-10 max-w-xl">
                    <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase tracking-widest font-semibold">
                        <Compass className="w-4 h-4" />
                        <span>Ebook Genres</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                        Curated Worlds
                    </h2>
                    <p className="text-sm text-zinc-400 font-sans">
                        Dive instantly into themed sub-genres designed to stir your artistic imagination.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {GENRES.map((g, idx) => (
                        <Link
                            key={idx}
                            href={`/browse?genre=${g.name}`}
                            className={`rounded-2xl border ${g.border} bg-gradient-to-br ${g.bg} p-6 flex flex-col justify-between aspect-square group hover:scale-[1.02] hover:-rotate-1 transition-all duration-300`}
                        >
                            <div className={`p-2 rounded-xl bg-zinc-950/40 w-fit ${g.text}`}>
                                <Tag className="w-5 h-5 stroke-[2.2]" />
                            </div>
                            <div>
                                <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">
                                    Genre Pack
                                </p>
                                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                                    {g.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}