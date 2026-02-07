import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Lock, User, ChevronLeft } from 'lucide-react';

export default function LoginPage({ onLogin, onBack, members }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setPassword('');
        setError('');
    };

    const handleBackToGrid = () => {
        setSelectedUser(null);
        setError('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay for premium feel
        setTimeout(() => {
            if (selectedUser.password === password) {
                onLogin(selectedUser);
            } else {
                setError('Access Denied: Invalid Credentials');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 lg:p-8 font-sans relative">
            
            {/* Back Button */}
            <button 
                onClick={onBack}
                className="absolute top-8 left-8 z-50 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold uppercase tracking-widest text-xs"
            >
                <ArrowLeft size={16} />
                Back to Universe
            </button>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px] border border-slate-100"
            >
                {/* --- Left Column: Branding --- */}
                <div className="lg:w-5/12 relative overflow-hidden bg-slate-900 text-white p-12 lg:p-16 flex flex-col justify-between">
                    <div className="absolute inset-0 z-0">
                         <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-slate-900 to-slate-900 opacity-70 animate-pulse-slow"></div>
                         <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10">
                         <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 flex items-center justify-center p-0.5 shadow-lg mb-8">
                            <div className="bg-slate-900 w-full h-full rounded-[10px] flex items-center justify-center">
                                <span className="font-bold text-lg">B</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight leading-tight mb-6">
                            Secure <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">Access Point.</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                            Identify yourself to access the command center. Security protocols are active.
                        </p>
                    </div>

                    <div className="relative z-10 text-xs font-bold uppercase tracking-widest text-slate-600">
                        System v2.4.0
                    </div>
                </div>

                {/* --- Right Column: Interaction Area --- */}
                <div className="lg:w-7/12 p-12 lg:p-20 bg-white relative flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <AnimatePresence mode="wait">
                            {!selectedUser ? (
                                <motion.div
                                    key="user-grid"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className="text-2xl font-bold text-slate-900 mb-8 font-display">Select Identity</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {members.map((member) => (
                                            <button
                                                key={member.id}
                                                onClick={() => handleUserSelect(member)}
                                                className="group flex flex-col items-center p-6 rounded-2xl border border-slate-100 hover:border-indigo-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
                                            >
                                                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-2 ring-white shadow-sm group-hover:scale-110 transition-transform">
                                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                                </div>
                                                <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{member.name}</span>
                                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">{member.role}</span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="password-form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <button 
                                        onClick={handleBackToGrid}
                                        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 text-sm font-bold uppercase tracking-wide mb-8 transition-colors"
                                    >
                                        <ChevronLeft size={16} />
                                        Change User
                                    </button>

                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-slate-50 shadow-lg">
                                            <img src={selectedUser.image} alt={selectedUser.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold font-display text-slate-900">{selectedUser.name}</h2>
                                            <p className="font-bold text-indigo-500 uppercase tracking-widest text-xs mt-1">{selectedUser.role}</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Passcode</label>
                                            <div className="relative group">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                                <input 
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-lg font-bold rounded-xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-300 hover:border-slate-300"
                                                    placeholder="••••••••"
                                                    autoFocus
                                                />
                                            </div>
                                        </div>

                                        {error && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl flex items-center gap-3"
                                            >
                                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                                {error}
                                            </motion.div>
                                        )}

                                        <button 
                                            type="submit" 
                                            disabled={isLoading}
                                            className="w-full py-4 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                                        >
                                            {isLoading ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <span>Unlock Dashboard</span>
                                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
