import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, Bell, Menu, User, ChevronDown, Rocket, LayoutGrid, Users, LogOut } from 'lucide-react';


const Header = ({ onMenuClick, onDashboardClick, onUniverseClick, onCrewClick, currentUser, onLogout, onLogoClick }) => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    // Trigger animation when user scrolls down 50px
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="pointer-events-auto flex items-center justify-between px-6 p-4 rounded-full bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-[90%] max-w-5xl transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
            >
                {/* LEFT: Branding */}
                <div className="flex items-center gap-4 cursor-pointer group" onClick={() => { onLogoClick && onLogoClick(); window.scrollTo(0, 0); }}>
                    <div className="relative h-12 w-12 rounded-full bg-gradient-to-tr from-purple-100 to-fuchsia-50 flex items-center justify-center p-1.5 shadow-inner overflow-hidden group-hover:scale-105 transition-transform">
                        <img
                            src="/Logo.png"
                            alt="Bakchodi International"
                            className="w-full h-full object-contain rounded-full"
                        />
                    </div>

                    <div className="hidden md:flex flex-col">
                        <span className="font-black tracking-tighter text-lg leading-none text-slate-900 group-hover:text-purple-600 transition-colors">BAKCHODI <span className="font-light text-slate-400">INTL.</span></span>
                    </div>
                </div>

                {/* CENTER: Navigation (Desktop) */}
                <div className="hidden md:flex items-center p-1 bg-slate-100/50 rounded-full border border-slate-200/50">
                    {currentUser && <NavLink icon={<LayoutGrid size={16} />} text="Dashboard" onClick={onDashboardClick} active={true} />}
                    <NavLink icon={<Rocket size={16} />} text="Universe" onClick={onUniverseClick} />
                    <NavLink icon={<Users size={16} />} text="Crew" onClick={onCrewClick} />
                </div>

                {/* RIGHT: Actions */}
                <div className="flex items-center gap-3 pr-2">
                    {currentUser ? (
                        <button onClick={onLogout} className="flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full bg-slate-50 hover:bg-red-50 transition-colors group border border-slate-200/50 hover:border-red-100">
                            <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                                <img src={currentUser.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="hidden sm:flex flex-col items-start text-left">
                                <span className="text-xs font-bold text-slate-900 leading-none">{currentUser.name.split(' ')[0]}</span>
                                <span className="text-[10px] text-slate-400 font-medium">{currentUser.role.split('&')[0]}</span>
                            </div>
                            <LogOut size={14} className="text-slate-300 group-hover:text-red-500 transition-colors ml-1" />
                        </button>
                    ) : (
                        <button onClick={onDashboardClick} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 hover:scale-105 transition-all shadow-lg shadow-slate-900/20 active:scale-95">
                            <User size={16} />
                            <span>Login</span>
                        </button>
                    )}
                </div>
            </motion.nav>
        </div>
    );
};

// Sub-components for cleaner code
const NavLink = ({ icon, text, active, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${active ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
    >
        {icon}
        <span>{text}</span>
    </button>
);

const IconButton = ({ icon, notify }) => (
    <button className="relative w-11 h-11 rounded-full flex items-center justify-center text-purple-400 hover:text-purple-900 hover:bg-purple-100/80 transition-all active:scale-95">
        {icon}
        {notify && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>}
    </button>
);

export default Header;