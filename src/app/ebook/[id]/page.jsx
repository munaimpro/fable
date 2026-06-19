import EbookDetails from '@/components/ebook-details/EbookDetails';
import React from 'react';

// Main Page is a clean Server Component
export default async function EbookPage({ params }) {
    // Correctly unwrap params on the server side in Next.js 15+
    const resolvedParams = await params;

    return <EbookDetails id={resolvedParams.id} />;
}