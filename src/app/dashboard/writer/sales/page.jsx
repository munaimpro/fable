'use client';

import React from 'react';
import { useWriterDashboard } from '../layout';

export default function RoyaltiesSalesPage() {
    const context = useWriterDashboard();
    const sales = context?.sales || [];

    return (
        <div className="space-y-6 text-left">
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Your Book royalties Ledger</h3>
                <p className="text-xs text-zinc-500">Track collectors who acquired original copies of your work on Fable.</p>
            </div>

            {sales.length === 0 ? (
                <div className="text-center py-16 border border-zinc-900 rounded-2xl bg-zinc-950">
                    <p className="text-xs text-zinc-500 font-normal">No royalty collections recorded yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950">
                    <table className="w-full text-left border-collapse min-w-[600px] text-xs">
                        <thead>
                            <tr className="border-b border-zinc-900 text-zinc-500 font-mono uppercase text-[9.5px] tracking-wider">
                                <th className="p-4">Purchase ID</th>
                                <th className="p-4">Book Title</th>
                                <th className="p-4">Acquired Buyer</th>
                                <th className="p-4">Purchase Date</th>
                                <th className="p-4 text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                            {sales.map((sale) => (
                                <tr key={sale._id} className="hover:bg-zinc-900/30 text-zinc-300">
                                    <td className="p-4 font-mono text-zinc-500">{sale._id}</td>
                                    <td className="p-4 font-bold text-white uppercase tracking-tight">{sale.ebookTitle}</td>
                                    <td className="p-4 font-semibold">{sale.buyerName}</td>
                                    <td className="p-4">{new Date(sale.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 text-right font-bold font-mono text-amber-500">${sale.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
