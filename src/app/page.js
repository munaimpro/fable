'use client';

import React, { useState, useEffect } from 'react';
import HeroSlider from '@/components/HeroSlider';
import FeaturedBooks from '@/components/FeaturedBooks';
import GenresGrid from '@/components/GenresGrid';
import TopWriters from '@/components/TopWriters';

export default function Home() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured-ebooks`, {
          cache: 'no-store'
        });

        if (response.ok) {
          const data = await response.json();
          setEbooks(data || []);
        }
      } catch (error) {
        console.error('Featured ebooks loading failed:', error);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500/20" id="fable-home">
      {/* Hero Carousel */}
      <HeroSlider />

      {/* Featured Ebooks Catalog */}
      <FeaturedBooks ebooks={ebooks} loading={loading} />

      {/* Ebook Genres Bento Grid */}
      <GenresGrid />

      {/* Top Writers Spotlight */}
      <TopWriters />
    </div>
  );
}