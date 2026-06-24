'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Library, Plus, DollarSign, Heart } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const WriterDashboardContext = createContext(null);

export function useWriterDashboard() {
    return useContext(WriterDashboardContext);
}

const WriterDashboardLayout = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();

    // Getting user data from session
    const { data: session } = authClient.useSession();
    const user = session?.user;
    // console.log(user);

    const [myEbooks, setMyEbooks] = useState([]);
    const [sales, setSales] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [triggerCount, setTriggerCount] = useState(0);

    // Form (Add & Edit) states
    const [editingBookId, setEditingBookId] = useState(null);
    const [bookForm, setBookForm] = useState({
        title: '',
        description: '',
        fullContent: '',
        price: 9.99,
        genre: 'Fiction',
        coverImage: ''
    });

    useEffect(() => {
        if (!user || (user.role !== 'writer' && user.role !== 'admin')) {
            toast.error('Sign in with a Writer account to view this panel.');
            router.push('/login');
        }
    }, [user, router]);

    // Execute async dataload in reaction to user/triggerCount changes
    useEffect(() => {
        if (!user) return;
        let active = true;

        async function loadStats() {
            setDataLoading(true);
            try {
                // 1. Load eBooks
                const booksResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/writer-ebooks/${user.id}`);
                if (booksResponse.ok && active) {
                    const myUploaded = await booksResponse.json();
                    // console.log(myUploaded);
                    setMyEbooks(myUploaded);
                }

                // 2. Bookmarks
                const bookMarks = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks/${user.id}`);
                if (bookMarks.ok && active) {
                    const bookMarksData = await bookMarks.json();
                    setBookmarks(bookMarksData);
                }

                // 3. Sales List
                const salseList = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/purchases/${user.id}`);
                if (salseList.ok && active) {
                    const salseListData = await salseList.json();
                    console.log(salseListData);
                    setSales(salseListData);
                }
            } catch (error) {
                console.error('Loading writer records failure:', error);
            } finally {
                if (active) {
                    setDataLoading(false);
                }
            }
        }

        loadStats();

        return () => {
            active = false;
        };
    }, [user, triggerCount]);

    const loadWriterStats = useCallback(() => {
        setTriggerCount(prev => prev + 1);
    }, []);

    if (!user) {
        return (
            <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 items-center justify-center p-4">
                <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-r-2 border-amber-500 border-solid" />
                <p className="text-xs text-zinc-500 mt-4 font-mono">Loading Writer Dashboard...</p>
            </div>
        );
    }

    const sidebarLinks = [
        { name: 'Manage My Ebooks', href: '/dashboard/writer/manage', icon: Library },
        { name: editingBookId ? 'Modify Book' : 'Add New Ebook', href: '/dashboard/writer/add', icon: Plus },
        { name: 'Royalties / Sales', href: '/dashboard/writer/sales', icon: DollarSign },
        { name: 'Bookmarked List', href: '/dashboard/writer/bookmarks', icon: Heart },
    ];

    return (
        <WriterDashboardContext.Provider value={{
            myEbooks,
            sales,
            bookmarks,
            dataLoading,
            editingBookId,
            bookForm,
            setBookForm,
            setEditingBookId,
            setMyEbooks,
            loadWriterStats
        }}>
            <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">

                <div className="flex-grow w-full max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-8">
                    {/* Top Writer Banner */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:p-8 justify-between">
                        <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                            <img
                                src={user?.image || 'https://picsum.photos/seed/user/200'}
                                alt={user?.name || 'Writer'}
                                className="h-16 w-16 rounded-full object-cover ring-2 ring-amber-500/20"
                            />
                            <div className="space-y-1">
                                <span className="text-xs font-mono font-bold tracking-widest text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded uppercase leading-none mt-1">
                                    AUTHOR
                                </span>
                                <h1 className="text-2xl font-black text-white mt-1">{user?.name}</h1>
                                <p className="text-xs text-zinc-400 font-sans">{user?.email}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 border-t border-zinc-900/60 pt-4 sm:pt-0">
                            <div className="text-center sm:text-right">
                                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Indexed Titles</p>
                                <p className="text-lg font-bold text-white font-mono">{myEbooks.length} Books</p>
                            </div>
                            <div className="w-[1px] bg-zinc-800" />
                            <div className="text-center sm:text-right">
                                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Creator Royalties</p>
                                <p className="text-lg font-bold text-amber-500 font-mono">
                                    ${sales.reduce((sum, s) => sum + s.price, 0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Left Column */}
                        <div className="lg:col-span-1">
                            <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4 space-y-2 h-fit text-left">
                                {sidebarLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <button
                                            key={link.href}
                                            onClick={() => router.push(link.href)}
                                            className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-lg text-xs font-mono cursor-pointer uppercase tracking-wider text-left transition ${isActive
                                                    ? 'border border-amber-500/20 bg-amber-500/10 text-amber-500 font-bold'
                                                    : 'border border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/55'
                                                }`}
                                        >
                                            <link.icon className="w-4.5 h-4.5 shrink-0" />
                                            <span>{link.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Main routing area */}
                        <div className="lg:col-span-3 min-h-[300px]">
                            {children}
                        </div>
                    </div>

                </div>
            </div>
        </WriterDashboardContext.Provider>
    );
}

export default WriterDashboardLayout;
