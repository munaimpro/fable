'use client';

import { authClient } from '@/lib/auth-client';
import React from 'react';

export default function ProfilePage() {
    
    // Getting user data from session
    const { data: session } = authClient.useSession();
    const user = session?.user;
    // console.log(user);

    return (
        <div className="space-y-6 max-w-xl text-left">
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-sans">Reader Account Profile</h3>
                <p className="text-xs text-zinc-500 font-sans">View your registered parameters inside Fable common commons.</p>
            </div>

            <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Full Name</p>
                        <p className="text-sm font-bold text-zinc-200">{user?.name}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Email Address</p>
                        <p className="text-sm font-bold text-zinc-200">{user?.email}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Assigned Role</p>
                        <span className="inline-flex rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-mono uppercase font-bold px-2 py-0.5 border border-amber-500/20">{user?.role}</span>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">User ID</p>
                        <p className="text-sm font-mono text-zinc-400 truncate">{user?.id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
