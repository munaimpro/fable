'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, Calendar, Tag, Bookmark, CheckCircle, Lock, ShieldAlert, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function EbookDetails({ id }) {
    const router = useRouter();

    // Getting user data from session
    const { data: session } = authClient.useSession();
    const user = session?.user;
    console.log(user);

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Interaction states
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [hasPurchased, setHasPurchased] = useState(false);
    const [bookmarkLoading, setBookmarkLoading] = useState(false);

    useEffect(() => {
        async function loadBookData() {
            try {
                setLoading(true);
                setError(false);
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ebook/${id}`);
                if (!res.ok) {
                    setError(true);
                    return;
                }
                const data = await res.json();
                setBook(data);

                // Check if user is logged in
                if (user) {
                    const bookMarkResponse = await fetch(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks/${user.id}`
                    );
                    if (bookMarkResponse.ok) {
                        const bookMarks = await bookMarkResponse.json();
                        setIsBookmarked(bookMarks.some(bookmark => bookmark.ebookId === id));
                    }
                }
            } catch (err) {
                console.error('Loading ebook details failed:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        loadBookData();
    }, [id, user]);

    // Toggle dynamic Bookmarks state
    const handleToggleBookmark = async () => {
        if (!user) {
            toast.error('Sign in to bookmark this digital book.');
            router.push('/login');
            return;
        }

        setBookmarkLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ebookId: id, userId: user.id }),
            });

            if (response.ok) {
                const data = await response.json();
                setIsBookmarked(data.bookmarked);
                toast.success(data.message);
            } else {
                toast.error('Bookmark toggle failed.');
            }
        } catch (err) {
            console.error('Bookmark toggling err:', err);
        } finally {
            setBookmarkLoading(false);
        }
    };

    // Initiate purchase flow
    const handleBuyNow = async () => {
        if (!user) {
            toast.error('Please sign in to collect this ebook.');
            router.push('/login');
            return;
        }

        if (book?.writerId === user.id) {
            toast.error('You are the author! Writers cannot buy their own books.');
            return;
        }

        router.push(`/checkout/${id}`);
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
                <div className="flex-grow flex flex-col items-center justify-center py-20 min-h-[400px]">
                    <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-r-2 border-amber-500 border-solid" />
                    <p className="text-xs text-zinc-500 mt-4 font-mono">Unlocking Ebook Manuscript...</p>
                </div>
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
                <div className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <ShieldAlert className="w-12 h-12 text-rose-500" />
                    <h2 className="text-xl font-bold text-white">Ebook Not Found</h2>
                    <p className="text-xs text-zinc-400 max-w-sm">
                        The manuscript with index &quot;{id}&quot; could not be located inside our digital registry.
                    </p>
                    <Link href="/browse" className="rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-semibold hover:border-zinc-700">
                        Return to Browse
                    </Link>
                </div>
            </div>
        );
    }

    const isAuthor = user?.id === book.writerId;
    const isAvailable = book.status === 'available';
    const isUserAdmin = user?.role === 'admin';
    const purchasedSeeded = (user?.email === 'reader@fable.com' && book.id === 'b-5');
    const isUnlocked = isAuthor || isUserAdmin || purchasedSeeded || hasPurchased;

    return (
        <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans">
            <main className="flex-grow mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full space-y-12">

                {/* Back Link */}
                <Link href="/browse" className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-amber-500 transition-colors">
                    <Compass className="w-4 h-4" />
                    <span>Catalog Commons</span>
                </Link>

                {/* Master Details Block */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14">
                    {/* Cover Frame */}
                    <div className="md:col-span-5 lg:col-span-4 justify-self-center w-full max-w-[280px] sm:max-w-[320px] md:max-w-none">
                        <div className="aspect-[3/4] relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl shadow-black/40 group">
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                            />
                            {book.status === 'sold' && (
                                <div className="absolute top-4 right-4 z-10 rounded bg-red-950/90 border border-red-500/20 px-3 py-1 text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
                                    Sold copy
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Metadata Panel */}
                    <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                                    <Tag className="w-3.5 h-3.5" />
                                    {book.genre}
                                </span>
                                <span className="text-zinc-500 text-xs font-mono flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>Added {new Date(book.createdAt).toLocaleDateString()}</span>
                                </span>
                            </div>

                            <div className="space-y-1">
                                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                                    {book.title}
                                </h1>
                                <p className="text-sm text-zinc-400">
                                    By <span className="text-amber-500 hover:underline font-semibold cursor-pointer">{book.writerName}</span>
                                </p>
                            </div>

                            <div className="pt-4 border-t border-zinc-900">
                                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono mb-2">Synopsis</h3>
                                <p className="text-sm text-zinc-300 leading-relaxed max-w-xl">
                                    {book.description}
                                </p>
                            </div>
                        </div>

                        {/* Transaction Box */}
                        <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6 space-y-4 max-w-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-zinc-500 font-mono tracking-wider uppercase">Acquire Digital copy</p>
                                    <p className="text-xl sm:text-2xl font-black font-mono text-white mt-1">
                                        ${book.price.toFixed(2)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-zinc-500 font-mono tracking-wider uppercase">Availability</p>
                                    <span className={`inline-flex items-center gap-1 text-xs font-bold font-mono mt-1 ${isAvailable ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        <CheckCircle className="w-4 h-4" />
                                        {isAvailable ? 'In Stock' : 'Collectible Sold'}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-5 gap-3 pt-2">
                                <button
                                    onClick={handleBuyNow}
                                    disabled={isAuthor}
                                    className={`col-span-4 rounded-xl py-3 px-4 text-xs font-bold shadow-lg transition flex items-center justify-center gap-2 cursor-pointer ${isAuthor
                                            ? 'bg-zinc-800 border border-zinc-700 text-zinc-500 cursor-not-allowed'
                                            : isAvailable
                                                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 font-bold shadow-orange-500/5'
                                                : 'bg-zinc-900 border border-zinc-800 text-zinc-400'
                                        }`}
                                >
                                    {isAuthor ? (
                                        <>
                                            <Lock className="w-4 h-4" />
                                            <span>Author Copy (Disabled)</span>
                                        </>
                                    ) : isAvailable ? (
                                        <>
                                            <DollarSign className="w-4 h-4" />
                                            <span>Collect Edition</span>
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="w-4 h-4" />
                                            <span>Acquired (Read Online)</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleToggleBookmark}
                                    disabled={bookmarkLoading}
                                    className={`col-span-1 rounded-xl border flex items-center justify-center transition cursor-pointer ${isBookmarked
                                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                            : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white'
                                        }`}
                                >
                                    <Bookmark className={`w-4.5 h-4.5 ${isBookmarked ? 'fill-amber-500 stroke-amber-500' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reader Compartment */}
                <section className="border border-zinc-900 rounded-3xl bg-zinc-950 p-6 sm:p-10 relative overflow-hidden">
                    {isUnlocked ? (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-900 pb-4">
                                <div className="space-y-1">
                                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded">
                                        Full Manuscript Unlocked
                                    </span>
                                    <h2 className="text-xl font-bold text-white">Digital Codex Edition Reader</h2>
                                </div>
                                {purchasedSeeded && (
                                    <span className="text-xs text-amber-500 font-mono">* Owned via seeded ledger</span>
                                )}
                            </div>
                            <div className="max-w-3xl mx-auto leading-relaxed text-sm text-zinc-300 space-y-4 pt-4 overflow-y-auto max-h-[500px] border border-zinc-900 bg-zinc-950/80 p-6 rounded-2xl">
                                <div className="whitespace-pre-line font-sans leading-relaxed text-zinc-200 text-left text-base">
                                    {book.description}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 max-w-xl mx-auto space-y-4">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500">
                                <Lock className="w-5 h-5 text-amber-500" />
                            </div>
                            <div className="space-y-1 text-center">
                                <h3 className="text-lg font-bold text-white">Full Edition is Locked</h3>
                                <p className="text-xs text-zinc-400">
                                    This digital codex copy requires a purchase transaction. Unlock now to gain complete access.
                                </p>
                            </div>
                            <div className="pt-2">
                                <button
                                    onClick={handleBuyNow}
                                    className="rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-semibold px-4 py-2 hover:border-zinc-700 transition cursor-pointer"
                                >
                                    Configure Transaction
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}