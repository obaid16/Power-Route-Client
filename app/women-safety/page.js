"use client";

import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Shield, Phone, MapPin, Navigation, Map, Hotel, Hospital, Flame, Info, CheckCircle, BellRing, PhoneCall, MessageCircle, MoreVertical, Plus, ChevronRight, AlertTriangle, BatteryCharging, Zap } from "lucide-react";

export default function WomenSafetyPage() {
  const handleSOS = () => {
    alert("🚨 SOS TRIGGERED! Your live location has been shared with your Emergency Contacts and nearby authorities.");
  };

  return (
    <AnimatedPage className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 pb-20 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Shield className="w-8 h-8 text-[#6E38F7]" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white">Women Safety</h1>
          </div>
          <p className="text-muted-foreground text-sm">Your safety is our priority. Stay aware, stay safe.</p>
        </div>
      </div>

      {/* Emergency Section */}
      <div className="bg-gradient-to-br from-white to-[#F3E8FF]/30 dark:from-[#110822] dark:to-[#1A0E38] rounded-3xl p-6 lg:p-8 border border-[#E5E0F1] dark:border-[#2D1B54] relative overflow-hidden shadow-sm">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#6E38F7]/10 dark:from-[#6E38F7]/20 to-transparent pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">
          <div>
            <h2 className="text-2xl font-bold mb-1 text-foreground dark:text-white">In Emergency? We're here for you.</h2>
            <p className="text-muted-foreground text-sm mb-6">Quick access to essential emergency services.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-[#06020E] rounded-2xl p-4 border border-[#E5E0F1] dark:border-[#2D1B54] hover:border-[#6E38F7] transition-all cursor-pointer shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#6E38F7]/10 flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-[#6E38F7]" />
                </div>
                <h3 className="font-bold text-sm">Police</h3>
                <p className="text-xl font-bold text-foreground dark:text-white my-1">100</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Emergency</p>
              </div>

              <div className="bg-white dark:bg-[#06020E] rounded-2xl p-4 border border-[#E5E0F1] dark:border-[#2D1B54] hover:border-red-500 transition-all cursor-pointer shadow-sm">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-3">
                  <Hospital className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-bold text-sm">Ambulance</h3>
                <p className="text-xl font-bold text-foreground dark:text-white my-1">108</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Emergency</p>
              </div>

              <div className="bg-white dark:bg-[#06020E] rounded-2xl p-4 border border-[#E5E0F1] dark:border-[#2D1B54] hover:border-pink-500 transition-all cursor-pointer shadow-sm">
                <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5 text-pink-500" />
                </div>
                <h3 className="font-bold text-sm">Women Helpline</h3>
                <p className="text-xl font-bold text-foreground dark:text-white my-1">1091</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">24/7 Support</p>
              </div>

              <div className="bg-white dark:bg-[#06020E] rounded-2xl p-4 border border-[#E5E0F1] dark:border-[#2D1B54] hover:border-orange-500 transition-all cursor-pointer shadow-sm">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mb-3">
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-bold text-sm">Fire Service</h3>
                <p className="text-xl font-bold text-foreground dark:text-white my-1">101</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Emergency</p>
              </div>
            </div>

            <div className="mt-6 flex justify-center lg:justify-start">
              <button className="text-[#6E38F7] text-sm font-semibold flex items-center gap-1 hover:underline">
                View All Emergency Contacts <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/4 flex flex-col items-center justify-center pt-8 lg:pt-0">
            {/* SOS Siren Button */}
            <button 
              onClick={handleSOS}
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-[#6E38F7] rounded-full blur-[40px] opacity-50 group-hover:opacity-80 animate-pulse transition-opacity"></div>
              <div className="w-32 h-32 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#5B21B6] border-4 border-[#6E38F7] shadow-[0_0_50px_rgba(110,56,247,0.6)] flex items-center justify-center relative z-10 hover:scale-105 transition-transform">
                <BellRing className="w-12 h-12 text-white animate-bounce" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-[#6E38F7]/30 animate-ping pointer-events-none"></div>
            </button>
            <p className="mt-6 text-center text-sm font-bold text-[#6E38F7] dark:text-[#A87BFF]">Share Live Location</p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">My Emergency Contacts</h2>
            <p className="text-sm text-muted-foreground">Add and manage your trusted contacts for quick reach.</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold text-[#6E38F7] bg-[#6E38F7]/10 px-4 py-2 rounded-lg hover:bg-[#6E38F7]/20 transition-colors">
            <Plus className="w-4 h-4" /> Add New Contact
          </button>
        </div>

        <div className="bg-white dark:bg-[#110822] rounded-2xl border border-[#E5E0F1] dark:border-[#2D1B54] divide-y divide-[#E5E0F1] dark:divide-[#2D1B54]">
          {[
            { name: "Priya Sharma", rel: "Sister", phone: "+91 98765 43210", initials: "PS", color: "bg-pink-500" },
            { name: "Rahul Sharma", rel: "Brother", phone: "+91 91234 56789", initials: "RS", color: "bg-blue-500" },
            { name: "Aarav Singh", rel: "Close Friend", phone: "+91 99887 66554", initials: "AS", color: "bg-[#6E38F7]" },
          ].map((contact, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4 w-1/3">
                <div className={`w-10 h-10 rounded-full ${contact.color} flex items-center justify-center text-white font-bold shadow-sm`}>
                  {contact.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{contact.name}</h4>
                  <p className="text-xs text-[#6E38F7] font-medium">{contact.rel}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground w-1/3">
                <PhoneCall className="w-4 h-4" /> {contact.phone}
              </div>
              <div className="flex items-center justify-end gap-3 w-1/3">
                <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-[#6E38F7] hover:border-[#6E38F7] transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-[#6E38F7] hover:border-[#6E38F7] transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          <div className="p-3 flex justify-center">
            <button className="text-[#6E38F7] text-sm font-semibold flex items-center gap-1 hover:underline">
              View All Contacts <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#110822] rounded-2xl p-6 border border-[#E5E0F1] dark:border-[#2D1B54] flex flex-col justify-between group hover:border-[#6E38F7] transition-all shadow-sm">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-[#6E38F7]/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#6E38F7]" />
              </div>
              {/* Little map route mockup */}
              <div className="flex items-center text-[#6E38F7]/40">
                <MapPin className="w-4 h-4" />
                <div className="w-8 h-[2px] bg-dashed border-t-2 border-dashed border-[#6E38F7]/40 mx-1"></div>
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2">Safe Route</h3>
            <p className="text-sm text-muted-foreground">Get the safest routes with well-lit roads, active areas, and verified charging stations.</p>
          </div>
          <button className="mt-6 text-[#6E38F7] text-sm font-semibold flex items-center gap-1 hover:underline">
            Find Safe Route <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white dark:bg-[#110822] rounded-2xl p-6 border border-[#E5E0F1] dark:border-[#2D1B54] flex flex-col justify-between group hover:border-[#6E38F7] transition-all shadow-sm">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-[#6E38F7]/10 flex items-center justify-center">
                <Map className="w-5 h-5 text-[#6E38F7]" />
              </div>
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-[#6E38F7]/20 rounded-full animate-ping"></div>
                <div className="w-2 h-2 bg-[#6E38F7] rounded-full"></div>
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2">Safe Zone View</h3>
            <p className="text-sm text-muted-foreground">Explore safe zones, nearby facilities, and emergency assets around you.</p>
          </div>
          <button className="mt-6 text-[#6E38F7] text-sm font-semibold flex items-center gap-1 hover:underline">
            Open Map <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white dark:bg-[#110822] rounded-2xl p-6 border border-[#E5E0F1] dark:border-[#2D1B54] flex flex-col justify-between group hover:border-[#6E38F7] transition-all shadow-sm">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-[#6E38F7]/10 flex items-center justify-center">
                <Hotel className="w-5 h-5 text-[#6E38F7]" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2">Nearby Safe Places</h3>
            <p className="text-sm text-muted-foreground">Find nearby hotels, cafes, police stations, and hospitals for your safety.</p>
          </div>
          <button className="mt-6 text-[#6E38F7] text-sm font-semibold flex items-center gap-1 hover:underline">
            Explore Places <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Nearby Safe Places List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Nearby Safe Places</h2>
            <p className="text-sm text-muted-foreground">Places you can rely on in your surroundings.</p>
          </div>
          <button className="text-sm font-semibold border border-border px-4 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            View All
          </button>
        </div>

        <div className="bg-white dark:bg-[#110822] rounded-2xl border border-[#E5E0F1] dark:border-[#2D1B54] divide-y divide-[#E5E0F1] dark:divide-[#2D1B54]">
          {[
            { name: "Aurora Superhub", type: "EV Charging Station", icon: Zap, distance: "0.8 km", status: "Open 24/7" },
            { name: "Marina Inn", type: "Hotel", icon: Hotel, distance: "1.2 km", status: "Open" },
            { name: "City General Hospital", type: "Hospital", icon: Hospital, distance: "2.4 km", status: "Open 24/7" },
            { name: "Central Police Station", type: "Police Station", icon: Shield, distance: "1.6 km", status: "Open 24/7" },
          ].map((place, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4 w-2/5">
                <div className="w-10 h-10 rounded-xl bg-[#6E38F7]/10 flex items-center justify-center text-[#6E38F7]">
                  <place.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground dark:text-white group-hover:text-[#6E38F7] transition-colors">{place.name}</h4>
                  <p className="text-xs text-muted-foreground">{place.type}</p>
                </div>
              </div>
              <div className="w-1/5 text-sm text-muted-foreground">
                {place.distance}
              </div>
              <div className="w-1/5 text-sm text-green-500 font-medium">
                {place.status}
              </div>
              <div className="w-1/5 flex justify-end">
                <button className="flex items-center gap-1 text-sm font-medium text-foreground dark:text-white group-hover:text-[#6E38F7] transition-colors">
                  Directions <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Tips */}
      <div className="bg-white dark:bg-[#110822] rounded-2xl p-6 md:p-8 border border-[#E5E0F1] dark:border-[#2D1B54] relative overflow-hidden shadow-sm">
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#6E38F7]/5 rounded-full blur-[60px] pointer-events-none"></div>
        <h2 className="text-xl font-bold mb-1">Safety Tips</h2>
        <p className="text-sm text-muted-foreground mb-8">Simple steps to ensure a safer journey.</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-border/50 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-foreground dark:text-white" />
            </div>
            <p className="text-sm font-medium">Share your live location with your trusted contacts.</p>
          </div>
          
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-border/50 flex items-center justify-center">
              <BatteryCharging className="w-5 h-5 text-foreground dark:text-white" />
            </div>
            <p className="text-sm font-medium">Keep your phone charged and carry a power bank.</p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-border/50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-foreground dark:text-white" />
            </div>
            <p className="text-sm font-medium">Stay in well-lit and crowded areas whenever possible.</p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-border/50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-foreground dark:text-white" />
            </div>
            <p className="text-sm font-medium">Trust your instincts and report anything suspicious.</p>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
