"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Mic, Send, Minimize2, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I am your PoweRoute AI. How can I assist you with your EV charging today?" }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  
  const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-ai-assistant', handleOpen);
    return () => window.removeEventListener('open-ai-assistant', handleOpen);
  }, []);

  useEffect(() => {
    if (transcript && isListening) {
      setInputText(transcript);
    }
  }, [transcript, isListening]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text = inputText) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setTranscript("");

    try {
      const apiMessages = [...messages, userMsg].map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const res = await api.post('/ai/chat', { messages: apiMessages });
      const aiText = res.data?.data || "Sorry, I couldn't process that.";
      
      setMessages(prev => [...prev, { sender: "ai", text: aiText }]);

      // Free Browser Native TTS
      try {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(aiText);
          utterance.rate = 1.0;
          utterance.pitch = 1.0;
          // You can also try picking a specific voice if you like
          window.speechSynthesis.speak(utterance);
        }
      } catch (voiceErr) {
        console.error("Browser TTS skipped or failed:", voiceErr);
      }
      
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: "ai", text: "Connection error. Make sure the backend is running." }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleListen = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(168,85,247,0.6)] neon-glow relative flex items-center justify-center overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
              <Bot className="h-8 w-8 relative z-10 animate-pulse" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-[400px] h-[600px] max-h-[85vh] flex flex-col rounded-3xl glass-card border border-primary/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden bg-background/80 backdrop-blur-3xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-primary/20 to-transparent flex justify-between items-center relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center neon-glow">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Aura Assistant</h3>
                  <p className="text-xs text-primary font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <div className="flex gap-1 relative z-10">
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full text-muted-foreground hover:text-white">
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full text-muted-foreground hover:text-white">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, idx) => (
                <div key={idx} className={cn("flex", msg.sender === "user" ? "justify-end" : "justify-start")}>
                  <div 
                    className={cn(
                      "max-w-[80%] rounded-2xl p-3 text-sm shadow-md",
                      msg.sender === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-sm" 
                        : "bg-white/10 text-foreground border border-white/5 rounded-tl-sm backdrop-blur-md"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isListening && (
                <div className="flex justify-start">
                   <div className="bg-white/5 border border-primary/30 rounded-2xl p-3 rounded-tl-sm w-16 flex items-center justify-center gap-1">
                      <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 bg-primary rounded-full"></motion.div>
                      <motion.div animate={{ height: [8, 20, 8] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 bg-primary rounded-full"></motion.div>
                      <motion.div animate={{ height: [8, 12, 8] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 bg-primary rounded-full"></motion.div>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-background/50 relative">
              {isListening && (
                <div className="absolute -top-8 left-0 w-full text-center text-xs text-primary animate-pulse font-medium">
                  Listening... Speak now
                </div>
              )}
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={toggleListen}
                  className={cn(
                    "h-12 w-12 shrink-0 rounded-full transition-all border-none",
                    isListening 
                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]" 
                      : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-primary"
                  )}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask AI anything..."
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-full pl-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                  />
                  <Button 
                    size="icon" 
                    onClick={() => handleSendMessage()}
                    className="absolute right-1 top-1 h-10 w-10 rounded-full bg-primary hover:bg-primary/90 text-white"
                  >
                    <Send className="h-4 w-4 ml-0.5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
