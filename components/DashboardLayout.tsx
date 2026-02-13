import React from 'react';
import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  BarChart3, 
  FileText, 
  Settings, 
  LogOut, 
  Flame, 
  Bell,
  Search,
  ChevronRight
} from 'lucide-react';
import { useAuth } from './AuthProvider';
import ChatDrawer from './ChatDrawer';

const SidebarItem: React.FC<{ to: string; icon: any; label: string }> = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
        isActive 
          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
          : 'text-slate-500 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </Link>
  );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-slate-950/40 backdrop-blur-3xl p-6 hidden lg:flex flex-col fixed inset-y-0">
        <div className="flex items-center gap-4 mb-12 group">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-white tracking-tighter leading-none uppercase italic">Warm Mail</span>
            <span className="text-[8px] text-orange-500 font-bold uppercase tracking-[0.2em] mt-1">Deliverability Core</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Overview" />
          <SidebarItem to="/analytics" icon={BarChart3} label="Analytics" />
          <SidebarItem to="/templates" icon={FileText} label="Templates" />
          <SidebarItem to="/settings" icon={Settings} label="Settings" />
        </nav>

        <div className="pt-6 border-t border-white/5">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 min-h-screen">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between sticky top-0 bg-[#020617]/80 backdrop-blur-xl z-40">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
             <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="SEARCH INFRASTRUCTURE..." 
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest focus:border-orange-500/30 outline-none transition-all" 
                />
             </div>
          </div>

          <div className="flex items-center gap-6">
             <button className="relative p-2 text-slate-500 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-[#020617]"></span>
             </button>
             <div className="h-8 w-px bg-white/5" />
             <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                   <div className="text-[10px] font-black text-white uppercase tracking-widest">{user?.name || 'GUEST'}</div>
                   <div className="text-[8px] font-bold text-orange-500 uppercase tracking-widest">PRO OPERATOR</div>
                </div>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || 'nova'}`} className="w-10 h-10 rounded-xl border border-white/10 bg-white/5" alt="avatar" />
             </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>

      <ChatDrawer />
    </div>
  );
}