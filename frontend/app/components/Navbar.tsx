"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart2, Activity, Search } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 h-20 z-50 transition-all duration-300">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm" />

            <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-12 h-12 group-hover:scale-105 transition-transform duration-300">
                        <img src="/logo.png" alt="Heart Risk Predictor Logo" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                        Heart Risk Predictor
                    </span>
                </Link>

                {/* Right Side Navigation & CTA */}
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-2">
                        <Link
                            href="/insights"
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${pathname === '/insights'
                                ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200'
                                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                                }`}
                        >
                            <BarChart2 className="w-4 h-4" />
                            Data Insights
                        </Link>
                        <Link
                            href="/algorithm"
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${pathname === '/algorithm'
                                ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200'
                                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                                }`}
                        >
                            <Activity className="w-4 h-4" />
                            Algorithm
                        </Link>
                    </div>

                    <Link
                        href="/predict"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-full hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-600/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <Search className="w-4 h-4" />
                        Prediction
                    </Link>
                </div>
            </div>
        </nav>
    );
}
