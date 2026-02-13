import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Globe, 
  CreditCard,
  ChevronRight,
  Database
} from 'lucide-react';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-8 animate-in fade-in duration-700">
        <div>
           <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Infrastructure Config</h1>
           <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">Node management • Security Protocols</p>
        </div>

        <div className="space-y-6">
           <SettingsSection title="Profile Overview" icon={User}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Input label="Display Name" placeholder="Elite Operator" />
                 <Input label="Communication Channel" placeholder="operator@nova-core.net" />
              </div>
           </SettingsSection>

           <SettingsSection title="Neural Warm-up Protocol" icon={Database}>
              <div className="space-y-4">
                 <Toggle label="Dynamic Read-Time Simulation" description="Varies reading time based on email length to mimic human cognitive patterns." defaultChecked />
                 <Toggle label="Hyper-realistic Reply Threads" description="Generates multi-step reply chains with consistent context." defaultChecked />
                 <Toggle label="Spam Filter Probe" description="Periodically sends probe interactions to detect IP blacklisting in real-time." />
              </div>
           </SettingsSection>

           <SettingsSection title="Security & API" icon={Shield}>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/[0.04] transition-all">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                       <Lock className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="text-xs font-black text-white uppercase tracking-tight">Nova API Key</div>
                       <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">••••••••••••••••••••••••</div>
                    </div>
                 </div>
                 <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors" />
              </div>
           </SettingsSection>
        </div>
      </div>
    </DashboardLayout>
  );
}

const SettingsSection = ({ title, icon: Icon, children }: any) => (
  <div className="glass-panel rounded-[2.5rem] p-10 border border-white/5">
     <div className="flex items-center gap-4 mb-8">
        <div className="p-2.5 rounded-xl bg-white/5 text-slate-400">
           <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-black text-white uppercase tracking-tight">{title}</h3>
     </div>
     {children}
  </div>
);

const Input = ({ label, placeholder }: any) => (
  <div className="space-y-2">
     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
     <input 
       type="text" 
       placeholder={placeholder}
       className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-slate-700"
     />
  </div>
);

const Toggle = ({ label, description, defaultChecked }: any) => (
  <div className="flex items-center justify-between py-4 group">
     <div className="flex-1 pr-8">
        <div className="text-xs font-black text-white uppercase tracking-tight mb-1 group-hover:text-orange-500 transition-colors">{label}</div>
        <div className="text-[10px] font-medium text-slate-500 leading-relaxed">{description}</div>
     </div>
     <div className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer ${defaultChecked ? 'bg-orange-500' : 'bg-white/10'}`}>
        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${defaultChecked ? 'translate-x-6' : 'translate-x-0'}`} />
     </div>
  </div>
);