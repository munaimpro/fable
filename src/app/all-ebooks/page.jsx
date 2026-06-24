import BrowseContent from "@/components/all-ebooks/BrowseContent";
import { Suspense } from "react";

export const metadata = {
    title: "Ebooks | Fable"
};

const AllEbooksPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
            <Suspense
                fallback={
                    <div className="flex-1 flex flex-col items-center justify-center py-20 min-h-[400px]">
                        <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-r-2 border-amber-500 border-solid" />
                        <p className="text-xs text-zinc-500 mt-4 font-mono">
                            Loading All Ebooks...
                        </p>
                    </div>
                }
            >
                <BrowseContent />
            </Suspense>
        </div>
    );
}

export default AllEbooksPage;