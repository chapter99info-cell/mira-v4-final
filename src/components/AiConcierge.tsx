import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Phone, Sparkles } from 'lucide-react';
import { brandConfig } from '../brandConfig';
import { GoogleGenAI } from "@google/genai";

export const AiConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'สวัสดีค่ะ! ดิฉัน "น้องใจดี" ยินดีให้บริการค่ะ รับอะไรดีคะ? (How can I help you today?)' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = "gemini-3-flash-preview";
      
      const systemInstruction = `
        You are "Nong Jai-Dee", a helpful AI Concierge for ${brandConfig.name}.
        Store Info:
        - Name: ${brandConfig.name}
        - Address: ${brandConfig.location}
        - Phone: ${brandConfig.phone}
        - Opening Hours: 7 Days, 10:00 AM - 8:00 PM
        - Services: ${brandConfig.services.map(s => `${s.name} ($${s.fullPrice})`).join(', ')}
        
        Guidelines:
        1. Be polite, warm, and professional (Thai hospitality style).
        2. When a user wants to book a session, show this link: [BOOK YOUR SESSION](tel:${brandConfig.phone.replace(/\s+/g, '')}) and tell them they can click it to call.
        3. Recommend services based on their needs.
        4. If they ask for location, give them the full address.
        5. Use a mix of Thai and English if appropriate, but prioritize the user's language.
      `;

      const response = await ai.models.generateContent({
        model: model,
        contents: [
          { role: 'user', parts: [{ text: `System: ${systemInstruction}\n\nUser: ${userMessage}` }] }
        ],
      });

      const aiText = response.text || "ขออภัยค่ะ เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้งนะคะ";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "ขออภัยค่ะ ระบบขัดข้องชั่วคราว กรุณาโทรติดต่อเราโดยตรงที่ " + brandConfig.phone }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        animate={{
          boxShadow: ["0px 0px 0px 0px rgba(197, 160, 89, 0.4)", "0px 0px 0px 15px rgba(197, 160, 89, 0)"],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
      >
        <MessageCircle size={32} />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            className="fixed bottom-0 right-0 left-0 md:left-auto md:right-6 md:bottom-24 md:w-96 z-50 bg-white shadow-2xl rounded-t-[2rem] md:rounded-[2rem] border border-primary/10 overflow-hidden flex flex-col h-[80vh] md:h-[600px]"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={20} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg">Chat with Nong Jai-Dee</h3>
                  <p className="text-[10px] uppercase tracking-widest text-white/60">AI Concierge</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-section/30">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white text-earth shadow-sm border border-primary/5 rounded-tl-none'
                  }`}>
                    {msg.text.split('\n').map((line, j) => {
                      // Simple markdown link detection for the tel: link
                      const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/);
                      if (linkMatch) {
                        const [full, label, url] = linkMatch;
                        const parts = line.split(full);
                        return (
                          <p key={j} className="mb-1">
                            {parts[0]}
                            <a href={url} className="text-secondary font-bold underline decoration-2 underline-offset-4 hover:text-sage transition-colors">
                              {label}
                            </a>
                            {parts[1]}
                          </p>
                        );
                      }
                      return <p key={j} className="mb-1">{line}</p>;
                    })}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-primary/5">
                    <div className="flex gap-1">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-primary rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-primary rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-primary/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-section px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-primary text-white p-3 rounded-xl hover:bg-sage transition-colors disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="mt-3 flex justify-center gap-4">
                <a href={`tel:${brandConfig.phone.replace(/\s+/g, '')}`} className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1 hover:text-secondary transition-colors">
                  <Phone size={12} /> Call Us Directly
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
