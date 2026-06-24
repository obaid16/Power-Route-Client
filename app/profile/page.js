"use client";

import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { GlassInput } from "@/components/ui/glass-input";
import { Button } from "@/components/ui/button";
import { Edit2, Save, MapPin, Zap, Battery, Award, Activity, User, Cpu, Sparkles, Shield, Wallet, Settings, LogOut, Leaf, Calendar, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "Volt Captain",
    email: user?.email || "captain@poweroute.com",
    phone: user?.phone || "+91 99887 76655",
    emergencyContact: user?.emergencyContact || "+91 99999 88888"
  });

  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "Volt Captain",
        email: user.email || "captain@poweroute.com",
        phone: user.phone || "+91 99887 76655",
        emergencyContact: user.emergencyContact || "+91 99999 88888"
      });
    }
  }, [user]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Simulate updating auth store if needed, but for now we just show success
    alert("Profile credentials updated successfully!");
  };

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AnimatedPage className="min-h-screen bg-[#F4F2FA] dark:bg-[#06020E] text-foreground pb-20 transition-colors duration-300">
      <AnimatedPage stagger className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 mt-4 font-sans">
        
        {/* Connection Telemetry Header Banner */}
        <div className="relative w-full rounded-[32px] overflow-hidden bg-gradient-to-br from-[#0a0518] via-[#12072B] to-[#0A0314] border border-[#6E38F7]/20 p-6 md:p-8 shadow-2xl">
          {/* High-tech tech grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.04)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_90%)] pointer-events-none" />
          
          {/* Glowing neon blurred lights */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-[#6E38F7]/10 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[70px] pointer-events-none" />

          {/* Technical Corner Brackets */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-primary/30 rounded-tl pointer-events-none" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary/30 rounded-tr pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary/30 rounded-bl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-primary/30 rounded-br pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-end justify-between relative z-10">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-end text-center md:text-left">
              {/* Pulsating Avatar Container */}
              <div className="relative group">
                <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping opacity-30 pointer-events-none"></div>
                <div className="absolute -inset-1 border border-[#6E38F7]/50 rounded-full shadow-[0_0_20px_rgba(110,56,247,0.4)] animate-pulse pointer-events-none"></div>
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-black/20 dark:border-white/10 bg-secondary/40 backdrop-blur-md overflow-hidden relative z-10 shadow-xl">
                  {profileImage ? (
                    <Image src={profileImage} alt="Profile Avatar" width={128} height={128} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#8B5CF6] to-[#5B21B6] flex items-center justify-center text-4xl font-black text-white uppercase tracking-wider">
                      {formData.name.charAt(0)}
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 z-20 bg-primary hover:bg-primary/90 text-white rounded-full p-2 shadow-lg cursor-pointer transition-transform hover:scale-110">
                  <Edit2 className="h-4 w-4" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>

              {/* Driver Details */}
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <h1 className="text-3xl font-extrabold tracking-tight text-white">{formData.name}</h1>
                  <span className="inline-flex items-center gap-1 bg-[#6E38F7]/20 text-primary dark:text-[#A87BFF] px-3.5 py-1 rounded-full text-xs font-bold border border-primary/30 shadow-[0_2px_10px_rgba(110,56,247,0.1)] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Volt Captain
                  </span>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-1.5 text-sm text-white/70">
                  <p className="flex items-center gap-1"><MapPin className="h-4 w-4 text-primary" /> New York, NY</p>
                  <p className="hidden sm:block text-white/40">•</p>
                  <p className="flex items-center gap-1"><Calendar className="h-4 w-4 text-primary" /> Member Since May 2024</p>
                </div>
              </div>
            </div>

            {/* Quick Header Summary stats (Desktop only) */}
            <div className="hidden lg:flex items-center gap-8 border-l border-white/10 pl-8 text-white">
              <div className="text-center">
                <p className="text-[10px] text-white/60 uppercase tracking-widest font-semibold mb-1">Fleet Tier</p>
                <h4 className="text-xl font-black">Elite Pioneer</h4>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-white/60 uppercase tracking-widest font-semibold mb-1">Charging Rank</p>
                <h4 className="text-xl font-black text-primary dark:text-[#A87BFF]">Top 5%</h4>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-white/60 uppercase tracking-widest font-semibold mb-1">Net Savings</p>
                <h4 className="text-xl font-black text-green-400">₹4,500</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Cockpit Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Credentials & Connected Vehicle HUD */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Credentials Card */}
            <div className="glass-card rounded-[32px] p-6 md:p-8 border border-black/5 dark:border-white/5 relative overflow-hidden bg-white/40 dark:bg-[#110822]/40 backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] pointer-events-none" />
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mr-3 border border-primary/20">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  Driver Credentials
                </h2>
                <Button 
                  variant={isEditing ? "default" : "outline"}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  className={isEditing ? "bg-green-600 hover:bg-green-700 text-white border-none shadow-[0_0_15px_rgba(22,163,74,0.4)] px-6 rounded-xl" : "border-primary/40 text-primary hover:bg-primary/5 px-6 rounded-xl"}
                >
                  {isEditing ? (
                    <><Save className="mr-2 h-4 w-4" /> Save Details</>
                  ) : (
                    <><Edit2 className="mr-2 h-4 w-4" /> Edit Credentials</>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Full Name</label>
                  <GlassInput value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} disabled={!isEditing} placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Email Address</label>
                  <GlassInput type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={!isEditing} placeholder="Enter email" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Phone Number</label>
                  <GlassInput value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} disabled={!isEditing} placeholder="Add phone number" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Emergency SOS Contact</label>
                  <GlassInput value={formData.emergencyContact} onChange={e => setFormData({...formData, emergencyContact: e.target.value})} disabled={!isEditing} placeholder="Add emergency contact" />
                </div>
              </div>
            </div>

            {/* Connected Vehicle HUD */}
            <div className="glass-card rounded-[32px] p-6 md:p-8 border border-black/5 dark:border-white/5 bg-white/40 dark:bg-[#110822]/40 backdrop-blur-md relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] pointer-events-none" />
              
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mr-3 border border-primary/20">
                  <Cpu className="h-4 w-4 text-primary" />
                </div>
                Connected Vehicle Cockpit
              </h2>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Visual HUD Car Container */}
                <div className="w-full md:w-2/5 h-44 rounded-[24px] bg-gradient-to-br from-[#0B0516] via-[#12072B] to-[#0A0314] border border-[#6E38F7]/20 flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(110,56,247,0.3)] shrink-0">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.04)_1px,transparent_1px)] bg-[size:12px_12px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" />
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-65"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0516]/90 to-transparent"></div>
                  <span className="relative z-10 font-black text-2xl text-white/90 tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">TESLA</span>
                  <p className="relative z-10 text-[9px] font-bold font-mono text-primary tracking-widest mt-1 uppercase">Model 3 Connected</p>
                </div>
                
                {/* Telematics details */}
                <div className="w-full md:w-3/5 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <div className="space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Brand & Model</span>
                    <p className="font-bold text-foreground dark:text-gray-200">Tesla Model 3 LR</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Port Spec</span>
                    <div className="pt-0.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
                        NACS Standard
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Max DC Rate</span>
                    <p className="font-bold text-foreground dark:text-gray-200">250 kW</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Battery Capacity</span>
                    <p className="font-bold text-foreground dark:text-gray-200">82.0 kWh</p>
                  </div>
                  <div className="col-span-2 space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-muted-foreground uppercase tracking-widest">Cell Integrity (SOH)</span>
                      <span className="text-green-500">98% Perfect</span>
                    </div>
                    <div className="h-2 w-full bg-black/5 dark:bg-[#1C1238] rounded-full overflow-hidden p-[2px]">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 w-[98%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Eco Telemetry Metrics & Command Control Panel */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Eco Telemetry stats */}
            <div className="glass-card rounded-[32px] p-6 md:p-8 border border-primary/20 shadow-[0_0_30px_rgba(168,85,247,0.1)] relative overflow-hidden bg-white/40 dark:bg-[#110822]/40 backdrop-blur-md">
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-[45px] pointer-events-none" />
              
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mr-3 border border-primary/20">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                Driver Telemetry
              </h2>
              
              <div className="space-y-4">
                {/* Energy Charged */}
                <div className="bg-background/30 rounded-2xl p-4 border border-black/5 dark:border-white/5 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                      <Battery className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Energy Charged</span>
                      <p className="text-[10px] text-muted-foreground/70 mt-0.5">Lifetime grid intake</p>
                    </div>
                  </div>
                  <span className="font-black text-lg text-foreground dark:text-gray-200">1,245 <span className="text-xs font-bold text-muted-foreground">kWh</span></span>
                </div>
                
                {/* CO2 Saved */}
                <div className="bg-background/30 rounded-2xl p-4 border border-black/5 dark:border-white/5 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20">
                      <Leaf className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">CO₂ Saved</span>
                      <p className="text-[10px] text-green-500 font-bold mt-0.5">Equivalent to 71 trees</p>
                    </div>
                  </div>
                  <span className="font-black text-lg text-foreground dark:text-gray-200">850 <span className="text-xs font-bold text-muted-foreground">kg</span></span>
                </div>

                {/* Total Sessions */}
                <div className="bg-background/30 rounded-2xl p-4 border border-black/5 dark:border-white/5 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#A87BFF]/10 text-[#A87BFF] border border-[#A87BFF]/20">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Sessions</span>
                      <p className="text-[10px] text-muted-foreground/70 mt-0.5">Successful grid bookings</p>
                    </div>
                  </div>
                  <span className="font-black text-lg text-foreground dark:text-gray-200">42 <span className="text-xs font-bold text-muted-foreground">slots</span></span>
                </div>
              </div>
            </div>

            {/* Control Panel Grid */}
            <div className="glass-card rounded-[32px] p-6 md:p-8 border border-black/5 dark:border-white/5 bg-white/40 dark:bg-[#110822]/40 backdrop-blur-md relative overflow-hidden">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mr-3 border border-primary/20">
                  <Settings className="h-4 w-4 text-primary" />
                </div>
                Control Center
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <Link href="/wallet" className="group cursor-pointer p-4 rounded-2xl border border-black/10 dark:border-white/5 bg-background/30 hover:border-primary/40 dark:hover:border-primary/50 flex flex-col justify-between h-28 transition-all duration-300 hover:scale-[1.03]">
                  <div className="w-9 h-9 rounded-xl bg-[#6E38F7]/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Wallet className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>Wallet & Cards</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>

                <Link href="/analytics" className="group cursor-pointer p-4 rounded-2xl border border-black/10 dark:border-white/5 bg-background/30 hover:border-primary/40 dark:hover:border-primary/50 flex flex-col justify-between h-28 transition-all duration-300 hover:scale-[1.03]">
                  <div className="w-9 h-9 rounded-xl bg-[#6E38F7]/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Activity className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>Telematics</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>

                <Link href="/settings" className="group cursor-pointer p-4 rounded-2xl border border-black/10 dark:border-white/5 bg-background/30 hover:border-primary/40 dark:hover:border-primary/50 flex flex-col justify-between h-28 transition-all duration-300 hover:scale-[1.03]">
                  <div className="w-9 h-9 rounded-xl bg-[#6E38F7]/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Settings className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>Preferences</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>

                <button 
                  onClick={() => {
                    useAuthStore.getState().logout();
                    window.location.href = '/login';
                  }}
                  className="group cursor-pointer p-4 rounded-2xl border border-red-500/20 bg-red-500/5 hover:border-red-500/40 hover:bg-red-500/10 flex flex-col justify-between h-28 text-left transition-all duration-300 hover:scale-[1.03]"
                >
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                    <LogOut className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-red-500">
                    <span>Sign Out</span>
                    <ChevronRight className="w-3.5 h-3.5 text-red-500" />
                  </div>
                </button>
              </div>
            </div>

          </div>

        </div>

      </AnimatedPage>
    </AnimatedPage>
  );
}
