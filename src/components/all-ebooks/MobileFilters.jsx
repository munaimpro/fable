"use client";

export default function MobileFilters({
    open,
    genres,
    selectedGenre,
    availability,
    setAvailability,
    setSelectedGenre,
    resetFilters,
    handleFilterChange,
}) {
    if (!open) return null;

    return (
        <div className="lg:hidden border border-zinc-900 rounded-xl p-4 space-y-4">

            <div className="flex justify-between">
                <h3 className="text-sm font-semibold">
                    Quick Filters
                </h3>

                <button
                    onClick={resetFilters}
                    className="text-xs text-amber-500"
                >
                    Reset
                </button>
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase text-zinc-500">
                    Genre
                </label>

                <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                        <button
                            key={genre}
                            onClick={() =>
                                handleFilterChange(() =>
                                    setSelectedGenre(genre)
                                )
                            }
                            className={`px-3 py-1 rounded-full text-xs ${selectedGenre === genre
                                    ? "bg-amber-500/10 text-amber-400"
                                    : "bg-zinc-900 text-zinc-400"
                                }`}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase text-zinc-500">
                    Availability
                </label>

                <div className="flex gap-4">
                    {[
                        {
                            val: "all",
                            label: "All",
                        },
                        {
                            val: "available",
                            label: "Available",
                        },
                        {
                            val: "sold",
                            label: "Sold",
                        },
                    ].map((item) => (
                        <label
                            key={item.val}
                            className="flex items-center gap-1 text-xs"
                        >
                            <input
                                type="radio"
                                checked={
                                    availability === item.val
                                }
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
            </div>
        </div>
    );
}