"use client";

import { useState, useEffect, useRef } from "react";
import api from "@/lib/api";
import { 
  MapPin, Route, Zap, Wallet, Clock, Wrench, Settings, ChevronRight, 
  Battery, Activity, ShieldAlert, CarFront, Leaf, ShieldCheck, Banknote, Smartphone, Loader2 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { LiquidBackground } from "@/components/layout/LiquidBackground";

export function Dashboard() {
  const [stations, setStations] = useState([]);
  const [loadingStations, setLoadingStations] = useState(true);
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const stationsScrollRef = useRef(null);

  const ecoTips = [
    { title: "Maintain a", highlight: "steady speed", desc: "Driving at a constant speed can increase your range up to 15%.", icon: Leaf, offset: 180 },
    { title: "Use", highlight: "regenerative braking", desc: "Maximize your regen braking to recover up to 20% of kinetic energy.", icon: Battery, offset: 120 },
    { title: "Pre-condition", highlight: "your cabin", desc: "Heat or cool the cabin while plugged in to save battery range.", icon: Zap, offset: 150 },
    { title: "Check your", highlight: "tire pressure", desc: "Properly inflated tires reduce rolling resistance and boost efficiency.", icon: Activity, offset: 200 },
  ];

  // GSAP Refs for staggered entrance animations
  const heroRef = useRef(null);
  const topGridRef = useRef(null);
  const quickActionsRef = useRef(null);
  const smartOverviewRef = useRef(null);
  const stationsRef = useRef(null);
  const tripsRef = useRef(null);
  const whyChooseRef = useRef(null);

  useEffect(() => {
    // GSAP entrance sequence
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(heroRef.current, {
      opacity: 1,
      y: 0,
      startAt: { y: 35, opacity: 0 },
      duration: 0.8
    })
    .to(topGridRef.current, {
      opacity: 1,
      y: 0,
      startAt: { y: 35, opacity: 0 },
      duration: 0.8
    }, "-=0.6")
    .to(quickActionsRef.current, {
      opacity: 1,
      y: 0,
      startAt: { y: 25, opacity: 0 },
      duration: 0.6
    }, "-=0.6")
    .to(smartOverviewRef.current, {
      opacity: 1,
      y: 0,
      startAt: { y: 25, opacity: 0 },
      duration: 0.6
    }, "-=0.5")
    .to(stationsRef.current, {
      opacity: 1,
      y: 0,
      startAt: { y: 25, opacity: 0 },
      duration: 0.6
    }, "-=0.5")
    .to(tripsRef.current, {
      opacity: 1,
      y: 0,
      startAt: { y: 25, opacity: 0 },
      duration: 0.6
    }, "-=0.5")
    .to(whyChooseRef.current, {
      opacity: 1,
      y: 0,
      startAt: { y: 25, opacity: 0 },
      duration: 0.6
    }, "-=0.5");
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await api.get(`/stations?lat=${latitude}&lng=${longitude}`);
            
            // Format stations to match UI structure and take top 8 for carousel
            const formattedData = (res.data?.data || []).slice(0, 8).map(st => {
              const mainCharger = st.chargers?.[0] || { type: "Standard", power: "50kW" };
              return {
                id: st._id,
                name: st.name || "Unknown Station",
                type: `${mainCharger.portType || "Standard"} - ${mainCharger.power}`,
                dist: "Local", // Real distance calculation requires Haversine or backend
                price: `₹${st.pricing?.ratePerKwh || 15}/kWh`,
                rating: st.rating || "4.5",
                crowd: "Unknown crowd",
                avail: mainCharger.status !== "occupied"
              };
            });
            setStations(formattedData.length ? formattedData : []);
          } catch (error) {
            console.error("Failed to fetch stations", error);
          } finally {
            setLoadingStations(false);
          }
        },
        () => {
          setLoadingStations(false);
        }
      );
    } else {
      Promise.resolve().then(() => setLoadingStations(false));
    }
  }, []);

  return (
    <div className="w-full text-[#1A0E38] dark:text-[#F8F9FA] transition-colors duration-300 min-h-screen">
      <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8">
        
        {/* Hero Section */}
        <div 
          ref={heroRef} 
          className="relative w-full rounded-[32px] overflow-hidden bg-white dark:bg-[#0a0518] border border-black/5 dark:border-black/5 dark:dark:border-white/5 shadow-xl flex flex-col md:flex-row items-center p-8 md:p-16 min-h-[400px] opacity-0"
        >
          {/* Background effects */}
          <LiquidBackground nested />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-[#6E38F7]/10 via-white to-white dark:from-[#6E38F7]/20 dark:via-[#0a0518] dark:to-[#0a0518]"></div>
          
          {/* Left Content */}
          <div className="relative z-10 md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground dark:text-white">
              Powering Every<br/>Journey, <span className="text-[#A87BFF]">Safely.</span>
            </h1>
            <p className="text-[#9AA0A6] text-lg max-w-md">
              Smart EV management with real-time insights, safety protection, and intelligent control.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/profile" className="flex items-center gap-2 bg-[#6E38F7] hover:bg-[#5a2ce0] text-white px-6 py-3 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(110,56,247,0.4)]">
                <CarFront className="w-5 h-5" /> My Vehicles
              </Link>
              <Link href="/map" className="flex items-center gap-2 bg-black/5 hover:bg-black/10 dark:bg-black/5 dark:dark:bg-white/5 dark:hover:bg-white/10 text-foreground dark:text-white border border-black/10 dark:border-black/10 dark:dark:border-white/10 px-6 py-3 rounded-xl font-medium transition-all">
                <MapPin className="w-5 h-5" /> Live Map
              </Link>
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
          <div className="relative z-10 w-full max-w-[280px] md:max-w-none md:w-1/2 aspect-square flex justify-center items-center mt-12 md:mt-0 mx-auto">
            <div className="absolute w-[120%] aspect-square rounded-full border border-[#6E38F7]/30 border-dashed animate-[spin_60s_linear_infinite]"></div>
            <div className="absolute w-[100%] aspect-square rounded-full border-2 border-[#6E38F7]/50 shadow-[0_0_50px_rgba(110,56,247,0.3)]"></div>
            <Image 
              src="/ev_car.png" 
              alt="PoweRoute EV" 
              width={300}
              height={300}
              className="relative z-20 w-[85%] aspect-square object-contain rounded-full shadow-[0_20px_50px_rgba(110,56,247,0.4)] border-4 border-black/10 dark:border-white/10 dark:border-[#6E38F7]/30 bg-[#0B0516]/80 p-4"
              priority
            />
          </div>
        </div>

        {/* Top Grid - My Van & Overview */}
        <div 
          ref={topGridRef} 
          className="grid grid-cols-1 xl:grid-cols-12 gap-6 opacity-0"
        >
          {/* My Van Card */}
          <div className="xl:col-span-7 bg-gradient-to-br from-white to-[#F4F2FA] dark:from-[#110822] dark:to-[#0A0512] rounded-[32px] p-6 lg:p-8 shadow-lg border border-white/40 dark:border-[#2D1B54]/50 transition-all duration-300 hover:shadow-xl">
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] dark:text-[#9AA0A6] mb-1">My EV</h2>
                <h1 className="text-3xl font-extrabold mb-3 tracking-tight text-foreground dark:text-white">PoweRoute EV</h1>
                <div className="inline-flex items-center gap-2 bg-[#6E38F7]/10 text-[#6E38F7] dark:text-[#A87BFF] px-4 py-1.5 rounded-full text-xs font-bold border border-[#6E38F7]/20 shadow-[0_2px_10px_rgba(110,56,247,0.05)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6E38F7] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6E38F7]"></span>
                  </span>
                  Ready to Drive
                </div>
              </div>
            </div>

            {/* Immersive Cyberpunk HUD Container with Interactive 3D WebGL Vehicle Visualizer */}
            <div className="relative w-full h-[270px] bg-gradient-to-br from-[#0B0516] via-[#12072B] to-[#0A0314] rounded-[24px] overflow-hidden mb-8 flex items-center justify-center border border-[#6E38F7]/25 shadow-[inset_0_0_30px_rgba(110,56,247,0.35)]">
              
              {/* Vehicle Photo Background (fills the box completely) */}
              <div className="absolute inset-0 w-full h-full z-0">
                <Image 
                  src="/ev_car.png" 
                  alt="Vehicle Status" 
                  fill
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-[1.02]"
                  priority
                />
                {/* Technical dark overlay to ensure readability of HUD overlays */}
                <div className="absolute inset-0 bg-black/40 mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0516]/60 via-transparent to-[#0A0314]/80 pointer-events-none" />
              </div>
              
              {/* High-tech grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.06)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_85%)] pointer-events-none z-10" />
              
              {/* Radial background glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#6E38F7]/10 rounded-full blur-[80px] pointer-events-none z-10" />
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none animate-pulse-glow z-10" />

              {/* Technical Corner Brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-primary/40 rounded-tl pointer-events-none z-20" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary/40 rounded-tr pointer-events-none z-20" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary/40 rounded-bl pointer-events-none z-20" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-primary/40 rounded-br pointer-events-none z-20" />

              {/* Real-time telemetry readouts */}
              <div className="absolute left-6 top-6 text-[9px] font-mono text-primary/90 leading-relaxed uppercase tracking-widest hidden sm:block pointer-events-none z-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                SYS: NOMINAL<br/>
                NET: CONNECTED<br/>
                CAM: LIVE
              </div>
              <div className="absolute right-6 top-6 text-[9px] font-mono text-primary/90 leading-relaxed uppercase tracking-widest text-right hidden sm:block pointer-events-none z-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                VOLTAGE: 398V<br/>
                TEMP: 26.4 °C<br/>
                HUD: STATIC
              </div>
            </div>

            <div className="flex justify-between items-end px-2">
              <div className="w-1/2 pr-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B7280] dark:text-[#9AA0A6] mb-3">
                  <Battery className="w-4 h-4 text-primary" /> Battery
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black text-foreground dark:text-white">80%</span>
                  <div className="h-3 flex-grow bg-black/5 dark:bg-[#1C1238] rounded-full overflow-hidden p-[2px] border border-black/5 dark:border-white/5 shadow-inner">
                    <div className="h-full bg-gradient-to-r from-[#A855F7] to-[#6E38F7] w-[80%] rounded-full shadow-[0_0_12px_rgba(110,56,247,0.6)] relative overflow-hidden">
                      {/* Animated shimmer light effect inside progress bar */}
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-full animate-[shimmer_2s_infinite]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right pl-4">
                <div className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B7280] dark:text-[#9AA0A6] mb-3">
                  <MapPin className="w-4 h-4 text-primary" /> Range
                </div>
                <span className="text-2xl font-black text-foreground dark:text-white">260 <span className="text-sm font-bold text-muted-foreground">km</span></span>
              </div>
            </div>
          </div>

          {/* Van Overview Grid - Glassmorphism Card Redesign */}
          <div className="xl:col-span-5 grid grid-cols-2 gap-4 lg:gap-6">
            {[
              { icon: MapPin, title: "Total Distance", value: "1,256", unit: "km", desc: "+12.4% this week", href: "/analytics?tab=distance" },
              { icon: Route, title: "Total Trips", value: "28", unit: "trips", desc: "Average 45km/trip", href: "/trip-history" },
              { icon: Zap, title: "Total Energy", value: "320", unit: "kWh", desc: "Green efficiency: 98%", href: "/analytics?tab=energy" },
              { icon: Wallet, title: "Total Cost", value: "₹1,890", unit: "", desc: "Saved ₹4,500 vs Diesel", href: "/wallet" }
            ].map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <Link
                  href={card.href}
                  key={idx} 
                  className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-[#F4F2FA]/95 dark:from-[#110822]/95 dark:to-[#0A0512]/95 backdrop-blur-md rounded-[24px] p-5 lg:p-6 border border-white/60 dark:border-[#2D1B54]/40 hover:border-[#6E38F7]/40 dark:hover:border-[#6E38F7]/50 flex flex-col justify-between transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(110,56,247,0.08)] cursor-pointer"
                >
                  {/* Hover Accent Glow */}
                  <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-[#6E38F7]/5 rounded-full blur-2xl group-hover:bg-[#6E38F7]/10 transition-all duration-500" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6E38F7]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                  
                  <div>
                    {/* Glowing Double-Ring Icon Badge */}
                    <div className="w-11 h-11 rounded-xl bg-[#6E38F7]/10 dark:bg-[#6E38F7]/20 flex items-center justify-center mb-5 border border-[#6E38F7]/10 shadow-[inset_0_0_10px_rgba(110,56,247,0.1)] group-hover:scale-110 group-hover:rotate-[6deg] transition-all duration-300">
                      <CardIcon className="w-5 h-5 text-[#6E38F7] dark:text-[#A87BFF]" />
                    </div>
                    
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{card.title}</p>
                    <h3 className="text-3xl font-black tracking-tight text-foreground dark:text-white leading-none mb-1">
                      {card.value} {card.unit && <span className="text-sm font-bold text-muted-foreground">{card.unit}</span>}
                    </h3>
                  </div>
                  
                  <p className="text-[10px] text-muted-foreground font-medium mt-3 flex items-center gap-1 group-hover:text-primary dark:group-hover:text-[#A87BFF] transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> {card.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div 
          ref={quickActionsRef} 
          className="bg-white dark:bg-[#110822] rounded-[24px] p-6 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] transition-colors duration-300 opacity-0"
        >
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: MapPin, title: "Location Tracking", sub: "Track your van in real time", href: "/tracking" },
              { icon: Clock, title: "Trip History", sub: "View past journeys", href: "/trip-history" },
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
        <div ref={smartOverviewRef} className="opacity-0">
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
        <div ref={stationsRef} className="opacity-0">
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-lg font-bold">Nearby Charging Stations</h2>
            <Link href="/map" className="text-sm text-[#6E38F7] hover:underline font-medium">View all</Link>
          </div>
          <div className="relative group">
            {/* Left Scroll Button */}
            {stations.length > 0 && (
              <button 
                onClick={() => {
                  if (stationsScrollRef.current) {
                    stationsScrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
                  }
                }}
                className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#1A0E38] text-foreground dark:text-white border border-[#E5E0F1] dark:border-[#2D1B54] shadow-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2D1B54] z-20 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
            )}

            <div 
              ref={stationsScrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 lg:gap-6 relative min-h-[150px] pb-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {loadingStations ? (
                <div className="absolute inset-0 flex justify-center items-center h-32 w-full">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              ) : stations.length > 0 ? (
                stations.map((station, i) => (
                  <div key={i} className="min-w-[280px] max-w-[300px] flex-1 snap-start bg-white dark:bg-[#110822] rounded-[20px] overflow-hidden shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] transition-colors duration-300 cursor-pointer hover:border-[#6E38F7]">
                    <div className="h-32 bg-gray-200 dark:bg-[#1A0E38] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#110822]/80 z-10"></div>
                      <div className="w-full h-full opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                      <div className="absolute top-2 left-2 z-20 bg-background/80 backdrop-blur-md rounded-md px-2 py-1 flex items-center gap-1 text-[10px] font-bold">
                        <MapPin className="w-3 h-3 text-[#6E38F7]" /> {station.dist}
                      </div>
                      <div className={`absolute top-2 right-2 z-20 ${station.avail ? 'bg-green-500/20 text-green-500 border-green-500/30' : 'bg-red-500/20 text-red-500 border-red-500/30'} border rounded-md px-2 py-1 text-[10px] font-bold flex items-center gap-1`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${station.avail ? 'bg-green-500' : 'bg-red-500'}`}></div> {station.avail ? 'Available' : 'Occupied'}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm mb-1 truncate">{station.name}</h3>
                      <p className="text-xs text-[#9AA0A6] mb-4">{station.type}</p>
                      <div className="flex items-center justify-between text-xs font-medium">
                        <div className="flex gap-3">
                          <span>{station.price}</span>
                          <span className="text-yellow-500 flex items-center gap-0.5">{station.rating} <span className="text-lg leading-none">★</span></span>
                        </div>
                        <Link href={`/booking?station=${station.id}`} className="text-[#6E38F7] hover:underline font-bold text-[11px] uppercase tracking-wider">Book Now</Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex justify-center items-center h-32 text-muted-foreground text-sm">
                  No nearby charging stations found.
                </div>
              )}
            </div>
            
            {/* Right Scroll Button */}
            {stations.length > 0 && (
              <button 
                onClick={() => {
                  if (stationsScrollRef.current) {
                    stationsScrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
                  }
                }}
                className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-[#6E38F7] text-white shadow-lg cursor-pointer hover:bg-[#5a2ce0] z-20 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Recent Trips & Eco Tips */}
        <div 
          ref={tripsRef} 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 opacity-0"
        >
          <div className="bg-white dark:bg-[#110822] rounded-[24px] p-6 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Recent Trips</h2>
              <Link href="/trip-history" className="text-sm text-[#6E38F7] hover:underline font-medium">View all</Link>
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
            <div className="h-[300px] rounded-[24px] bg-gradient-to-br from-white to-[#F4F2FA] dark:from-[#1C1238] dark:to-[#0A0518] border border-black/5 dark:border-[#2D1B54] p-8 flex items-center relative overflow-hidden group transition-all duration-500">
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#6E38F7] to-transparent mix-blend-multiply dark:mix-blend-screen transition-opacity"></div>
              <div className="w-1/2 z-10 transition-all duration-300">
                <h3 className="text-2xl font-bold text-foreground dark:text-white mb-4">
                  {ecoTips[activeTipIndex].title} <span className="text-[#6E38F7] dark:text-[#A87BFF]">{ecoTips[activeTipIndex].highlight}</span>
                </h3>
                <p className="text-sm text-[#9AA0A6] leading-relaxed h-12">
                  {ecoTips[activeTipIndex].desc}
                </p>
                <div className="flex gap-2 mt-8">
                  {ecoTips.map((_, i) => (
                    <div 
                      key={i} 
                      onClick={() => setActiveTipIndex(i)}
                      className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${activeTipIndex === i ? 'w-4 bg-[#6E38F7]' : 'w-2 bg-black/20 dark:bg-white/20'}`}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="w-1/2 flex justify-end z-10">
                {/* Dynamic Gauge */}
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#2D1B54" strokeWidth="8" strokeDasharray="251" strokeDashoffset="100" />
                    <circle 
                      cx="50" cy="50" r="40" fill="none" stroke="#6E38F7" strokeWidth="8" 
                      strokeDasharray="251" strokeDashoffset={ecoTips[activeTipIndex].offset} 
                      className="transition-all duration-1000 ease-in-out" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[#A87BFF] transition-all duration-300">
                    {(() => {
                      const ActiveIcon = ecoTips[activeTipIndex].icon;
                      return <ActiveIcon className="w-8 h-8" />;
                    })()}
                  </div>
                </div>
              </div>
              <div 
                onClick={() => setActiveTipIndex((prev) => (prev + 1) % ecoTips.length)}
                className="absolute right-4 bottom-4 w-8 h-8 rounded-full bg-[#6E38F7] flex items-center justify-center text-white cursor-pointer shadow-lg hover:scale-110 transition-transform z-20"
              >
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose PoweRoute */}
        <div ref={whyChooseRef} className="opacity-0">
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
