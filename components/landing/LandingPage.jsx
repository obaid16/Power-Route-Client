"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, ShieldCheck, BatteryCharging, MapPin } from "lucide-react";
import Link from "next/link";
import { EnergyVisualizer } from "./EnergyVisualizer";
import { LiquidBackground } from "@/components/layout/LiquidBackground";

export function LandingPage() {
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctasRef = useRef(null);
  const visualizerRef = useRef(null);
  const cardsRef = useRef([]);

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    // GSAP timeline for staggered entrance animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(badgeRef.current, { 
      opacity: 1, 
      y: 0, 
      startAt: { y: 20, opacity: 0 }, 
      duration: 0.6 
    })
    .to(titleRef.current, { 
      opacity: 1, 
      y: 0, 
      startAt: { y: 35, opacity: 0 }, 
      duration: 0.8 
    }, "-=0.4")
    .to(descRef.current, { 
      opacity: 1, 
      y: 0, 
      startAt: { y: 20, opacity: 0 }, 
      duration: 0.6 
    }, "-=0.5")
    .to(ctasRef.current, { 
      opacity: 1, 
      y: 0, 
      startAt: { y: 20, opacity: 0 }, 
      duration: 0.6 
    }, "-=0.5")
    .to(visualizerRef.current, { 
      opacity: 1, 
      scale: 1, 
      startAt: { scale: 0.85, opacity: 0 }, 
      duration: 0.9 
    }, "-=0.6");

    // Stagger reveal the feature cards at the bottom
    if (cardsRef.current.length > 0) {
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        startAt: { y: 45, opacity: 0 },
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.1
      });
    }
  }, []);

  return (
    <AnimatedPage className="flex flex-col gap-12 pb-16">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-20 lg:py-24 overflow-hidden rounded-3xl glass-card border border-primary/20">
        <LiquidBackground nested />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-900/20" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        
        <div className="container px-4 md:px-8 relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Title & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
              <div
                ref={badgeRef}
                className="inline-flex items-center rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-sm font-medium text-primary shadow-[0_0_10px_rgba(168,85,247,0.3)] mb-2 opacity-0"
              >
                <Zap className="mr-2 h-4 w-4" />
                Next-Gen EV Charging Network
              </div>
              
              <h1 
                ref={titleRef} 
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl neon-text pb-2 leading-[1.1] opacity-0"
              >
                Power Your Journey
                <br />
                <span className="text-foreground">With Intelligence</span>
              </h1>
              
              <p 
                ref={descRef} 
                className="max-w-[600px] text-muted-foreground md:text-lg lg:text-base xl:text-lg leading-relaxed opacity-0"
              >
                Find, book, and charge your EV seamlessly. Guided by advanced AI and premium interactive 3D technology for the ultimate driving experience.
              </p>
              
              <div 
                ref={ctasRef} 
                className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start mt-6 opacity-0"
              >
                <Link href="/login" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 neon-glow rounded-full text-lg h-14 px-8 cursor-pointer">
                    Login or Sign In <Zap className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full border-primary/50 text-primary hover:bg-primary/10 h-14 px-8 text-lg cursor-pointer">
                    Join Network <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: 3D Visualization */}
            <div 
              ref={visualizerRef} 
              className="lg:col-span-5 w-full flex justify-center items-center opacity-0"
            >
              <div className="w-full max-w-[450px] aspect-square rounded-3xl overflow-hidden glass-card border border-primary/10 shadow-[0_0_40px_rgba(110,56,247,0.15)] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-950/10 pointer-events-none" />
                <EnergyVisualizer />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container px-4 md:px-8 max-w-7xl mx-auto mt-4">
        <div className="grid gap-6 md:grid-cols-3">
          
          <div 
            ref={addToCardsRef} 
            className="glass-card p-6 rounded-2xl flex flex-col gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group opacity-0"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <BatteryCharging className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Smart Charging</h3>
            <p className="text-muted-foreground leading-relaxed">AI-optimized charging schedules to maximize battery life and minimize cost.</p>
          </div>
          
          <div 
            ref={addToCardsRef} 
            className="glass-card p-6 rounded-2xl flex flex-col gap-4 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group opacity-0"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Real-time Availability</h3>
            <p className="text-muted-foreground leading-relaxed">Live updates on charger status, predicting wait times before you arrive.</p>
          </div>
          
          <div 
            ref={addToCardsRef} 
            className="glass-card p-6 rounded-2xl flex flex-col gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group opacity-0"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Secure Payments</h3>
            <p className="text-muted-foreground leading-relaxed">Frictionless plug-and-charge technology with end-to-end encryption.</p>
          </div>

        </div>
      </section>
    </AnimatedPage>
  );
}
