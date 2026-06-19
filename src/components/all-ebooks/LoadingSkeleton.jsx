export default function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map(
                (_, index) => (
                    <div
                        key={index}
                        className="space-y-4 animate-pulse rounded-xl border border-zinc-900 p-2"
                    >
                        <div className="aspect-[3/4] bg-zinc-900 rounded-lg" />

                        <div className="h-4 bg-zinc-900 rounded w-3/4" />

                        <div className="h-3 bg-zinc-900 rounded w-1/2" />

                        <div className="h-4 bg-zinc-900 rounded w-1/3" />
                    </div>
                )
            )}
        </div>
    );
}