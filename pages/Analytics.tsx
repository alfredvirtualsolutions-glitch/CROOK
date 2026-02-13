import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  ShieldAlert,
  Globe,
  Monitor
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell
} from 'recharts';

const ispData = [
  { name: 'GMAIL', health: 98, color: '#EA4335' },
  { name: 'OUTLOOK', health: 94, color: '#0078D4' },
  { name: 'YAHOO', health: 89, color: '#6001D2' },
  { name: 'ZOHO', health: 96, color: '#E41D2D' },
  { name: 'CUSTOM', health: 91, color: '#f97316' },
];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div>
           <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Deliverability Core</h1>
           <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">ISP Reputation Heatmap • Global Coverage</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           {/* Primary Health Metric */}
           <div className="lg:col-span-4 glass-panel rounded-[2.5rem] p-10 border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient(circle at center, rgba(249,115,22,0.1) 0%, transparent 70%) pointer-events-none" />
              <div className="relative mb-8">
                 <div className="w-48 h-48 rounded-full border-[12px] border-white/5 flex items-center justify-center">
                    <div className="text-6xl font-black text-white tracking-tighter">99.4</div>
                 </div>
                 <div className="absolute inset-0 border-[12px] border-orange-500 border-r-transparent rounded-full animate-spin-slow" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Aggregate Health</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6">Calculated from 4.2M Data points</p>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-[10px] font-black tracking-widest border border-green-500/20">
                 <TrendingUp className="w-4 h-4" />
                 EXCELLENT STANDING
              </div>
           </div>

           {/* ISP Breakdown */}
           <div className="lg:col-span-8 glass-panel rounded-[2.5rem] p-10 border border-white/5">
              <div className="flex items-center justify-between mb-12">
                 <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">ISP Performance breakdown</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Inbox placement probability by provider</p>
                 </div>
                 <BarChart3 className="w-6 h-6 text-slate-700" />
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ispData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.1)" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.1)" fontSize={10} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.02)'}}
                      contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', fontSize: '10px' }} 
                    />
                    <Bar dataKey="health" radius={[8, 8, 0, 0]} barSize={40}>
                       {ispData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                       ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Global Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <MetricBox icon={Globe} label="Global Nodes" value="14 Regions" sub="Low Latency warm-up" />
           <MetricBox icon={ShieldAlert} label="Spam Traps Avoided" value="2,402" sub="Proprietary filtering" />
           <MetricBox icon={Monitor} label="Unique User Agents" value="842" sub="Hyper-realistic browsing" />
        </div>
      </div>
    </DashboardLayout>
  );
}

const MetricBox = ({ icon: Icon, label, value, sub }: any) => (
  <div className="glass-panel rounded-[2rem] p-8 border border-white/5 hover:border-orange-500/20 transition-all flex items-center gap-6">
     <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400">
        <Icon className="w-6 h-6" />
     </div>
     <div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</div>
        <div className="text-2xl font-black text-white tracking-tight">{value}</div>
        <div className="text-[8px] font-bold text-orange-500/50 uppercase tracking-widest mt-1">{sub}</div>
     </div>
  </div>
);