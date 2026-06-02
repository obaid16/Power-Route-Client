"use client";

import { MapPin, Battery, Clock, Zap, Star, Shield, Car, CheckCircle2, ChevronRight, Phone, RefreshCw, Navigation, FileText, BadgeCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassInput } from "@/components/ui/glass-input";
import { AnimatedPage } from "@/components/layout/AnimatedPage";

const VANS = [
  { id: 1, driver: "Arjun Mehta", rating: 4.9, reviews: 128, badge: "Top Rated", eta: "15 min", dist: "2.1 km", charger: "DC Fast Charger", power: "Up to 60 kW", price: 14, status: "Available", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, driver: "Neha Singh", rating: 4.8, reviews: 96, badge: "Highly Rated", eta: "20 min", dist: "3.4 km", charger: "DC Fast Charger", power: "Up to 60 kW", price: 15, status: "Available", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 3, driver: "Rohit Verma", rating: 4.7, reviews: 72, eta: "25 min", dist: "4.2 km", charger: "DC Fast Charger", power: "Up to 50 kW", price: 16, status: "Available", avatar: "https://randomuser.me/api/portraits/men/46.jpg" },
  { id: 4, driver: "Sneha Iyer", rating: 4.9, reviews: 110, badge: "Eco Friendly", eta: "30 min", dist: "5.6 km", charger: "AC Charger", power: "Up to 22 kW", price: 12, status: "Available", avatar: "https://randomuser.me/api/portraits/women/68.jpg" }
];

