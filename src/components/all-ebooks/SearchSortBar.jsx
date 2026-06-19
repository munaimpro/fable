"use client";

import {
    Search,
    ArrowUpDown,
    SlidersHorizontal,
} from "lucide-react";

export default function SearchSortBar({
    search,
    setSearch,
    sortBy,
    setSortBy,
    handleFilterChange,
    isFilterOpen,
    setIsFilterOpen,
}) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-zinc-950 border border-zinc-900 rounded-xl p-4">

            <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

                <input
                    type="text"
                    placeholder="Search ebooks or writer..."
                    value={search}
                    onChange={(e) =>
                        handleFilterChange(() =>
                            setSearch(e.target.value)
                        )
                    }
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm"
                />
            </div>

            <div className="flex items-center gap-3">

                <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <ArrowUpDown className="w-4 h-4" />
                    Sort By
                </div>

                <select
                    value={sortBy}
                    onChange={(e) =>
                        handleFilterChange(() =>
                            setSortBy(e.target.value)
                        )
                    }
                    className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs"
                >
                    <option value="newest">
                        Newest Releases
                    </option>
                    <option value="price-asc">
                        Price Low → High
                    </option>
                    <option value="price-desc">
                        Price High → Low
                    </option>
                </select>

                <button
                    onClick={() =>
                        setIsFilterOpen(!isFilterOpen)
                    }
                    className="lg:hidden flex items-center gap-1 px-3 py-2 border border-zinc-800 rounded-lg text-xs"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filter
                </button>
            </div>
        </div>
    );
}