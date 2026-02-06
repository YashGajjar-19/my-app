import React from 'react';
import { motion } from 'framer-motion';
import { members } from '../../data';
import { Crown, Shield, Star } from 'lucide-react';

export default function TeamSection() {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-slate-50 opacity-50 -z-10"></div>
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-sm font-bold uppercase tracking-wide border border-purple-100 mb-4"
                    >
                        <Crown size={14} />
                        The Legends
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight">The Culprits</h2>
                    <p className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl mx-auto">
                        A curated collection of brilliant minds and questionable life choices.
                    </p>
                </div>

                {/* 1 (Boss) + 6 (Team) = 7 Members Layout */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
                    
                    {members.map((member, idx) => {
                        const isFounder = member.id === 1 || member.id === 2; // Yash & Bhavy
                        const isHead = member.id === 3 || member.id === 4;    // Drashti & Preet
                        
                        // Grid Spans
                        const gridClass = isFounder 
                            ? "md:col-span-2 md:row-span-2" 
                            : isHead 
                                ? "md:col-span-2" 
                                : "col-span-1";

                        const springTransition = { 
                            type: "spring", 
                            stiffness: 100, 
                            damping: 20, 
                            delay: idx * 0.1 
                        };

                        return (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={springTransition}
                                className={`
                                    ${gridClass}
                                    bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 
                                    relative overflow-hidden group flex flex-col items-center text-center
                                    hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-500
                                    ${isFounder ? 'p-8 md:p-12 justify-center' : isHead ? 'p-8 md:flex-row md:text-left md:items-center md:gap-8' : 'p-6 justify-between'}
                                `}
                            >
                                {/* Background Decor for Founders */}
                                {isFounder && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                )}

                                {/* Crown for Founders */}
                                {isFounder && (
                                    <div className="absolute top-6 right-6 z-10">
                                        <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full shadow-sm">
                                            <Crown size={20} fill="currentColor" />
                                        </div>
                                    </div>
                                )}

                                {/* Avatar */}
                                <div className={`relative z-10 shrink-0 ${isFounder ? 'mb-6 w-40 h-40 md:w-56 md:h-56' : isHead ? 'w-32 h-32 md:w-40 md:h-40 mb-4 md:mb-0' : 'w-24 h-24 mb-4'}`}>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-fuchsia-100 rounded-full blur-2xl opacity-50 scale-90 group-hover:scale-110 transition-transform"></div>
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full rounded-full object-cover shadow-inner bg-white p-1"
                                    />
                                    {isFounder && (
                                         <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap shadow-lg">
                                            {member.id === 1 ? ' The Boss' : 'Co-Founder'}
                                         </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className={`relative z-10 w-full ${isHead ? 'flex-1' : ''}`}>
                                    <h3 className={`font-black text-slate-900 leading-tight ${isFounder ? 'text-3xl md:text-5xl mb-2' : isHead ? 'text-2xl md:text-3xl mb-1' : 'text-lg mb-1'}`}>
                                        {member.name}
                                    </h3>
                                    
                                    <p className={`font-bold uppercase tracking-widest text-purple-600 ${isFounder ? 'text-sm md:text-base mb-6' : isHead ? 'text-xs mb-3' : 'text-[10px] mb-2'}`}>
                                        {member.role}
                                    </p>

                                    <p className={`text-slate-500 font-medium leading-relaxed ${isFounder ? 'text-lg md:text-xl max-w-lg mx-auto' : isHead ? 'text-sm md:text-base' : 'text-xs line-clamp-3'}`}>
                                        "{member.description}"
                                    </p>
                                    
                                    {!isFounder && (
                                        <div className="mt-4 pt-4 border-t border-slate-50 w-full flex justify-center md:justify-start">
                                            <span className="text-[10px] sm:text-xs font-bold bg-slate-50 text-slate-400 px-3 py-1 rounded-full uppercase tracking-wide">
                                                {member.title}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
