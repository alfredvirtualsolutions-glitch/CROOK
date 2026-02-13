import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Activity, ShieldCheck, AlertCircle } from 'lucide-react';

export default function GmailCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setError('Authorization was denied or failed');
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    if (!code) {
      setError('No authorization code received');
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    // In a real production app, you'd exchange the code on the backend.
    // For this prototype, we simulate a successful exchange and storage.
    const handleExchange = async () => {
        try {
            await new Promise(r => setTimeout(r, 2000)); // Simulate network latency
            localStorage.setItem('gmail_token', 'mock_access_token_' + Date.now());
            setIsSuccess(true);
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            console.error(err);
            setError('Failed to connect Gmail account');
            setTimeout(() => navigate('/'), 3000);
        }
    };

    handleExchange();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="glass-panel max-w-md w-full p-10 rounded-[2.5rem] border border-white/10 text-center relative z-10">
        {error ? (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Connection Failed</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{error}</p>
            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black uppercase text-slate-500 tracking-widest">
              <div className="w-1 h-1 rounded-full bg-slate-500 animate-pulse" />
              Redirecting to Core
            </div>
          </div>
        ) : isSuccess ? (
          <div className="animate-in fade-in zoom-in duration-500">
             <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-green-500/20">
              <ShieldCheck className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Sync Established</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Your inbox infrastructure is now successfully synchronized with Nova Core.</p>
            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black uppercase text-green-500 tracking-widest">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              Launching Dashboard
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-orange-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-orange-500/20 relative">
               <Activity className="w-10 h-10 text-orange-500 animate-pulse" />
               <div className="absolute inset-0 border-2 border-orange-500/30 rounded-3xl animate-ping" style={{ animationDuration: '2s' }} />
            </div>
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Connecting Gmail</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Please wait while we perform the initial handshake with Nova's warm-up clusters...</p>
            <div className="mt-8 space-y-2">
               <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-1/3 animate-[loading_2s_ease-in-out_infinite]" style={{
                      animationName: 'loading-bar'
                  }} />
                  <style>{`
                    @keyframes loading-bar {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(300%); }
                    }
                  `}</style>
               </div>
               <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">Neural Exchange in progress</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}