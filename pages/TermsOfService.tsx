import React from 'react';
import Navbar from '../components/Navbar';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-48 pb-32 px-6">
        <h1 className="text-5xl font-black tracking-tighter uppercase mb-12">Operational Terms</h1>
        <div className="glass-panel rounded-[3rem] p-12 border border-white/5 space-y-8 text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-xl mb-4">1. License of Use</h2>
            <p>Subject to these terms, Warm Mail grants you a non-exclusive, non-transferable right to access our deliverability infrastructure solely for the purpose of improving your sender reputation.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-xl mb-4">2. Prohibited Conduct</h2>
            <p>Users are strictly prohibited from utilizing Nova Core for spamming, harassment, or any activity that violates the CAN-SPAM Act or GDPR regulations. Infrastructure abuse will result in immediate termination.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-xl mb-4">3. Reputation Warranty</h2>
            <p>While Nova Core represents the pinnacle of deliverability engineering, reputation is a dynamic variable influenced by third-party ISPs. We provide the tools, but ultimate success depends on your compliance with best practices.</p>
          </section>
          <div className="pt-8 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-600">
            REVISION: 2024-STABLE • AUTHORED BY NOVA CORE
          </div>
        </div>
      </div>
    </div>
  );
}