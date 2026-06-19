"use client";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function Pagination({
    page,
    setPage,
    total,
    totalPages,
}) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between border-t border-zinc-900 pt-6">

            <span className="text-xs text-zinc-500">
                Showing {(page - 1) * 8 + 1} -{" "}
                {Math.min(page * 8, total)} of {total}
            </span>

            <div className="flex items-center gap-2">

                <button
                    onClick={() =>
                        setPage((prev) =>
                            Math.max(prev - 1, 1)
                        )
                    }
                    disabled={page === 1}
                    className="h-8 w-8 border border-zinc-800 rounded-lg flex items-center justify-center"
                >
                    <ChevronLeft size={16} />
                </button>

                {Array.from({
                    length: totalPages,
                }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`h-8 w-8 rounded-lg text-xs ${page === i + 1
                                ? "bg-amber-500/10 text-amber-400"
                                : "border border-zinc-800"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() =>
                        setPage((prev) =>
                            Math.min(
                                prev + 1,
                                totalPages
                            )
                        )
                    }
                    disabled={page === totalPages}
                    className="h-8 w-8 border border-zinc-800 rounded-lg flex items-center justify-center"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}