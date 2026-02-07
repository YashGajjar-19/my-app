import React from 'react';
import { motion } from 'framer-motion';
import { members } from '../../data';
import { Crown, Sparkles } from 'lucide-react';

export default function TeamSection({ onMemberClick }) {
    
    return (
        <section className="py-32 px-6 relative overflow-hidden bg-slate-50">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px]"></div>
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-sm font-bold uppercase tracking-wide border border-purple-100 mb-4 shadow-sm"
                    >
                        <Crown size={14} />
                        The Legends
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-bold font-display text-slate-900 tracking-tight leading-none">The Crew.</h2>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                        Brilliant minds. Questionable choices. Unstoppable together.
                    </p>
                </div>

                {/* Team Grid - Uniform & Minimal */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {members.map((member, idx) => (
                        <motion.div
                            key={member.id}
                            layoutId={`card-${member.id}`}
                            onClick={() => onMemberClick(member)}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
                        >
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                            {/* Avatar */}
                            <div className="relative mb-6">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-slate-50 shadow-inner group-hover:scale-105 transition-transform duration-500">
                                    <motion.img
                                        layoutId={`image-${member.id}`}
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {['Founder', 'Co-Founder'].includes(member.role) && (
                                     <div className="absolute -top-2 -right-2 bg-amber-400 text-white p-1 rounded-full shadow-md border-2 border-white">
                                        <Crown size={12} fill="currentColor" />
                                    </div>
                                )}
                            </div>

                            {/* Text Content */}
                            <div className="relative z-10 w-full flex-1 flex flex-col">
                                <motion.h3 layoutId={`name-${member.id}`} className="text-xl font-bold font-display text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                                    {member.name}
                                </motion.h3>
                                
                                <motion.div layoutId={`role-${member.id}`} className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-4 border-b border-slate-100">
                                    {member.role}
                                </motion.div>

                                <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2 mb-4">
                                    {member.description}
                                </p>
                                
                                <div className="mt-auto">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                        <Sparkles size={10} />
                                        {member.title}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
