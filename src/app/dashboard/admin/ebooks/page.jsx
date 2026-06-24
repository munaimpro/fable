'use client';

import React from 'react';
import { useAdminDashboard } from '../layout';
import { Trash2 } from 'lucide-react';

const AdminEbooksPage = () => {
    const context = useAdminDashboard();
    const bookList = context?.bookList || [];
    const handleTogglePublish = context?.handleTogglePublish || (() => { });
    const handleDeleteBook = context?.handleDeleteBook || (() => { });

    return (
        <div className="space-y-6 text-left">
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Fable Ebooks</h3>
                <p className="text-xs text-zinc-500">Admin publish overrides, deletion protocols, and price caps overrides.</p>
            </div>

            {context?.dataLoading || context?.loading ? (
                <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950/40 animate-pulse">
                    <table className="w-full text-left border-collapse min-w-[700px] text-xs">
                        <thead>
                            <tr className="border-b border-zinc-900 text-zinc-600 font-mono uppercase text-[9.5px] tracking-wider">
                                <th className="p-4">Cover</th>
                                <th className="p-4">Ebook Title</th>
                                <th className="p-4">Author</th>
                                <th className="p-4">Genre</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Override Visibility</th>
                                <th className="p-4 text-right">Delete Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <tr key={idx} className="text-zinc-300">
                                    <td className="p-4">
                                        <div className="h-10 w-7 rounded bg-zinc-900/85" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-4 w-32 bg-zinc-900/85 rounded" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-4 w-24 bg-zinc-900/85 rounded" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-4 w-14 bg-zinc-900/85 rounded" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-4 w-10 bg-zinc-900/85 rounded" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-4 w-16 bg-zinc-900/85 rounded" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-7 w-24 bg-zinc-900/85 rounded" />
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="h-7 w-7 rounded bg-zinc-900/85 ml-auto" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : bookList.length === 0 ? (
                <div className="text-center py-16 border border-zinc-900 rounded-xl bg-zinc-950 text-zinc-500">
                    No ebooks resolved.
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950">
                    <table className="w-full text-left border-collapse min-w-[700px] text-xs">
                        <thead>
                            <tr className="border-b border-zinc-900 text-zinc-500 font-mono uppercase text-[9.5px] tracking-wider">
                                <th className="p-4">Cover</th>
                                <th className="p-4">Ebook Title</th>
                                <th className="p-4">Author</th>
                                <th className="p-4">Genre</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Override Visibility</th>
                                <th className="p-4 text-right">Delete Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                            {bookList.map((book) => (
                                <tr key={book._id} className="hover:bg-zinc-900/30 text-zinc-300">
                                    <td className="p-4">
                                        <img src={book.coverImage} alt={book.title} className="h-10 w-7 rounded object-cover border border-zinc-800" />
                                    </td>
                                    <td className="p-4 font-bold text-white truncate max-w-[150px] uppercase tracking-tight">{book.title}</td>
                                    <td className="p-4">{book.writerName}</td>
                                    <td className="p-4">
                                        <span className="bg-zinc-900 text-zinc-400 px-2.5 py-0.5 rounded text-[10px] font-mono">{book.genre}</span>
                                    </td>
                                    <td className="p-4 font-mono font-bold text-amber-500">${book.price}</td>
                                    <td className="p-4">
                                        <span className={book.status === 'published' ? 'text-emerald-400' : 'text-red-400'}>
                                            {book.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleTogglePublish(book)}
                                            className={`rounded px-2.5 py-1 text-[9.5px] font-mono uppercase font-bold border transition ${book.published
                                                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20 hover:bg-emerald-950'
                                                : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:bg-zinc-850'
                                                }`}
                                        >
                                            {book.status === "published" ? 'Live on catalog' : 'Hidden'}
                                        </button>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleDeleteBook(book._id)}
                                            className="p-1.5 rounded-lg border border-zinc-850 hover:bg-rose-950/20 hover:text-rose-500 hover:border-rose-500/30 transition text-zinc-500"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminEbooksPage;