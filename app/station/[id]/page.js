"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { MapPin, Star, Zap, Battery, Navigation, Clock, ShieldCheck, ChevronLeft } from "lucide-react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function StationDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [station, setStation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const res = await api.get(`/stations/${id}`);
        const data = res.data?.data;
        if (data) {
          // Format data to match UI expectations
          setStation({
            id: data._id,
            name: data.name,
            rating: data.rating || 4.5,
            distance: "2.5 km", // Mock
            timeToReach: "8 min", // Mock
            chargers: data.chargers || [],
            amenities: ["Restroom", "Cafe", "WiFi", "24/7 Security"],
            address: "123 EV Avenue, Green City", // Mock
            availableSlots: data.chargers?.filter(c => c.status === 'available').length || 0,
            totalSlots: data.chargers?.length || 0,
          });
        }
      } catch (error) {
        console.error("Failed to fetch station details", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchStation();
    }
  }, [id]);

  if (isLoading) {
    return (
      <AnimatedPage className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </AnimatedPage>
    );
  }

  if (!station) {
    return (
      <AnimatedPage className="h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Station not found</h2>
        <Button onClick={() => router.push('/map')} variant="outline">Back to Map</Button>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 pb-20">
      {/* Header section */}
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-white/5">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white">{station.name}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <MapPin className="w-4 h-4 text-primary" />
            {station.address} • {station.distance} ({station.timeToReach})
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info Card */}
          <div className="glass-card rounded-3xl p-6 border border-border/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10" />
            <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center text-sm font-bold text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/20">
                  <Star className="h-4 w-4 mr-1 fill-current" /> {station.rating}
                </div>
                <div className="flex items-center text-sm font-bold text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                  <ShieldCheck className="h-4 w-4 mr-1" /> Verified
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Availability</p>
                <p className="font-bold text-lg"><span className="text-green-500">{station.availableSlots}</span> / {station.totalSlots} Slots</p>
              </div>
            </div>

            <h3 className="font-semibold mb-4 text-lg">Available Chargers</h3>
            <div className="space-y-3">
              {station.chargers.map((charger, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-white/5 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${charger.status === 'available' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-400'}`}>
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{charger.type}</p>
                      <p className="text-xs text-muted-foreground">{charger.power}</p>
                    </div>
                  </div>
                  <div className={`text-xs font-bold px-3 py-1 rounded-full ${charger.status === 'available' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'}`}>
                    {charger.status.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="glass-card rounded-3xl p-6 border border-border/50">
            <h3 className="font-semibold mb-4 text-lg">Amenities</h3>
            <div className="flex flex-wrap gap-3">
              {station.amenities.map((amenity, idx) => (
                <div key={idx} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium">
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-primary/30 neon-glow flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Battery className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl mb-2">Ready to Charge?</h3>
            <p className="text-sm text-muted-foreground mb-6">Book your slot now to avoid waiting times at the station.</p>
            
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all mb-3 py-6"
              onClick={() => router.push(`/booking?station=${station.id}`)}
              disabled={station.availableSlots === 0}
            >
              {station.availableSlots === 0 ? "No Slots Available" : "Book a Slot"}
            </Button>
            
            <Button variant="outline" className="w-full py-6 border-white/10 hover:bg-white/5 transition-colors">
              <Navigation className="w-4 h-4 mr-2" /> Navigate
            </Button>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-border/50 text-sm">
            <h4 className="font-semibold mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Hours & Pricing</h4>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex justify-between"><span>Open:</span> <span className="text-foreground">24/7</span></div>
              <div className="flex justify-between"><span>Cost per kWh:</span> <span className="text-foreground">₹18</span></div>
              <div className="flex justify-between"><span>Parking:</span> <span className="text-green-500 font-medium">Free during charge</span></div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
