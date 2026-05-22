"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Button } from "@/components/ui/button";
import { Navigation, MapPin, Zap, Clock, Battery, AlertTriangle } from "lucide-react";

export default function TrackingPage() {
  const [carPosition, setCarPosition] = useState({ top: 170, left: 340 });
  const [eta, setEta] = useState(14);
  const [distance, setDistance] = useState(8.5);
  const [socketStatus, setSocketStatus] = useState("Connecting...");

  useEffect(() => {
    const socket = io('http://localhost:5000');
    
    socket.on('connect', () => {
      setSocketStatus("Live Sync Active");
      socket.emit('join_tracking', 'trip_123');
    });

    socket.on('disconnect', () => {
      setSocketStatus("Disconnected");
    });

    // For demo purposes, slowly move the car and broadcast to the room
    const interval = setInterval(() => {
       setCarPosition(prev => {
         const newPos = { top: prev.top - 5, left: prev.left + 5 };
         socket.emit('location_update', { tripId: 'trip_123', position: newPos });
         return newPos;
       });
       setEta(prev => Math.max(0, prev - 1));
       setDistance(prev => Math.max(0, (prev - 0.5).toFixed(1)));
    }, 3000);

    socket.on('new_location', (data) => {
       // If another client sends an update
       if (data.position) setCarPosition(data.position);
    });

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, []);
  return (
    <AnimatedPage className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
      {/* Sidebar Info */}
      <div className="w-full md:w-[350px] lg:w-[400px] flex flex-col gap-6 h-full overflow-y-auto scrollbar-hide pb-20 md:pb-0">
        
        <div className="glass-card rounded-3xl p-6 border border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px] pointer-events-none" />
          <h2 className="text-xl font-bold mb-6 flex items-center relative z-10 neon-text">
            <Navigation className="mr-2 h-5 w-5 text-primary" /> Active Journey
          </h2>
          
          <div className="space-y-6 relative z-10">
            <div className="relative pl-6 border-l-2 border-primary/30 space-y-6">
              <div className="relative">
                <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-background border-2 border-primary"></div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Current Location</h3>
                <p className="font-semibold text-lg">Highway 101, Exit 24</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse border-2 border-background"></div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Destination</h3>
                <p className="font-semibold text-lg text-primary">Neon Charge Hub</p>
                <div className="inline-flex items-center mt-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
                  <Zap className="mr-1 h-3 w-3" /> 350kW DC Fast
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> ETA
                </span>
                <p className="text-2xl font-bold text-white">{eta} mins</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase flex items-center">
                  <MapPin className="h-3 w-3 mr-1" /> Distance
                </span>
                <p className="text-2xl font-bold text-white">{distance} km</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-white/5">
          <h3 className="font-bold mb-4 flex items-center text-lg">
            <Battery className="h-5 w-5 mr-2 text-green-400" /> Vehicle Status
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Current Battery</span>
                <span className="font-bold text-green-400">18%</span>
              </div>
              <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[18%] shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
              <p className="text-sm text-orange-200">
                Battery is low. You have enough charge to reach your destination, but please avoid sudden accelerations.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Map Area */}
      <div className="flex-1 relative rounded-3xl overflow-hidden glass-card border border-primary/20 min-h-[400px]">
        {/* Abstract Map Background */}
        <div className="absolute inset-0 bg-[#0B0416] opacity-90">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
        
        {/* Mocked Route Line */}
        <div className="absolute inset-0 z-0">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <path d="M 100,300 C 200,300 300,150 500,100" fill="transparent" stroke="rgba(168,85,247,0.3)" strokeWidth="8" strokeLinecap="round" strokeDasharray="10 15" />
                <path d="M 100,300 C 200,300 300,150 350,180" fill="transparent" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" className="animate-[dash_3s_linear_infinite]" />
            </svg>
        </div>

        {/* Current Car Marker */}
        <div 
          className="absolute z-10 transition-all duration-1000 ease-linear"
          style={{ top: `${carPosition.top}px`, left: `${carPosition.left}px` }}
        >
          <div className="relative">
            <div className="absolute -inset-6 bg-blue-500/20 rounded-full blur-md animate-pulse" />
            <div className="relative h-10 w-10 bg-background rounded-full flex items-center justify-center border-2 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <Navigation className="h-5 w-5 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Destination Marker */}
        <div className="absolute top-[80px] left-[480px] z-10">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/30 rounded-full blur-md animate-pulse" />
            <div className="relative h-12 w-12 bg-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.8)] border-2 border-white">
              <Zap className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        
        {/* Overlay Info */}
        <div className="absolute top-6 right-6">
          <div className="glass-card px-4 py-2 rounded-full border border-primary/30 flex items-center gap-2 backdrop-blur-xl shadow-lg">
             <span className={`w-2 h-2 rounded-full ${socketStatus === 'Disconnected' ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></span>
             <span className="text-sm font-medium">{socketStatus}</span>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
