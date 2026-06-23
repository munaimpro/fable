'use client';

import React from 'react';
import { useAdminDashboard } from '../layout';
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const AdminAnalyticsPage = () => {
    const context = useAdminDashboard();
    const analytics = context?.analytics || null;

    if (!analytics) {
        return (
            <div className="flex items-center justify-center h-64">
                Loading analytics...
            </div>
        );
    }

    // Dashboard Metrix
    const activeMetrics = analytics?.metrics || { totalUsers: 0, totalWriters: 0, totalEbooksSold: 0, totalRevenue: 0 };

    // Genre Data
    const genreData = analytics?.genreData || [
        { genre: 'Mystery', count: 0 }, { genre: 'Sci-Fi', count: 0 }, { genre: 'Romance', count: 0 },
        { genre: 'Fantasy', count: 0 }, { genre: 'Horror', count: 0 }, { genre: 'Fiction', count: 0 }
    ];

    // Monthly Sales
    const monthlySales = analytics?.monthlySales || [
        { month: 'Jan', revenue: 0 }, { month: 'Feb', revenue: 0 }, { month: 'Mar', revenue: 0 }, { month: 'Apr', revenue: 0 }, { month: 'May', revenue: 0 }, { month: 'Jun', revenue: 0 }, { month: 'Jul', revenue: 0 }, { month: 'Aug', revenue: 0 }, { month: 'Sep', revenue: 0 }, { month: 'Oct', revenue: 0 }, { month: 'Nov', revenue: 0 }, { month: 'Dec', revenue: 0 }
    ];

    // Pie Chart Colors
    const COLORS = [
        '#f59e0b', // amber
        '#06b6d4', // cyan
        '#10b981', // emerald
        '#8b5cf6', // violet
        '#ef4444', // red
        '#f97316', // orange
        '#ec4899', // pink
        '#84cc16', // lime
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

            
            {/* Pie Chart and Line Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CHART 1: Monthly Sales Line Chart */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 sm:p-6 space-y-4">
                    <div className="flex items-center gap-2 text-left">
                        <div>
                            <h4 className="text-sm font-bold text-white">Monthly Platform Sales</h4>
                            <p className="text-[10px] text-zinc-500 font-sans">Accumulated sales in USD across the past 7 calendar months.</p>
                        </div>
                    </div>

                    <div className="relative h-44 w-full pt-4">
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={monthlySales}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />

                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#f59e0b"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* CHART 2: Genre Distribution Pie Chart */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 sm:p-6 space-y-4">
                    <div className="flex items-center gap-2 text-left">
                        <div>
                            <h4 className="text-sm font-bold text-white">Genre Breakdown Metrics</h4>
                            <p className="text-[10px] text-zinc-500 font-sans">Number of listed manuscripts cataloged per literary sub-genre.</p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={320}>
                        <PieChart>
                            <Pie
                                data={genreData}
                                dataKey="count"
                                nameKey="genre"
                                outerRadius={90}
                            >
                                {genreData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default AdminAnalyticsPage;
