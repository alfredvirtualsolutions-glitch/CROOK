
import React from 'react';

const LogoCloud: React.FC = () => {
  const logos = [
    { name: 'Velocity', icon: '⚡' },
    { name: 'Prism', icon: '💠' },
    { name: 'Apex', icon: '🔷' },
    { name: 'Nexus', icon: '🌀' },
    { name: 'Horizon', icon: '♾️' },
    { name: 'Quantum', icon: '✨' },
  ];

  return (
    <div className="py-20 border-y border-white/5 bg-slate-950/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-center">
        <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">Trusted by Global Revenue Teams</h3>
        <div className="h-px bg-white/10 flex-1 ml-8" />
      </div>
      
      <div className="flex gap-20 items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
        {logos.concat(logos).map((logo, i) => (
          <div key={i} className="flex items-center gap-4 flex-shrink-0">
             <span className="text-2xl">{logo.icon}</span>
             <span className="text-sm font-black text-white tracking-widest uppercase">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCloud;
