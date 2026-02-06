import React, { useState, useEffect } from 'react';

// --- STYLES CONFIGURATION ---
const STYLES = {
    nav: {
        base: "fixed left-0 right-0 top-0 z-[100] flex w-full items-center justify-center transition-all duration-500 ease-in-out",
        scrolled: "pt-6",
        default: "pt-8"
    },
    container: {
        base: "relative flex items-center justify-between overflow-hidden transition-all duration-500 ease-in-out",
        scrolled: "h-16 w-[90%] max-w-4xl rounded-full border border-white/20 bg-[#6C5DD3] px-4 shadow-[0_0_20px_-5px_rgba(108,93,211,0.5)] backdrop-blur-xl",
        default: "h-20 w-[95%] max-w-7xl rounded-4xl border border-white/10 bg-[#6C5DD3] px-8 backdrop-blur-sm"
    },
    glow: {
        base: "absolute -left-10 top-0 h-full w-40 bg-white/10 blur-3xl transition-opacity duration-500",
        scrolled: "opacity-40",
        default: "opacity-20"
    },
    logo: {
        container: "group relative z-10 flex cursor-pointer items-center gap-3 transition-transform active:scale-95",
        icon: {
            base: "flex items-center justify-center rounded-xl bg-white text-[#6C5DD3] font-black shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-500 group-hover:rotate-[10deg] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]",
            scrolled: "h-9 w-9 text-sm",
            default: "h-10 w-10 text-base"
        },
        text: {
            wrapper: "flex flex-col leading-none",
            title: {
                base: "font-black tracking-tighter text-white uppercase italic transition-all duration-500",
                scrolled: "text-base",
                default: "text-lg"
            },
            subtitle: {
                base: "font-bold tracking-[0.4em] text-purple-100 uppercase transition-all duration-500",
                scrolled: "text-[0px] opacity-0",
                default: "text-[9px] opacity-100"
            }
        }
    },
    divider: {
        base: "hidden w-[1px] bg-white/20 md:block transition-all duration-500",
        scrolled: "h-6",
        default: "h-8"
    },
    userInfo: {
        container: "hidden text-right md:block",
        name: {
            base: "font-bold text-white transition-all duration-500",
            scrolled: "text-[10px]",
            default: "text-xs"
        },
        role: {
            wrapper: "mt-0.5 flex items-center justify-end gap-1.5",
            dot: "h-1.5 w-1.5 animate-pulse rounded-full bg-[#FFE55C] shadow-[0_0_8px_rgba(255,229,92,0.8)]",
            text: "text-[10px] font-black uppercase tracking-widest text-purple-100"
        }
    },
    avatar: {
        button: {
            base: "group relative rounded-full border-2 border-white/10 p-0.5 transition-all hover:border-white/40",
            scrolled: "h-9 w-9",
            default: "h-11 w-11"
        },
        initials: "flex h-full w-full items-center justify-center rounded-full bg-[#5245A8] text-xs font-bold text-white transition-colors group-hover:bg-[#433690]",
        status: "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#6C5DD3] bg-[#FFE55C]"
    }
};

const Header = ({ isAdmin, userName, onHomeClick }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getStyle = (config) => `${config.base || ''} ${scrolled ? config.scrolled : (config.default || '')}`;

    return (
        <nav className={getStyle(STYLES.nav)}>
            <div className={getStyle(STYLES.container)}>
                
                {/* Background Effect */}
                <div className={getStyle(STYLES.glow)} />

                {/* Logo */}
                <div className={STYLES.logo.container} onClick={onHomeClick}>
                    <div className={getStyle(STYLES.logo.icon)}>B</div>
                    <div className={STYLES.logo.text.wrapper}>
                        <span className={getStyle(STYLES.logo.text.title)}>
                            Bakchodi <span className="text-purple-200">International PVT. LTD.</span>
                        </span>
                        <span className={getStyle(STYLES.logo.text.subtitle)}>
                            Est. 2026 • Universal
                        </span>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="relative z-10 flex items-center gap-6">
                    <div className={getStyle(STYLES.divider)} />

                    <div className={STYLES.userInfo.container}>
                        <p className={getStyle(STYLES.userInfo.name)}>{userName}</p>
                        <div className={STYLES.userInfo.role.wrapper}>
                            <span className={STYLES.userInfo.role.dot} />
                            <p className={STYLES.userInfo.role.text}>
                                {isAdmin ? 'Director of Chaos' : 'Field Agent'}
                            </p>
                        </div>
                    </div>

                    <button className={getStyle(STYLES.avatar.button)}>
                        <div className={STYLES.avatar.initials}>
                            {userName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={STYLES.avatar.status} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;