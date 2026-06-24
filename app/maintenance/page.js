"use client";

import { Wrench, Calendar, AlertTriangle, CheckCircle2 } from "lucide-react";
import { AnimatedPage } from "@/components/layout/AnimatedPage";

export default function MaintenancePage() {
  return (
    <AnimatedPage stagger className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Wrench className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vehicle Maintenance</h1>
          <p className="text-muted-foreground mt-1">{"Schedule and track your van's health."}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
          <div>
            <h3 className="font-bold">System Status</h3>
            <p className="text-sm text-muted-foreground">All systems operational</p>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
          <Calendar className="w-10 h-10 text-primary" />
          <div>
            <h3 className="font-bold">Next Service</h3>
            <p className="text-sm text-muted-foreground">in 2,350 km or 3 months</p>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
          <AlertTriangle className="w-10 h-10 text-yellow-500" />
          <div>
            <h3 className="font-bold">Tire Pressure</h3>
            <p className="text-sm text-muted-foreground">Check front right tire</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 rounded-3xl mt-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2">Book a Service Appointment</h2>
          <p className="text-sm text-muted-foreground max-w-md">Our certified EV technicians will pick up your van and return it fully serviced.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors">
          Schedule Now
        </button>
      </div>
    </AnimatedPage>
  );
}
