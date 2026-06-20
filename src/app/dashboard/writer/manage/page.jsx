'use client';

import React from 'react';
import { useWriterDashboard } from '../layout';
import { Library, Edit, Trash2, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ManageMyEbooksPage() {
    const router = useRouter();
    const context = useWriterDashboard();
    const myEbooks = context?.myEbooks || [];
    const setMyEbooks = context?.setMyEbooks || (() => { });
    const setEditingBookId = context?.setEditingBookId || (() => { });
    const setBookForm = context?.setBookForm || (() => { });

    // Toggle book published status
    const handleTogglePublish = async (book) => {
        try {
            const newStatus =
                book.status === "published"
                    ? "unpublished"
                    : "published";

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ebook/${book._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status: newStatus
                    })
                }
            );

            if (response.ok) {
                toast.success(`Ebook ${!book.published ? 'Published' : 'Unpublished'} successfully!`);
                setMyEbooks(
                    myEbooks.map(b =>
                        b._id === book._id
                            ? {
                                ...b,
                                status: newStatus
                            }
                            : b
                    )
                );
            } else {
                toast.error('Toggle status failed.');
            }
        } catch (err) {
            toast.error('Server integration error.');
            console.log(err)
        }
    };

    // Delete Ebook
    const handleDeleteBook = async (id) => {
        if (!window.confirm('Are you sure you want to delete this ebook from Fable registry?')) return;

        try {
            const res = await fetch(`/api/ebooks/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Manuscript deleted from registry.');
                setMyEbooks(myEbooks.filter(b => b.id !== id));
            } else {
                toast.error('Delete action rejected.');
            }
        } catch (err) {
            toast.error('Delete integration error.');
        }
    };

    // Pre-fill Edit form and route to add page
    const handleStartEdit = (book) => {
        setEditingBookId(book.id);
        setBookForm({
            title: book.title,
            description: book.description,
            content: book.content,
            price: book.price.toString(),
            genre: book.genre,
            cover: book.cover
        });
        router.push('/dashboard/writer/add');
    };

    return (
        <div className="space-y-6 text-left">
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Your Listed Manuscripts</h3>
                <p className="text-xs text-zinc-500">Enable, unpublish, or edit catalog listings inside Fable bookstore.</p>
            </div>

            {myEbooks.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10 space-y-3">
                    <BookOpen className="w-8 h-8 text-zinc-700 mx-auto" />
                    <p className="text-xs text-zinc-400">You haven&apos;t listed any ebooks yet.</p>
                    <button onClick={() => router.push('/dashboard/writer/add')} className="text-xs font-semibold text-amber-500 hover:underline">
                        Add Your First Ebook
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950">
                    <table className="w-full text-left border-collapse min-w-[700px] text-xs">
                        <thead>
                            <tr className="border-b border-zinc-900 text-zinc-500 font-mono uppercase text-[9.5px] tracking-wider">
                                <th className="p-4">Visual Cover</th>
                                <th className="p-4">Book Title</th>
                                <th className="p-4">Genre</th>
                                <th className="p-4">Copy Price</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Listed Visibility</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                            {myEbooks.map((book) => (
                                <tr key={book._id} className="hover:bg-zinc-900/30 text-zinc-300">
                                    <td className="p-4">
                                        <img src={book.coverImage} alt={book.title} className="h-10 w-7 rounded object-cover border border-zinc-850" />
                                    </td>
                                    <td className="p-4 font-bold text-white uppercase tracking-tight">{book.title}</td>
                                    <td className="p-4">
                                        <span className="bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded text-[10px] font-mono">{book.genre}</span>
                                    </td>
                                    <td className="p-4 font-mono font-bold text-amber-500">${book.price.toFixed(2)}</td>
                                    <td className="p-4 font-semibold uppercase text-[10px] font-mono">
                                        <span className={book.status === 'published' ? 'text-emerald-400' : 'text-red-400'}>
                                            {book.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleTogglePublish(book)}
                                            className={`rounded-full px-2.5 py-0.5 text-[9.5px] font-mono font-bold uppercase border transition ${book.status === "published"
                                                    ? "bg-emerald-950/40 text-emerald-400 border-emerald-500/20"
                                                    : "bg-zinc-900 text-zinc-500 border-zinc-800"
                                                }`}
                                        >
                                            {book.status === "published"
                                                ? "Published"
                                                : "Hidden"}
                                        </button>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex gap-2 justify-end">
                                            <button
                                                onClick={() => handleStartEdit(book)}
                                                className="p-1.5 rounded bg-zinc-900 border border-zinc-800 hover:text-amber-500 transition"
                                                aria-label={`Edit ${book.title}`}
                                            >
                                                <Edit className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBook(book._id)}
                                                className="p-1.5 rounded bg-zinc-900 border border-zinc-800 hover:text-rose-500 transition"
                                                aria-label={`Delete ${book.title}`}
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
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
