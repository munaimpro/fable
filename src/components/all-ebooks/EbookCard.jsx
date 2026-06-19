"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { motion } from "motion/react";

export default function EbookCard({ book }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -4 }}
            className="flex flex-col rounded-xl overflow-hidden bg-zinc-950 border border-zinc-900/80 hover:border-zinc-800 transition-all duration-300 relative group h-full"
        >
            {/* Sold Badge */}
            {book.status === "sold" && (
                <div className="absolute top-2.5 right-2.5 z-10 rounded bg-red-950/90 border border-red-500/20 px-2 py-0.5 text-[9px] font-mono tracking-widest font-bold text-red-400 uppercase">
                    Sold copy
                </div>
            )}

            {/* Cover */}
            <Link
                href={`/ebook/${book._id}`}
                className="aspect-[3/4] relative block w-full bg-zinc-950 overflow-hidden"
            >
                <img
                    src={
                        book.coverImage ||
                        "https://picsum.photos/seed/cover/600/800"
                    }
                    alt={book.title}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs text-amber-500 font-semibold flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>View Edition</span>
                    </span>
                </div>
            </Link>

            {/* Info */}
            <div className="p-4 flex flex-col justify-between flex-grow gap-2">
                <div className="space-y-1.5">

                    {/* Genre */}
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wide text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded w-fit block">
                        {book.genre}
                    </span>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-zinc-100 truncate group-hover:text-amber-400 transition-colors">
                        <Link href={`/ebook/${book._id}`}>
                            {book.title}
                        </Link>
                    </h3>

                    {/* Writer */}
                    <p className="text-xs text-zinc-400 truncate">
                        By {book.writerName}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-zinc-900/80 pt-3.5 mt-2 flex-wrap">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none">
                        ROYALS
                    </span>

                    <span className="text-sm font-bold text-amber-400 font-mono">
                        ${Number(book.price).toFixed(2)}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}