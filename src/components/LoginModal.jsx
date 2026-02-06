import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, ArrowRight, X } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLogin, members }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (!selectedUser) {
            setError("Who are you?");
            return;
        }
        
        // Check password
        if (password !== selectedUser.password) {
            setError("Wrong secret code!");
            return;
        }

        onLogin(selectedUser);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-lg bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(120,50,255,0.3)] border border-white/60 p-8 md:p-10 overflow-hidden ring-1 ring-white/50"
                    >
                         {/* Decorative Background Blurs */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-200/50 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-fuchsia-200/50 rounded-full blur-3xl pointer-events-none"></div>

                        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100/50 transition-colors z-10">
                            <X size={20} className="text-slate-400" />
                        </button>

                        <div className="relative text-center mb-10">
                            <motion.div 
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="w-20 h-20 bg-gradient-to-tr from-purple-100 to-fuchsia-100 rounded-3xl mx-auto flex items-center justify-center mb-6 text-purple-600 shadow-inner"
                            >
                                <Lock size={36} />
                            </motion.div>
                            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Access Control</h2>
                            <p className="text-slate-500 font-medium">Identify yourself to proceed.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-8 relative">
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Select Agent Profile</label>
                                <div className="grid grid-cols-2 gap-3 max-h-56 overflow-y-auto p-1 pr-2 custom-scrollbar">
                                    {members.map(member => (
                                        <motion.div
                                            key={member.id}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => { setSelectedUser(member); setError(''); }}
                                            className={`cursor-pointer group relative p-3 rounded-2xl flex items-center gap-3 transition-all border ${
                                                selectedUser?.id === member.id 
                                                ? 'bg-purple-500 text-white border-purple-500 shadow-lg shadow-purple-500/25' 
                                                : 'bg-white border-slate-100 hover:border-purple-200 hover:shadow-md'
                                            }`}
                                        >
                                            <div className={`p-0.5 rounded-full border-2 ${selectedUser?.id === member.id ? 'border-white/30' : 'border-slate-100'}`}>
                                                <img src={member.image} className="w-8 h-8 rounded-full bg-slate-50" alt="" />
                                            </div>
                                            <div className="min-w-0 text-left">
                                                <div className={`text-sm font-bold truncate ${selectedUser?.id === member.id ? 'text-white' : 'text-slate-700'}`}>
                                                    {member.name.split(' ')[0]}
                                                </div>
                                                <div className={`text-[10px] truncate ${selectedUser?.id === member.id ? 'text-purple-100' : 'text-slate-400'}`}>
                                                    {member.role.split('&')[0]}
                                                </div>
                                            </div>
                                            {selectedUser?.id === member.id && (
                                                <motion.div layoutId="check" className="absolute right-3 text-white">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {selectedUser && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-3 overflow-hidden"
                                    >
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Security Clearance</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="text-purple-400 group-focus-within:text-purple-600 transition-colors" size={20} />
                                            </div>
                                            <input
                                                type="password"
                                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all font-mono text-sm tracking-widest"
                                                placeholder="ENTER PASSCODE"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <p className="text-[10px] text-slate-400 text-center font-medium">
                                            Security Hint: <span className="text-purple-400 bg-purple-50 px-2 py-0.5 rounded-md">{selectedUser.isAdmin ? 'Admin@19' : '123'}</span>
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {error && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-50 text-red-500 text-sm font-bold text-center rounded-xl flex items-center justify-center gap-2">
                                     <X size={16} /> {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={!selectedUser}
                                className={`w-full py-4.5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-xl ${
                                    selectedUser 
                                    ? 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] shadow-slate-900/20' 
                                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                }`}
                            >
                                <span>Access Dashboard</span>
                                <ArrowRight size={20} />
                            </button>
                        </form>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
