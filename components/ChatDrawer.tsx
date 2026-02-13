import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, Mic, MicOff, Volume2 } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { Message } from '../types';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';

const ChatDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! I'm Nova, your Elite Deliverability Assistant. How can I help you scale your outreach today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Voice State Refs
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(input, messages);
      setMessages(prev => [...prev, { role: 'model', content: response || 'Sorry, I encountered an error.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "I'm having trouble connecting to the network. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const startVoiceMode = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const inputContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsVoiceActive(true);
            const source = inputContext.createMediaStreamSource(stream);
            const scriptProcessor = inputContext.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && audioContextRef.current) {
              const ctx = audioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => setIsVoiceActive(false),
          onerror: () => setIsVoiceActive(false),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
          systemInstruction: 'You are Nova, an elite deliverability AI. Speak concisely and authoritatively. You are in a live voice conversation.'
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Voice Mode Error:", err);
      setIsVoiceActive(false);
    }
  };

  const stopVoiceMode = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    setIsVoiceActive(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-orange-500 text-white shadow-2xl shadow-orange-500/40 hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat with Nova AI
        </span>
      </button>

      <div className={`fixed inset-y-0 right-0 w-full max-w-md z-[60] glass-panel border-l border-white/10 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full bg-slate-950/80 backdrop-blur-3xl">
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center relative overflow-hidden">
                {isVoiceActive && <div className="absolute inset-0 bg-white/20 animate-ping" />}
                <Sparkles className="w-6 h-6 text-white relative z-10" />
              </div>
              <div>
                <h3 className="font-bold text-white tracking-tight">Nova Assistant</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Powered by Gemini Pro</span>
                  {isVoiceActive && <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={isVoiceActive ? stopVoiceMode : startVoiceMode}
                className={`p-2.5 rounded-xl transition-all ${isVoiceActive ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-orange-500/10 text-orange-400 hover:bg-orange-500/20'}`}
                title={isVoiceActive ? "Stop Voice Mode" : "Start Voice Conversation"}
              >
                {isVoiceActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth no-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${msg.role === 'user' ? 'bg-orange-500/20 text-orange-400' : 'bg-white/10 text-slate-400'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-orange-500 text-white font-medium shadow-lg' : 'bg-white/5 border border-white/10 text-slate-300'}`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center animate-pulse">
                    <Bot className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
            {isVoiceActive && (
              <div className="flex flex-col items-center justify-center py-8 space-y-4 animate-in fade-in">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1 h-8 bg-orange-500/50 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <p className="text-[10px] font-black uppercase text-orange-500 tracking-[0.3em]">Live Voice Active</p>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-white/10 bg-slate-950/50">
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Nova about deliverability..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors placeholder:text-slate-600"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 rounded-lg text-white disabled:opacity-50 disabled:grayscale transition-all shadow-lg"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatDrawer;
