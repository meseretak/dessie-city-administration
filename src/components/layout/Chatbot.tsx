"use client"
import React, { useState } from 'react';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Chatbot() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: 'Welcome to Dessie City! 🏛️' },
    { role: 'bot', text: 'I can help you with services, news, vacancies, bids, tourism, and more. Ask me anything!' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setChatLoading(true);
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, sessionId: 'main-chat' }),
      });
      const data = await res.json();
      setChatMessages((prev) => [...prev, { role: 'bot', text: data.response || 'Sorry, I could not process that.' }]);
    } catch {
      setChatMessages((prev) => [...prev, { role: 'bot', text: 'I\'m having trouble connecting. Please call +251 33 111 0000 for assistance.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="glass chat-widget w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 border border-white/20 bg-white dark:bg-[#0a1a0e]"
          >
            {/* Chat Header */}
            <div className="bg-[#1a6b3c] p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-white" />
                <span className="text-white font-semibold text-sm">Dessie City AI</span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#1a6b3c] text-white rounded-br-md'
                        : 'bg-[#f0fdf4] dark:bg-[#112a18] text-foreground rounded-bl-md border border-[#1a6b3c]/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-border/30 flex gap-2 shrink-0 bg-white dark:bg-[#0a1a0e]">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                placeholder="Type a message..."
                className="h-9 text-sm"
              />
              <Button
                size="icon"
                className="h-9 w-9 bg-[#1a6b3c] hover:bg-[#0d4a28] shrink-0 disabled:opacity-50"
                onClick={sendChat}
                disabled={chatLoading}
                aria-label="Send message"
              >
                {chatLoading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      {!chatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-14 h-14 rounded-full bg-[#1a6b3c] hover:bg-[#0d4a28] text-white shadow-lg shadow-[#1a6b3c]/30 flex items-center justify-center animate-chat-bounce transition-colors"
          onClick={() => setChatOpen(true)}
          aria-label="Open AI assistant"
        >
          <Bot className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}
