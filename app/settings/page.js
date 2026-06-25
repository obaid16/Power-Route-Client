"use client";

import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Bell, Shield, CreditCard, Moon, Volume2, Globe, Cpu } from "lucide-react";
import { GlassSelect } from "@/components/ui/glass-select";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useSettingsStore from "@/store/useSettingsStore";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("preferences");

  const {
    voiceFeedback,
    setVoiceFeedback,
    wakeWord,
    setWakeWord,
    chargingComplete,
    setChargingComplete,
    bookingReminders,
    setBookingReminders,
    priceDrops,
    setPriceDrops,
    safetyAlerts,
    setSafetyAlerts
  } = useSettingsStore();

  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));
  }, []);

  return (
    <AnimatedPage stagger className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 pb-20">
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
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("preferences")}
            className={`w-full justify-start ${activeTab === 'preferences' ? 'text-primary bg-primary/10 hover:bg-primary/20' : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground'}`}
          >
            <Cpu className="mr-3 h-5 w-5" /> Preferences
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("notifications")}
            className={`w-full justify-start ${activeTab === 'notifications' ? 'text-primary bg-primary/10 hover:bg-primary/20' : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground'}`}
          >
            <Bell className="mr-3 h-5 w-5" /> Notifications
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("security")}
            className={`w-full justify-start ${activeTab === 'security' ? 'text-primary bg-primary/10 hover:bg-primary/20' : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground'}`}
          >
            <Shield className="mr-3 h-5 w-5" /> Security
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("payment")}
            className={`w-full justify-start ${activeTab === 'payment' ? 'text-primary bg-primary/10 hover:bg-primary/20' : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground'}`}
          >
            <CreditCard className="mr-3 h-5 w-5" /> Payment Methods
          </Button>
        </div>

        {/* Settings Content Area */}
        <div className="md:col-span-2 space-y-6">
          
          {activeTab === 'preferences' && (
            <>
              <div className="glass-card rounded-3xl p-6 border border-black/5 dark:border-white/5">
                <h2 className="text-xl font-bold mb-6 flex items-center border-b border-black/10 dark:border-white/10 pb-4">
                  <Moon className="mr-2 h-5 w-5 text-primary" /> Appearance
                </h2>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Theme Preference</h3>
                    <p className="text-sm text-muted-foreground">Switch between Light and Dark mode.</p>
                  </div>
                  
                  {mounted && (
                    <div className="flex bg-background/50 border border-black/10 dark:border-white/10 rounded-xl p-1 backdrop-blur-sm">
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

              <div className="glass-card rounded-3xl p-6 border border-black/5 dark:border-white/5">
                <h2 className="text-xl font-bold mb-6 flex items-center border-b border-black/10 dark:border-white/10 pb-4">
                  <Volume2 className="mr-2 h-5 w-5 text-primary" /> Voice Assistant
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Voice Feedback</h3>
                      <p className="text-sm text-muted-foreground">Allow AI to speak responses aloud.</p>
                    </div>
                    <button 
                      onClick={() => setVoiceFeedback(!voiceFeedback)}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer border-none",
                        voiceFeedback ? "bg-primary" : "bg-black/10 dark:bg-white/10"
                      )}
                    >
                      <span 
                        className={cn(
                          "inline-block h-4 w-4 rounded-full bg-white transition-transform",
                          voiceFeedback ? "translate-x-6" : "translate-x-1"
                        )} 
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Wake Word</h3>
                      <p className="text-sm text-muted-foreground">Say &quot;Hey Power AI&quot; to activate voice commands.</p>
                    </div>
                    <button 
                      onClick={() => setWakeWord(!wakeWord)}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer border-none",
                        wakeWord ? "bg-primary" : "bg-black/10 dark:bg-white/10"
                      )}
                    >
                      <span 
                        className={cn(
                          "inline-block h-4 w-4 rounded-full bg-white transition-transform",
                          wakeWord ? "translate-x-6" : "translate-x-1"
                        )} 
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-6 border border-black/5 dark:border-white/5">
                <h2 className="text-xl font-bold mb-6 flex items-center border-b border-black/10 dark:border-white/10 pb-4">
                  <Globe className="mr-2 h-5 w-5 text-primary" /> Regional
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground block mb-2">Distance Unit</label>
                    <GlassSelect
                      name="distanceUnit"
                      value="km"
                      options={[
                        { value: "km", label: "Kilometers (km)" },
                      ]}
                      className="md:w-1/2"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <div className="glass-card rounded-3xl p-6 border border-black/5 dark:border-white/5">
              <h2 className="text-xl font-bold mb-6 flex items-center border-b border-black/10 dark:border-white/10 pb-4">
                <Bell className="mr-2 h-5 w-5 text-primary" /> Notification Preferences
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Charging Complete", desc: "Get notified when your EV reaches target charge", state: chargingComplete, setter: setChargingComplete },
                  { title: "Booking Reminders", desc: "Reminders 15 mins before your reservation", state: bookingReminders, setter: setBookingReminders },
                  { title: "Price Drops", desc: "Alerts when nearby stations have lower rates", state: priceDrops, setter: setPriceDrops },
                  { title: "Safety Alerts", desc: "Critical route warnings and weather updates", state: safetyAlerts, setter: setSafetyAlerts }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => item.setter(!item.state)}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer border-none",
                        item.state ? "bg-primary" : "bg-black/10 dark:bg-white/10"
                      )}
                    >
                      <span 
                        className={cn(
                          "inline-block h-4 w-4 rounded-full bg-white transition-transform",
                          item.state ? "translate-x-6" : "translate-x-1"
                        )} 
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="glass-card rounded-3xl p-6 border border-black/5 dark:border-white/5">
              <h2 className="text-xl font-bold mb-6 flex items-center border-b border-black/10 dark:border-white/10 pb-4">
                <Shield className="mr-2 h-5 w-5 text-primary" /> Security Settings
              </h2>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start text-left bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 h-12 rounded-xl">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start text-left bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 h-12 rounded-xl">
                  Two-Factor Authentication (2FA)
                </Button>
                <Button variant="outline" className="w-full justify-start text-left bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 h-12 rounded-xl">
                  Manage Devices
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="glass-card rounded-3xl p-6 border border-black/5 dark:border-white/5">
              <h2 className="text-xl font-bold mb-6 flex items-center border-b border-black/10 dark:border-white/10 pb-4">
                <CreditCard className="mr-2 h-5 w-5 text-primary" /> Payment Methods
              </h2>
              <div className="space-y-4">
                <div className="bg-background/40 p-4 rounded-xl border border-primary/30 flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-6 bg-black/10 dark:bg-white/10 rounded flex items-center justify-center text-xs font-bold">VISA</div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/28</p>
                    </div>
                  </div>
                  <span className="text-xs text-primary font-bold">DEFAULT</span>
                </div>
                <Button className="w-full h-12 rounded-xl bg-primary/20 text-primary hover:bg-primary/30 border border-primary/50 transition-colors">
                  + Add New Payment Method
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </AnimatedPage>
  );
}
