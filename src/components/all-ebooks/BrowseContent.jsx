"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import FilterSidebar from "./FilterSidebar";
import SearchSortBar from "./SearchSortBar";
import MobileFilters from "./MobileFilters";
import EbookGrid from "./EbookGrid";
import Pagination from "./Pagination";

const GENRES = [
    "All",
    "Fiction",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Fantasy",
    "Horror",
];

export default function BrowseContent() {
    const searchParams = useSearchParams();

    const initialGenre = searchParams.get("genre") || "All";
    const initialSearch = searchParams.get("search") || "";

    const [ebooks, setEbooks] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState(initialSearch);
    const [selectedGenre, setSelectedGenre] = useState(initialGenre);
    const [availability, setAvailability] = useState("all");
    const [minPrice, setMinPrice] = useState("0");
    const [maxPrice, setMaxPrice] = useState("50");
    const [sortBy, setSortBy] = useState("newest");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const resetFilters = () => {
        setSearch("");
        setSelectedGenre("All");
        setAvailability("all");
        setMinPrice("0");
        setMaxPrice("50");
        setSortBy("newest");
        setPage(1);
    };

    const handleFilterChange = (callback) => {
        callback();
        setPage(1);
    };

    useEffect(() => {
        async function fetchBooks() {
            setLoading(true);

            try {
                const query = new URLSearchParams({
                    search,
                    genre: selectedGenre,
                    availability,
                    minPrice,
                    maxPrice,
                    sortBy,
                    page: page.toString(),
                    limit: "8",
                });

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks?${query}`
                );

                if (!res.ok) {
                    toast.error("Failed to load ebooks");
                    return;
                }

                const data = await res.json();

                setEbooks(data.ebooks || []);
                setTotal(data.total || 0);
                setTotalPages(data.totalPages || 1);
            } catch (error) {
                toast.error("Server error");
            } finally {
                setLoading(false);
            }
        }

        fetchBooks();
    }, [
        search,
        selectedGenre,
        availability,
        minPrice,
        maxPrice,
        sortBy,
        page,
    ]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full flex-grow space-y-8">

            <div>
                <h1 className="text-3xl font-extrabold">
                    Curated Ebook Commons
                </h1>
                <p className="text-zinc-400 text-sm">
                    Browse and discover original literature.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                <FilterSidebar
                    genres={GENRES}
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                    availability={availability}
                    setAvailability={setAvailability}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    resetFilters={resetFilters}
                    handleFilterChange={handleFilterChange}
                />

                <div className="lg:col-span-3 space-y-6">

                    <SearchSortBar
                        search={search}
                        setSearch={setSearch}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        handleFilterChange={handleFilterChange}
                        isFilterOpen={isFilterOpen}
                        setIsFilterOpen={setIsFilterOpen}
                    />

                    <MobileFilters
                        open={isFilterOpen}
                        genres={GENRES}
                        selectedGenre={selectedGenre}
                        availability={availability}
                        setAvailability={setAvailability}
                        setSelectedGenre={setSelectedGenre}
                        resetFilters={resetFilters}
                        handleFilterChange={handleFilterChange}
                    />

                    <EbookGrid
                        loading={loading}
                        ebooks={ebooks}
                        resetFilters={resetFilters}
                    />

                    <Pagination
                        page={page}
                        setPage={setPage}
                        total={total}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </div>
    );
}