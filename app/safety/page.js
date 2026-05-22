"use client";

import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Button } from "@/components/ui/button";
import { ShieldAlert, PhoneCall, MapPin, Video, Info, Lock } from "lucide-react";

export default function SafetyCenter() {
  return (
    <AnimatedPage className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
          <ShieldAlert className="h-8 w-8 text-red-500 animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 neon-text text-transparent bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text">Safety Center</h1>
        <p className="text-muted-foreground">24/7 Protection & Emergency Assistance</p>
      </div>

      {/* Emergency SOS */}
      <div className="glass-card rounded-3xl p-8 border border-red-500/30 relative overflow-hidden bg-red-500/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <h2 className="text-2xl font-bold text-red-400 mb-2">Emergency SOS</h2>
            <p className="text-muted-foreground max-w-lg">
              Instantly share your live location, vehicle details, and activate station cameras. This will immediately connect you to local authorities and our 24/7 safety response team.
            </p>
          </div>
          <Button size="lg" className="h-20 px-10 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-[0_0_30px_rgba(220,38,38,0.6)] animate-pulse border-4 border-red-400/50 text-xl font-bold w-full md:w-auto">
            <PhoneCall className="mr-3 h-6 w-6" /> SOS ALERT
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Women's Safety */}
        <div className="glass-card rounded-3xl p-6 border border-pink-500/20 bg-pink-500/5 hover:border-pink-500/40 transition-all">
          <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-pink-400" />
          </div>
          <h3 className="text-xl font-bold text-pink-400 mb-2">Women's Safety Mode</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Activate enhanced security protocols. Station lights will turn to maximum brightness, camera feeds are monitored live, and security personnel are placed on standby.
          </p>
          <Button className="w-full bg-pink-600/20 text-pink-400 hover:bg-pink-600/30 border border-pink-500/30 rounded-xl">
            Activate Safe Mode
          </Button>
        </div>

        {/* Live Station Monitoring */}
        <div className="glass-card rounded-3xl p-6 border border-primary/20 hover:border-primary/40 transition-all">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <Video className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">Live Station Feed</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Check the live camera feed of any charging station before you arrive. Ensure the environment is well-lit and safe before proceeding.
          </p>
          <Button variant="outline" className="w-full border-primary/30 text-primary rounded-xl">
            View Cameras <Video className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Share Location */}
        <div className="glass-card rounded-3xl p-6 border border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40 transition-all">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
            <MapPin className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-blue-400 mb-2">Share Trip Status</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Share your live location, ETA, and charging status with trusted contacts. They will be notified automatically if you deviate from your route.
          </p>
          <Button className="w-full bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl">
            Manage Contacts
          </Button>
        </div>

        {/* Roadside Assistance */}
        <div className="glass-card rounded-3xl p-6 border border-white/5 hover:border-white/20 transition-all">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <Info className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Mobile Charging Van</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Stranded with zero battery? Request our emergency mobile EV charging van to come to your location and provide enough charge to reach the nearest station.
          </p>
          <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 rounded-xl">
            Request Van
          </Button>
        </div>
      </div>
    </AnimatedPage>
  );
}
