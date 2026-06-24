'use client';

import React from 'react';
import { useAdminDashboard } from '../layout';

const AdminTransactionsPage = () => {
    const context = useAdminDashboard();
    const transactionList = context?.transactionList || [];
    const isLoading = context?.dataLoading;

    return (
        <div className="space-y-6 text-left">
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Central Transactions Ledger</h3>
                <p className="text-xs text-zinc-500 font-sans">Every receipts logged across verification fees and original ebook collections.</p>
            </div>

            {isLoading ? (
                <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950/40 animate-pulse">
                    <table className="w-full text-left border-collapse min-w-[700px] text-xs">
                        <thead>
                            <tr className="border-b border-zinc-900 text-zinc-500 font-mono uppercase text-[9.5px] tracking-wider">
                                <th className="p-4">Transaction ID</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Billing Subscriber</th>
                                <th className="p-4">Cash Amount (USD)</th>
                                <th className="p-4">Authorization Timestamp</th>
                                <th className="p-4 text-right">Verification</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <tr key={idx} className="text-zinc-300">
                                    <td className="p-4">
                                        <div className="h-4 w-20 bg-zinc-900 rounded" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-5 w-24 bg-zinc-900 rounded-full" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-4 w-32 bg-zinc-900 rounded" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-4 w-10 bg-zinc-900 rounded" />
                                    </td>
                                    <td className="p-4">
                                        <div className="h-4 w-28 bg-zinc-900 rounded" />
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="h-4 w-12 bg-zinc-900 rounded ml-auto" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : !transactionList || transactionList.length === 0 ? (
                <div className="text-center py-16 border border-zinc-940 rounded-xl bg-zinc-950 text-zinc-500">
                    No transactions received.
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950">
                    <table className="w-full text-left border-collapse min-w-[700px] text-xs">
                        <thead>
                            <tr className="border-b border-zinc-900 text-zinc-500 font-mono uppercase text-[9.5px] tracking-wider">
                                <th className="p-4">Transaction ID</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Billing Subscriber</th>
                                <th className="p-4">Cash Amount (USD)</th>
                                <th className="p-4">Authorization Timestamp</th>
                                <th className="p-4 text-right">Verification</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                            {transactionList.map((transaction) => (
                                <tr key={transaction._id} className="hover:bg-zinc-900/30 text-zinc-300">
                                    <td className="p-4 font-mono text-zinc-500">{transaction.transactionId}</td>
                                    <td className="p-4">
                                        <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-mono uppercase font-bold border ${transaction.type === 'publishing_fee'
                                            ? 'bg-purple-950/40 text-purple-400 border-purple-500/20'
                                            : 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20'
                                            }`}>
                                            {transaction.type === 'publishing_fee' ? 'Verification Fee' : 'Ebook Purchase'}
                                        </span>
                                    </td>
                                    <td className="p-4 font-mono">{transaction.userEmail}</td>
                                    <td className="p-4 font-bold font-mono text-amber-500">${transaction.amount.toFixed(2)}</td>
                                    <td className="p-4">{new Date(transaction.createdAt).toLocaleString()}</td>
                                    <td className="p-4 text-right text-emerald-400 font-semibold font-mono">{transaction.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminTransactionsPage;