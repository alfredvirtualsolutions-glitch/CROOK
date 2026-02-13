
import React from 'react';
import { Shield, Zap, Target, Globe, BarChart, Cpu, Mail, Lock, MousePointer2 } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm mb-4">The Infrastructure</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Engineered for <br/>
            <span className="text-slate-600 italic">absolute deliverability.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[900px]">
          {/* Main Bento Card: AI Engine */}
          <div className="md:col-span-8 md:row-span-1 glass-panel rounded-[2.5rem] p-10 flex flex-col justify-between group overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all cursor-default">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Cpu className="w-8 h-8 text-orange-500" />
              </div>
              <h4 className="text-3xl font-bold text-white mb-4 tracking-tight">Nova Interaction Engine</h4>
              <p className="text-slate-400 max-w-md leading-relaxed">
                Our proprietary AI mimics human typing patterns, read times, and reply behaviors. It doesn't just send mail; it builds digital trust with every interaction.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-4">
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800" />)}
               </div>
               <span className="text-xs text-orange-500 font-bold uppercase tracking-widest">Active Simulators</span>
            </div>
            {/* Abstract Background Element */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-500/10 blur-[100px] rounded-full group-hover:bg-orange-500/20 transition-all" />
          </div>

          {/* Side Bento Card: Spam Filter */}
          <div className="md:col-span-4 md:row-span-1 glass-panel rounded-[2.5rem] p-10 flex flex-col border border-white/5 hover:border-orange-500/30 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-8">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Filter Evasion</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Navigate past Barracuda, Mimecast, and Google's latest AI filters with dynamic content morphing.
            </p>
            <div className="mt-auto pt-6 border-t border-white/5">
               <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500 tracking-tighter">
                  <span>Detection Rate</span>
                  <span className="text-cyan-400">0.02%</span>
               </div>
            </div>
          </div>

          {/* Bottom Left: Global Infrastructure */}
          <div className="md:col-span-4 md:row-span-1 glass-panel rounded-[2.5rem] p-10 flex flex-col border border-white/5 hover:border-orange-500/30 transition-all">
            <Globe className="w-8 h-8 text-purple-400 mb-8" />
            <h4 className="text-xl font-bold text-white mb-3">Geo-Distributed</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Warm up across 14 global regions to ensure your domain reputation is bulletproof internationally.
            </p>
          </div>

          {/* Bottom Right: Analytics */}
          <div className="md:col-span-8 md:row-span-1 glass-panel rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-10 items-center border border-white/5 hover:border-orange-500/30 transition-all">
             <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
                  <BarChart className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">Predictive Analytics</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Get notified of deliverability drops before they happen. Our ML models predict ISP blocks 48 hours in advance.
                </p>
             </div>
             <div className="w-full md:w-64 h-40 bg-white/5 rounded-2xl border border-white/5 overflow-hidden flex items-end p-4 gap-2">
                {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
