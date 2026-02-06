import React, { useState } from 'react';
import Header from './components/header';

export default function App() {
  const [view, setView] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50 antialiased">
      {/* Background Ambient Light */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#6C5DD3]/10 blur-[120px] rounded-full" />
      </div>

      <Header
        isAdmin={true}
        userName="Yash Gajjar"
        onHomeClick={() => setView('home')}
      />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-slate-900">

      </main>
    </div>
  );
}