import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 py-12 px-6 mt-auto">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-12 h-12">
                                <img src="/logo.png" alt="CardioFlux Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-xl font-bold text-slate-900">Heart Risk Predictor</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed mb-8">
                            Pioneering the future of cardiovascular diagnostics through AI and data science.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><Link href="/" className="hover:text-blue-600 transition">Home</Link></li>
                            <li><Link href="/predict" className="hover:text-blue-600 transition">Prediction</Link></li>
                            <li><Link href="/insights" className="hover:text-blue-600 transition">Model Insights</Link></li>
                            <li><Link href="/algorithm" className="hover:text-blue-600 transition">Algorithm</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Info</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>
                                <a
                                    href=""
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-600 transition flex items-center gap-2"
                                >
                                    <Github className="w-4 h-4" />
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-600 transition flex items-center gap-2"
                                >
                                    <Linkedin className="w-4 h-4" />
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">© 2026 Heart Risk Predictor. All rights reserved.</p>
                    <p className="text-slate-400 text-xs text-center md:text-right">
                        Disclaimer: This tool assists in risk assessment but does not replace professional medical diagnosis.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
