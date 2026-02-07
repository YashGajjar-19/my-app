import React from 'react';
import { motion } from 'framer-motion';
import { companyDetails } from '../../data';
import { ArrowRight, Sparkles, Wand2 } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden bg-slate-50">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
                <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] bg-purple-500 opacity-10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
                >
                    <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-600 tracking-wider uppercase">System Operational</span>
                </motion.div>

                {/* Main Heading */}
                <div className="relative mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-7xl md:text-9xl font-bold font-display text-slate-900 tracking-tight leading-none"
                    >
                        {companyDetails.name.split(" ")[0]}
                    </motion.h1>
                    <motion.h1 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-7xl md:text-9xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 tracking-tight leading-none"
                    >
                        International
                    </motion.h1>
                    
                    {/* Decorative Elements */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                        className="absolute -top-12 -right-12 md:top-0 md:right-20 text-yellow-400"
                    >
                        <Sparkles size={48} className="animate-spin-slow" />
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed mb-12"
                >
                    {companyDetails.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button className="px-8 py-4 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-indigo-600 transition-all hover:scale-105 shadow-xl shadow-indigo-500/20 flex items-center gap-2 group">
                        <span>Join the Crew</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 rounded-full bg-white text-slate-700 border border-slate-200 font-bold text-lg hover:bg-slate-50 transition-all hover:border-slate-300 flex items-center gap-2">
                        <Wand2 size={20} className="text-purple-500" />
                        <span>Our Manifesto</span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
