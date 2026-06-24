"use client";

import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Clock, MapPin, Map, Zap, Calendar, ArrowRight } from "lucide-react";

export default function TripHistoryPage() {
  const trips = [
    {
      id: 1,
      date: "Today, 2:30 PM",
      from: "Downtown Hub",
      to: "Westside Station",
      distance: "12.5 km",
      duration: "45 min",
      energyUsed: "4.2 kWh",
      status: "Completed",
    },
    {
      id: 2,
      date: "Yesterday, 9:15 AM",
      from: "Home",
      to: "Downtown Hub",
      distance: "18.2 km",
      duration: "55 min",
      energyUsed: "6.1 kWh",
      status: "Completed",
    },
    {
      id: 3,
      date: "May 20, 4:00 PM",
      from: "North Supercharger",
      to: "Home",
      distance: "32.0 km",
      duration: "1h 20m",
      energyUsed: "10.5 kWh",
      status: "Completed",
    },
  ];

  return (
    <AnimatedPage stagger className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Clock className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white">Trip History</h1>
          <p className="text-muted-foreground mt-1">Review your past journeys and energy usage.</p>
        </div>
      </div>
        {trips.map((trip) => (
          <div key={trip.id} className="glass-card rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {trip.date}
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-0.5 h-8 bg-border" />
                    <div className="w-3 h-3 rounded-full border-2 border-primary bg-background" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-foreground dark:text-white">{trip.from}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground dark:text-white">{trip.to}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-4 md:gap-2 justify-between items-end md:items-end md:justify-center border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                <div className="flex items-center gap-2 text-sm">
                  <Map className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">{trip.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{trip.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Zap className="w-4 h-4" />
                  <span className="font-semibold">{trip.energyUsed}</span>
                </div>
              </div>

            </div>
          </div>
        ))}
    </AnimatedPage>
  );
}
