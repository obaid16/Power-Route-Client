"use client";

import { useState } from "react";
import { 
  Shield, 
  MapPin, 
  PhoneCall, 
  BatteryMedium, 
  Route, 
  Car, 
  AlertTriangle, 
  Building2, 
  Hospital, 
  Train, 
  ChevronDown,
  Star,
  Zap,
  Activity,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WomenSafetyPage() {
  return (
    <div className="min-h-screen bg-[#090412] text-white p-4 md:p-6 lg:p-8 font-sans pb-24 selection:bg-[#6E38F7]/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            
            {/* Hero Card */}
            <div className="bg-gradient-to-br from-[#1A0E38] to-[#110822] rounded-3xl p-6 border border-[#2D1B54] relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#6E38F7]/20 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h1 className="text-2xl font-bold mb-1">Women Safety Mode</h1>
                  <p className="text-[#9AA0A6] text-xs max-w-[200px]">Safe EV navigation and emergency protection for solo and night travel.</p>
                </div>
                <div className="relative">
                  <div className="w-16 h-20 bg-gradient-to-b from-[#6E38F7]/30 to-transparent flex items-center justify-center rounded-xl border border-[#6E38F7]/40 shadow-[0_0_30px_rgba(110,56,247,0.4)]">
                    <Shield className="h-10 w-10 text-[#C4B5FD]" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6 relative z-10">
                <div>
                  <div className="text-xl font-bold">14</div>
                  <div className="text-[10px] text-[#9AA0A6]">Safe stations</div>
                </div>
                <div>
                  <div className="text-xl font-bold">3</div>
                  <div className="text-[10px] text-[#9AA0A6]">Guardians active</div>
                </div>
                <div>
                  <div className="text-xl font-bold">24/7</div>
                  <div className="text-[10px] text-[#9AA0A6]">Live monitoring</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 relative z-10 mb-3">
                <Button onClick={() => alert("🛡️ Women's Safety Mode Activated! Neural Guard is now monitoring your route.")} className="bg-[#6E38F7] hover:bg-[#5a2ce0] text-white rounded-xl text-xs h-10 w-full shadow-[0_0_15px_rgba(110,56,247,0.4)] border border-[#8B5CF6]/50">
                  Activate safety mode
                </Button>
                <Button onClick={() => alert("📍 Live location shared with your trusted contacts.")} className="bg-[#1C1238] hover:bg-[#25184a] text-white rounded-xl text-xs h-10 w-full border border-[#2D1B54]">
                  Share live location
                </Button>
              </div>
              <Button onClick={() => alert("🚨 SOS TRIGGERED! Calling emergency services.")} className="bg-gradient-to-r from-[#9D174D] to-[#BE185D] hover:from-[#831843] hover:to-[#9D174D] text-white rounded-xl text-xs h-10 w-full border border-[#F43F5E]/30 relative z-10 shadow-[0_0_15px_rgba(225,29,72,0.3)]">
                Emergency SOS
              </Button>
            </div>

            {/* Smart Safety Status */}
            <div>
              <div className="mb-3">
                <p className="text-[#6E38F7] text-[10px] font-bold tracking-wider uppercase mb-1">NEURAL GUARD</p>
                <h2 className="text-lg font-semibold">Smart safety status</h2>
                <p className="text-[#9AA0A6] text-xs">Battery, route, stations, traffic, and emergency access at a glance.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Status Cards */}
                <div className="bg-[#130B29] border border-[#2D1B54] rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-[#9AA0A6] mb-1 uppercase">Battery Risk</p>
                    <p className="text-sm font-medium">Moderate</p>
                  </div>
                  <div className="text-[9px] font-bold text-[#F59E0B] bg-[#3B2516] border border-[#78350F] px-2 py-0.5 rounded-full">MOD</div>
                </div>
                <div className="bg-[#130B29] border border-[#2D1B54] rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-[#9AA0A6] mb-1 uppercase">Route Safety</p>
                    <p className="text-sm font-medium">Safe</p>
                  </div>
                  <div className="text-[9px] font-bold text-[#22C55E] bg-[#102B1D] border border-[#14532D] px-2 py-0.5 rounded-full">OK</div>
                </div>
                <div className="bg-[#130B29] border border-[#2D1B54] rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-[#9AA0A6] mb-1 uppercase">Safe Distance</p>
                    <p className="text-sm font-medium">118 km</p>
                  </div>
                  <div className="text-[9px] font-bold text-[#22C55E] bg-[#102B1D] border border-[#14532D] px-2 py-0.5 rounded-full">OK</div>
                </div>
                <div className="bg-[#130B29] border border-[#2D1B54] rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-[#9AA0A6] mb-1 uppercase">Safe Stations</p>
                    <p className="text-sm font-medium">4</p>
                  </div>
                  <div className="text-[9px] font-bold text-[#22C55E] bg-[#102B1D] border border-[#14532D] px-2 py-0.5 rounded-full">OK</div>
                </div>
                <div className="bg-[#130B29] border border-[#2D1B54] rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-[#9AA0A6] mb-1 uppercase">Emergency</p>
                    <p className="text-sm font-medium">High</p>
                  </div>
                  <div className="text-[9px] font-bold text-[#22C55E] bg-[#102B1D] border border-[#14532D] px-2 py-0.5 rounded-full">OK</div>
                </div>
                <div className="bg-[#130B29] border border-[#2D1B54] rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-[#9AA0A6] mb-1 uppercase">Traffic</p>
                    <p className="text-sm font-medium">Low</p>
                  </div>
                  <div className="text-[9px] font-bold text-[#22C55E] bg-[#102B1D] border border-[#14532D] px-2 py-0.5 rounded-full">OK</div>
                </div>
              </div>
              
              <div className="bg-[#130B29]/50 border border-[#2D1B54]/50 rounded-xl p-3">
                <p className="text-[10px] text-[#9AA0A6] uppercase mb-1">RECOMMENDATIONS</p>
                <ul className="text-xs space-y-1 text-[#D1D5DB]">
                  <li className="flex gap-2"><span className="text-[#6E38F7]">•</span> Prefer Aurora Superhub over a shorter isolated stop.</li>
                  <li className="flex gap-2"><span className="text-[#6E38F7]">•</span> Enable live guardian for the next night segment.</li>
                </ul>
              </div>
            </div>

            {/* Verified Safe Charging (Mobile Left Column) */}
            <div className="block lg:hidden">
              <VerifiedChargingList />
            </div>

          </div>

          {/* MIDDLE COLUMN */}
          <div className="space-y-6">
            
            {/* Top Stats */}
            <div>
              <p className="text-[#9AA0A6] text-xs mb-4">Safest path — lit roads, public areas, verified chargers.</p>
              <div className="flex justify-between items-center border-b border-[#2D1B54] pb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#C4B5FD]">94</div>
                  <div className="text-[10px] text-[#9AA0A6]">Safety Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">38m</div>
                  <div className="text-[10px] text-[#9AA0A6]">ETA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F59E0B]">Low</div>
                  <div className="text-[10px] text-[#9AA0A6]">Risk Level</div>
                </div>
              </div>
            </div>

            {/* Nearby Resources */}
            <div className="space-y-3">
              <ResourceRow icon={<Shield className="w-4 h-4 text-[#9AA0A6]" />} name="Police" desc="Central Precinct" dist="1.2 km" />
              <ResourceRow icon={<Hospital className="w-4 h-4 text-[#9AA0A6]" />} name="Hospital" desc="City General ER" dist="2.4 km" />
              <ResourceRow icon={<Building2 className="w-4 h-4 text-[#9AA0A6]" />} name="Hotel" desc="Marina Inn (24h)" dist="0.8 km" />
              <ResourceRow icon={<Train className="w-4 h-4 text-[#9AA0A6]" />} name="Public" desc="Transit hub" dist="0.5 km" />
            </div>

            {/* Night Assistance */}
            <div>
              <h2 className="text-lg font-semibold">Night assistance</h2>
              <p className="text-[#9AA0A6] text-xs mb-3">Tighter thresholds after dark.</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#130B29] border border-[#2D1B54] rounded-xl p-3 relative cursor-pointer hover:bg-[#1A0E38] transition-colors">
                  <p className="text-[10px] text-[#6E38F7] mb-0.5">Low Battery Mode</p>
                  <p className="text-sm font-medium text-[#F59E0B]">Standby</p>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA0A6]" />
                </div>
                <div className="bg-[#130B29] border border-[#2D1B54] rounded-xl p-3 cursor-pointer hover:bg-[#1A0E38] transition-colors">
                  <p className="text-[10px] text-[#9AA0A6] mb-0.5">Shelter Suggestions</p>
                  <p className="text-xs font-medium text-white truncate">Marina Inn • Transit hub</p>
                </div>
              </div>
            </div>

            {/* Risk Analysis */}
            <div>
              <h2 className="text-lg font-semibold">Risk analysis</h2>
              <p className="text-[#9AA0A6] text-xs mb-4">Live composite risk layers.</p>
              
              <div className="space-y-4">
                <ProgressBar label="Battery Risk" percent={34} color="bg-[#6E38F7]" />
                <ProgressBar label="Route Danger (Inverse)" percent={12} color="bg-[#6E38F7]" />
                <ProgressBar label="Charging Access" percent={88} color="bg-[#6E38F7]" />
                <ProgressBar label="Emergency Availability" percent={91} color="bg-[#6E38F7]" />
              </div>
            </div>

            {/* Travel Solo Banner */}
            <div className="bg-gradient-to-r from-[#1A0E38] to-[#130B29] border border-[#2D1B54] rounded-2xl p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              <h3 className="text-lg font-medium mb-1">Travel solo with a safety net</h3>
              <p className="text-xs text-[#9AA0A6] mb-4">Activate Women Safety Mode for night routes and low battery.</p>
              <Button onClick={() => alert("🛡️ Women's Safety Mode Activated! Neural Guard is now monitoring your route.")} className="bg-[#6E38F7] hover:bg-[#5a2ce0] text-white rounded-xl text-sm px-8 h-10 shadow-[0_0_15px_rgba(110,56,247,0.4)]">
                Activate now
              </Button>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            
            {/* Map Mockup */}
            <div>
              <p className="text-[#9AA0A6] text-xs mb-2">Corridors, chargers, and emergency assets.</p>
              <div className="h-64 rounded-2xl bg-[#0F0822] border border-[#2D1B54] relative overflow-hidden flex items-center justify-center">
                {/* Decorative Map Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M10,80 Q30,70 50,50 T90,20" fill="none" stroke="#6E38F7" strokeWidth="0.5" strokeDasharray="2 2" />
                  <path d="M20,20 Q40,40 60,30 T80,80" fill="none" stroke="#6E38F7" strokeWidth="0.2" />
                </svg>
                
                {/* Nodes */}
                <div className="absolute top-[20%] left-[20%] w-6 h-6 rounded-full bg-[#1A0E38] border border-[#6E38F7] flex items-center justify-center shadow-[0_0_10px_rgba(110,56,247,0.5)]">
                  <Zap className="w-3 h-3 text-[#C4B5FD]" />
                </div>
                <div className="absolute top-[40%] right-[30%] w-6 h-6 rounded-full bg-[#1A0E38] border border-[#6E38F7] flex items-center justify-center">
                  <Shield className="w-3 h-3 text-[#C4B5FD]" />
                </div>
                <div className="absolute bottom-[30%] right-[20%] w-5 h-5 rounded-full bg-[#1A0E38] border border-[#6E38F7] flex items-center justify-center">
                  <Hospital className="w-2.5 h-2.5 text-[#C4B5FD]" />
                </div>
                
                {/* Current Location Pin */}
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#6E38F7]/20 flex items-center justify-center animate-pulse">
                    <div className="w-6 h-6 rounded-full bg-[#6E38F7] border-2 border-white flex items-center justify-center shadow-[0_0_20px_rgba(110,56,247,0.8)]">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-3 left-3 flex gap-3 text-[9px] text-[#9AA0A6]">
                  <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#6E38F7]"></span> Safe</div>
                  <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span> Caution</div>
                  <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-white"></span> You</div>
                </div>
              </div>
            </div>

            {/* Safety Reviews */}
            <div>
              <h2 className="text-lg font-semibold">Safety reviews</h2>
              <p className="text-[#9AA0A6] text-xs mb-3">Verified driver experiences.</p>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Button variant="outline" className="h-6 text-[10px] bg-[#2D1B54] border-none text-white hover:bg-[#3d2770]">All</Button>
                  <Button variant="ghost" className="h-6 text-[10px] text-[#9AA0A6] hover:text-white">High trust</Button>
                  <Button variant="ghost" className="h-6 text-[10px] text-[#9AA0A6] hover:text-white">Recent</Button>
                  <Button variant="ghost" className="h-6 text-[10px] text-[#9AA0A6] hover:text-white">Nearby</Button>
                </div>
                <Button onClick={() => alert("📝 Opening review form...")} variant="outline" className="h-6 text-[10px] bg-transparent border-[#6E38F7] text-[#C4B5FD] hover:bg-[#6E38F7]/20">Write a review</Button>
              </div>

              <div className="space-y-3">
                <ReviewCard 
                  name="Priya Sharma" 
                  location="Aurora Superhub - Bayfront" 
                  text="Well-lit lot, security guard visible. Felt safe charging alone at 11pm." 
                  verified={true}
                  rating={5}
                />
                <ReviewCard 
                  name="Sneha Iyer" 
                  location="Marina Bay Point" 
                  text="CCTV all around and staff available. Very reassuring experience." 
                  verified={true}
                  rating={5}
                />
              </div>
            </div>

            {/* Verified Safe Charging (Desktop Right Column) */}
            <div className="hidden lg:block">
              <VerifiedChargingList />
            </div>

          </div>
        </div>
      </div>
      
      {/* Bottom Nav Placeholder (for mobile realism) */}
      <div className="fixed bottom-0 left-0 w-full bg-[#090412]/90 backdrop-blur-md border-t border-[#2D1B54] flex justify-around items-center h-16 lg:hidden z-50">
        <div className="flex flex-col items-center gap-1 text-[#9AA0A6]">
          <Activity className="w-5 h-5" />
          <span className="text-[9px]">Pulse</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-[#9AA0A6]">
          <MapPin className="w-5 h-5" />
          <span className="text-[9px]">Live Map</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-[#9AA0A6]">
          <Activity className="w-5 h-5" />
          <span className="text-[9px]">Insights</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-[#C4B5FD]">
          <div className="relative">
            <div className="absolute -inset-2 bg-[#6E38F7]/20 rounded-full blur-sm"></div>
            <Shield className="w-5 h-5 relative z-10" />
          </div>
          <span className="text-[9px] font-medium">Women Safety</span>
        </div>
      </div>
    </div>
  );
}

// Subcomponents

function ResourceRow({ icon, name, desc, dist }) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-[#2D1B54]/50 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm text-white w-20">{name}</span>
        <span className="text-xs text-[#9AA0A6]">{desc}</span>
      </div>
      <span className="text-xs text-[#22C55E]">{dist}</span>
    </div>
  );
}

function ProgressBar({ label, percent, color }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-white">{label}</span>
        <span className="text-[10px] text-white">{percent}%</span>
      </div>
      <div className="h-1.5 w-full bg-[#1A0E38] rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

function ReviewCard({ name, location, text, verified, rating }) {
  return (
    <div className="bg-[#130B29] border border-[#2D1B54] rounded-xl p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#6E38F7] to-[#C4B5FD] flex items-center justify-center shadow-[0_0_10px_rgba(110,56,247,0.3)]">
            <Zap className="w-2.5 h-2.5 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">{name}</h4>
            <p className="text-[10px] text-[#9AA0A6]">{location}</p>
          </div>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < rating ? "text-[#6E38F7] fill-[#6E38F7]" : "text-[#2D1B54]"}`} />
          ))}
        </div>
      </div>
      <p className="text-xs text-[#D1D5DB] mb-2 leading-relaxed">{text}</p>
      {verified && (
        <div className="flex items-center gap-1 text-[10px] text-[#22C55E]">
          <CheckCircle2 className="w-3 h-3" />
          <span>High trust • Verified</span>
        </div>
      )}
    </div>
  );
}

function VerifiedChargingList() {
  return (
    <div>
      <div className="mb-3">
        <p className="text-[#6E38F7] text-[10px] font-bold tracking-wider uppercase mb-1">INFRASTRUCTURE</p>
        <h2 className="text-lg font-semibold">Verified safe charging</h2>
        <p className="text-[#9AA0A6] text-xs">Filter to match your comfort.</p>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
        <Button variant="outline" className="h-7 text-xs bg-[#2D1B54] border-none text-white hover:bg-[#3d2770] rounded-lg shrink-0">Women-safe</Button>
        <Button variant="ghost" className="h-7 text-xs text-[#9AA0A6] hover:text-white shrink-0">Fast</Button>
        <Button variant="ghost" className="h-7 text-xs text-[#9AA0A6] hover:text-white shrink-0">24/7</Button>
        <Button variant="ghost" className="h-7 text-xs text-[#9AA0A6] hover:text-white shrink-0">Low wait</Button>
      </div>

      <div className="space-y-3">
        <StationCard 
          name="Marina Bay Point" 
          distance="3.42 km" 
          types="CCS, NACS" 
          details="CCTV: yes • 24/7: yes • Wait: 5m • Low crowd" 
        />
        <StationCard 
          name="Aurora Superhub - Bayfront" 
          distance="2.3 km" 
          types="CCS, NACS" 
          details="CCTV: yes • 24/7: yes • Wait: 0m • Moderate crowd" 
        />
        <StationCard 
          name="Harbor Line Hub" 
          distance="1.69 km" 
          types="Type 2, CCS" 
          details="CCTV: yes • 24/7: yes • Wait: 35m • High crowd" 
        />
        <StationCard 
          name="Lumen Plaza EV" 
          distance="0 km" 
          types="CCS, CHAdeMO" 
          details="CCTV: yes • 24/7: no • Wait: 22m • High crowd" 
        />
      </div>
    </div>
  );
}

function StationCard({ name, distance, types, details }) {
  return (
    <div className="bg-[#130B29] border border-[#2D1B54] rounded-xl p-3 flex items-center justify-between hover:bg-[#1A0E38] transition-colors cursor-pointer">
      <div className="flex items-start gap-3">
        <div className="mt-1 w-6 h-6 rounded-full bg-[#1A0E38] border border-[#6E38F7] flex items-center justify-center shrink-0">
          <Zap className="w-3 h-3 text-[#C4B5FD]" />
        </div>
        <div>
          <h4 className="text-sm font-semibold">{name}</h4>
          <p className="text-[10px] text-[#9AA0A6] mb-1">{distance} - {types}</p>
          <p className="text-[10px] text-[#9AA0A6]">{details}</p>
        </div>
      </div>
      <div className="bg-[#2D1B54] text-[#C4B5FD] border border-[#4C1D95] rounded-full px-3 py-1 text-[10px] font-bold tracking-wider shrink-0">
        SAFE
      </div>
    </div>
  );
}
