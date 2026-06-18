'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
    {
        title: "Discover original ebooks crafted by visionary voices.",
        subtitle: "Join Fable to gain uninhibited access to digital collectibles, read immersive series, and follow independent writers directly.",
        tag: "FEATURED WORKSPACE INDIES",
        image: "https://picsum.photos/seed/curated/1200/500",
        cta: "Explore Library",
        link: "/browse"
    },
    {
        title: "Empowering emerging writers globally.",
        subtitle: "Create, distribute, and collect fair-split royalties. Writers upload secure copies upon completing a simple verified authentication.",
        tag: "THE WRITER ECOSYSTEM",
        image: "https://picsum.photos/seed/creators/1200/500",
        cta: "Join as Writer",
        link: "/register"
    },
    {
        title: "Collect and read unique digital literature.",
        subtitle: "Unlocking books directly updates your persistent library. Secured through digital transactions and accessible from any client device.",
        tag: "AUTHENTIC DIGITAL EDITIONS",
        image: "https://picsum.photos/seed/editions/1200/500",
        cta: "Browse Genres",
        link: "/browse"
    }
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % SLIDES.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    const handleNextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % SLIDES.length);
    };

    const handlePrevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
    };

    return (
        <section className="relative w-full overflow-hidden bg-zinc-950 py-4" id="home-hero">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative h-[480px] w-full rounded-2xl overflow-hidden border border-zinc-900 group">
                    <AnimatePresence mode="wait">
                        {SLIDES.map((slide, idx) => {
                            if (idx !== currentSlide) return null;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 1.02 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 md:p-16 h-full w-full"
                                >
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={slide.image}
                                            alt="Hero scene"
                                            className="h-full w-full object-cover opacity-25 filter brightness-75 scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-900/10 z-10" />
                                    </div>

                                    <div className="relative z-20 max-w-3xl space-y-4">
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1, duration: 0.4 }}
                                            className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-mono font-semibold tracking-widest text-amber-500 uppercase"
                                        >
                                            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                                            {slide.tag}
                                        </motion.div>

                                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.4 }}
                                            className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight"
                                        >
                                            {slide.title}
                                        </motion.h1>

                                        <motion.p
                                            initial={{ opacity: 0, y: 25 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.4 }}
                                            className="text-sm sm:text-base text-zinc-400 max-w-xl font-normal leading-relaxed"
                                        >
                                            {slide.subtitle}
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4, duration: 0.4 }}
                                            className="pt-4 flex gap-4"
                                        >
                                            <Link
                                                href={slide.link}
                                                className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-orange-500/10 hover:opacity-95 transition-opacity"
                                            >
                                                {slide.cta}
                                            </Link>
                                            <Link
                                                href="/browse"
                                                className="rounded-lg bg-zinc-900 border border-zinc-800 px-6 py-3 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-all"
                                            >
                                                Explore Ebooks
                                            </Link>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2">
                        {SLIDES.map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Slide navigation dot ${i + 1}`}
                                onClick={() => setCurrentSlide(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-amber-500' : 'w-2 bg-zinc-700 hover:bg-zinc-600'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handlePrevSlide}
                        aria-label="Previous slide button"
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950/60 border border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white md:opacity-0 md:group-hover:opacity-100 transition duration-300"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleNextSlide}
                        aria-label="Next slide button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950/60 border border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white md:opacity-0 md:group-hover:opacity-100 transition duration-300"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}