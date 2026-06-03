"use client";

import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { ArrowLeft, Hotel, Shield, Hospital, Zap, Navigation, Phone, Search, SlidersHorizontal, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NearbySafePlacesPage() {
  const places = [
    { name: "Aurora Superhub", type: "EV Charging Station", icon: Zap, distance: "0.8 km", status: "Open 24/7", color: "bg-primary", phone: "1800-123-4567", address: "Central Avenue, Block C" },
    { name: "Marina Inn", type: "Hotel", icon: Hotel, distance: "1.2 km", status: "Open", color: "bg-blue-500", phone: "+91 98765 00000", address: "Seaface Road" },
    { name: "City General Hospital", type: "Hospital", icon: Hospital, distance: "2.4 km", status: "Open 24/7", color: "bg-red-500", phone: "102", address: "Health District" },
    { name: "Central Police Station", type: "Police Station", icon: Shield, distance: "1.6 km", status: "Open 24/7", color: "bg-emerald-500", phone: "100", address: "Main Square" },
    { name: "Sunrise Cafe", type: "Cafe", icon: Hotel, distance: "0.5 km", status: "Open till 11 PM", color: "bg-amber-500", phone: "+91 98765 11111", address: "High Street" },
    { name: "Sector 4 Police Booth", type: "Police Station", icon: Shield, distance: "3.1 km", status: "Open 24/7", color: "bg-emerald-500", phone: "100", address: "Sector 4 Junction" },
  ];

  return (
    <AnimatedPage className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 pb-20 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link href="/women-safety" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Safety Center
          </Link>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Hotel className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white">Nearby Safe Places</h1>
          </div>
          <p className="text-muted-foreground text-sm">Find verified, secure locations around you instantly.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="glass-card flex-1 rounded-2xl p-2 flex items-center border border-black/5 dark:border-white/5 shadow-sm">
          <Search className="w-5 h-5 text-muted-foreground ml-3 mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="Search hospitals, hotels, police stations..." 
            className="bg-transparent border-none outline-none w-full h-10 text-sm text-foreground dark:text-white placeholder:text-muted-foreground"
          />
        </div>
        <Button variant="outline" className="h-14 sm:w-14 shrink-0 rounded-2xl border-black/5 dark:border-white/5 glass-card">
          <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {["All Places", "Police Stations", "Hospitals", "Hotels", "EV Charging 24/7"].map((filter, i) => (
          <button 
            key={i} 
            className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${i === 0 ? 'bg-primary text-white shadow-sm shadow-primary/25' : 'bg-black/5 dark:bg-white/5 text-muted-foreground hover:text-foreground'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {places.map((place, i) => (
          <div key={i} className="glass-card rounded-3xl p-6 border border-black/5 dark:border-white/5 hover:border-primary/20 transition-all group shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm ${place.color}`}>
                  <place.icon className="w-6 h-6" />
                </div>
                <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {place.status}
                </div>
              </div>
              
              <h3 className="font-bold text-xl mb-1 text-foreground dark:text-white group-hover:text-primary transition-colors">{place.name}</h3>
              <p className="text-sm text-muted-foreground font-medium mb-3">{place.type}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0" /> {place.address}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Navigation className="w-4 h-4 shrink-0" /> {place.distance} away
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-auto">
              <Button variant="outline" className="flex-1 rounded-xl h-12 border-black/10 dark:border-white/10 hover:border-primary hover:text-primary transition-colors">
                <Phone className="w-4 h-4 mr-2" /> Call
              </Button>
              <Link href="/map" className="flex-1">
                <Button className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90 text-white shadow-sm shadow-primary/20">
                  <Navigation className="w-4 h-4 mr-2" /> Navigate
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </AnimatedPage>
  );
}
