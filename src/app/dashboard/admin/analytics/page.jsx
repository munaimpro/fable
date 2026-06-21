'use client';

import React from 'react';
import { useAdminDashboard } from '../layout';
import { LineChart, PieChart } from 'lucide-react';

const AdminAnalyticsPage = () => {
    const context = useAdminDashboard();
    const analytics = context?.analytics || null;

    const activeMetrics = analytics?.metrics || { totalUsers: 0, totalWriters: 0, totalEbooksSold: 0, totalRevenue: 0 };
    const genreData = analytics?.genreData || [
        { genre: 'Mystery', count: 0 }, { genre: 'Sci-Fi', count: 0 }, { genre: 'Romance', count: 0 },
        { genre: 'Fantasy', count: 0 }, { genre: 'Horror', count: 0 }, { genre: 'Fiction', count: 0 }
    ];

    return (
        <div className="space-y-8 text-left">
            {/* Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Registered Users', value: activeMetrics.totalUsers, color: 'text-amber-500' },
                    { label: 'Total Writers', value: activeMetrics.totalWriters, color: 'text-cyan-500' },
                    { label: 'Copies Sold', value: activeMetrics.totalEbooksSold, color: 'text-emerald-500' },
                    { label: 'Gross Profits', value: `$${activeMetrics.totalRevenue}`, color: 'text-rose-500', isMono: true },
                ].map((metric, idx) => (
                    <div key={idx} className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 space-y-2">
                        <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase scale-90 origin-left">{metric.label}</p>
                        <h4 className={`text-xl sm:text-2xl font-black ${metric.color} ${metric.isMono ? 'font-mono' : ''}`}>
                            {metric.value}
                        </h4>
                    </div>
                ))}
            </div>

            {/* Interactive SVG Charts segment - 2 Side by Side columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* CHART 1: Monthly sales line chart mock */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 sm:p-6 space-y-4">
                    <div className="flex items-center gap-2 text-left">
                        <LineChart className="w-5 h-5 text-amber-500" />
                        <div>
                            <h4 className="text-sm font-bold text-white">Monthly Platform Sales</h4>
                            <p className="text-[10px] text-zinc-500 font-sans">Accumulated sales in USD across the past 7 calendar months.</p>
                        </div>
                    </div>

                    {/* SVG GRAPH PLOTTER (Raw responsive math representation) */}
                    <div className="relative h-44 w-full pt-4">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120">
                            {/* Grids */}
                            <line x1="20" y1="10" x2="280" y2="10" stroke="#1d1d20" strokeDasharray="3" />
                            <line x1="20" y1="50" x2="280" y2="50" stroke="#1d1d20" strokeDasharray="3" />
                            <line x1="20" y1="90" x2="280" y2="90" stroke="#1d1d20" />

                            {/* Labels */}
                            <text x="5" y="14" fill="#52525b" fontSize="8" fontFamily="monospace">$40</text>
                            <text x="5" y="54" fill="#52525b" fontSize="8" fontFamily="monospace">$20</text>
                            <text x="5" y="94" fill="#52525b" fontSize="8" fontFamily="monospace">$0</text>

                            {/* Area Gradient Glowing */}
                            <path
                                d="M20,90 L60,90 L100,90 L140,82 L180,90 L220,62 L260,35 L260,90 Z"
                                fill="url(#grad)"
                                opacity="0.15"
                            />

                            <defs>
                                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#f59e0b" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>

                            {/* Path Line */}
                            <path
                                d="M20,90 L60,90 L100,90 L140,82 L180,90 L220,62 L260,35"
                                fill="none"
                                stroke="#f59e0b"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />

                            {/* Active Anchor nodes circles */}
                            <circle cx="20" cy="90" r="3.5" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
                            <circle cx="60" cy="90" r="3.5" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
                            <circle cx="100" cy="90" r="3.5" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
                            <circle cx="140" cy="82" r="3.5" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
                            <circle cx="180" cy="90" r="3.5" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
                            <circle cx="220" cy="62" r="3.5" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
                            <circle cx="260" cy="35" r="4.5" fill="#f59e0b" />

                            {/* Month Axis bottom tags */}
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m, index) => (
                                <text key={index} x={20 + index * 40} y="110" fill="#71717a" fontSize="8" textAnchor="middle" fontFamily="monospace">
                                    {m}
                                </text>
                            ))}
                        </svg>
                    </div>
                </div>

                {/* CHART 2: Genre distribution horizontal bars donut */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 sm:p-6 space-y-4">
                    <div className="flex items-center gap-2 text-left">
                        <PieChart className="w-5 h-5 text-amber-500" />
                        <div>
                            <h4 className="text-sm font-bold text-white">Genre Breakdown Metrics</h4>
                            <p className="text-[10px] text-zinc-500 font-sans">Number of listed manuscripts cataloged per literary sub-genre.</p>
                        </div>
                    </div>

                    {/* Horizontal grid rows bar mapping */}
                    <div className="space-y-3 pt-2 text-left">
                        {genreData.map((g, idx) => {
                            const totalUnits = genreData.reduce((sum, entry) => sum + entry.count, 0) || 1;
                            const pct = Math.round((g.count / totalUnits) * 100);
                            return (
                                <div key={idx} className="space-y-1 text-xs">
                                    <div className="flex justify-between items-center text-zinc-400">
                                        <span className="font-semibold text-zinc-300">{g.genre}</span>
                                        <span className="font-mono text-zinc-500 font-normal">
                                            {g.count} Book ({pct}%)
                                        </span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-zinc-900 overflow-hidden">
                                        <div
                                            style={{ width: `${pct}%` }}
                                            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminAnalyticsPage;
