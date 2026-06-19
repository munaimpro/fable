'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

const FeaturedBooks = ({ ebooks = [], loading }) => {
    return (
        <div className="py-16 bg-zinc-950 border-t border-zinc-900/60" id="featured-section">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase tracking-widest font-semibold">
                            <TrendingUp className="w-4 h-4" />
                            <span>Featured Ebooks</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                            Fresh Original Stories
                        </h2>
                        <p className="text-sm text-zinc-400 font-sans">
                            Collect digital literature directly from independent creators on Fable.
                        </p>
                    </div>
                    <Link
                        href="/all-ebooks"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-500 hover:text-amber-400 group transition-colors"
                    >
                        <span>Browse entire collection</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Catalog Loading Skeletons */}
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="space-y-4 animate-pulse">
                                <div className="aspect-[3/4] rounded-xl bg-zinc-900" />
                                <div className="h-4 bg-zinc-900 rounded w-3/4" />
                                <div className="h-3 bg-zinc-900 rounded w-1/2" />
                                <div className="h-4 bg-zinc-900 rounded w-1/3" />
                            </div>
                        ))}
                    </div>
                ) : ebooks.length === 0 ? (
                    <div className="text-center py-12 rounded-xl border border-dashed border-zinc-800 bg-zinc-900/10">
                        <BookOpen className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                        <p className="text-sm text-zinc-400">No ebooks published yet.</p>
                    </div>
                ) : (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        {ebooks.map((book) => (
                            <motion.div
                                key={book._id}
                                variants={{
                                    hidden: { opacity: 0, y: 15 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ y: -4 }}
                                className="flex flex-col rounded-xl overflow-hidden bg-zinc-900/20 border border-zinc-900/80 hover:border-zinc-800/80 transition-all duration-300 relative group h-full"
                            >
                                {/* Badge */}
                                {book.totalSales > 0 && (
                                    <div className="absolute top-2 right-2 z-10 rounded bg-red-950/80 border border-red-500/30 px-2 py-0.5 text-[9px] font-mono tracking-widest font-bold text-red-400 uppercase">
                                        Sold out
                                    </div>
                                )}

                                {/* Thumbnail Cover */}
                                <Link href={`/ebook/${book._id}`} className="aspect-[3/4] relative block w-full bg-zinc-950 overflow-hidden">
                                    <img
                                        src={book.coverImage || 'https://picsum.photos/seed/cover/600/800'}
                                        alt={book.title}
                                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                        <span className="text-xs text-amber-500 font-semibold flex items-center gap-1 font-sans">
                                            <span>Details</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </Link>

                                {/* Info */}
                                <div className="p-3.5 flex flex-col flex-grow justify-between gap-2 bg-gradient-to-b from-zinc-900/10 to-zinc-950/60">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-semibold text-amber-500 uppercase font-mono tracking-wider">
                                            {book.genre}
                                        </span>
                                        <h3 className="text-sm font-semibold text-zinc-100 truncate hover:text-amber-400">
                                            <Link href={`/ebook/${book._id}`}>{book.title}</Link>
                                        </h3>
                                        <p className="text-xs text-zinc-400 truncate font-sans">
                                            By {book.writerName}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-zinc-900/60 pt-2 flex-wrap">
                                        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest leading-none">
                                            Copy Price
                                        </span>
                                        <span className="text-sm font-bold text-amber-400 font-mono">
                                            ${book.price ? book.price.toFixed(2) : '0.00'}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default FeaturedBooks;