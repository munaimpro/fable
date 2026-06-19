"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { motion } from "motion/react";

export default function EbookCard({ book }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="rounded-xl overflow-hidden border border-zinc-900"
        >
            <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/ebook/${book._id}`}>
                <img
                    src={book.cover}
                    alt={book.title}
                    className="aspect-[3/4] w-full object-cover"
                />
            </Link>

            <div className="p-4">
                <h3>{book.title}</h3>
                <p>{book.writerName}</p>

                <div className="flex justify-between mt-4">
                    <Eye size={14} />
                    <span>${book.price}</span>
                </div>
            </div>
        </motion.div>
    );
}