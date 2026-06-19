'use client';

import React, { useEffect, useState } from 'react';
import { UserCheck, BookMarked } from 'lucide-react';

export default function TopWriters() {
    const [writers, setWriters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWriters = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/top-writers`
                );

                const data = await response.json();
                setWriters(data);
            } catch (error) {
                console.error('Failed to fetch top writers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWriters();
    }, []);

    if (loading) {
        return (
            <section className="py-16 bg-zinc-950">
                <div className="mx-auto max-w-7xl px-4">
                    <p className="text-zinc-400">Loading top writers...</p>
                </div>
            </section>
        );
    }

    return (
        <section
            className="py-16 bg-zinc-950 border-y border-zinc-900/60"
            id="writers-section"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="space-y-2 mb-10 max-w-xl">
                    <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase tracking-widest font-semibold">
                        <UserCheck className="w-4 h-4" />
                        <span>Fable Top Writers</span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                        Top Active Writers
                    </h2>

                    <p className="text-sm text-zinc-400">
                        Writers with the highest ebook sales on the platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {writers.map((writer) => (
                        <div
                            key={writer.writerId}
                            className="flex flex-col rounded-2xl border border-zinc-900 bg-zinc-950 p-6 space-y-4 hover:border-zinc-800 transition-colors duration-300 relative overflow-hidden group"
                        >
                            <div className="absolute right-0 top-0 h-24 w-24 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

                            <div className="flex items-center gap-4">
                                <img
                                    src={
                                        writer.image ||
                                        'https://ui-avatars.com/api/?name=Writer'
                                    }
                                    alt={writer.name}
                                    className="h-14 w-14 rounded-full object-cover border border-zinc-800"
                                />

                                <div>
                                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                                        {writer.name}
                                    </h3>

                                    <p className="text-xs font-mono text-amber-500 font-semibold flex items-center gap-1.5">
                                        <BookMarked className="w-3.5 h-3.5 shrink-0" />
                                        <span>
                                            {writer.totalSoldCopies} Copies Sold
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    {writer.genres?.slice(0, 4).map((genre) => (
                                        <span
                                            key={genre}
                                            className="text-xs font-semibold text-zinc-300 bg-zinc-900 px-2 py-1 rounded"
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    Specializes in{' '}
                                    {writer.genres?.join(', ')} ebooks with{' '}
                                    {writer.totalSoldCopies} total sales across
                                    the platform.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}