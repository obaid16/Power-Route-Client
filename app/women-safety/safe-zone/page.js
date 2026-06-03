"use client";

import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { ArrowLeft, Map, Shield, Eye, Bell, Activity, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SafeZonePage() {
  return (
    <AnimatedPage className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 pb-20 font-sans h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="shrink-0">
        <Link href="/women-safety" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Safety Center
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Map className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white">Safe Zone View</h1>
            </div>
            <p className="text-muted-foreground">Real-time monitoring of safe areas, crowds, and security personnel.</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl h-12 border-primary/20 text-primary hover:bg-primary/5">
              <Bell className="w-4 h-4 mr-2" /> Alert Zones
            </Button>
            <Button className="rounded-xl h-12 bg-primary hover:bg-primary/90 text-white shadow-sm shadow-primary/25">
              <Eye className="w-4 h-4 mr-2" /> Live Monitor
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* Sidebar Data */}
        <div className="lg:col-span-1 space-y-6 overflow-y-auto pr-2 pb-4 scrollbar-hide">
          <div className="glass-card rounded-3xl p-5 border border-primary/20 bg-primary/5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Area Status</h3>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Safe
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Crowd Activity</span>
                  <span className="font-semibold">Moderate</span>
                </div>
                <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[60%] bg-blue-500 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Street Lighting</span>
                  <span className="font-semibold text-green-500">Excellent</span>
                </div>
                <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[95%] bg-green-500 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Police Presence</span>
                  <span className="font-semibold">Active Patrols</span>
                </div>
                <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[75%] bg-primary rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-5 border border-black/5 dark:border-white/5 shadow-sm space-y-4">
            <h3 className="font-bold text-lg">Safe Havens Near You</h3>
            
            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-black/5 dark:hover:border-white/5">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Police Kiosk</h4>
                <p className="text-xs text-muted-foreground">200m away • Open 24/7</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-black/5 dark:hover:border-white/5">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-sm font-bold">City Hospital</h4>
                <p className="text-xs text-muted-foreground">800m away • Open 24/7</p>
              </div>
            </div>

            <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/5">
              <Plus className="w-4 h-4 mr-2" /> View All Havens
            </Button>
          </div>
        </div>

        {/* Map Visualization */}
        <div className="lg:col-span-3 h-[400px] lg:h-full relative glass-card rounded-3xl border border-black/5 dark:border-white/5 overflow-hidden shadow-sm">
          <iframe 
            src="https://maps.google.com/maps?q=19.0760,72.8777&z=15&output=embed" 
            className="absolute inset-0 w-full h-full opacity-70 dark:opacity-40 pointer-events-none scale-110 saturate-150" 
            style={{ border: 0 }} 
          />
          
          {/* Radar overlay simulating safety scans */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/10 rounded-full opacity-50 pointer-events-none">
            <div className="absolute inset-0 rounded-full bg-primary/5 animate-[ping_6s_linear_infinite]" />
            <div className="absolute inset-[20%] rounded-full border border-primary/20" />
            <div className="absolute inset-[40%] rounded-full border border-primary/20" />
            <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-primary/80 to-transparent origin-left animate-[spin_4s_linear_infinite]" />
          </div>

          <div className="absolute z-20 flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(110,56,247,0.8)] border-2 border-white">
              </div>
            </div>
            <div className="mt-1 bg-background/90 backdrop-blur text-foreground text-[10px] px-2 py-1 rounded-md shadow-md font-bold">You</div>
          </div>
          
          {/* Safe Zones overlays */}
          <div className="absolute top-[30%] left-[30%] w-32 h-32 bg-green-500/20 rounded-full blur-xl pointer-events-none mix-blend-screen" />
          <div className="absolute bottom-[20%] right-[40%] w-48 h-48 bg-blue-500/20 rounded-full blur-xl pointer-events-none mix-blend-screen" />

          {/* Legend */}
          <div className="absolute bottom-6 right-6 flex gap-4 text-[10px] font-medium bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 dark:border-white/5 shadow-lg">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div> Highly Safe</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div> Moderately Safe</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div> Avoid</div>
          </div>
        </div>

      </div>
    </AnimatedPage>
  );
}
