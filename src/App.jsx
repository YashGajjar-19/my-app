import React, { useState, useRef } from 'react';
import Header from './components/header';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import LocationsSection from './components/sections/LocationsSection';
import TeamSection from './components/sections/TeamSection';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';

import { members as initialMembers } from './data';

import ProfilePage from './components/ProfilePage';
import ChatInterface from './components/ChatInterface';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('home'); // 'home' | 'login' | 'dashboard' | 'profile' | 'chat'
  const [selectedMemberProfile, setSelectedMemberProfile] = useState(null);

  // Manage members state for password updates (Sync with data.js to pick up new hires)
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('bakchodi_members');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge: Keep saved passwords, but add new members from code
      return initialMembers.map(initMember => {
        const savedMember = parsed.find(p => p.id === initMember.id);
        return savedMember ? { ...initMember, password: savedMember.password } : initMember;
      });
    }
    return initialMembers;
  });

  const locationsRef = useRef(null);
  const teamRef = useRef(null);

  // Persist members when changed
  React.useEffect(() => {
    localStorage.setItem('bakchodi_members', JSON.stringify(members));
  }, [members]);

  const handleUpdatePassword = (id, newPassword) => {
    setMembers(members.map(m => m.id === parseInt(id) ? { ...m, password: newPassword } : m));
  };



  const scrollToSection = (ref) => {
    setView('home');
    // small delay to allow render if coming from another view
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleMemberClick = (member) => {
    setSelectedMemberProfile(member);
    setView('profile');
    window.scrollTo(0, 0);
  };

  const handleDashboardClick = () => {
    if (currentUser) {
      setView('dashboard');
    } else {
      setView('login');
    }
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setView('home');
  };

  const handleLogoClick = () => {
    setView('home');
    window.scrollTo(0, 0);
  }

  const handleBackToHome = () => {
    setView('home');
  }

  // If view is login, render full page login
  if (view === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onBack={handleBackToHome}
        members={initialMembers}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-fuchsia-500 selection:text-white">

      <Header
        currentUser={currentUser}
        onDashboardClick={handleDashboardClick}
        onUniverseClick={() => scrollToSection(locationsRef)}
        onCrewClick={() => scrollToSection(teamRef)}
        onLogout={handleLogout}
        onLogoClick={() => setView('home')}
        onChatClick={() => setView('chat')}
      />

      {view === 'dashboard' && currentUser ? (
        <Dashboard
          currentUser={currentUser}
          onLogout={handleLogout}
          members={members}
          onUpdatePassword={handleUpdatePassword}
        />
      ) : view === 'profile' && selectedMemberProfile ? (
        <ProfilePage
          member={selectedMemberProfile}
          onBack={() => setView('home')}
        />
      ) : view === 'chat' && currentUser ? (
        <ChatInterface
          currentUser={currentUser}
          members={members}
          onBack={() => setView('home')}
        />
      ) : (
        <main className="pb-10">
          <HeroSection />
          <AboutSection />
          <div ref={locationsRef}>
            <LocationsSection />
          </div>
          <div ref={teamRef}>
            <TeamSection onMemberClick={handleMemberClick} />
          </div>

          {/* Mega Footer - The Final Frontier */}
          <footer className="relative pt-32 pb-12 overflow-hidden bg-white border-t border-slate-100">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-50/50 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                {/* Brand Column */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-100 to-fuchsia-50 flex items-center justify-center p-1 shadow-inner">
                      <img src="/Logo.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
                    </div>
                    <span className="font-black tracking-tighter text-xl text-slate-900">BAKCHODI <span className="font-light text-slate-400">INTL.</span></span>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                    Pioneering the future of organized chaos since 2026. We take nothing seriously, except our jokes.
                  </p>
                  <div className="flex gap-4">
                    {['twitter', 'github', 'linkedin', 'instagram'].map((social) => (
                      <a key={social} href="#" className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all hover:-translate-y-1">
                        <span className="sr-only">{social}</span>
                        <div className="w-4 h-4 bg-current rounded-full"></div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Links Grid */}
                <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-6 font-display">Company</h4>
                    <ul className="space-y-4 text-sm font-medium text-slate-500">
                      {['Manifesto', 'Our Story', 'Careers (Run!)', 'Press Kit'].map(item => (
                        <li key={item}><a href="#" className="hover:text-purple-600 transition-colors">{item}</a></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-6 font-display">Resources</h4>
                    <ul className="space-y-4 text-sm font-medium text-slate-500">
                      {['Blog of Chaos', 'Prank Ideas', 'Help Center', 'API Status'].map(item => (
                        <li key={item}><a href="#" className="hover:text-purple-600 transition-colors">{item}</a></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-6 font-display">Legal</h4>
                    <ul className="space-y-4 text-sm font-medium text-slate-500">
                      {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'].map(item => (
                        <li key={item}><a href="#" className="hover:text-purple-600 transition-colors">{item}</a></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-6 font-display">Contact</h4>
                    <ul className="space-y-4 text-sm font-medium text-slate-500">
                      <li>hello@bakchodi.intl</li>
                      <li>+91 999-CHAOS-99</li>
                      <li>Mars Base 7, Sector 4</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-slate-400 font-medium text-sm">
                  &copy; {new Date().getFullYear()} Bakchodi International PVT. LTD. All rights reserved (mostly).
                </p>
                <p className="text-slate-400 text-sm font-medium">
                  Built with <span className="text-red-400 animate-pulse">♥</span> and absolute panic.
                </p>
              </div>
            </div>
          </footer>
        </main>
      )}

    </div>
  );
}