export default function MobileVansPage() {
  const [selectedVan, setSelectedVan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [locationText, setLocationText] = useState("Detecting your location...");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const data = await res.json();
            
            // Extract a clean city/neighborhood name
            const city = data.address?.city || data.address?.town || data.address?.village || "";
            const neighbourhood = data.address?.neighbourhood || data.address?.suburb || "";
            const state = data.address?.state || "";
            
            if (neighbourhood && city) {
              setLocationText(`${neighbourhood}, ${city}`);
            } else if (city && state) {
              setLocationText(`${city}, ${state}`);
            } else if (data.display_name) {
              // Fallback to a shortened version of display name
              setLocationText(data.display_name.split(',').slice(0, 2).join(', '));
            } else {
              setLocationText("Location Found");
            }
          } catch (error) {
            console.error("Reverse geocoding failed", error);
            setLocationText("Location Found");
          }
        },
        (error) => {
          console.warn("Geolocation failed", error);
          setLocationText("Location Access Denied");
        }
      );
    } else {
      setLocationText("Geolocation Unavailable");
    }
  }, []);

  const handleRequest = (van) => {
    setSelectedVan(van);
    setIsModalOpen(true);
    setBookingSuccess(false);
  };

  const confirmBooking = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setBookingSuccess(true);
    }, 1500);
  };

  return (
    <AnimatedPage className="min-h-screen bg-[#F4F2FA] dark:bg-[#06020E] text-foreground pb-20 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 space-y-12 mt-8">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Mobile Charging Vans</h1>
            <p className="text-muted-foreground text-sm">On-demand charging at your location. Fast, safe, reliable.</p>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#E9D5FF]/40 to-white dark:from-[#2D1B54]/40 dark:to-[#0A0512] border border-primary/10 shadow-sm flex flex-col md:flex-row items-center p-8 md:p-12 gap-8">
          <div className="flex-1 space-y-8 z-10">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
              Power on the go, <br/>
              <span className="text-primary">wherever you are.</span>
            </h2>
            <p className="text-muted-foreground max-w-md">Our portable charging vans reach you anytime, anywhere. Don't let a low battery slow you down.</p>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Fast Response</p>
                  <p className="text-xs text-muted-foreground">15-30 min</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Safe & Reliable</p>
                  <p className="text-xs text-muted-foreground">Certified Equipment</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Available 24/7</p>
                  <p className="text-xs text-muted-foreground">Always at your service</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-[45%] h-[250px] md:h-[350px] relative z-10 flex justify-center items-center">
            <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-[60px]"></div>
            <img src="/premium_van.png" alt="Mobile Charging Van" className="w-full h-full object-contain relative z-20 hover:scale-105 transition-transform duration-500 drop-shadow-2xl" />
          </div>
        </div>

        {/* Quick Search Bar */}
        <div className="bg-white/80 dark:bg-[#110822]/80 backdrop-blur-xl border border-black/5 dark:border-white/5 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full md:w-auto">
            <p className="text-sm font-bold mb-1 ml-1">Need a Charge Now?</p>
            <p className="text-xs text-muted-foreground ml-1">Let us find the nearest available van for you.</p>
          </div>
          <div className="flex-1 w-full">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <GlassInput value={locationText} onChange={(e) => setLocationText(e.target.value)} className="pl-9 h-12" />
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="relative">
              <Battery className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <GlassInput defaultValue="10%" className="pl-9 h-12" />
            </div>
          </div>
          <Button className="w-full md:w-auto bg-primary text-white hover:bg-primary/90 px-8 rounded-xl shadow-lg shadow-primary/25 h-12 font-semibold">
            Find Nearest Van <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Two Column Layout: List & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: List */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg">Nearby Available Vans</h3>
              <p className="text-sm text-muted-foreground">Vans near you ready to charge your EV.</p>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {VANS.map((van) => (
                <div key={van.id} className="bg-white dark:bg-[#110822] border border-black/5 dark:border-white/5 rounded-2xl p-5 hover:border-primary/50 transition-colors shadow-sm group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <img src={van.avatar} alt={van.driver} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                      <div>
                        <h4 className="font-bold text-sm flex items-center gap-2">
                          {van.driver} 
                          {van.badge && <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">{van.badge}</span>}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium text-foreground">{van.rating}</span>
                          <span>({van.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-lg">₹{van.price} <span className="text-xs font-normal text-muted-foreground">/kWh</span></p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Est. Price</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary shrink-0" /> {van.eta} away • {van.dist}</div>
                    <div className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-primary shrink-0" /> {van.charger} • {van.power}</div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 pt-4 border-t border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-green-500">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> {van.status}
                    </div>
                    <Button onClick={() => handleRequest(van)} className="bg-primary text-white hover:bg-primary/90 h-9 px-6 rounded-lg shadow-md shadow-primary/20 text-xs font-semibold group-hover:scale-105 transition-transform">
                      Request Now <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
              <button className="w-full text-center text-sm font-semibold text-primary hover:underline py-2 flex items-center justify-center gap-1">
                View All Vans <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Right Column: Radar Map */}
          <div className="bg-white dark:bg-[#110822] border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
            <Button variant="outline" size="sm" className="absolute top-4 right-4 bg-background/50 backdrop-blur-md rounded-full text-xs border-primary/20">
              <RefreshCw className="w-3 h-3 mr-2" /> Refresh
            </Button>
            
            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center mt-8">
              {/* Radar Rings */}
              <div className="absolute inset-0 rounded-full border border-primary/20 scale-[0.25] animate-[ping_4s_linear_infinite] opacity-50"></div>
              <div className="absolute inset-0 rounded-full border border-primary/10 border-dashed scale-[0.5]"></div>
              <div className="absolute inset-0 rounded-full border border-primary/10 scale-[0.75]"></div>
              <div className="absolute inset-0 rounded-full border border-primary/5 border-dashed scale-[1]"></div>
              
              {/* Center User Pin */}
              <div className="absolute z-20 flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(110,56,247,0.5)]">
                    <Car className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="mt-2 bg-primary text-white text-[10px] px-2 py-1 rounded shadow-md font-bold whitespace-nowrap">Your Location</div>
              </div>
              
              {/* Vans on Map */}
              <div className="absolute top-[10%] left-[25%] z-10 flex flex-col items-center">
                <div className="bg-white dark:bg-[#1A0E38] p-1.5 rounded-full border border-primary/30 shadow-lg"><img src="/premium_van.png" className="w-6 h-6 object-contain" /></div>
                <div className="mt-1 text-[10px] bg-white dark:bg-[#110822] px-2 py-0.5 rounded shadow border border-black/5 dark:border-white/5 font-bold">15 min <span className="font-normal text-muted-foreground ml-1">2.1km</span></div>
              </div>
              <div className="absolute top-[35%] right-[5%] z-10 flex flex-col items-center">
                <div className="bg-white dark:bg-[#1A0E38] p-1.5 rounded-full border border-primary/30 shadow-lg"><img src="/premium_van.png" className="w-6 h-6 object-contain" /></div>
                <div className="mt-1 text-[10px] bg-white dark:bg-[#110822] px-2 py-0.5 rounded shadow border border-black/5 dark:border-white/5 font-bold">20 min <span className="font-normal text-muted-foreground ml-1">3.4km</span></div>
              </div>
              <div className="absolute bottom-[25%] left-[5%] z-10 flex flex-col items-center">
                <div className="bg-white dark:bg-[#1A0E38] p-1.5 rounded-full border border-primary/30 shadow-lg"><img src="/premium_van.png" className="w-6 h-6 object-contain" /></div>
                <div className="mt-1 text-[10px] bg-white dark:bg-[#110822] px-2 py-0.5 rounded shadow border border-black/5 dark:border-white/5 font-bold">25 min <span className="font-normal text-muted-foreground ml-1">4.2km</span></div>
              </div>
              <div className="absolute bottom-[10%] right-[25%] z-10 flex flex-col items-center">
                <div className="bg-white dark:bg-[#1A0E38] p-1.5 rounded-full border border-primary/30 shadow-lg"><img src="/premium_van.png" className="w-6 h-6 object-contain" /></div>
                <div className="mt-1 text-[10px] bg-white dark:bg-[#110822] px-2 py-0.5 rounded shadow border border-black/5 dark:border-white/5 font-bold">30 min <span className="font-normal text-muted-foreground ml-1">5.6km</span></div>
              </div>
            </div>
            
            {/* Map Legend */}
            <div className="absolute bottom-6 flex gap-4 text-[10px] font-medium bg-background/50 backdrop-blur-md px-4 py-2 rounded-full">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div> Available</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary"></div> On the way</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Busy</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#110822] p-6 rounded-2xl border border-black/5 dark:border-white/5 flex flex-col items-center text-center gap-4 shadow-sm hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-sm mb-2">Portable & Powerful</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">High-performance chargers brought to you.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#110822] p-6 rounded-2xl border border-black/5 dark:border-white/5 flex flex-col items-center text-center gap-4 shadow-sm hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Car className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-sm mb-2">All EVs Supported</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Compatible with all major EV models.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#110822] p-6 rounded-2xl border border-black/5 dark:border-white/5 flex flex-col items-center text-center gap-4 shadow-sm hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-sm mb-2">Safe & Certified</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Industry-certified equipment for safe charging.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#110822] p-6 rounded-2xl border border-black/5 dark:border-white/5 flex flex-col items-center text-center gap-4 shadow-sm hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-sm mb-2">Transparent Pricing</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Pay only for the energy you consume.</p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="pt-4">
          <h3 className="text-xl font-bold mb-8">How It Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-[4.5rem] left-[15%] right-[15%] h-px border-t-[3px] border-dotted border-primary/20 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs mb-4 shadow-[0_0_15px_rgba(110,56,247,0.4)] absolute -top-3 -left-3">1</div>
              <div className="bg-white dark:bg-[#1A0E38] p-6 rounded-2xl border border-primary/10 mb-4 shadow-sm"><Navigation className="w-10 h-10 text-primary" /></div>
              <h4 className="font-bold text-sm mb-2">Request a Van</h4>
              <p className="text-xs text-muted-foreground">Share your location and battery level.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs mb-4 shadow-[0_0_15px_rgba(110,56,247,0.4)] absolute -top-3 -left-3">2</div>
              <div className="bg-white dark:bg-[#1A0E38] p-6 rounded-2xl border border-primary/10 mb-4 shadow-sm"><img src="/premium_van.png" className="w-10 h-10 object-contain" /></div>
              <h4 className="font-bold text-sm mb-2">We Reach You</h4>
              <p className="text-xs text-muted-foreground">Nearest van will be on the way.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs mb-4 shadow-[0_0_15px_rgba(110,56,247,0.4)] absolute -top-3 -left-3">3</div>
              <div className="bg-white dark:bg-[#1A0E38] p-6 rounded-2xl border border-primary/10 mb-4 shadow-sm"><Zap className="w-10 h-10 text-primary" /></div>
              <h4 className="font-bold text-sm mb-2">We Charge Your EV</h4>
              <p className="text-xs text-muted-foreground">Sit back while we charge your vehicle safely.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs mb-4 shadow-[0_0_15px_rgba(110,56,247,0.4)] absolute -top-3 -left-3">4</div>
              <div className="bg-white dark:bg-[#1A0E38] p-6 rounded-2xl border border-primary/10 mb-4 shadow-sm"><CheckCircle2 className="w-10 h-10 text-primary" /></div>
              <h4 className="font-bold text-sm mb-2">Pay & Go</h4>
              <p className="text-xs text-muted-foreground">Easy & secure payment. You're all set!</p>
            </div>
          </div>
        </div>

        {/* Safety Banner */}
        <div className="bg-white dark:bg-[#110822] border border-primary/20 rounded-3xl p-8 shadow-sm flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden mt-8">
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-primary/5 rounded-full blur-[60px]"></div>
          
          <div className="w-24 h-24 bg-gradient-to-br from-[#6E38F7] to-[#4C1D95] rounded-[2rem] flex items-center justify-center rotate-12 shrink-0 shadow-[0_0_30px_rgba(110,56,247,0.3)] relative z-10">
            <Shield className="w-10 h-10 text-white -rotate-12" />
          </div>
          
          <div className="flex-1 text-center lg:text-left z-10">
            <h3 className="text-xl font-bold mb-2">Your Safety, Our Priority</h3>
            <p className="text-sm text-muted-foreground mb-6">Our drivers are verified, trained professionals. You can track the van in real-time and share the trip with your loved ones.</p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-8">
              <div className="flex flex-col items-center gap-2"><BadgeCheck className="w-5 h-5 text-primary" /><span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Verified Drivers</span></div>
              <div className="flex flex-col items-center gap-2"><MapPin className="w-5 h-5 text-primary" /><span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Live Tracking</span></div>
              <div className="flex flex-col items-center gap-2"><Car className="w-5 h-5 text-primary" /><span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Share Trip</span></div>
              <div className="flex flex-col items-center gap-2"><Phone className="w-5 h-5 text-primary" /><span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">24/7 Support</span></div>
            </div>
          </div>
          
          <div className="shrink-0 z-10 mt-6 lg:mt-0">
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/5 font-semibold rounded-xl px-6 h-12">
              Learn More About Safety
            </Button>
          </div>
        </div>

      </div>

      {/* Booking Modal Overlay */}
      {isModalOpen && selectedVan && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white dark:bg-[#110822] w-full max-w-md rounded-3xl p-6 shadow-[0_0_50px_rgba(110,56,247,0.15)] border border-primary/20 transform scale-100 animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
            {!bookingSuccess ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Confirm Request</h3>
                  <p className="text-sm text-muted-foreground mt-1">Review your mobile charging details</p>
                </div>
                
                <div className="bg-background/50 border border-black/5 dark:border-white/5 rounded-2xl p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Driver</span>
                    <span className="font-semibold text-sm flex items-center gap-2"><img src={selectedVan.avatar} className="w-6 h-6 rounded-full border border-primary/20" /> {selectedVan.driver}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">ETA</span>
                    <span className="font-semibold text-sm text-primary bg-primary/10 px-2 py-0.5 rounded">{selectedVan.eta}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Rate</span>
                    <span className="font-semibold text-sm">₹{selectedVan.price}/kWh</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-black/5 dark:border-white/5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Est. (20 kWh)</span>
                    <span className="font-bold text-xl text-foreground">~₹{selectedVan.price * 20}</span>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1 rounded-xl h-12 font-semibold" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button 
                    className="flex-1 bg-primary text-white hover:bg-primary/90 rounded-xl h-12 font-semibold shadow-lg shadow-primary/20 transition-all"
                    onClick={confirmBooking}
                    disabled={isBooking}
                  >
                    {isBooking ? (
                      <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Confirming...</span>
                    ) : (
                      "Confirm & Pay"
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 py-8">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto text-green-500 mb-6 relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                  <CheckCircle2 className="w-10 h-10 relative z-10" />
                </div>
                <h3 className="text-2xl font-bold">Request Confirmed!</h3>
                <p className="text-muted-foreground text-sm max-w-[280px] mx-auto leading-relaxed">
                  <span className="font-bold text-foreground">{selectedVan.driver}</span> is on the way and will arrive at your location in approx. <span className="font-bold text-primary">{selectedVan.eta}</span>.
                </p>
                <div className="pt-8">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90 rounded-xl h-12 shadow-lg shadow-primary/20 font-semibold" onClick={() => setIsModalOpen(false)}>
                    Track Van Live
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </AnimatedPage>
  );
}
