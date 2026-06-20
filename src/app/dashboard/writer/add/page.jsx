'use client';

import React from 'react';
import { useWriterDashboard } from '../layout';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const GENRE_LIST = ['Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Horror'];

export default function AddOrEditEbookPage() {
    const router = useRouter();

    // Getting user data from session
    const { data: session } = authClient.useSession();
    const user = session?.user;
    // console.log(user);
    
    const context = useWriterDashboard();
    const editingBookId = context?.editingBookId || null;
    const setEditingBookId = context?.setEditingBookId || (() => { });
    const bookForm = context?.bookForm || {
        title: '',
        description: '',
        fullContent: '',
        price: '9.99',
        genre: 'Fiction',
        coverImage: ''
    };
    // console.log(bookForm);
    const setBookForm = context?.setBookForm || (() => { });
    const loadWriterStats = context?.loadWriterStats || (() => { });

    // Reset form status
    const handleClearForm = () => {
        setEditingBookId(null);
        setBookForm({
            title: '',
            description: '',
            fullContent: '',
            price: '9.99',
            genre: 'Fiction',
            coverImage: ''
        });
    };

    // Submit book creation or modification
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!bookForm.title || !bookForm.description || !bookForm.fullContent || !bookForm.price || !bookForm.coverImage) {
            toast.error('Please prefill all writing criteria.');
            return;
        }

        try {
            const method = editingBookId ? 'PUT' : 'POST';
            const endpoint = editingBookId ? `${process.env.NEXT_PUBLIC_SERVER_URL}/ebook/${editingBookId}` : `${process.env.NEXT_PUBLIC_SERVER_URL}/ebook/`;

            const payload = {
                ...bookForm,
                writerId: user.id,
                writerName: user.name,
                status: "unpublished",
            };

            console.log(payload)

            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(editingBookId ? 'Manuscript changes saved!' : 'Original book added successfully!');
                handleClearForm();
                loadWriterStats();
                router.push('/dashboard/writer/manage');
            } else {
                toast.error(data.error || 'Operation failed.');
            }
        } catch (err) {
            toast.error('Server communication failed.');
        }
    };

    return (
        <div className="space-y-6 max-w-2xl bg-zinc-950 border border-zinc-900 p-6 sm:p-8 rounded-2xl text-left">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-900">
                <div>
                    <h3 className="text-lg font-bold text-white">
                        {editingBookId ? 'Modify Manuscript Settings' : 'Add Original Ebook manuscript'}
                    </h3>
                    <p className="text-xs text-zinc-500">Upload cover, describe parameters, and configure raw markdown text chapters.</p>
                </div>

                {editingBookId && (
                    <button onClick={handleClearForm} className="text-xs text-rose-500 font-mono hover:underline">Cancel edit</button>
                )}
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Ebook Title</label>
                        <input
                            type="text"
                            value={bookForm.title}
                            onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                            required
                            placeholder="My Original Masterpiece"
                            className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 transition"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Lit Genre</label>
                        <select
                            value={bookForm.genre}
                            onChange={(e) => setBookForm({ ...bookForm, genre: e.target.value })}
                            className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-amber-500 transition"
                        >
                            {GENRE_LIST.map(g => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Royalty Price Copy ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0.99"
                            max="99.99"
                            value={bookForm.price}
                            onChange={(e) => setBookForm({ ...bookForm, price: e.target.value })}
                            required
                            className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 transition font-mono"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Cover Art Thumbnail URL (Optional)</label>
                        <input
                            type="url"
                            value={bookForm.coverImage}
                            onChange={(e) => setBookForm({ ...bookForm, coverImage: e.target.value })}
                            placeholder="https://picsum.photos/seed/placeholder/600/800"
                            className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 transition"
                        />
                        <p className="text-[9.5px] text-zinc-500 leading-normal">
                            * Supports direct image cover links. Leave clean to auto-seed a placeholder cover.
                        </p>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Short Synopsis (Synopsis)</label>
                    <textarea
                        value={bookForm.description}
                        onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
                        required
                        rows={3}
                        placeholder="Provide an eye-pleasing synopsis for potential collectors..."
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-800 p-3 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 transition"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Manuscript Chapters Content (Supports markdown style headers)</label>
                    <textarea
                        value={bookForm.fullContent}
                        onChange={(e) => setBookForm({ ...bookForm, fullContent: e.target.value })}
                        required
                        rows={6}
                        placeholder="# Chapter 1: The Ascent \n\nEntering the library vaults..."
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-805 p-3 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 transition font-mono"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-2.5 text-xs font-bold text-zinc-950 hover:opacity-95 shadow"
                >
                    {editingBookId ? 'Save Manuscript edits' : 'Release Original Ebook'}
                </button>
            </form>
        </div>
    );
}
