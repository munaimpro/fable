'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Twitter, Linkedin, Send, Shield, Globe, HelpCircle, GitCommitHorizontalIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;
        toast.success('Thank you for subscribing to Fable digest!');
        setEmail('');
    };

    return (
        <footer className="w-full bg-zinc-950 border-t border-zinc-900/80">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    {/* Column 1: Info */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 shadow-md shadow-amber-500/10">
                                <BookOpen className="h-4.5 w-4.5 text-zinc-950 stroke-[2.5]" />
                            </div>
                            <span className="font-sans text-lg font-bold tracking-tight text-white">
                                Fable
                            </span>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed font-sans font-normal">
                            Democratizing high-quality digital book sharing. Discover emerging writers, gather collectibles, and read immersive content directly in your secure library.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-zinc-200 text-sm font-semibold tracking-wider uppercase mb-4">
                            Explore Fable
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link href="/" className="text-sm text-zinc-400 hover:text-amber-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/browse" className="text-sm text-zinc-400 hover:text-amber-400 transition-colors">
                                    Browse Ebooks
                                </Link>
                            </li>
                            <li>
                                <Link href="/browse?genre=Sci-Fi" className="text-sm text-zinc-400 hover:text-amber-400 transition-colors">
                                    Sci-Fi & Fantasy
                                </Link>
                            </li>
                            <li>
                                <Link href="/browse?genre=Mystery" className="text-sm text-zinc-400 hover:text-amber-400 transition-colors">
                                    Mysteries
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Trust & Info */}
                    <div>
                        <h3 className="text-zinc-200 text-sm font-semibold tracking-wider uppercase mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-2.5">
                            <li className="flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 cursor-pointer transition-colors">
                                <HelpCircle className="w-4.5 h-4.5 text-zinc-500 hover:text-amber-500" />
                                <span>Help Center</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 cursor-pointer transition-colors">
                                <Shield className="w-4.5 h-4.5 text-zinc-500 hover:text-amber-500" />
                                <span>Privacy & Terms</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 cursor-pointer transition-colors">
                                <Globe className="w-4.5 h-4.5 text-zinc-500 hover:text-amber-500" />
                                <span>Developer API</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h3 className="text-zinc-200 text-sm font-semibold tracking-wider uppercase mb-4">
                            Weekly Digest
                        </h3>
                        <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                            New releases and featured author releases delivered straight to your inbox.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                            />
                            <button
                                type="submit"
                                className="flex h-9.5 w-11 items-center justify-center rounded-lg bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-colors shadow-md shadow-amber-500/10 shrink-0"
                            >
                                <Send className="w-4.5 h-4.5 stroke-[2.2]" />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Banner */}
                {/* <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-500 font-normal">
                        &copy; {new Date().getFullYear()} Fable Books Inc. All rights reserved. Built with precision and passion.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-zinc-500 hover:text-amber-400 transition-colors" aria-label="Github link">
                            <GitCommitHorizontalIcon className="w-4.5 h-4.5" />
                        </a>
                        <a href="#" className="text-zinc-500 hover:text-amber-400 transition-colors" aria-label="Twitter link">
                            <Twitter className="w-4.5 h-4.5" />
                        </a>
                        <a href="#" className="text-zinc-500 hover:text-amber-400 transition-colors" aria-label="LinkedIn link">
                            <Linkedin className="w-4.5 h-4.5" />
                        </a>
                    </div>
                </div> */}
            </div>
        </footer>
    );
}

export default Footer;