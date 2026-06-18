'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authClient } from "@/lib/auth-client";
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Menu, X, LogOut, Home, Compass, LayoutDashboard } from 'lucide-react';
import toast from 'react-hot-toast';

const NavBar = () => {

    const {
        data: session,
    } = authClient.useSession()

    const user = session?.user

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const getDashboardLink = () => {
        if (!user) return '/login';
        if (user.role === 'admin') return '/dashboard/admin';
        if (user.role === 'writer') return '/dashboard/writer';
        return '/dashboard/user';
    };

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Browse Ebooks', href: '/browse', icon: Compass },
        ...(user ? [{ name: 'Dashboard', href: getDashboardLink(), icon: LayoutDashboard }] : []),
    ];

    const handleLogout = async () => {
        authClient.signOut();
        setIsOpen(false);
        toast.success('Logged out successfully.');
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-md shadow-orange-500/10 group-hover:scale-105 transition-transform duration-300">
                                <BookOpen className="h-5 w-5 text-zinc-950 stroke-[2.5]" />
                            </div>
                            <span className="font-sans text-xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                                Fable
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative text-sm font-medium transition-colors py-1.5 px-3 rounded-md hover:text-amber-400 ${isActive ? 'text-amber-400 bg-zinc-900/50' : 'text-zinc-400'
                                        }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute bottom-0 left-3 right-3 h-[2px] bg-amber-500"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop Auth Button */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800">
                                    <img
                                        src={user.image || 'https://picsum.photos/seed/user/200'}
                                        alt={user.name}
                                        className="h-6 w-6 rounded-full object-cover ring-1 ring-amber-500/30"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-semibold text-zinc-200 truncate max-w-[100px]">
                                            {user.name}
                                        </span>
                                        <span className="text-[10px] text-amber-500 font-mono uppercase tracking-wider scale-90 origin-left">
                                            {user.role}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors duration-200"
                                >
                                    <LogOut className="h-3.5 w-3.5" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="text-sm font-semibold text-zinc-300 hover:text-amber-400 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-sm font-semibold text-zinc-950 hover:opacity-95 shadow-md shadow-orange-500/10 transition-all duration-200"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Slideout */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[9998] bg-black/75 backdrop-blur-sm md:hidden"
                        />

                        {/* Sidebar drawer sliding from the right */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
                            className="fixed inset-y-0 right-0 z-[9999] w-full bg-zinc-950/80 backdrop-blur-md p-6 shadow-2xl flex flex-col md:hidden"
                        >
                            <div className="flex items-center justify-between pb-6 border-b border-zinc-900">
                                <span className="font-sans text-lg font-bold tracking-tight bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                                    Fable Menu
                                </span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="flex-grow py-6 space-y-3 overflow-y-auto">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                                    const Icon = link.icon;
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${isActive
                                                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/10'
                                                    : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border border-transparent'
                                                }`}
                                        >
                                            {Icon && <Icon className="h-4.5 w-4.5 text-zinc-400" />}
                                            <span>{link.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="pt-6 border-t border-zinc-900 space-y-4">
                                {user ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                                            <img
                                                src={user.image || 'https://picsum.photos/seed/user/200'}
                                                alt={user.name}
                                                className="h-9 w-9 rounded-full object-cover ring-1 ring-amber-500/20"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-semibold text-zinc-200 truncate">{user.name}</p>
                                                <p className="text-[10px] font-mono text-amber-500 uppercase tracking-wider leading-none mt-1">{user.role}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 py-2.5 text-sm font-semibold text-rose-400 hover:bg-zinc-900 hover:text-rose-300 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Link
                                            href="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full text-center rounded-lg border border-zinc-805 bg-zinc-950 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-900 transition-colors"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full text-center rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 py-2.5 text-sm font-semibold text-zinc-950 hover:opacity-95 shadow transition-opacity"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}


export default NavBar;