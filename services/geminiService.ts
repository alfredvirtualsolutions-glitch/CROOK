
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

// Fix: Initialize GoogleGenAI with process.env.API_KEY directly as per requirements
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (prompt: string, history: Message[] = []) => {
  try {
    const model = 'gemini-3-flash-preview';
    
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: `You are Nova, the Elite Deliverability Assistant for Warm Mail. 
        Your tone is professional, authoritative, and helpful. 
        You specialize in:
        1. Email warm-up strategies.
        2. Bypassing spam filters (SpamAssassin, Barracuda, etc.).
        3. Improving sender reputation.
        4. Technical setups like SPF, DKIM, and DMARC.
        
        Always provide actionable advice and keep responses concise. You are part of an elite platform, so act like a high-level consultant.`,
        temperature: 0.6,
        topP: 0.9,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
