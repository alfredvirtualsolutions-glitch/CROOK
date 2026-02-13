import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Activity, ShieldCheck } from 'lucide-react';

export default function OutlookCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('outlook_token', 'mock_outlook_' + Date.now());
      navigate('/dashboard');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="glass-panel max-w-md w-full p-12 rounded-[3rem] border border-blue-500/20 text-center relative z-10">
        <div className="w-24 h-24 bg-blue-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-blue-500/20 relative">
           <Activity className="w-12 h-12 text-blue-500 animate-pulse" />
           <div className="absolute inset-0 border-2 border-blue-500/30 rounded-[2rem] animate-ping" />
        </div>
        <h2 className="text-2xl font-black text-white mb-3 tracking-tight uppercase">Outlook Handshake</h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">Initializing secure Mimecast filter evasion protocols for your Microsoft infrastructure...</p>
        <div className="text-[10px] font-black uppercase text-blue-500 tracking-[0.3em]">Neural exchange active</div>
      </div>
    </div>
  );
}