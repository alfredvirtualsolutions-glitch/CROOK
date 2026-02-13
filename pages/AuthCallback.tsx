import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../components/AuthProvider';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Simulate auth processing delay
    const timer = setTimeout(() => {
      login();
      navigate('/dashboard');
    }, 2000);
    return () => clearTimeout(timer);
  }, [login, navigate]);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="glass-panel max-w-md w-full p-12 rounded-[3rem] border border-white/10 text-center relative z-10">
        <div className="w-24 h-24 bg-orange-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-orange-500/20 relative">
           <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
           <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-orange-400 animate-pulse" />
        </div>
        <h2 className="text-2xl font-black text-white mb-3 tracking-tight uppercase">Calibrating Access</h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">Synchronizing your operator credentials with Nova's global cluster network...</p>
        <div className="flex items-center justify-center gap-3">
           {[...Array(3)].map((_, i) => (
             <div key={i} className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
           ))}
        </div>
      </div>
    </div>
  );
}