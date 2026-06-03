"use client";

import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { ArrowLeft, MapPin, Navigation, Shield, Clock, ShieldCheck, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassInput } from "@/components/ui/glass-input";
import { useState } from "react";

export default function SafeRoutePage() {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1500);
  };

  return (
    <AnimatedPage className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 pb-20 font-sans">
      {/* Header */}
      <div>
        <Link href="/women-safety" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Safety Center
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white">Safe Route Planner</h1>
        </div>
        <p className="text-muted-foreground">Find the safest routes avoiding dark alleys and isolated roads.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Route Planner Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-black/5 dark:border-white/5 shadow-sm">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-primary"></div>
                  <GlassInput required placeholder="Current Location" className="pl-10 h-14 rounded-2xl" defaultValue="My Location" />
                </div>
                
                <div className="absolute left-5 top-[4.5rem] bottom-[4.5rem] w-[2px] border-l-2 border-dashed border-border pointer-events-none z-10 hidden lg:block"></div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-sm bg-primary"></div>
                  <GlassInput required placeholder="Where to?" className="pl-10 h-14 rounded-2xl" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Route Preferences</h3>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-primary/20 bg-primary/5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-primary/50 text-primary focus:ring-primary" />
                  <span className="text-sm font-medium">Prioritize Well-lit Roads</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-primary/20 bg-primary/5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-primary/50 text-primary focus:ring-primary" />
                  <span className="text-sm font-medium">Avoid Isolated Areas</span>
                </label>
              </div>

              <Button type="submit" className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm shadow-primary/25">
                {isSearching ? "Calculating Safe Route..." : "Find Route"}
              </Button>
            </form>
          </div>

          {!isSearching && (
            <div className="glass-card rounded-2xl p-5 border border-amber-500/20 bg-amber-500/5">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-amber-500 mb-1">Safety Notice</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Safe routes may be slightly longer but are optimized for security based on real-time lighting and activity data.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Map Visualization Area */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-3xl border border-black/5 dark:border-white/5 h-[500px] lg:h-full w-full relative overflow-hidden flex items-center justify-center bg-black/5 dark:bg-white/5 shadow-sm">
            <iframe 
              src="https://maps.google.com/maps?q=19.0760,72.8777&z=13&output=embed" 
              className="absolute inset-0 w-full h-full opacity-60 dark:opacity-30 pointer-events-none scale-110 saturate-150" 
              style={{ border: 0 }} 
            />
            
            {/* Route Overlay Mockup */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              {!isSearching && (
                <div className="bg-background/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-black/10 dark:border-white/10 shadow-lg text-center animate-in fade-in zoom-in duration-500">
                  <ShieldCheck className="w-10 h-10 text-green-500 mx-auto mb-2" />
                  <h3 className="font-bold text-lg">Safe Route Generated</h3>
                  <div className="flex items-center justify-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 24 mins</span>
                    <span className="flex items-center gap-1"><Navigation className="w-4 h-4" /> 8.2 km</span>
                  </div>
                  <Link href="/map">
                    <Button className="mt-4 w-full rounded-xl bg-primary hover:bg-primary/90 text-white">
                      Start Navigation
                    </Button>
                  </Link>
                </div>
              )}
              {isSearching && (
                <div className="bg-background/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-black/10 dark:border-white/10 shadow-lg flex flex-col items-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="font-semibold text-sm">Analyzing crime data & lighting...</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </AnimatedPage>
  );
}
