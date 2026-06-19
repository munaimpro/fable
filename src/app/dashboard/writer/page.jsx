'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function WriterDashboardHome() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/dashboard/writer/manage');
    }, [router]);

    return (
        <div className="flex items-center justify-center p-12">
            <div className="h-5 w-5 animate-spin rounded-full border-t border-r border-amber-500 border-solid" />
        </div>
    );
}
