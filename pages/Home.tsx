import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LogoCloud from '../components/LogoCloud';
import Stats from '../components/Stats';
import Features from '../components/Features';
import ChatDrawer from '../components/ChatDrawer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-orange-500/30">
      <Navbar />
      
      <main>
        <Hero />
        <LogoCloud />
        <Stats />
        <Features />
        
        {/* Call to Action Section */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto glass-panel rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-orange-500/20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 to-transparent pointer-events-none"></div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              Ready to ignite your <br/> <span className="text-orange-500">outreach engine?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
              Join 2,500+ elite marketing teams who trust Warm Mail for their critical campaign delivery.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-10 py-5 bg-orange-500 text-white font-bold rounded-2xl shadow-2xl shadow-orange-500/40 hover:bg-orange-400 hover:scale-105 transition-all w-full sm:w-auto uppercase tracking-widest text-sm">
                Get Started Now
              </button>
              <button className="px-10 py-5 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all w-full sm:w-auto uppercase tracking-widest text-sm">
                Book a Demo
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="relative z-10 py-24 px-8 border-t border-white/5 bg-slate-950/50 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-white shadow-lg shadow-orange-500/20">W</div>
               <span className="text-2xl font-bold text-white tracking-tighter uppercase italic">Warm Mail</span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              The world's leading email warm-up and deliverability infrastructure for high-performance sales teams.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Warm-up Engine</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Analytics Pro</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Warm Ambient Decorations */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-orange-900/5 blur-[150px] -z-10 rounded-full opacity-50"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-red-900/5 blur-[150px] -z-10 rounded-full opacity-30"></div>

      <ChatDrawer />
    </div>
  );
}