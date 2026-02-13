import React from 'react';
import { Link } from 'react-router';
import { Flame } from 'lucide-react';
import { useAuth } from './AuthProvider';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center py-10 px-6 pointer-events-none">
      <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto px-10 py-5 rounded-[2.5rem] glass-panel border border-white/5 backdrop-blur-3xl shadow-2xl bg-slate-950/40">
        <Link to="/" className="flex items-center gap-5 group cursor-pointer">
          <div className="relative">
             <div className="absolute -inset-3 bg-orange-500/20 rounded-full blur-2xl group-hover:bg-orange-500/40 transition-all opacity-0 group-hover:opacity-100" />
             <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white relative shadow-2xl shadow-orange-500/30 overflow-hidden">
                <Flame className="w-7 h-7 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/50 to-transparent" />
             </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white tracking-tighter leading-none uppercase italic">Warm Mail</span>
            <span className="text-[9px] text-orange-500 font-black uppercase tracking-[0.3em] mt-1.5">Deliverability Core</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-12">
          {['Platform', 'Network', 'Security', 'Pricing'].map(item => (
            <Link 
              key={item} 
              to={item === 'Platform' ? '/' : `/${item.toLowerCase()}`} 
              className="text-[11px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-[0.2em]"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <Link to="/dashboard" className="px-8 py-3 bg-white text-slate-950 text-[10px] font-black rounded-xl hover:bg-orange-500 hover:text-white transition-all uppercase tracking-[0.2em] shadow-2xl active:scale-95">
              Command Center
            </Link>
          ) : (
            <>
              <Link to="/auth/callback" className="text-[11px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-[0.2em] hidden sm:block">Login</Link>
              <Link to="/auth/callback" className="px-8 py-3 bg-white text-slate-950 text-[10px] font-black rounded-xl hover:bg-orange-500 hover:text-white transition-all uppercase tracking-[0.2em] shadow-2xl active:scale-95">
                Establish Connection
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;