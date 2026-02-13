
import React from 'react';
import { StatItem } from '../types';

const stats: StatItem[] = [
  { value: '$5M+', label: 'Performance Snapshot' },
  { value: '250+', label: 'Digital Reach' },
  { value: '98%', label: 'Satisfied Client Rate' },
];

const Stats: React.FC = () => {
  return (
    <div className="relative py-32 px-6 overflow-hidden">
      {/* Background Arc */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] aspect-square border-t border-white/10 rounded-full bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full glass-panel border border-white/10 text-xs font-medium text-slate-300 mb-12">
          <span className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
             <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
          </span>
          Inside Our World
        </div>

        <h2 className="text-3xl md:text-5xl font-medium leading-tight mb-24 tracking-tight">
          Our team of data scientists, engineers, and <br/>
          <span className="text-slate-500">creatives craft tailored AI solutions that solve real-</span><br/>
          <span className="text-slate-500">world challenges across industries.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="px-8 py-4 md:py-0">
              <div className="text-4xl md:text-5xl font-semibold mb-3 tracking-tighter text-white">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
