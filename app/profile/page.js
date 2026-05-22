"use client";

import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { GlassInput } from "@/components/ui/glass-input";
import { Button } from "@/components/ui/button";
import { Edit2, Save, MapPin, Zap, Battery, Award, Activity } from "lucide-react";
import { useState } from "react";
import useAuthStore from "@/store/useAuthStore";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app we would upload to Cloudinary here
      // For now, we mock the upload by creating a local blob URL
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <AnimatedPage className="space-y-6 pb-20">
      {/* Banner & Avatar Profile Card */}
      <div className="relative w-full rounded-3xl overflow-hidden glass-card border border-primary/20">
        <div className="h-48 w-full bg-gradient-to-r from-purple-900/60 via-primary/40 to-indigo-900/60 relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        
        <div className="px-6 md:px-10 pb-8 relative -mt-16 flex flex-col md:flex-row gap-6 md:items-end">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-background bg-secondary/50 backdrop-blur-md overflow-hidden relative z-10 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/40 to-purple-800/40 flex items-center justify-center text-4xl font-bold text-white">
                  JD
                </div>
              )}
            </div>
            <label className="absolute bottom-0 right-0 z-20 bg-primary rounded-full p-2 text-white hover:bg-primary/90 transition shadow-lg cursor-pointer">
              <Edit2 className="h-4 w-4" />
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload} 
              />
            </label>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold neon-text">John Doe</h1>
            <p className="text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-4 w-4" /> New York, NY
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant={isEditing ? "default" : "outline"}
              onClick={() => setIsEditing(!isEditing)}
              className={isEditing ? "bg-green-600 hover:bg-green-700 text-white border-none shadow-[0_0_15px_rgba(22,163,74,0.4)]" : "border-primary/50 text-primary"}
            >
              {isEditing ? (
                <><Save className="mr-2 h-4 w-4" /> Save Profile</>
              ) : (
                <><Edit2 className="mr-2 h-4 w-4" /> Edit Profile</>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <User className="h-4 w-4 text-primary" />
              </div>
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
                <GlassInput defaultValue="John Doe" disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
                <GlassInput defaultValue="john.doe@example.com" disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Phone Number</label>
                <GlassInput defaultValue="+1 (555) 123-4567" disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Emergency Contact</label>
                <GlassInput defaultValue="Jane Doe - +1 (555) 987-6543" disabled={!isEditing} />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/5 relative overflow-hidden">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                <Zap className="h-4 w-4 text-purple-400" />
              </div>
              Vehicle Details
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Mock EV Image */}
              <div className="w-full md:w-1/3 h-40 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-70"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <span className="relative z-10 font-bold text-xl text-white/90 drop-shadow-md tracking-widest">TESLA</span>
              </div>
              
              <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Brand</span>
                  <p className="font-semibold text-lg text-white">Tesla</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Model</span>
                  <p className="font-semibold text-lg text-white">Model 3 Long Range</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Port Type</span>
                  <div className="inline-flex items-center px-2 py-1 rounded bg-primary/20 text-primary text-xs font-bold border border-primary/30">
                    NACS
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Max Charge Rate</span>
                  <p className="font-semibold text-lg text-white">250 kW</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-primary/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/30 rounded-full blur-[40px] pointer-events-none" />
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" /> Lifetime Stats
            </h2>
            
            <div className="space-y-4">
              <div className="bg-background/40 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                    <Battery className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Energy Charged</span>
                </div>
                <span className="font-bold text-lg text-white">1,245 kWh</span>
              </div>
              
              <div className="bg-background/40 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-green-500/20 text-green-400">
                    <Award className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">CO₂ Saved</span>
                </div>
                <span className="font-bold text-lg text-white">850 kg</span>
              </div>

              <div className="bg-background/40 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                    <Zap className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Total Sessions</span>
                </div>
                <span className="font-bold text-lg text-white">42</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/5">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-left bg-white/5 border-white/10 hover:bg-white/10 transition-colors h-12 rounded-xl">
                Payment Methods
              </Button>
              <Button variant="outline" className="w-full justify-start text-left bg-white/5 border-white/10 hover:bg-white/10 transition-colors h-12 rounded-xl">
                Notification Preferences
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  useAuthStore.getState().logout();
                  window.location.href = '/login';
                }}
                className="w-full justify-start text-left bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20 transition-colors h-12 rounded-xl"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

function User(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
