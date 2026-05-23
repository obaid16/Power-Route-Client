"use client";

import { 
  MapPin, Route, Zap, Wallet, Clock, Wrench, Settings, ChevronRight, 
  Battery, Activity, ShieldAlert, CarFront, Leaf, ShieldCheck, Banknote, Smartphone 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Dashboard() {
  return (
    <div className="w-full bg-[#F4F2FA] dark:bg-[#06020E] text-[#1A0E38] dark:text-[#F8F9FA] transition-colors duration-300 min-h-screen">
      <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8">
        
        {/* Hero Section */}
        <div className="relative w-full rounded-[32px] overflow-hidden bg-[#0a0518] border border-white/5 shadow-xl flex flex-col md:flex-row items-center p-8 md:p-16 min-h-[400px]">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-[#6E38F7]/20 via-[#0a0518] to-[#0a0518]"></div>
          
          {/* Left Content */}
          <div className="relative z-10 md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Powering Every<br/>Journey, <span className="text-[#A87BFF]">Safely.</span>
            </h1>
            <p className="text-[#9AA0A6] text-lg max-w-md">
              Smart EV management with real-time insights, safety protection, and intelligent control.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex items-center gap-2 bg-[#6E38F7] hover:bg-[#5a2ce0] text-white px-6 py-3 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(110,56,247,0.4)]">
                <CarFront className="w-5 h-5" /> My Vehicles
              </button>
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-xl font-medium transition-all">
                <MapPin className="w-5 h-5" /> Live Map
              </button>
            </div>
            <div className="flex items-center gap-6 pt-8 text-sm text-[#9AA0A6]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                All systems operational
              </div>
              <div className="flex items-center gap-2 text-xs">
                • Last updated: 2 min ago •
              </div>
            </div>
          </div>

          {/* Right Content - Van Image */}
          <div className="relative z-10 md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
            <div className="absolute w-[150%] aspect-square rounded-full border border-[#6E38F7]/30 border-dashed animate-[spin_60s_linear_infinite]"></div>
            <div className="absolute w-[120%] aspect-square rounded-full border-2 border-[#6E38F7]/50 shadow-[0_0_50px_rgba(110,56,247,0.3)]"></div>
            <img 
              src="/electra_van_hero.png" 
              alt="PoweRoute Van" 
              className="relative z-20 w-[90%] max-w-[500px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        {/* Top Grid - My Van & Overview */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* My Van Card */}
          <div className="xl:col-span-7 bg-white dark:bg-[#110822] rounded-[24px] p-6 lg:p-8 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] transition-colors duration-300">
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h2 className="text-sm font-medium text-[#6B7280] dark:text-[#9AA0A6] mb-1">My Van</h2>
                <h1 className="text-3xl font-bold mb-4">PoweRoute Van</h1>
                <div className="inline-flex items-center gap-2 bg-[#F3E8FF] dark:bg-[#2D1B54]/40 text-[#6E38F7] dark:text-[#A87BFF] px-4 py-1.5 rounded-full text-xs font-semibold border border-[#E9D5FF] dark:border-[#4C1D95]/30">
                  <div className="w-2 h-2 rounded-full bg-[#6E38F7] shadow-[0_0_8px_rgba(110,56,247,0.8)]"></div>
                  Ready to Drive
                </div>
              </div>
            </div>

            <div className="relative w-full h-[250px] bg-gradient-to-r from-[#2e1065]/50 to-[#1e1b4b]/50 dark:from-[#3b0764] dark:to-[#0f172a] rounded-[20px] overflow-hidden mb-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#a855f7]/20 via-transparent to-transparent"></div>
              <img src="/electra_van_hero.png" alt="Van" className="relative z-10 h-[80%] object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]" />
            </div>

            <div className="flex justify-between items-end px-2">
              <div className="w-1/2 pr-6">
                <div className="flex items-center gap-2 text-sm text-[#6B7280] dark:text-[#9AA0A6] mb-3">
                  <Battery className="w-4 h-4" /> Battery
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">80%</span>
                  <div className="h-2 flex-grow bg-[#E5E0F1] dark:bg-[#1A0E38] rounded-full overflow-hidden">
                    <div className="h-full bg-[#6E38F7] w-[80%] rounded-full shadow-[0_0_10px_rgba(110,56,247,0.8)]"></div>
                  </div>
                </div>
              </div>
              <div className="text-right pl-4">
                <div className="flex items-center justify-end gap-2 text-sm text-[#6B7280] dark:text-[#9AA0A6] mb-3">
                  <MapPin className="w-4 h-4" /> Range
                </div>
                <span className="text-2xl font-bold">260 km</span>
              </div>
            </div>
          </div>

          {/* Van Overview Grid */}
          <div className="xl:col-span-5 grid grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-white dark:bg-[#110822] rounded-[24px] p-6 lg:p-8 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] flex flex-col justify-center transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-[#F3E8FF] dark:bg-[#2D1B54]/40 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-[#6E38F7] dark:text-[#A87BFF]" />
              </div>
              <p className="text-sm text-[#6B7280] dark:text-[#9AA0A6] mb-2">Total Distance</p>
              <h3 className="text-3xl font-bold">1,256 <span className="text-xl font-medium">km</span></h3>
            </div>
            <div className="bg-white dark:bg-[#110822] rounded-[24px] p-6 lg:p-8 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] flex flex-col justify-center transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-[#F3E8FF] dark:bg-[#2D1B54]/40 flex items-center justify-center mb-6">
                <Route className="w-6 h-6 text-[#6E38F7] dark:text-[#A87BFF]" />
              </div>
              <p className="text-sm text-[#6B7280] dark:text-[#9AA0A6] mb-2">Total Trips</p>
              <h3 className="text-3xl font-bold">28</h3>
            </div>
            <div className="bg-white dark:bg-[#110822] rounded-[24px] p-6 lg:p-8 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] flex flex-col justify-center transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-[#F3E8FF] dark:bg-[#2D1B54]/40 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-[#6E38F7] dark:text-[#A87BFF]" />
              </div>
              <p className="text-sm text-[#6B7280] dark:text-[#9AA0A6] mb-2">Total Energy</p>
              <h3 className="text-3xl font-bold">320 <span className="text-xl font-medium">kWh</span></h3>
            </div>
            <div className="bg-white dark:bg-[#110822] rounded-[24px] p-6 lg:p-8 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] flex flex-col justify-center transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-[#F3E8FF] dark:bg-[#2D1B54]/40 flex items-center justify-center mb-6">
                <Wallet className="w-6 h-6 text-[#6E38F7] dark:text-[#A87BFF]" />
              </div>
              <p className="text-sm text-[#6B7280] dark:text-[#9AA0A6] mb-2">Total Cost</p>
              <h3 className="text-3xl font-bold">₹1,890</h3>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-[#110822] rounded-[24px] p-6 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] transition-colors duration-300">
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: MapPin, title: "Location Tracking", sub: "Track your van in real time", href: "/tracking" },
              { icon: Clock, title: "Trip History", sub: "View past journeys", href: "/van" },
              { icon: Zap, title: "Schedule Charging", sub: "Plan your charging", href: "/booking" },
              { icon: Wrench, title: "Maintenance", sub: "Check & book service", href: "/maintenance" },
              { icon: Settings, title: "Settings", sub: "Manage preferences", href: "/settings" }
            ].map((action, i) => (
              <Link href={action.href} key={i} className="group cursor-pointer flex flex-col gap-3 p-4 rounded-[16px] border border-[#E5E0F1] dark:border-[#2D1B54] hover:border-[#6E38F7] dark:hover:border-[#6E38F7] hover:bg-[#F3E8FF]/30 dark:hover:bg-[#1A0E38] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-[#F3E8FF] dark:bg-[#2D1B54]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <action.icon className="w-5 h-5 text-[#6E38F7]" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#6B7280] dark:text-[#9AA0A6] group-hover:text-[#6E38F7] transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{action.title}</h4>
                  <p className="text-[11px] text-[#6B7280] dark:text-[#9AA0A6]">{action.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Smart Overview */}
        <div>
          <h2 className="text-lg font-bold mb-4 ml-2">Smart Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { title: "Battery Health", value: "Good", percent: "98%", icon: Activity, color: "text-green-500", trend: "M0 10 Q 5 0, 10 10 T 20 10" },
              { title: "Driving Efficiency", value: "Excellent", percent: "4.8 km/kWh", icon: Leaf, color: "text-green-500", trend: "M0 15 Q 5 5, 10 10 T 20 5" },
              { title: "Maintenance", value: "Up to date", percent: "Next in 2,350 km", icon: Wrench, color: "text-[#6E38F7]", trend: "M0 5 Q 5 15, 10 5 T 20 10" },
              { title: "Safety Score", value: "Excellent", percent: "94 /100", icon: ShieldCheck, color: "text-[#6E38F7]", trend: "M0 10 Q 5 0, 10 5 T 20 0" }
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-[#110822] rounded-[20px] p-5 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] flex items-center justify-between transition-colors duration-300">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-[#F3E8FF] dark:bg-[#2D1B54]/40 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-[#6E38F7]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] dark:text-[#9AA0A6] mb-1">{stat.title}</p>
                    <h4 className={`font-bold text-sm ${stat.color} mb-0.5`}>{stat.value}</h4>
                    <span className="text-lg font-bold">{stat.percent}</span>
                  </div>
                </div>
                <div className="w-16 h-8 opacity-50">
                  <svg viewBox="0 0 20 20" className="w-full h-full stroke-current" fill="none" strokeWidth="2">
                    <path d={stat.trend} className={stat.color} />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Charging Stations */}
        <div>
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-lg font-bold">Nearby Charging Stations</h2>
            <Link href="/map" className="text-sm text-[#6E38F7] hover:underline font-medium">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 relative">
            {[
              { name: "PoweRoute Fast Charge", type: "CCS - 150 kW", dist: "0.8 km", price: "₹18/kWh", rating: "4.8", crowd: "Low crowd", avail: true },
              { name: "GreenPlug Station", type: "CCS - 120 kW", dist: "1.2 km", price: "₹16/kWh", rating: "4.5", crowd: "Moderate crowd", avail: true },
              { name: "PowerHub Express", type: "CCS - 150 kW", dist: "1.8 km", price: "₹17/kWh", rating: "4.5", crowd: "Low crowd", avail: true },
              { name: "VoltPoint Hub", type: "CCS - 120 kW", dist: "2.3 km", price: "₹15/kWh", rating: "4.3", crowd: "High crowd", avail: true }
            ].map((station, i) => (
              <div key={i} className="bg-white dark:bg-[#110822] rounded-[20px] overflow-hidden shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] transition-colors duration-300 group cursor-pointer hover:border-[#6E38F7]">
                <div className="h-32 bg-gray-200 dark:bg-[#1A0E38] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#110822]/80 z-10"></div>
                  {/* Mock image patterns */}
                  <div className="w-full h-full opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                  <div className="absolute top-2 left-2 z-20 bg-background/80 backdrop-blur-md rounded-md px-2 py-1 flex items-center gap-1 text-[10px] font-bold">
                    <MapPin className="w-3 h-3 text-[#6E38F7]" /> {station.dist}
                  </div>
                  <div className="absolute top-2 right-2 z-20 bg-green-500/20 text-green-500 border border-green-500/30 rounded-md px-2 py-1 text-[10px] font-bold flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Available
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-1">{station.name}</h3>
                  <p className="text-xs text-[#9AA0A6] mb-4">{station.type}</p>
                  <div className="flex items-center justify-between text-xs font-medium">
                    <div className="flex gap-3">
                      <span>{station.price}</span>
                      <span className="text-yellow-500 flex items-center gap-0.5">{station.rating} <span className="text-lg leading-none">★</span></span>
                    </div>
                    <span className="text-[#9AA0A6]">{station.crowd}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-[#6E38F7] text-white shadow-lg cursor-pointer hover:bg-[#5a2ce0] z-10">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Recent Trips & Eco Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#110822] rounded-[24px] p-6 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Recent Trips</h2>
              <Link href="/van" className="text-sm text-[#6E38F7] hover:underline font-medium">View all</Link>
            </div>
            <div className="space-y-4">
              {[
                { date: "Today, 10:30 AM", route: "Office to Warehouse", dist: "42 km", time: "1h 12 m" },
                { date: "Yesterday, 6:45 PM", route: "Warehouse to Home", dist: "38 km", time: "55 m" },
                { date: "May 24, 2:15 PM", route: "Client Visit", dist: "67 km", time: "1h 35 m" },
                { date: "May 23, 11:20 AM", route: "City Delivery", dist: "29 km", time: "45 m" }
              ].map((trip, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F3E8FF]/30 dark:hover:bg-[#1A0E38] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#F3E8FF] dark:bg-[#2D1B54]/40 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-[#6E38F7]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#9AA0A6] mb-0.5">{trip.date}</p>
                      <h4 className="font-semibold text-sm">{trip.route}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-bold text-sm">{trip.dist}</span>
                    <span className="text-xs text-[#9AA0A6] flex items-center gap-1"><Clock className="w-3 h-3" /> {trip.time}</span>
                    <ChevronRight className="w-4 h-4 text-[#9AA0A6] group-hover:text-[#6E38F7]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eco Driving Tips */}
          <div>
            <h2 className="text-lg font-bold mb-4 px-2">Eco Driving Tips</h2>
            <div className="h-[300px] rounded-[24px] bg-gradient-to-br from-[#1C1238] to-[#0A0518] border border-[#2D1B54] p-8 flex items-center relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#6E38F7] to-transparent mix-blend-screen"></div>
              <div className="w-1/2 z-10">
                <h3 className="text-2xl font-bold text-white mb-4">Maintain a <span className="text-[#A87BFF]">steady speed</span></h3>
                <p className="text-sm text-[#9AA0A6] leading-relaxed">
                  Driving at a constant speed can increase your range up to 15%.
                </p>
                <div className="flex gap-2 mt-8">
                  <div className="w-2 h-2 rounded-full bg-[#6E38F7]"></div>
                  <div className="w-2 h-2 rounded-full bg-white/20"></div>
                  <div className="w-2 h-2 rounded-full bg-white/20"></div>
                  <div className="w-2 h-2 rounded-full bg-white/20"></div>
                </div>
              </div>
              <div className="w-1/2 flex justify-end z-10">
                {/* Mock Gauge */}
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#2D1B54" strokeWidth="8" strokeDasharray="251" strokeDashoffset="100" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#6E38F7" strokeWidth="8" strokeDasharray="251" strokeDashoffset="180" className="animate-pulse" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[#A87BFF]">
                    <Leaf className="w-8 h-8" />
                  </div>
                </div>
              </div>
              <div className="absolute right-4 bottom-4 w-8 h-8 rounded-full bg-[#6E38F7] flex items-center justify-center text-white cursor-pointer shadow-lg hover:scale-110 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose PoweRoute */}
        <div>
          <h2 className="text-lg font-bold mb-4 px-2">Why Choose PoweRoute?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { icon: Activity, title: "Real-time Monitoring", desc: "Track your vehicle and battery in real time." },
              { icon: ShieldAlert, title: "Smart Safety", desc: "Advanced safety features and SOS protection." },
              { icon: Banknote, title: "Cost Efficient", desc: "Lower running costs with smart energy usage." },
              { icon: Leaf, title: "Eco Friendly", desc: "Zero emissions, 100% sustainable future." }
            ].map((feature, i) => (
              <div key={i} className="bg-white dark:bg-[#110822] rounded-[20px] p-5 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] flex gap-4 transition-colors duration-300">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-[#F3E8FF] dark:bg-[#2D1B54]/40 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-[#6E38F7]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-[#9AA0A6] leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* App Banner */}
        <div className="relative w-full rounded-[24px] bg-gradient-to-r from-[#170B3B] to-[#0A0518] border border-[#2D1B54] p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#6E38F7]/30 to-transparent"></div>
          
          <div className="flex items-center gap-8 z-10">
            {/* Phone Mockup Placeholder */}
            <div className="hidden md:block w-32 h-64 bg-[#06020E] rounded-3xl border-4 border-[#2D1B54] shadow-[0_0_30px_rgba(110,56,247,0.3)] relative overflow-hidden">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#2D1B54] rounded-full"></div>
              <div className="mt-8 p-3 space-y-2">
                <div className="h-4 w-1/2 bg-[#2D1B54] rounded-sm"></div>
                <div className="h-24 w-full bg-[#6E38F7]/20 border border-[#6E38F7]/50 rounded-lg"></div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Take <span className="text-[#A87BFF]">PoweRoute</span><br/>Anywhere You Go</h2>
              <p className="text-sm text-[#9AA0A6] mb-6 max-w-xs">Download our mobile app for full control of your EV on the go.</p>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                  <Smartphone className="w-5 h-5" /> App Store
                </button>
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                  <Smartphone className="w-5 h-5" /> Google Play
                </button>
              </div>
            </div>
          </div>
          
          {/* QR Code */}
          <div className="z-10 bg-white p-2 rounded-xl hidden sm:block">
            {/* Fake QR */}
            <div className="w-20 h-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg')] bg-cover opacity-80"></div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-[#E5E0F1] dark:border-[#2D1B54] bg-white dark:bg-[#06020E] pt-12 pb-6 px-4 md:px-8 mt-12 transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#6E38F7] flex items-center justify-center">
                <Zap className="h-4 w-4 text-white fill-white" />
              </div>
              <span className="text-xl font-bold tracking-wider">POWEROUTE</span>
            </div>
            <p className="text-sm text-[#6B7280] dark:text-[#9AA0A6] max-w-xs mb-6">
              Smart EV solutions for a greener and smarter tomorrow.
            </p>
            <div className="flex gap-4 text-[#9AA0A6]">
              {/* Social icons */}
              <div className="w-8 h-8 rounded-full bg-[#F3E8FF] dark:bg-[#1A0E38] flex items-center justify-center cursor-pointer hover:text-[#6E38F7] transition-colors">f</div>
              <div className="w-8 h-8 rounded-full bg-[#F3E8FF] dark:bg-[#1A0E38] flex items-center justify-center cursor-pointer hover:text-[#6E38F7] transition-colors">in</div>
              <div className="w-8 h-8 rounded-full bg-[#F3E8FF] dark:bg-[#1A0E38] flex items-center justify-center cursor-pointer hover:text-[#6E38F7] transition-colors">x</div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-[#6B7280] dark:text-[#9AA0A6]">
              <li><a href="#" className="hover:text-[#6E38F7] transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-[#6E38F7] transition-colors">Map</a></li>
              <li><a href="#" className="hover:text-[#6E38F7] transition-colors">Vehicles</a></li>
              <li><a href="#" className="hover:text-[#6E38F7] transition-colors">Safety</a></li>
              <li><a href="#" className="hover:text-[#6E38F7] transition-colors">SOS</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-[#6B7280] dark:text-[#9AA0A6]">
              <li><a href="#" className="hover:text-[#6E38F7] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#6E38F7] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#6E38F7] transition-colors">Report an Issue</a></li>
              <li><a href="#" className="hover:text-[#6E38F7] transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Stay Updated</h4>
            <p className="text-sm text-[#6B7280] dark:text-[#9AA0A6] mb-4">Subscribe to get the latest updates and tips.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email" className="bg-[#F4F2FA] dark:bg-[#110822] border border-[#E5E0F1] dark:border-[#2D1B54] rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-[#6E38F7]" />
              <button className="bg-[#6E38F7] hover:bg-[#5a2ce0] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-[#6B7280] dark:text-[#9AA0A6] pt-8 border-t border-[#E5E0F1] dark:border-[#2D1B54]">
          © 2026 PoweRoute. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
