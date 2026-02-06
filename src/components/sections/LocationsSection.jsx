import React from 'react';
import { motion } from 'framer-motion';
import { hqs, locationStats, earthCities } from '../../data';
import { MapPin, Rocket, Building2, Shield, Wallet, Zap, Globe } from 'lucide-react';

const InfiniteMarquee = ({ items, direction = "left" }) => {
    return (
        <div className="relative flex overflow-hidden py-10 bg-slate-50/50 border-y border-slate-100 group">
             <div className="flex gap-12 animate-marquee whitespace-nowrap px-12 group-hover:[animation-play-state:paused]">
                {[...items, ...items].map((city, idx) => (
                    <span key={idx} className="text-2xl font-black text-slate-300 uppercase tracking-tight hover:text-purple-500 transition-colors cursor-default">
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
        <section className="py-32 relative overflow-hidden">
             {/* Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-white/50"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 mb-20">
                <div className="text-center mb-20 max-w-4xl mx-auto space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wide border border-blue-100"
                    >
                        <Globe size={14} />
                        Worldwide & Beyond
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-none">
                        Our Empire
                    </h2>
                    <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
                        Spanning {locationStats.totalEarthLocations} Earth cities and {locationStats.galacticOutposts} galactic outposts. 
                        We are everywhere (literally).
                    </p>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                    <StatBox icon={<Zap size={20} />} label="Operations" value={locationStats.management.operations} color="text-yellow-600" bg="bg-yellow-50" />
                    <StatBox icon={<Wallet size={20} />} label="Finance" value={locationStats.management.finance} color="text-green-600" bg="bg-green-50" />
                    <StatBox icon={<Shield size={20} />} label="Security" value={locationStats.management.security} color="text-red-600" bg="bg-red-50" />
                    <StatBox icon={<Rocket size={20} />} label="R&D" value={locationStats.management.independent} color="text-purple-600" bg="bg-purple-50" />
                </div>

                {/* Main HQs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hqs.map((hq, idx) => (
                        <motion.div
                            key={hq.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[2rem] p-3 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full"
                        >
                            <div className="h-48 w-full rounded-[1.5rem] bg-slate-100 mb-4 relative overflow-hidden shrink-0">
                                {/* Planet-Specific Background */}
                                <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-110 opacity-20
                                    ${hq.planet === 'Earth' ? 'bg-gradient-to-br from-blue-400 to-cyan-300' 
                                    : hq.planet === 'Mars' ? 'bg-gradient-to-br from-red-500 to-orange-500'
                                    : hq.planet === 'Unknown' ? 'bg-gradient-to-br from-slate-800 to-black'
                                    : 'bg-gradient-to-br from-purple-500 to-indigo-500'}`}
                                ></div>

                                {/* Icon Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white p-4 rounded-2xl shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-300">
                                        {hq.planet === 'Earth' ? <Building2 size={32} className="text-slate-700" /> : <Rocket size={32} className="text-purple-600" />}
                                    </div>
                                </div>
                                
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-500 shadow-sm">
                                    {hq.planet}
                                </div>
                            </div>

                            <div className="px-5 pb-5 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-slate-900 mb-1">{hq.name}</h3>
                                <div className="flex items-start gap-2 text-slate-500 text-sm mb-4 min-h-[40px]">
                                    <MapPin size={14} className="mt-1 shrink-0 text-purple-400" />
                                    <span>{hq.location}</span>
                                </div>

                                {hq.managedBy && (
                                    <div className="mt-auto pt-4 border-t border-slate-50">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Managed By</p>
                                        <p className="text-sm font-bold text-slate-700">{hq.managedBy}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Infinite Marquee of Cities */}
            <div className="space-y-4">
                 <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Global Presence • 100+ Locations</p>
                 <InfiniteMarquee items={earthCities} />
            </div>
        </section>
    );
}

const StatBox = ({ icon, label, value, color, bg }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-3">
        <div className={`p-3 rounded-2xl ${bg} ${color}`}>{icon}</div>
        <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</div>
            <div className="font-bold text-slate-900 text-sm md:text-base">{value}</div>
        </div>
    </div>
);
