"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { GlassInput } from "@/components/ui/glass-input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Zap, Navigation, Star, Battery, Filter, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MapPage() {
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await api.get('/stations');
        const data = res.data?.data || [];
        // Map backend schema to UI format
        const formattedData = data.map(st => ({
          id: st._id,
          name: st.name,
          distance: "2.5 km", // Mocking distance calculation for now
          slots: st.chargers.filter(c => c.status === 'available').length,
          type: st.chargers[0]?.type || 'Standard',
          rating: st.rating || 4.5,
          power: st.chargers[0]?.power || '11kW'
        }));
        setStations(formattedData);
        if (formattedData.length > 0) setSelectedStation(formattedData[0]);
      } catch (error) {
        console.error("Failed to fetch stations", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStations();
  }, []);

  return (
    <AnimatedPage className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
      {/* Sidebar List */}
      <div className="w-full md:w-[350px] lg:w-[400px] flex flex-col gap-4 h-full">
        <div className="glass-card p-4 rounded-2xl flex flex-col gap-4">
          <div className="relative">
            <GlassInput placeholder="Search location or station..." className="pl-10" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <Button 
              onClick={() => setFilter(filter === 'DC Fast' ? 'All' : 'DC Fast')}
              variant="outline" 
              size="sm" 
              className={`rounded-full transition-colors ${filter === 'DC Fast' ? 'bg-primary/20 border-primary/50 text-primary neon-glow' : 'bg-white/5 border-white/10'}`}
            >
              <Zap className="mr-1 h-3 w-3" /> DC Fast
            </Button>
            <Button 
              onClick={() => setFilter(filter === 'Level 2' ? 'All' : 'Level 2')}
              variant="outline" 
              size="sm" 
              className={`rounded-full transition-colors ${filter === 'Level 2' ? 'bg-primary/20 border-primary/50 text-primary neon-glow' : 'bg-white/5 border-white/10'}`}
            >
              <Battery className="mr-1 h-3 w-3" /> Level 2
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full bg-white/5 border-white/10"
              onClick={() => alert("More filters coming soon!")}
            >
              <Filter className="mr-1 h-3 w-3" /> More
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide pr-2 pb-20 md:pb-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          ) : stations.length === 0 ? (
            <div className="text-center text-muted-foreground pt-10">No stations found nearby.</div>
          ) : (
            stations
              .filter(st => {
                if (filter === 'All') return true;
                if (filter === 'DC Fast') return parseInt(st.power) > 22; // Basic heuristic for DC fast
                if (filter === 'Level 2') return parseInt(st.power) <= 22;
                return true;
              })
              .map((station) => (
            <motion.div
              key={station.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedStation(station)}
              className={`p-5 rounded-3xl cursor-pointer transition-all ${
                selectedStation?.id === station.id
                  ? "glass-card border-primary/50 neon-glow"
                  : "bg-background/40 border border-white/5 hover:border-white/20 backdrop-blur-sm"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg leading-tight tracking-wide">{station.name}</h3>
                <div className="flex items-center text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full shrink-0 ml-2 border border-yellow-500/20">
                  <Star className="h-3.5 w-3.5 mr-1 fill-current" /> {station.rating}
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-4 font-medium">
                <MapPin className="h-4 w-4 mr-1.5 text-primary" /> {station.distance} away
              </div>
              <div className="flex items-center gap-3 mt-4">
                <span className="text-xs font-bold bg-primary/20 text-primary px-3 py-1.5 rounded-xl border border-primary/30 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
                  {station.power}
                </span>
                <span className="text-xs font-bold bg-green-500/20 text-green-400 px-3 py-1.5 rounded-xl border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                  {station.slots} available
                </span>
              </div>
            </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative rounded-3xl overflow-hidden glass-card border border-primary/20 min-h-[400px]">
        {/* Abstract Map Background */}
        <div className="absolute inset-0 bg-[#0B0416] opacity-90">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
        
        {/* Map Markers (Mocked) */}
        <div className="absolute top-1/3 left-1/4">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/30 rounded-full blur-md animate-pulse" />
            <div className="relative h-8 w-8 bg-primary rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.8)] border-2 border-white">
              <Zap className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 right-1/3">
          <div className="relative opacity-60">
            <div className="relative h-6 w-6 bg-secondary rounded-full flex items-center justify-center border-2 border-white/50">
              <Battery className="h-3 w-3 text-white" />
            </div>
          </div>
        </div>

        {/* Selected Station Overlay */}
        <AnimatePresence>
          {selectedStation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 glass-card p-5 rounded-2xl border-primary/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-white">{selectedStation.name}</h3>
                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-white">
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{selectedStation.type} • {selectedStation.power} • {selectedStation.distance}</p>
              <div className="flex gap-2">
                <Link href={`/booking?station=${selectedStation.id}`} className="flex-1">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90 neon-glow">
                    Book Slot
                  </Button>
                </Link>
                <Link href={`/station/${selectedStation.id}`}>
                  <Button variant="outline" className="w-full border-white/10 bg-white/5">
                    Details
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedPage>
  );
}
