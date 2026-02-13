import React from 'react';
import Navbar from '../components/Navbar';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-48 pb-32 px-6">
        <h1 className="text-5xl font-black tracking-tighter uppercase mb-12">Privacy Protocol</h1>
        <div className="glass-panel rounded-[3rem] p-12 border border-white/5 space-y-8 text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-xl mb-4">1. Data Architecture</h2>
            <p>At Warm Mail, your data sovereignty is our highest priority. We utilize end-to-end encrypted storage protocols to safeguard your outreach infrastructure credentials and interaction logs.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-xl mb-4">2. Interaction Simulation</h2>
            <p>We do not store the content of your private messages. Our interaction engine generates synthetic content designed purely for reputation building, ensuring your actual business data remains strictly confidential.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-xl mb-4">3. Global Nodes</h2>
            <p>Your connection logs may be processed across our 14 global reputation clusters. These logs are anonymized and purged every 30 days to maintain maximum security hygiene.</p>
          </section>
          <div className="pt-8 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-600">
            LAST UPDATED: OCTOBER 24, 2024 • VERSION 4.0.2
          </div>
        </div>
      </div>
    </div>
  );
}