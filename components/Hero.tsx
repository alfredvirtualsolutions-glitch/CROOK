import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, Activity, Target, Flame, ChevronRight, Mail, ShieldCheck, Loader2, Sparkles
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import AchievementBadge, { Achievement, AchievementToast } from './AchievementBadge';
import { fetchGmailInbox, GmailMessage } from '../services/gmailService';
import { fetchOutlookInbox, OutlookMessage } from '../services/outlookService';

const activityData = [
  { date: '08:00', heat: 42, health: 95 },
  { date: '10:00', heat: 65, health: 96 },
  { date: '12:00', heat: 82, health: 94 },
  { date: '14:00', heat: 75, health: 97 },
  { date: '16:00', heat: 92, health: 98 },
  { date: '18:00', heat: 88, health: 97 },
  { date: '20:00', heat: 95, health: 99 },
];

const allAchievements: Achievement[] = [
  { id: '1', title: 'Spark Ignition', description: 'First warm-up cycle initiated successfully.', icon: 'flame', color: 'orange', unlocked: true },
  { id: '2', title: 'Absolute Trust', description: 'Maintain 95+ health score for 7 days.', icon: 'target', color: 'green', unlocked: true },
  { id: '3', title: 'Hyper Scaling', description: 'Send over 10,000 warm-up interactions.', icon: 'zap', color: 'yellow', unlocked: false, progress: 6420, maxProgress: 10000 },
  { id: '4', title: 'Elite Vanguard', description: 'Reached the top 1% of sender reputations.', icon: 'crown', color: 'purple', unlocked: true },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'metrics' | 'live' | 'milestones'>('metrics');
  const [showToast, setShowToast] = useState(false);
  const [isGmailConnected, setIsGmailConnected] = useState(false);
  const [isOutlookConnected, setIsOutlookConnected] = useState(false);
  const [isLoadingInbox, setIsLoadingInbox] = useState(false);
  const [mergedInbox, setMergedInbox] = useState<any[]>([]);

  const checkConnection = () => {
    const gToken = localStorage.getItem('gmail_token');
    const oToken = localStorage.getItem('outlook_token');
    setIsGmailConnected(!!gToken);
    setIsOutlookConnected(!!oToken);
    
    if (gToken || oToken) {
      loadInboxes(gToken, oToken);
    } else {
      setMergedInbox([]);
    }
  };

  useEffect(() => {
    checkConnection();
    window.addEventListener('storage', checkConnection);
    return () => window.removeEventListener('storage', checkConnection);
  }, []);

  const loadInboxes = async (gToken: string | null, oToken: string | null) => {
    setIsLoadingInbox(true);
    const results: any[] = [];
    try {
      if (gToken) {
        if (gToken.includes('mock')) {
          results.push({ id: 'g1', subject: '[GMAIL] Enterprise Pitch', from: 'mark@corp.com', date: '5m ago', type: 'gmail' });
        } else {
          const gMsgs = await fetchGmailInbox(gToken);
          results.push(...gMsgs.map(m => ({ ...m, type: 'gmail' })));
        }
      }
      if (oToken) {
        if (oToken.includes('mock')) {
          results.push({ id: 'o1', subject: '[OUTLOOK] Weekly Sync', from: 'sarah@msft.net', date: '12m ago', type: 'outlook' });
        } else {
          const oMsgs = await fetchOutlookInbox(oToken);
          results.push(...oMsgs.map(m => ({ ...m, type: 'outlook' })));
        }
      }
      setMergedInbox(results.sort((a, b) => b.id.localeCompare(a.id)));
    } catch (e) {
      console.error("Failed to load inboxes", e);
    } finally {
      setIsLoadingInbox(false);
    }
  };

  const handleConnectGmail = () => {
    localStorage.setItem('gmail_token', 'mock_gmail_' + Date.now());
    checkConnection();
    setShowToast(true);
  };

  const handleConnectOutlook = () => {
    localStorage.setItem('outlook_token', 'mock_outlook_' + Date.now());
    checkConnection();
    setShowToast(true);
  };

  const handleDisconnectAll = () => {
    localStorage.removeItem('gmail_token');
    localStorage.removeItem('outlook_token');
    checkConnection();
  };

  return (
    <section className="relative pt-64 pb-32 px-6 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none opacity-30" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      {showToast && (
        <AchievementToast 
          achievement={{ 
            id: 'demo', 
            title: 'Digital Handshake', 
            description: 'Core infrastructure synchronized successfully.', 
            icon: 'award', 
            color: 'orange', 
            unlocked: true 
          }} 
          onClose={() => setShowToast(false)} 
        />
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          
          <div className="lg:col-span-6 space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-white/10 text-xs font-black group cursor-default">
              <div className="relative">
                <span className="absolute inset-0 w-2 h-2 rounded-full bg-orange-500 animate-pulse-ring"></span>
                <span className="relative block w-2 h-2 rounded-full bg-orange-500"></span>
              </div>
              <span className="text-slate-300 uppercase tracking-[0.2em] text-[10px]">Nova V4.2 Deliverability Core</span>
              <ChevronRight className="w-3 h-3 text-orange-500 group-hover:translate-x-1 transition-transform" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase italic">
              Heat Up <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-400">Your Inbox.</span>
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
              Engineered for absolute deliverability. Mimic human typing, read times, and behaviors to build <span className="text-white font-black italic border-b-2 border-orange-500/30">digital trust</span> at scale.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-4">
                {(!isGmailConnected || !isOutlookConnected) && (
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    {!isGmailConnected && (
                      <button 
                        onClick={handleConnectGmail}
                        className="px-8 py-4 bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 hover:bg-orange-400 transition-all uppercase tracking-widest text-[10px] flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" /> Gmail Sync
                      </button>
                    )}
                    {!isOutlookConnected && (
                      <button 
                        onClick={handleConnectOutlook}
                        className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all uppercase tracking-widest text-[10px] flex items-center gap-2"
                      >
                        <Activity className="w-4 h-4" /> Outlook Sync
                      </button>
                    )}
                  </div>
                )}
                {(isGmailConnected || isOutlookConnected) && (
                  <button 
                    onClick={handleDisconnectAll}
                    className="px-8 py-4 bg-white/5 text-white border border-white/10 font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-[10px]"
                  >
                    Reset Infrastructure
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex -space-x-3">
                  {[101, 102, 103, 104].map(i => (
                    <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} className="w-10 h-10 rounded-xl border-2 border-[#020617] bg-slate-900" alt="user" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">Active Nodes: 14,204</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="glass-panel rounded-[3rem] p-1.5 border border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] overflow-hidden bg-slate-950/40 backdrop-blur-3xl animate-float">
              <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${(isGmailConnected || isOutlookConnected) ? 'bg-green-500 animate-pulse' : 'bg-red-500/50'}`} />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {(isGmailConnected || isOutlookConnected) ? 'Neural Core Online' : 'Infrastructure Idle'}
                  </span>
                </div>
                <div className="flex gap-2 p-1 bg-black/40 rounded-2xl border border-white/5">
                   {['metrics', 'live', 'milestones'].map(tab => (
                     <button 
                       key={tab}
                       className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`} 
                       onClick={() => setActiveTab(tab as any)}
                     >
                       {tab}
                     </button>
                   ))}
                </div>
              </div>

              <div className="p-8 h-[450px] overflow-y-auto no-scrollbar relative">
                {activeTab === 'metrics' && (
                  <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 group hover:border-orange-500/30 transition-all duration-500">
                        <div className="flex items-center justify-between mb-4 text-slate-500 font-black uppercase tracking-widest text-[9px]">
                           <span>Aggregate Heat</span>
                           <Flame className="w-4 h-4 text-orange-500" />
                        </div>
                        <div className="text-5xl font-black text-white tracking-tighter">98.4%</div>
                        <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-green-500 uppercase tracking-widest">
                           <TrendingUp className="w-3 h-3" />
                           +2.4% Acceleration
                        </div>
                      </div>
                      <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 group hover:border-cyan-500/30 transition-all duration-500">
                        <div className="flex items-center justify-between mb-4 text-slate-500 font-black uppercase tracking-widest text-[9px]">
                           <span>Health Index</span>
                           <Target className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="text-5xl font-black text-white tracking-tighter">99/100</div>
                        <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                           Stable Pulse
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={activityData}>
                          <defs>
                            <linearGradient id="heatGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                          <XAxis dataKey="date" stroke="rgba(255,255,255,0.1)" fontSize={8} axisLine={false} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', fontSize: '10px', color: 'white' }} 
                            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                          />
                          <Area type="monotone" dataKey="heat" stroke="#f97316" fill="url(#heatGrad)" strokeWidth={3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {activeTab === 'live' && (
                  <div className="space-y-4 animate-in slide-in-from-right-10 duration-500 h-full">
                    {!(isGmailConnected || isOutlookConnected) ? (
                      <div className="flex flex-col items-center justify-center h-full text-center p-10">
                        <div className="w-20 h-20 rounded-[2.5rem] bg-white/5 flex items-center justify-center mb-8 border border-white/5 shadow-2xl">
                           <Mail className="w-10 h-10 text-slate-700" />
                        </div>
                        <h4 className="text-white font-black text-xl mb-3 tracking-tight uppercase italic">Offline State</h4>
                        <p className="text-slate-500 text-xs mb-10 max-w-[280px] leading-relaxed font-medium">Establish a secure OAuth handshake to activate the Nova neural sync engine.</p>
                        <div className="flex flex-col gap-4 w-full px-12">
                           <button onClick={handleConnectGmail} className="py-4 rounded-2xl bg-orange-500 text-white text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">Connect Gmail</button>
                           <button onClick={handleConnectOutlook} className="py-4 rounded-2xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">Connect Outlook</button>
                        </div>
                      </div>
                    ) : isLoadingInbox ? (
                      <div className="flex flex-col items-center justify-center h-full space-y-8">
                        <div className="relative">
                           <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-20 animate-pulse"></div>
                           <Loader2 className="w-12 h-12 text-orange-500 animate-spin relative z-10" />
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Calibrating Clusters...</span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {mergedInbox.map((msg, i) => (
                          <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-orange-500/20 hover:bg-white/[0.04] transition-all group cursor-default">
                            <div className="flex items-center gap-6">
                               <div className={`w-12 h-12 rounded-2xl ${msg.type === 'gmail' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                  <ShieldCheck className="w-6 h-6" />
                               </div>
                               <div className="overflow-hidden">
                                 <div className="text-xs font-black text-white tracking-tight truncate max-w-[200px] mb-1">{msg.subject}</div>
                                 <div className="text-[10px] text-slate-600 font-bold truncate max-w-[200px] uppercase tracking-widest italic">{msg.type === 'gmail' ? 'Google Node' : 'Microsoft Node'} • {msg.from}</div>
                               </div>
                            </div>
                            <div className="text-[9px] text-slate-500 font-black whitespace-nowrap bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">{msg.date}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'milestones' && (
                  <div className="space-y-6 animate-in slide-in-from-right-10 duration-700">
                    <div className="flex items-center justify-between px-2 mb-4">
                       <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Operational Status</h3>
                       <div className="px-3 py-1.5 rounded-xl bg-orange-500/10 text-orange-500 text-[10px] font-black border border-orange-500/20">3 / 12 ACTIVE</div>
                    </div>
                    {allAchievements.map((achievement) => (
                      <div key={achievement.id} className="p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-orange-500/30 hover:bg-white/[0.05] transition-all group">
                        <AchievementBadge achievement={achievement} size="sm" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="px-10 py-6 bg-white/[0.01] border-t border-white/5 flex items-center justify-between text-[10px] font-black text-slate-600 tracking-[0.2em] uppercase">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                    14 Global Nodes Active
                 </div>
                 <div className="flex items-center gap-3">
                    Nova Core 4.2.1-Stable
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
