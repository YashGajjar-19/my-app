import React from 'react';
import { motion } from 'framer-motion';
import { rules, companyDetails } from '../../data';
import { ScrollText, Gavel, Target, Zap, Quote } from 'lucide-react';

export default function AboutSection() {
    return (
        <section className="py-32 px-6 relative bg-white/50 backdrop-blur-3xl overflow-hidden">
            {/* Soft Background Blob */}
            <div className="absolute -left-20 top-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl -z-10"></div>
            
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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-widest border border-purple-100">
                            <ScrollText size={14} />
                            Manifesto
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                            We aren't just a company. <br />
                            <span className="text-fuchsia-600">We are a glitch.</span>
                        </h2>

                        <div className="prose prose-lg text-slate-600 leading-relaxed font-light">
                            <p>
                                Founded in {companyDetails.founded}, we emerged as a counter-movement to corporate boredom.
                                While others hold meetings, we hold breath-holding contests. 
                            </p>
                            <p className="font-medium text-slate-800 border-l-4 border-fuchsia-500 pl-6 italic">
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
                            className="p-8 rounded-[2rem] bg-white border border-purple-100 shadow-[0_10px_30px_-10px_rgba(168,85,247,0.1)] transition-all"
                        >
                            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                                <Target size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Vision</h3>
                            <p className="text-slate-500 leading-relaxed">{companyDetails.vision}</p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-[2rem] bg-slate-900 text-white shadow-xl transition-all sm:translate-y-12"
                        >
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-400 mb-6">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Core Value</h3>
                            <p className="text-slate-300 leading-relaxed">Pranks & Profits. <br/>Always in that order.</p>
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
                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest border border-slate-200">
                            <Gavel size={14} />
                            Protocol
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight text-slate-900">Rules of Engagement</h2>

                        <div className="space-y-4">
                            {rules.map((rule, idx) => (
                                <motion.div
                                    key={rule.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    className="group flex gap-6 p-6 rounded-3xl bg-white border border-slate-100 hover:border-purple-200 transition-all hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"
                                >
                                    <span className="text-4xl font-black text-slate-100 group-hover:text-purple-100 transition-colors font-mono">
                                        0{idx + 1}
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors mb-2">
                                            {rule.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">{rule.description}</p>
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
