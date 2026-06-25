'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LineChart, Users, Library, DollarSign, Landmark } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

const AdminDashboardContext = createContext(null);

export function useAdminDashboard() {
    return useContext(AdminDashboardContext);
}

const AdminDashboardLayout = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();

    // Getting user data from session
    const { data: session } = authClient.useSession();
    const user = session?.user;
    // console.log(user);

    // Server state caches
    const [userList, setUserList] = useState([]);
    const [bookList, setBookList] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [transactionList, setTransactionList] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            // toast.error('Forbidden. Administrative credentials required.');
            router.push('/');
        }
    }, [user, router]);

    const loadAdminDatabase = async () => {
        setDataLoading(true);
        try {
            // 1. Load analytical metrics
            const analyticalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/analytics`);
            if (analyticalResponse.ok) {
                const analyticalData = await analyticalResponse.json();
                setAnalytics(analyticalData);
            }

            // 2. Load all users
            const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`);
            if (usersResponse.ok) {
                const userData = await usersResponse.json();
                setUserList(userData);
                console.log(userData);
            }

            // 3. Load all books
            const booksResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allebooks`);
            if (booksResponse.ok) {
                const bookData = await booksResponse.json();
                setBookList(bookData || []);
            }

            // 4. Load all transactions
            const transactionsResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/transactions`);
            if (transactionsResponse.ok) {
                const transactionData = await transactionsResponse.json();
                console.log(transactionData);
                setTransactionList(transactionData || []);
            }
        } catch (err) {
            console.error('Loading admin metrics failed:', err);
        } finally {
            setDataLoading(false);
        }
    };

    useEffect(() => {
        if (user?.role === 'admin') {
            const timer = setTimeout(() => {
                loadAdminDatabase();
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [user]);

    // Modify user role
    const handleUpdateRole = async (targetUserId, nextRole) => {
        try {
            const { data: tokenData } = await authClient.token();
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify({ userId: targetUserId, role: nextRole }),
            });

            if (response.ok) {
                toast.success('User role synchronized successfully!');
                setUserList(userList.map(u => u.id === targetUserId ? { ...u, role: nextRole } : u));
                loadAdminDatabase(); // reload metrics
            } else {
                toast.error('Role update rejected.');
            }
        } catch (err) {
            toast.error('Server integration error.');
            console.log(err)
        }
    };

    // Delete User
    const handleDeleteUser = async (targetUserId) => {
        if (targetUserId === user?.id) {
            toast.error('Self-deletion blocks admin. Action rejected.');
            return;
        }

        if (!window.confirm('Delete this user account permanently? This action is irreversible.')) return;

        try {
            const { data: tokenData } = await authClient.token();
            console.log(tokenData);
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${targetUserId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${tokenData?.token}`
                }
            });
            if (response.ok) {
                toast.success('Account detached from registry.');
                setUserList(userList.filter(u => u.id !== targetUserId));
                loadAdminDatabase();
            } else {
                const data = await response.json();
                toast.error(data.error || 'Deletion rejected.');
            }
        } catch (err) {
            toast.error('Server transaction failed.');
        }
    };

    // Toggle ebook publish state globally
    const handleTogglePublish = async (book) => {
        try {
            const newStatus =
                book.status === "published"
                    ? "unpublished"
                    : "published";
            
            const { data: tokenData } = await authClient.token();
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ebook/${book._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify({
                    status: newStatus
                }),
            });

            const newPublishStatus = book.status === "published"? "unpublished" : "published";

            if (response.ok) {
                setBookList(prev =>
                    prev.map(b =>
                        b._id === book._id
                            ? {
                                ...b,
                                status: newPublishStatus
                            }
                            : b
                    )
                );

                toast.success(
                    newStatus === "published"
                        ? "Ebook published successfully!"
                        : "Ebook unpublished successfully!"
                );
            } else {
                toast.error('Ebook modifier rejected.');
            }
        } catch (err) {
            toast.error('Server interaction failed.');
        }
    };

    // Delete Ebook globally
    const handleDeleteBook = async (bookId) => {
        if (!window.confirm('Erase this book globally from Fable libraries?')) return;

        try {
            const { data: tokenData } = await authClient.token();
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ebook/${bookId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${tokenData?.token}`
                }
            });
            if (response.ok) {
                toast.success('Ebook deleted.');
                setBookList(bookList.filter(b => b.id !== bookId));
                loadAdminDatabase();
            } else {
                toast.error('Delete rejected.');
            }
        } catch (err) {
            toast.error('Server deletion error.');
        }
    };

    if (!user || user.role !== 'admin') {
        return (
            <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 items-center justify-center p-4">
                <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-r-2 border-amber-500 border-solid" />
                <p className="text-xs text-zinc-500 mt-4 font-mono">Loading Fable admin panel...</p>
            </div>
        );
    }

    const sidebarLinks = [
        { name: 'Analytics & Graphs', href: '/dashboard/admin/analytics', icon: LineChart },
        { name: 'Manage Users', href: '/dashboard/admin/users', icon: Users },
        { name: 'Manage All Ebooks', href: '/dashboard/admin/ebooks', icon: Library },
        { name: 'View All Transactions', href: '/dashboard/admin/transactions', icon: DollarSign },
    ];

    return (
        <AdminDashboardContext.Provider value={{
            userList,
            bookList,
            analytics,
            transactionList,
            dataLoading,
            handleUpdateRole,
            handleDeleteUser,
            handleTogglePublish,
            handleDeleteBook,
            loadAdminDatabase
        }}>
            <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">

                <main className="flex-grow mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full space-y-8 text-left">
                    {/* Admin Header Title Banner */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-900 pb-6 w-full">
                        <div className="space-y-1 text-center sm:text-left">
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">Administrative Dashboard</h1>
                            <p className="text-xs text-zinc-500 font-sans">Full operational authority over Users, Publications, and Transaction receipts.</p>
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
                                            className={`w-full flex items-center gap-3 py-2.5 px-3 cursor-pointer rounded-lg text-xs font-mono uppercase tracking-wider text-left transition ${isActive
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

                        {/* Main admin panels children */}
                        <div className="lg:col-span-3 min-h-[300px]">
                            {children}
                        </div>
                    </div>
                </main>

            </div>
        </AdminDashboardContext.Provider>
    );
}

export default AdminDashboardLayout;