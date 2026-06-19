'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';
import { BookOpen, User, Heart, History } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Footer from '@/components/shared/Footer';
import NavBar from '@/components/shared/NavBar';
import { authClient } from '@/lib/auth-client';

const UserDashboardContext = createContext(null);

export function useUserDashboard() {
    return useContext(UserDashboardContext);
}

export default function UserDashboardLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();

    // Getting user data from session
    const { data: session } = authClient.useSession();
    const user = session?.user;
    console.log(user);



    const [purchases, setPurchases] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            toast.error('Sign in to view your Reader dashboard.');
            router.push('/login');
        }
    }, [user, router]);

    useEffect(() => {
        if (!user) return;
        const currentUser = user;

        async function loadDashboardData() {
            setDataLoading(true);
            try {
                const bookMarks = await fetch(`/${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks`);
                if (bookMarks.ok) {
                    const bookMarksData = await bookMarks.json();
                    setBookmarks(bookMarksData);
                }

                const seededPurchaslist = [];

                setPurchases(seededPurchaslist);
            } catch (err) {
                console.error('Loading user library stats failed:', err);
            } finally {
                setDataLoading(false);
            }
        }
        loadDashboardData();
    }, [user]);

    if (!user) {
        return (
            <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 items-center justify-center p-4">
                <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-r-2 border-amber-500 border-solid" />
                <p className="text-xs text-zinc-500 mt-4 font-mono">Opening Reader Lounge...</p>
            </div>
        );
    }

    const sidebarLinks = [
        { name: 'Dashboard', href: '/dashboard/user', icon: BookOpen },
        { name: 'Saved Ebooks', href: '/dashboard/user/library', icon: BookOpen },
        { name: 'Purchase History', href: '/dashboard/user/purchase-history', icon: History },
        { name: 'Bookmarked List', href: '/dashboard/user/bookmarks', icon: Heart },
        { name: 'My Profile', href: '/dashboard/user/profile', icon: User },
    ];

    return (
        <UserDashboardContext.Provider value={{ purchases, bookmarks, dataLoading, setBookmarks, setPurchases }}>
            <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
                <div className="flex-grow w-full max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-8">

                    {/* Top Profile Banner */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:p-8 justify-between">
                        <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                            <img
                                src={user?.avatar || 'https://picsum.photos/seed/user/200'}
                                alt={user?.name || 'Reader'}
                                className="h-16 w-16 rounded-full object-cover ring-2 ring-amber-500/20"
                            />
                            <div className="space-y-1">
                                <span className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase bg-amber-500/10 px-2 py-0.5 rounded leading-none">
                                    READER COHORT
                                </span>
                                <h1 className="text-2xl font-black text-white mt-1">{user?.name}</h1>
                                <p className="text-xs text-zinc-400 font-sans">{user?.email}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 border-t border-zinc-900/60 pt-4 sm:pt-0">
                            <div className="text-center sm:text-right">
                                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Acquisitions</p>
                                <p className="text-lg font-bold text-white font-mono">{purchases.length} Books</p>
                            </div>
                            <div className="w-[1px] bg-zinc-800" />
                            <div className="text-center sm:text-right">
                                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Bookmarked</p>
                                <p className="text-lg font-bold text-white font-mono">{bookmarks.length} Titles</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Left Column */}
                        <div className="lg:col-span-1">
                            <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4 space-y-2 h-fit">
                                {sidebarLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <button
                                            key={link.href}
                                            onClick={() => router.push(link.href)}
                                            className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-lg text-xs font-mono uppercase tracking-wider text-left transition ${isActive
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

                        {/* Main Content Pane */}
                        <div className="lg:col-span-3 min-h-[300px]">
                            {children}
                        </div>
                    </div>

                </div>
            </div>
        </UserDashboardContext.Provider>
    );
}