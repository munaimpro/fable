'use client';

import React from 'react';
import { useWriterDashboard } from '../layout';

const RoyaltiesSalesPage = () => {
    const context = useWriterDashboard();
    const sales = context?.sales || [];
    const isLoading = context?.dataLoading;

    return (
        <div className="space-y-6 text-left">
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Your Book royalties Ledger</h3>
                <p className="text-xs text-zinc-500">Track collectors who acquired original copies of your work on Fable.</p>
            </div>

            {isLoading ? (
                /* Dynamic skeleton loader during data fetching */
                <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950/40 animate-pulse">
                    <table className="w-full text-left border-collapse min-w-[600px] text-xs">
                        <thead>
                            <tr className="border-b border-zinc-900 text-zinc-600 font-mono uppercase text-[9.5px] tracking-wider">
                                <th className="p-4">Purchase ID</th>
                                <th className="p-4">Book Title</th>
                                <th className="p-4">Acquired Buyer</th>
                                <th className="p-4">Purchase Date</th>
                                <th className="p-4 text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900/60">
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <tr key={idx} className="text-zinc-300">
                                    <td className="p-4">
                                        <div className="h-4 w-16 bg-zinc-900/80 rounded" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-4 w-36 bg-zinc-900/80 rounded" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-4 w-24 bg-zinc-900/80 rounded" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-4 w-16 bg-zinc-900/80 rounded" />
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="h-4 w-12 bg-zinc-900/80 rounded ml-auto" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : sales.length === 0 ? (
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
                                <tr key={sale._id || sale.id} className="hover:bg-zinc-900/30 text-zinc-300">
                                    <td className="p-4 font-mono text-zinc-500">{sale._id || sale.id}</td>
                                    <td className="p-4 font-bold text-white uppercase tracking-tight">{sale.ebookTitle}</td>
                                    <td className="p-4 font-semibold">{sale.buyerName}</td>
                                    <td className="p-4">{new Date(sale.purchaseDate || sale.createdAt).toLocaleDateString()}</td>
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

export default RoyaltiesSalesPage;