import React from 'react';
import { motion } from 'framer-motion';
import { rules, companyDetails } from '../../data';
import { ScrollText, Gavel, Target, Zap, Quote } from 'lucide-react';

export default function AboutSection() {
    return (
        <section className="py-32 px-6 relative bg-slate-50 overflow-hidden">
            {/* Soft Background Blob */}
            <div className="absolute -left-20 top-1/4 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px] -z-10 mix-blend-multiply"></div>
            <div className="absolute -right-20 bottom-1/4 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[120px] -z-10 mix-blend-multiply"></div>
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                {/* Left: Company Info Staggered Layout */}
                <div className="space-y-12 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-widest border border-purple-100 shadow-sm">
                            <ScrollText size={14} />
                            Manifesto
                        </div>
                        
                        <h2 className="text-5xl md:text-6xl font-bold font-display tracking-tight text-slate-900 leading-[1.1]">
                            We aren't just a company. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-purple-600">We are a glitch.</span>
                        </h2>

                        <div className="prose prose-lg text-slate-600 leading-relaxed font-medium">
                            <p>
                                Founded in {companyDetails.founded}, we emerged as a counter-movement to corporate boredom.
                                While others hold meetings, we hold breath-holding contests. 
                            </p>
                            <p className="not-italic font-semibold text-slate-900 border-l-4 border-fuchsia-500 pl-6 py-2 bg-fuchsia-50/50 rounded-r-lg">
                                "{companyDetails.mission}"
                            </p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-[2rem] bg-white border border-purple-100 shadow-xl shadow-purple-500/5 transition-all hover:shadow-2xl hover:shadow-purple-500/10 group"
                        >
                            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Target size={28} />
                            </div>
                            <h3 className="text-xl font-bold font-display text-slate-900 mb-3">Vision</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">{companyDetails.vision}</p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-[2rem] bg-slate-900 text-white shadow-2xl transition-all sm:translate-y-12 hover:shadow-slate-900/50 group"
                        >
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Zap size={28} />
                            </div>
                            <h3 className="text-xl font-bold font-display mb-3">Core Value</h3>
                            <p className="text-slate-300 leading-relaxed font-medium">Pranks & Profits. <br/>Always in that order.</p>
                        </motion.div>
                    </div>
                </div>

                {/* Right: Rules List */}
                <div className="relative">
                    <div className="absolute -right-20 top-20 w-80 h-80 bg-fuchsia-100/50 rounded-full blur-3xl -z-10"></div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-8 pl-0 lg:pl-10"
                    >
                         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest border border-slate-200">
                            <Gavel size={14} />
                            Protocol
                        </div>
                        <h2 className="text-4xl font-bold font-display tracking-tight text-slate-900">Rules of Engagement</h2>

                        <div className="space-y-4">
                            {rules.map((rule, idx) => (
                                <motion.div
                                    key={rule.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    className="group flex gap-6 p-6 rounded-3xl bg-white border border-slate-100 hover:border-purple-200 transition-all hover:shadow-xl hover:shadow-purple-500/5 items-start"
                                >
                                    <span className="text-4xl font-black text-slate-100 group-hover:text-purple-100 transition-colors font-display leading-none mt-1">
                                        0{idx + 1}
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors mb-2">
                                            {rule.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed font-medium">{rule.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
