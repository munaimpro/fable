import EbookCard from "./EbookCard";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyState from "./EmptyState";

export default function EbookGrid({
    loading,
    ebooks,
    resetFilters,
}) {
    if (loading) {
        return <LoadingSkeleton />;
    }

    if (!ebooks.length) {
        return <EmptyState resetFilters={resetFilters} />;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
            {ebooks.map((book) => (
                <EbookCard
                    key={book._id}
                    book={book}
                />
            ))}
        </div>
    );
}