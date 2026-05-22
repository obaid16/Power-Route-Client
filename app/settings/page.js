"use client";

import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Bell, Shield, CreditCard, Moon, Volume2, Globe, Cpu } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AnimatedPage className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center neon-glow">
          <SettingsIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight neon-text">Settings</h1>
          <p className="text-muted-foreground">Manage your app preferences and account</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Settings Navigation Sidebar */}
        <div className="md:col-span-1 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-primary bg-primary/10 hover:bg-primary/20">
            <Cpu className="mr-3 h-5 w-5" /> Preferences
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:bg-white/5 hover:text-foreground">
            <Bell className="mr-3 h-5 w-5" /> Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:bg-white/5 hover:text-foreground">
            <Shield className="mr-3 h-5 w-5" /> Security
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:bg-white/5 hover:text-foreground">
            <CreditCard className="mr-3 h-5 w-5" /> Payment Methods
          </Button>
        </div>

        {/* Settings Content Area */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="glass-card rounded-3xl p-6 border border-white/5">
            <h2 className="text-xl font-bold mb-6 flex items-center border-b border-white/10 pb-4">
              <Moon className="mr-2 h-5 w-5 text-primary" /> Appearance
            </h2>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Theme Preference</h3>
                <p className="text-sm text-muted-foreground">Switch between Light and Dark mode.</p>
              </div>
              
              {mounted && (
                <div className="flex bg-background/50 border border-white/10 rounded-xl p-1 backdrop-blur-sm">
                  <button 
                    onClick={() => setTheme("light")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${theme === 'light' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Light
                  </button>
                  <button 
                    onClick={() => setTheme("dark")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${theme === 'dark' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Dark
                  </button>
                  <button 
                    onClick={() => setTheme("system")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${theme === 'system' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    System
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/5">
            <h2 className="text-xl font-bold mb-6 flex items-center border-b border-white/10 pb-4">
              <Volume2 className="mr-2 h-5 w-5 text-primary" /> Voice Assistant
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Voice Feedback</h3>
                  <p className="text-sm text-muted-foreground">Allow AI to speak responses aloud.</p>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none cursor-pointer">
                  <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition-transform" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Wake Word</h3>
                  <p className="text-sm text-muted-foreground">Say "Hey Aura" to activate voice commands.</p>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/10 transition-colors focus:outline-none cursor-pointer">
                  <span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-white transition-transform" />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/5">
            <h2 className="text-xl font-bold mb-6 flex items-center border-b border-white/10 pb-4">
              <Globe className="mr-2 h-5 w-5 text-primary" /> Regional
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">Distance Unit</label>
                <select className="h-10 w-full md:w-1/2 rounded-xl border border-white/10 bg-background/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary backdrop-blur-md appearance-none">
                  <option value="km">Kilometers (km)</option>
                  <option value="mi">Miles (mi)</option>
                </select>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AnimatedPage>
  );
}
