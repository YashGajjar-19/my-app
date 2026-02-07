import React from 'react';
import { motion } from 'framer-motion';
import { hqs, earthCities } from '../../data';
import { MapPin, Globe, ArrowUpRight } from 'lucide-react';

const InfiniteMarquee = ({ items }) => {
    return (
        <div className="relative flex overflow-hidden py-6 border-y border-slate-100 bg-white/50 backdrop-blur-sm">
             <div className="flex gap-16 animate-marquee whitespace-nowrap px-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
                {[...items, ...items].map((city, idx) => (
                    <span key={idx} className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
                        {city}
                    </span>
                ))}
            </div>
             <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-transparent to-slate-50 pointer-events-none"></div>
        </div>
    );
};

export default function LocationsSection() {
    return (
        <section className="py-32 relative overflow-hidden bg-slate-50">
             {/* Subtle Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:64px_64px]"></div>
            
            <div className="max-w-5xl mx-auto px-6 relative z-10 mb-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-slate-200 pb-12">
                    <div className="max-w-xl space-y-4">
                        <motion.div
                             initial={{ opacity: 0, x: -20 }}
                             whileInView={{ opacity: 1, x: 0 }}
                             className="inline-flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-widest text-xs"
                        >
                            <Globe size={14} />
                            Global Operations
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-bold font-display text-slate-900 tracking-tight leading-[1.1]">
                            The Known Universe.
                        </h2>
                    </div>
                    <p className="text-slate-500 font-medium max-w-xs text-sm leading-relaxed mb-2">
                        Strategic outposts positioned for maximum impact and minimal oversight across the galaxy.
                    </p>
                </div>

                {/* Minimal HQ List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                    {hqs.map((hq, idx) => (
                        <motion.div
                            key={hq.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group"
                        >
                            <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 bg-slate-100">
                                <div className={`absolute inset-0 bg-gradient-to-br opacity-80 transition-all duration-700 group-hover:scale-105
                                    ${hq.planet === 'Earth' ? 'from-slate-200 to-slate-300' 
                                    : hq.planet === 'Mars' ? 'from-orange-100 to-red-100'
                                    : 'from-indigo-100 to-purple-100'}`}
                                ></div>
                                <div className="absolute top-4 left-4">
                                     <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-900">
                                        {hq.planet}
                                     </span>
                                </div>
                                <div className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold font-display text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{hq.name}</h3>
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                        <MapPin size={12} />
                                        <span>{hq.location}</span>
                                    </div>
                                </div>
                                
                                {hq.managedBy && (
                                     <div className="text-right">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lead</div>
                                        <div className="text-sm font-bold text-slate-700">{hq.managedBy}</div>
                                     </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <InfiniteMarquee items={earthCities} />
        </section>
    );
}
