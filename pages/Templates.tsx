import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  FileText, 
  Sparkles, 
  Plus, 
  Search, 
  Edit3, 
  Trash2,
  Copy,
  Wand2,
  Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export default function Templates() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [templates, setTemplates] = useState([
    { id: '1', title: 'Professional Follow-up', subject: 'Re: Next steps on our collaboration', content: 'Hi {{name}}, just wanted to check in on our previous conversation...', category: 'Sales' },
    { id: '2', title: 'Technical Inquiry', subject: 'Question regarding infrastructure scaling', content: 'Team, we are seeing some interesting metrics in the latest cluster...', category: 'Tech' },
  ]);

  const generateWithAI = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Generate a realistic, short, and professional business email template for email warm-up purposes. It should look like a genuine human inquiry. Return as JSON with 'subject' and 'body' fields.",
        config: { responseMimeType: "application/json" }
      });
      
      const result = JSON.parse(response.text);
      const newTemplate = {
        id: Date.now().toString(),
        title: 'AI Generated Template',
        subject: result.subject,
        content: result.body,
        category: 'AI Core'
      };
      setTemplates([newTemplate, ...templates]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center justify-between">
           <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Interaction Library</h1>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">Managing 14 Active Seed Sequences</p>
           </div>
           <div className="flex gap-4">
              <button 
                onClick={generateWithAI}
                disabled={isGenerating}
                className="px-6 py-3 bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-orange-500/20 hover:bg-orange-400 active:scale-95 transition-all flex items-center gap-2"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                Nova AI Generate
              </button>
              <button className="px-6 py-3 bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Manual Entry
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {templates.map(template => (
             <div key={template.id} className="glass-panel rounded-[2.5rem] p-8 border border-white/5 hover:border-orange-500/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white"><Edit3 className="w-4 h-4" /></button>
                   <button className="p-2 bg-red-500/10 rounded-lg text-red-400 hover:bg-red-500/20"><Trash2 className="w-4 h-4" /></button>
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-orange-500">
                      <FileText className="w-5 h-5" />
                   </div>
                   <div>
                      <h4 className="text-sm font-black text-white uppercase tracking-tight">{template.title}</h4>
                      <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest">{template.category}</span>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Subject</div>
                      <div className="text-[10px] font-bold text-slate-300">{template.subject}</div>
                   </div>
                   <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 h-24 overflow-hidden relative">
                      <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Interaction Sample</div>
                      <div className="text-[10px] font-medium text-slate-400 leading-relaxed italic">{template.content}</div>
                      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-950/40 to-transparent" />
                   </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/5">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">In Rotation</span>
                   </div>
                   <button className="flex items-center gap-2 text-[8px] font-black text-slate-500 uppercase tracking-widest hover:text-orange-500 transition-colors">
                      <Copy className="w-3 h-3" />
                      Duplicate
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </DashboardLayout>
  );
}