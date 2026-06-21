"use client";

import { SlidersHorizontal } from "lucide-react";

export default function FilterSidebar({
    genres,
    selectedGenre,
    availability,
    maxPrice,
    setSelectedGenre,
    setAvailability,
    setMaxPrice,
    resetFilters,
    handleFilterChange,
}) {
    return (
        <div className="hidden lg:block space-y-6">
            <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-5 space-y-6 h-fit">

                <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                    <span className="text-sm font-semibold text-white flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                        Filter Options
                    </span>

                    <button
                        onClick={resetFilters}
                        className="text-xs text-zinc-500 hover:text-amber-500"
                    >
                        Clear All
                    </button>
                </div>

                {/* Genre */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-zinc-400 uppercase">
                        Genre
                    </label>

                    <div className="flex flex-col gap-1.5">
                        {genres.map((genre) => (
                            <button
                                key={genre}
                                onClick={() =>
                                    handleFilterChange(() =>
                                        setSelectedGenre(genre)
                                    )
                                }
                                className={`text-left text-xs py-2 px-3 rounded-lg transition ${selectedGenre === genre
                                        ? "bg-amber-500/10 border border-amber-500/30 text-amber-400"
                                        : "text-zinc-400 hover:bg-zinc-900"
                                    }`}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Availability */}
                <div className="space-y-3 border-t border-zinc-900 pt-3">
                    <label className="text-xs font-semibold text-zinc-400 uppercase">
                        Status
                    </label>

                    {[
                        {
                            val: "all",
                            label: "All Catalog",
                        },
                        {
                            val: "available",
                            label: "Available Copies",
                        },
                        {
                            val: "sold",
                            label: "Sold Copies",
                        },
                    ].map((item) => (
                        <label
                            key={item.val}
                            className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer"
                        >
                            <input
                                type="radio"
                                checked={availability === item.val}
                                onChange={() =>
                                    handleFilterChange(() =>
                                        setAvailability(item.val)
                                    )
                                }
                                className="accent-amber-500"
                            />

                            {item.label}
                        </label>
                    ))}
                </div>

                {/* Price */}
                <div className="space-y-3 border-t border-zinc-900 pt-3">
                    <label className="text-xs font-semibold text-zinc-400 uppercase">
                        Price Cap
                    </label>

                    <div className="flex justify-between text-xs">
                        <span>Max Price</span>
                        <span className="text-amber-500 font-bold">
                            ${maxPrice}
                        </span>
                    </div>

                    <input
                        type="range"
                        min="0"
                        max="999"
                        step="5"
                        value={maxPrice}
                        onChange={(e) =>
                            handleFilterChange(() =>
                                setMaxPrice(e.target.value)
                            )
                        }
                        className="w-full accent-amber-500"
                    />
                </div>
            </div>
        </div>
    );
}