"use client";

import { BookOpen } from "lucide-react";

export default function EmptyState({
    resetFilters,
}) {
    return (
        <div className="text-center py-20 rounded-xl border border-dashed border-zinc-800 max-w-lg mx-auto space-y-4">

            <BookOpen className="w-10 h-10 text-zinc-600 mx-auto" />

            <h3 className="text-white font-bold">
                No Match Found
            </h3>

            <p className="text-xs text-zinc-500">
                No ebooks match your current search
                criteria.
            </p>

            <button
                onClick={resetFilters}
                className="text-xs font-semibold text-amber-500 hover:underline"
            >
                Restore Full Catalog
            </button>
        </div>
    );
}