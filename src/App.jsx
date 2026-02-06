import { useState } from 'react';

const APPS = [
  { id: 'board', name: 'Boardroom', icon: '🏛️', color: 'bg-purple-600', desc: 'Rules & Regs' },
  { id: 'hq', name: 'Galactic HQ', icon: '🚀', color: 'bg-blue-500', desc: 'Offices in the Universe' },
  { id: 'crew', name: 'The Crew', icon: '🕵️', color: 'bg-orange-500', desc: 'Member Roles' },
  { id: 'tasks', name: 'Missions', icon: '📝', color: 'bg-green-600', desc: 'Prank Tasks' },
];

export default function App() {
  const [view, setView] = useState('home');
  const isAdmin = true; // Your admin status

  const renderContent = () => {
    switch (view) {
      case 'board': return <BoardroomModule />;
      case 'hq': return <HQModule />;
      case 'crew': return <CrewModule />;
      case 'tasks': return <TaskModule isAdmin={isAdmin} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FA]">
      {/* Premium Navbar */}
      <header className="bg-[#714B67] text-white h-12 flex items-center px-6 justify-between shadow-lg z-10">
        <div className="flex items-center gap-6 cursor-pointer" onClick={() => setView('home')}>
          <span className="font-bold tracking-widest text-lg">BAKCHODI INTERNATIONAL</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-tighter">
          <span className="bg-white/10 px-2 py-1 rounded">{isAdmin ? 'Mastermind (Admin)' : 'Field Agent'}</span>
          <div className="w-8 h-8 bg-gradient-to-tr from-orange-400 to-red-500 rounded-full border border-white/20 flex items-center justify-center font-bold">YG</div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-10">
        {view === 'home' ? (
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mt-12">
            {APPS.map(app => (
              <button
                key={app.id}
                onClick={() => setView(app.id)}
                className="flex flex-col items-center group transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`${app.color} w-24 h-24 rounded-[2rem] shadow-xl flex items-center justify-center text-5xl mb-4 group-hover:shadow-2xl transition-shadow`}>
                  {app.icon}
                </div>
                <span className="font-bold text-gray-800 text-lg">{app.name}</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">{app.desc}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-h-[600px]">
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
              <button onClick={() => setView('home')} className="text-purple-700 font-semibold flex items-center gap-2 hover:underline">
                <span>←</span> Back to Apps
              </button>
              <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">
                {APPS.find(a => a.id === view)?.name}
              </h2>
            </div>
            <div className="p-8">
              {renderContent()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* --- MODULE COMPONENTS --- */

function BoardroomModule() {
  const rules = [
    "Rule #1: The prank must be funny for everyone, eventually.",
    "Rule #2: No permanent damage to property or reputation (unless approved by HQ).",
    "Rule #3: Always maintain 'Straight Face' during operations.",
    "Rule #4: If caught, you are on your own."
  ];
  return (
    <div className="prose max-w-none">
      <h3 className="text-purple-600">Company Constitution</h3>
      <p className="text-gray-600">Established for the sole purpose of maximum entertainment and absolute chaos.</p>
      <div className="grid gap-4 mt-6">
        {rules.map((r, i) => (
          <div key={i} className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600 font-medium">
            {r}
          </div>
        ))}
      </div>
    </div>
  );
}

function HQModule() {
  const locations = [
    { name: "The Void - Earth Branch", location: "Underground Basement, Mumbai", type: "Physical" },
    { name: "Crater-7 Office", location: "The Moon, Sector B", type: "Extraterrestrial" },
    { name: "Nebula Lounge", location: "Andromeda Galaxy", type: "Multidimensional" }
  ];
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {locations.map((loc, i) => (
        <div key={i} className="border rounded-xl p-5 hover:border-blue-400 transition-colors bg-gradient-to-b from-white to-blue-50">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{loc.type}</span>
          <h4 className="text-lg font-bold mt-2">{loc.name}</h4>
          <p className="text-sm text-gray-500 mt-1">{loc.location}</p>
        </div>
      ))}
    </div>
  );
}

function CrewModule() {
  const team = [
    { name: "The Admin", role: "Founder & Chaos Architect", icon: "👑" },
    { name: "The Fixer", role: "Manager of Mischief", icon: "💼" },
    { name: "The Sentinel", role: "Security Head / Bail Provider", icon: "🛡️" }
  ];
  return (
    <div className="space-y-4">
      {team.map((m, i) => (
        <div key={i} className="flex items-center gap-6 p-4 border rounded-xl hover:bg-gray-50">
          <div className="text-4xl">{m.icon}</div>
          <div>
            <h4 className="text-xl font-bold">{m.name}</h4>
            <p className="text-purple-600 font-medium">{m.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TaskModule({ isAdmin }) {
  return (
    <div>
      {isAdmin && (
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-500 italic">Assign pranks to your agents here.</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-bold shadow-lg transition-transform active:scale-95">
            + New Mission
          </button>
        </div>
      )}
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-200 p-6 rounded-2xl flex justify-between items-center group hover:border-green-400 transition-colors">
          <div>
            <h4 className="font-black text-lg text-gray-800">Operation: Silent Fart</h4>
            <p className="text-sm text-gray-500">Target: The Board Meeting | Difficulty: Professional</p>
          </div>
          <span className="bg-green-100 text-green-700 font-bold px-4 py-1 rounded-full text-xs">ACTIVE</span>
        </div>
      </div>
    </div>
  );
}