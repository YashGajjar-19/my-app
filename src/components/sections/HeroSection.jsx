import React from 'react';
import { motion } from 'framer-motion';
import { companyDetails } from '../../data';
import { ArrowRight, Sparkles, Wand2 } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px] animate-pulse mix-blend-multiply"></div>
                <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-fuchsia-200/40 rounded-full blur-[100px] animate-pulse delay-1000 mix-blend-multiply"></div>
                <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-sky-200/40 rounded-full blur-[100px] mix-blend-multiply"></div>
            </div>

            <div className="max-w-6xl mx-auto text-center space-y-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                    <div className="bg-gradient-to-tr from-yellow-400 to-orange-400 p-1 rounded-full text-white shadow-sm">
                        <Sparkles size={12} fill="currentColor" />
                    </div>
                    <span className="text-sm font-bold text-slate-800 tracking-wide uppercase">Official Portal V2.0</span>
                </motion.div>

                <div className="space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.9]"
                    >
                        {companyDetails.name.split(" ")[0]}
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 pb-4">
                            International
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                        className="text-2xl md:text-3xl text-slate-500 max-w-4xl mx-auto font-light leading-relaxed tracking-tight"
                    >
                        {companyDetails.description}
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8"
                >
                    <button className="px-10 py-5 rounded-full bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all hover:scale-105 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.5)] flex items-center gap-3 group">
                        <span>Join the Madness</span>
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-10 py-5 rounded-full bg-white text-slate-900 border border-slate-200 font-bold text-lg hover:bg-slate-50 transition-all hover:scale-105 shadow-xl shadow-slate-200/50 flex items-center gap-3">
                        <Wand2 size={20} className="text-purple-500" />
                        <span>Read Manifesto</span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
