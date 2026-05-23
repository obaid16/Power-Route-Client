"use client";

import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, ShieldCheck, BatteryCharging, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function LandingPage() {
  return (
    <AnimatedPage className="flex flex-col gap-12 pb-16">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden rounded-3xl glass-card border border-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-900/20" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center space-y-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-sm font-medium text-primary shadow-[0_0_10px_rgba(168,85,247,0.3)] mb-4"
            >
              <Zap className="mr-2 h-4 w-4" />
              Next-Gen EV Charging Network
            </motion.div>
            
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl neon-text pb-2">
              Power Your Journey
              <br />
              <span className="text-foreground">With Intelligence</span>
            </h1>
            
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find, book, and charge your EV seamlessly. Guided by advanced AI and premium futuristic technology for the ultimate driving experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-8">
              <Link href="/map" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 neon-glow rounded-full text-lg h-14 px-8">
                  Find Chargers Near Me <MapPin className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full border-primary/50 text-primary hover:bg-primary/10 h-14 px-8 text-lg">
                  Join Network <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container px-4 md:px-6 mt-8">
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-2xl flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <BatteryCharging className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Smart Charging</h3>
            <p className="text-muted-foreground">AI-optimized charging schedules to maximize battery life and minimize cost.</p>
          </motion.div>
          
          <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-2xl flex flex-col gap-4 border-primary/30">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Real-time Availability</h3>
            <p className="text-muted-foreground">Live updates on charger status, predicting wait times before you arrive.</p>
          </motion.div>
          
          <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-2xl flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Secure Payments</h3>
            <p className="text-muted-foreground">Frictionless plug-and-charge technology with end-to-end encryption.</p>
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
}
