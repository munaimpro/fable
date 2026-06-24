'use client';

import React from 'react';
import { useUserDashboard } from '../layout';

const PurchaseHistoryPage = () => {
    const context = useUserDashboard();
    const purchases = context?.purchases || [];
    const loading = context?.dataLoading;

    return (
        <div className="space-y-6 text-left">
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-sans">Fable Purchase History</h3>
                <p className="text-xs text-zinc-500 font-sans">Transactions processed via Stripe.</p>
            </div>

            {loading ? (
                <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950/40 animate-pulse">
                    <table className="w-full text-left border-collapse min-w-[600px] text-xs">
                        <thead>
                            <tr className="border-b border-zinc-900 text-zinc-500 font-mono uppercase text-[9.5px] tracking-wider">
                                <th className="p-4">Transaction ID</th>
                                <th className="p-4">Ebook Details</th>
                                <th className="p-4">Author</th>
                                <th className="p-4">Amount Paid</th>
                                <th className="p-4">Authorization Date</th>
                                <th className="p-4 text-right">Status Code</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <tr key={idx} className="text-zinc-300">
                                    <td className="p-4">
                                        <div className="h-4 w-12 bg-zinc-900/80 rounded" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-4 w-40 bg-zinc-900/80 rounded" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-4 w-24 bg-zinc-900/80 rounded" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-4 w-10 bg-zinc-900/80 rounded" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-4 w-16 bg-zinc-900/80 rounded" />
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="h-4 w-14 bg-zinc-900/80 rounded ml-auto" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : purchases.length === 0 ? (
                <div className="text-center py-16 border border-zinc-900 rounded-2xl bg-zinc-950">
                    <p className="text-xs text-zinc-500">No receipt items recorded.</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950">
                    <table className="w-full text-left border-collapse min-w-[600px] text-xs">
                        <thead>
                            <tr className="border-b border-zinc-900 text-zinc-500 font-mono uppercase text-[9.5px] tracking-wider">
                                <th className="p-4">Transaction ID</th>
                                <th className="p-4">Ebook Details</th>
                                <th className="p-4">Author</th>
                                <th className="p-4">Amount Paid</th>
                                <th className="p-4">Authorization Date</th>
                                <th className="p-4 text-right">Status Code</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                            {purchases.map((purchase) => (
                                <tr key={purchase._id} className="hover:bg-zinc-900/30 text-zinc-300">
                                    <td className="p-4 font-mono text-zinc-500 font-semibold">{purchase.transactionId}</td>
                                    <td className="p-4 font-bold text-white flex items-center gap-2">
                                        <span className="truncate max-w-37.5">{purchase.ebookTitle}</span>
                                    </td>
                                    <td className="p-4">{purchase.writerName}</td>
                                    <td className="p-4 font-bold font-mono text-amber-500">${purchase.price.toFixed(2)}</td>
                                    <td className="p-4">{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                                    <td className="p-4 text-right font-semibold text-emerald-400 uppercase font-mono">Paid</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default PurchaseHistoryPage;