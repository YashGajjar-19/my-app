import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Clock, DollarSign, Zap, Crown, Shield, Quote, Star } from 'lucide-react';

export default function ProfilePage({ member, onBack }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!member) return null;

    const isFounder = member.id === 1 || member.id === 2;

    const getTheme = (id) => {
        switch(id) {
            case 1: // Yash (Founder)
            case 2: // Bhavy (Co-Founder)
                return {
                    bg: "from-violet-950 via-purple-900 to-slate-50",
                    blob1: "bg-purple-600",
                    blob2: "bg-fuchsia-600"
                };
            case 3: // Drashti (HR)
                return {
                    bg: "from-slate-900 via-indigo-900 to-slate-50",
                    blob1: "bg-indigo-600",
                    blob2: "bg-blue-600"
                };
            case 4: // Preet (Security)
            case 7: // Riddhi (Security)
                 return {
                    bg: "from-neutral-950 via-red-950 to-slate-50",
                    blob1: "bg-red-700",
                    blob2: "bg-rose-900"
                };
            case 5: // Dhruvi (Creative)
                return {
                    bg: "from-fuchsia-950 via-pink-900 to-slate-50",
                    blob1: "bg-pink-600",
                    blob2: "bg-rose-600"
                };
            case 6: // Vaishali (Finance)
                return {
                    bg: "from-emerald-950 via-teal-900 to-slate-50",
                    blob1: "bg-emerald-600",
                    blob2: "bg-teal-600"
                };
            case 8: // Yashvi (Chaos)
                return {
                    bg: "from-orange-950 via-amber-900 to-slate-50",
                    blob1: "bg-orange-600",
                    blob2: "bg-amber-600"
                };
            default:
                return {
                    bg: "from-slate-900 via-slate-800 to-slate-50",
                    blob1: "bg-slate-600",
                    blob2: "bg-slate-500"
                };
        }
    };

    const theme = getTheme(member.id);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50 }
        }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            variants={containerVariants}
            className="min-h-screen bg-slate-50 font-sans pb-20 relative"
        >
            {/* Hero Header - Restoring previous design style */}
            <div className="h-[50vh] relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-b ${theme.bg}`}></div>
                
                {/* Abstract Shapes */}
                <div className="absolute inset-0 opacity-40">
                     <div className={`absolute top-0 right-0 w-[50vw] h-[50vw] ${theme.blob1} rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 mix-blend-overlay`}></div>
                     <div className={`absolute bottom-0 left-0 w-[40vw] h-[40vw] ${theme.blob2} rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 mix-blend-overlay`}></div>
                </div>
                
                {/* Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            </div>

            {/* Top Navigation */}
            <div className="fixed top-0 left-0 right-0 p-6 z-50 pointer-events-none">
                <motion.button 
                    onClick={onBack}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="pointer-events-auto bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-full shadow-lg hover:bg-white/20 transition-all flex items-center justify-center group"
                >
                    <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </motion.button>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    
                    {/* --- LEFT COLUMN: PROFILE CARD --- */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32">
                        <motion.div 
                            variants={itemVariants}
                            className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-black/10 border border-white/50 relative overflow-hidden"
                        >
                            {/* Card Header Background */}
                            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-br from-slate-100 to-slate-200"></div>
                            
                            {/* Profile Picture */}
                            <div className="relative z-10 mx-auto w-48 h-48 mb-6">
                                <div className="absolute inset-0 bg-white rounded-3xl rotate-6 opacity-40 scale-105 shadow-sm"></div>
                                <div className="absolute inset-0 bg-white rounded-3xl -rotate-3 opacity-40 scale-105 shadow-sm"></div>
                                <img 
                                    src={member.image} 
                                    alt={member.name}
                                    className="relative w-full h-full object-cover object-top rounded-3xl shadow-xl ring-4 ring-white bg-white"
                                />
                                {isFounder && (
                                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-300 to-amber-500 text-amber-950 p-3 rounded-2xl shadow-lg border-2 border-white">
                                        <Crown size={20} fill="currentColor" />
                                    </div>
                                )}
                            </div>

                            {/* Identity */}
                            <div className="text-center relative z-10 mb-8">
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{member.name}</h1>
                                
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100 mb-4">
                                    <span className="text-xs font-bold uppercase tracking-widest">{member.details?.post || member.role}</span>
                                </div>

                                {/* Clearance Level */}
                                <div className="flex items-center justify-center gap-2 text-slate-500 text-sm font-medium border-t border-slate-100 pt-4 mt-2">
                                    <Shield size={16} className="text-slate-400" />
                                    <span className="uppercase tracking-wider text-[10px] font-bold">Clearance Level</span>
                                    <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-xs">
                                        {isFounder ? 'OMEGA-1' : 'ALPHA-7'}
                                    </span>
                                </div>
                            </div>

                            {/* Qualities / Departments */}
                            <div className="border-t border-slate-100 pt-6">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Core Qualities</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {member.details?.departments.map(dept => (
                                        <span key={dept} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-600">
                                            {dept}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* --- RIGHT COLUMN: DETAILS & INTELLIGENCE --- */}
                    <div className="lg:col-span-8 space-y-6">
                        
                        {/* 1. Vital Statistics Box */}
                        <motion.div 
                            variants={itemVariants}
                            className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100"
                        >
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                                Personnel Vitals
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <StatBox 
                                    icon={<Clock size={20} className="text-blue-500" />} 
                                    label="Age" 
                                    value={`${member.details?.age} Years`} 
                                />
                                <StatBox 
                                    icon={<Calendar size={20} className="text-purple-500" />} 
                                    label="Birth Date" 
                                    value={member.details?.dob} 
                                />
                                <StatBox 
                                    icon={<MapPin size={20} className="text-emerald-500" />} 
                                    label="Base of Operations" 
                                    value={member.details?.place} 
                                />
                            </div>
                        </motion.div>

                        {/* 2. Salary Card */}
                        <motion.div 
                            variants={itemVariants}
                            className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2rem] p-8 shadow-2xl shadow-slate-900/10 text-white relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <DollarSign size={180} />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-2 opacity-80">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        <DollarSign size={20} />
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-widest">Compensation Package</span>
                                </div>
                                <div className="text-3xl md:text-5xl font-black tracking-tight mb-2">
                                    {member.details?.salary}
                                </div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold ring-1 ring-emerald-500/50">
                                    Verified Transaction
                                </div>
                            </div>
                        </motion.div>

                        {/* 3. Active Powers (Tasks) */}
                        <motion.div 
                            variants={itemVariants}
                            className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100"
                        >
                             <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                                Active Powers & Abilities
                            </h2>
                            
                            <div className="grid sm:grid-cols-2 gap-4">
                                {member.details?.tasks.map((task, i) => (
                                    <div key={i} className="group p-5 bg-slate-50 hover:bg-white border border-slate-100 hover:border-purple-200 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 flex items-start gap-4">
                                        <div className="shrink-0 p-3 bg-white rounded-xl shadow-sm group-hover:bg-purple-500 group-hover:text-white transition-colors text-purple-600">
                                            <Zap size={20} fill="currentColor" className="opacity-0 group-hover:opacity-100 absolute transition-opacity" />
                                            <Star size={20} className="group-hover:opacity-0 transition-opacity" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">Ability #{i + 1}</h4>
                                            <p className="text-sm text-slate-500 font-medium leading-relaxed group-hover:text-slate-700">{task}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* 4. Description */}
                        <motion.div 
                            variants={itemVariants}
                            className="bg-indigo-50 rounded-[2rem] p-8 border border-indigo-100 relative"
                        >
                            <Quote size={40} className="text-indigo-200 absolute top-8 left-8" />
                            <div className="relative z-10 pl-12">
                                <h3 className="text-lg font-bold text-indigo-900 mb-2">Psychological Profile</h3>
                                <p className="text-lg text-indigo-800/80 font-medium leading-relaxed italic">
                                    "{member.description}"
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </motion.div>
    );
}

const StatBox = ({ icon, label, value }) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
        <div className="p-3 bg-slate-50 rounded-xl shrink-0 border border-slate-100">
            {icon}
        </div>
        <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
            <p className="text-lg font-bold text-slate-900 leading-tight">{value}</p>
        </div>
    </div>
);
