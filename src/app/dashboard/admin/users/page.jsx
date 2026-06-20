'use client';

import React from 'react';
import { useAdminDashboard } from '../layout';
import { Trash2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function AdminUsersPage() {
    
    // Getting user data from session
    const { data: session } = authClient.useSession();
    const user = session?.user;
    // console.log(user);

    const context = useAdminDashboard();
    const userList = context?.userList || [];
    const handleUpdateRole = context?.handleUpdateRole || (() => { });
    const handleDeleteUser = context?.handleDeleteUser || (() => { });

    return (
        <div className="space-y-6 text-left">
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-sans">Registered Platform Users</h3>
                <p className="text-xs text-zinc-500 font-sans">Examine registered accounts, alter application roles, or detach redundant identities.</p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950">
                <table className="w-full text-left border-collapse min-w-[600px] text-xs">
                    <thead>
                        <tr className="border-b border-zinc-900 text-zinc-500 font-mono uppercase text-[9.5px] tracking-wider">
                            <th className="p-4">Visual Avatar</th>
                            <th className="p-4">Subscriber Name</th>
                            <th className="p-4">Email Coordinates</th>
                            <th className="p-4">Assigned Role</th>
                            <th className="p-4">Alternate Role</th>
                            <th className="p-4 text-right">Delete Account</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                        {userList.map((item) => (
                            <tr key={item.id} className="hover:bg-zinc-900/30 text-zinc-300">
                                <td className="p-4">
                                    <img src={item.image} alt={item.name} className="h-8 w-8 rounded-full object-cover border border-zinc-800" />
                                </td>
                                <td className="p-4 font-bold text-white">{item.name}</td>
                                <td className="p-4 font-mono text-zinc-400">{item.email}</td>
                                <td className="p-4">
                                    <span className={`inline-flex rounded-full text-[9.5px] font-mono uppercase font-bold px-2 py-0.5 border ${item.role === 'admin'
                                            ? 'bg-rose-950/40 text-rose-400 border-rose-500/20'
                                            : item.role === 'writer'
                                                ? 'bg-cyan-950/40 text-cyan-400 border-cyan-500/20'
                                                : 'bg-amber-950/40 text-amber-400 border-amber-500/20'
                                        }`}>
                                        {item.role}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {item.id !== user?.id ? (
                                        <select
                                            value={item.role}
                                            onChange={(e) => handleUpdateRole(item.id, e.target.value)}
                                            className="bg-zinc-900 border border-zinc-800 text-[11px] rounded px-2 py-1 text-zinc-300 focus:outline-none focus:border-amber-500"
                                        >
                                            <option value="user">Reader (user)</option>
                                            <option value="writer">Author (writer)</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    ) : (
                                        <span className="text-[10px] text-zinc-500 font-mono">Self-Owner</span>
                                    )}
                                </td>
                                <td className="p-4 text-right">
                                    {item.id !== user?.id ? (
                                        <button
                                            onClick={() => handleDeleteUser(item.id)}
                                            className="p-1.5 rounded-lg border border-zinc-850 hover:bg-rose-950/20 hover:text-rose-500 hover:border-rose-500/30 transition text-zinc-500"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    ) : (
                                        <span className="text-[10px] text-zinc-500 font-mono">Protected</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
