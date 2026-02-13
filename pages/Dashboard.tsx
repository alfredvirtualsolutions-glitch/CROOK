import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  TrendingUp, 
  Activity, 
  Target, 
  Flame, 
  ShieldCheck, 
  Mail,
  Zap,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';

const data = [
  { name: 'MON', heat: 45 },
  { name: 'TUE', heat: 52 },
  { name: 'WED', heat: 48 },
  { name: 'THU', heat: 61 },
  { name: 'FRI', heat: 55 },
  { name: 'SAT', heat: 67 },
  { name: 'SUN', heat: 75 },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-10 animate-in fade-in duration-1000">
        <div className="flex items-end justify-between border-b border-white/5 pb-8">
           <div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-3 italic">Command Center</h1>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Operational Status: <span className="text-green-500">OPTIMAL Handshake</span></p>
           </div>
           <div className="flex items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
              <Clock className="w-4 h-4 text-orange-500" />
              Sync Last Confirmed: Just Now
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <StatCard icon={Flame} label="Infrastructure Heat" value="98.4%" trend="+2.4%" color="orange" />
           <StatCard icon={Target} label="Health Score" value="99/100" trend="STABLE" color="cyan" />
           <StatCard icon={ShieldCheck} label="Reputation Rank" value="ELITE" trend="TOP 1%" color="green" />
           <StatCard icon={Activity} label="Active Warmers" value="14,204" trend="+402" color="purple" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Chart Section */}
           <div className="lg:col-span-8 glass-panel rounded-[3rem] p-10 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10">
                 <Activity className="w-32 h-32 text-orange-500" />
              </div>
              <div className="flex items-center justify-between mb-12 relative z-10">
                 <div>
                    <h3 className="text-xl font-black text-white tracking-tight uppercase italic mb-1">Reputation Momentum</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Weekly deliverability trajectory</p>
                 </div>
                 <div className="px-5 py-2.5 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black tracking-[0.2em] flex items-center gap-3">
                    <TrendingUp className="w-4 h-4" />
                    +15.2% ACCELERATION
                 </div>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.1)" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.1)" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '11px', padding: '12px' }} 
                    />
                    <Area type="monotone" dataKey="heat" stroke="#f97316" fill="url(#chartGrad)" strokeWidth={4} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Live Feed */}
           <div className="lg:col-span-4 glass-panel rounded-[3rem] p-10 border border-white/5 flex flex-col">
              <h3 className="text-xl font-black text-white tracking-tight uppercase italic mb-10">Live Ops Feed</h3>
              <div className="space-y-5 overflow-y-auto no-scrollbar flex-1 max-h-[400px]">
                 <FeedItem icon={Zap} title="New Peer Handshake" time="Just now" status="success" />
                 <FeedItem icon={Mail} title="AI Interaction Burst" time="2m ago" status="success" />
                 <FeedItem icon={ShieldCheck} title="DMARC Validation" time="15m ago" status="success" />
                 <FeedItem icon={CheckCircle2} title="Daily Warm-up Cap" time="1h ago" status="warning" />
                 <FeedItem icon={Clock} title="Cluster Rotation" time="4h ago" status="success" />
                 <FeedItem icon={Activity} title="Health Probe Active" time="6h ago" status="success" />
              </div>
              <button className="mt-8 w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white hover:bg-white/10 transition-all">
                Export Log Matrix
              </button>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="glass-panel rounded-[2.5rem] p-8 border border-white/5 hover:border-orange-500/30 transition-all group cursor-default">
    <div className="flex items-center justify-between mb-6">
       <div className={`w-12 h-12 rounded-2xl bg-${color}-500/10 text-${color}-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
          <Icon className="w-6 h-6" />
       </div>
       <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">{trend}</span>
    </div>
    <div className="text-4xl font-black text-white tracking-tighter mb-2 italic">{value}</div>
    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{label}</div>
  </div>
);

const FeedItem = ({ icon: Icon, title, time, status }: any) => (
  <div className="flex items-center gap-5 p-5 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
     <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${status === 'success' ? 'green' : 'orange'}-500/10 text-${status === 'success' ? 'green' : 'orange'}-400 group-hover:scale-105 transition-transform`}>
        <Icon className="w-5 h-5" />
     </div>
     <div className="flex-1">
        <div className="text-[11px] font-black text-white uppercase tracking-tight group-hover:text-orange-500 transition-colors">{title}</div>
        <div className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] mt-0.5">{time}</div>
     </div>
     <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-orange-500 transition-colors"></div>
  </div>
);