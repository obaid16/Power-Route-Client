"use client";

import React, { useState } from "react";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { ArrowLeft, TrendingUp, Zap, Leaf, Calendar, Cpu, Battery, MapPin, BarChart3, Star, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("distance");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "energy" || tab === "distance") {
        Promise.resolve().then(() => setActiveTab(tab));
      }
    }
  }, []);

  // Mock data for weekly distance
  const weeklyDistance = [
    { day: "Mon", val: 32 },
    { day: "Tue", val: 48 },
    { day: "Wed", val: 25 },
    { day: "Thu", val: 56 },
    { day: "Fri", val: 64 },
    { day: "Sat", val: 18 },
    { day: "Sun", val: 30 }
  ];

  // Mock data for weekly energy (consumed vs regenerated)
  const weeklyEnergy = [
    { day: "Mon", consumed: 8.2, regen: 1.6 },
    { day: "Tue", consumed: 12.0, regen: 2.4 },
    { day: "Wed", consumed: 6.5, regen: 1.3 },
    { day: "Thu", consumed: 14.2, regen: 3.0 },
    { day: "Fri", consumed: 16.0, regen: 3.5 },
    { day: "Sat", consumed: 4.5, regen: 0.9 },
    { day: "Sun", consumed: 7.6, regen: 1.8 }
  ];

  // SVG Chart Dimensions
  const chartWidth = 500;
  const chartHeight = 240;
  const padding = 40;

  // Calculate points for Distance Line Chart
  const maxVal = Math.max(...weeklyDistance.map(d => d.val)) * 1.1; // 10% buffer
  const points = weeklyDistance.map((d, i) => {
    const x = padding + (i * (chartWidth - padding * 2)) / (weeklyDistance.length - 1);
    const y = chartHeight - padding - (d.val * (chartHeight - padding * 2)) / maxVal;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`;

  return (
    <div className="min-h-[calc(100vh-5rem)] text-foreground pb-32 transition-colors duration-300">
      <AnimatedPage stagger className="max-w-5xl mx-auto px-4 md:px-8 space-y-8 mt-8">
        
        {/* Header */}
        <div className="shrink-0">
          <Link href="/profile" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Profile
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white">Vehicle Analytics</h1>
              </div>
              <p className="text-muted-foreground">Deep insights into your vehicle telemetry, range, and green efficiency score.</p>
            </div>
            
            {/* Tabs */}
            <div className="flex bg-white dark:bg-[#110822] border border-black/10 dark:border-[#2D1B54]/40 rounded-2xl p-1.5 backdrop-blur-sm shadow-sm shrink-0">
              <button 
                onClick={() => setActiveTab("distance")}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'distance' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <MapPin className="w-4 h-4" /> Distance & Range
              </button>
              <button 
                onClick={() => setActiveTab("energy")}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'energy' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Zap className="w-4 h-4" /> Energy & Efficiency
              </button>
            </div>
          </div>
        </div>

        {activeTab === "distance" ? (
          <div className="flex flex-col gap-8">
            {/* Distance Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Total Distance", val: "1,256 km", sub: "Since registration", icon: MapPin, color: "text-[#6E38F7] bg-[#6E38F7]/10" },
                { label: "Monthly Average", val: "480 km", sub: "+8.4% vs last month", icon: Calendar, color: "text-blue-500 bg-blue-500/10" },
                { label: "Daily Average", val: "42.8 km", sub: "Based on active days", icon: Clock, color: "text-emerald-500 bg-emerald-500/10" },
                { label: "Predicted Range", val: "260 km", sub: "At 80% battery capacity", icon: Battery, color: "text-[#A87BFF] bg-[#A87BFF]/10" }
              ].map((card, i) => (
                <div key={i} className="glass-card rounded-3xl p-6 border border-black/5 dark:border-white/5 relative overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                  <div>
                    <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                      <card.icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{card.label}</p>
                    <h3 className="text-2xl font-black text-foreground dark:text-white mb-2">{card.val}</h3>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {card.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Main Interactive Distance Chart */}
            <div className="glass-card rounded-[32px] p-6 lg:p-8 border border-black/5 dark:border-white/5 shadow-xl relative overflow-hidden bg-white/40 dark:bg-[#110822]/40 backdrop-blur-md">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#6E38F7]/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" /> Daily Distance Telemetry
                  </h3>
                  <p className="text-sm text-muted-foreground">Detailed distance tracking (km) over the last 7 days.</p>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="w-3 h-3 rounded bg-primary shadow-[0_0_8px_rgba(110,56,247,0.6)]"></span> Distance
                </div>
              </div>

              {/* SVG Canvas Chart */}
              <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="min-w-[500px] h-[260px] mx-auto relative">
                  <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full">
                    {/* Y-axis grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((p, i) => {
                      const y = padding + p * (chartHeight - padding * 2);
                      return (
                        <g key={i}>
                          <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} className="stroke-black/5 dark:stroke-white/5" strokeWidth="1" strokeDasharray="4 4" />
                          <text x={padding - 8} y={y + 4} className="fill-muted-foreground text-[8px] font-mono" textAnchor="end">
                            {Math.round((1 - p) * maxVal)}
                          </text>
                        </g>
                      );
                    })}

                    {/* Gradient fill */}
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6E38F7" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#6E38F7" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Shaded Area */}
                    <path d={areaPath} fill="url(#chartGrad)" />

                    {/* Glowing Stroke Line */}
                    <path d={linePath} fill="none" className="stroke-primary" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 4px 10px rgba(110, 56, 247, 0.45))" }} />

                    {/* Node points and tooltips */}
                    {points.map((p, i) => (
                      <g key={i} className="group cursor-pointer">
                        <circle cx={p.x} cy={p.y} r="5" className="fill-primary stroke-white dark:stroke-[#06020E]" strokeWidth="2" />
                        <circle cx={p.x} cy={p.y} r="10" className="fill-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {/* Tooltip */}
                        <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <rect x={p.x - 22} y={p.y - 30} width="44" height="20" rx="6" className="fill-[#110822] border border-primary/20 dark:fill-white" />
                          <text x={p.x} y={p.y - 17} className="fill-white dark:fill-[#110822] text-[9px] font-bold font-mono" textAnchor="middle">
                            {p.val}km
                          </text>
                        </g>
                        {/* X-axis labels */}
                        <text x={p.x} y={chartHeight - 12} className="fill-muted-foreground text-[9px] font-mono font-bold" textAnchor="middle">
                          {p.day}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Energy Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Energy Consumed", val: "320 kWh", sub: "Total charging input", icon: Zap, color: "text-[#6E38F7] bg-[#6E38F7]/10" },
                { label: "Regen Recovery", val: "64.5 kWh", sub: "+20.1% recovered energy", icon: Battery, color: "text-green-500 bg-green-500/10" },
                { label: "Efficiency Ratio", val: "4.8 km/kWh", sub: "Driving efficiency score", icon: Cpu, color: "text-blue-500 bg-blue-500/10" },
                { label: "Carbon Offset", val: "184.2 kg", sub: "CO₂ emissions prevented", icon: Leaf, color: "text-emerald-500 bg-emerald-500/10" }
              ].map((card, i) => (
                <div key={i} className="glass-card rounded-3xl p-6 border border-black/5 dark:border-white/5 relative overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                  <div>
                    <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                      <card.icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{card.label}</p>
                    <h3 className="text-2xl font-black text-foreground dark:text-white mb-2">{card.val}</h3>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {card.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Main Interactive Energy Chart */}
            <div className="glass-card rounded-[32px] p-6 lg:p-8 border border-black/5 dark:border-white/5 shadow-xl relative overflow-hidden bg-white/40 dark:bg-[#110822]/40 backdrop-blur-md">
              <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" /> Daily Energy Consumption & Regeneration
                  </h3>
                  <p className="text-sm text-muted-foreground">Comparison of energy consumed vs. regenerated by breaking (kWh) over 7 days.</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#6E38F7]"></span> Consumed
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-green-500"></span> Regenerated
                  </div>
                </div>
              </div>

              {/* SVG Canvas Chart for Energy comparison */}
              <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="min-w-[500px] h-[260px] mx-auto relative">
                  <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full">
                    {/* Y-axis grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((p, i) => {
                      const y = padding + p * (chartHeight - padding * 2);
                      return (
                        <g key={i}>
                          <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} className="stroke-black/5 dark:stroke-white/5" strokeWidth="1" strokeDasharray="4 4" />
                          <text x={padding - 8} y={y + 4} className="fill-muted-foreground text-[8px] font-mono" textAnchor="end">
                            {Math.round((1 - p) * 18)}
                          </text>
                        </g>
                      );
                    })}

                    {/* Double Bar Graph mapping */}
                    {weeklyEnergy.map((d, i) => {
                      const groupX = padding + (i * (chartWidth - padding * 2)) / weeklyEnergy.length + 8;
                      const barWidth = 10;

                      const consumedHeight = (d.consumed * (chartHeight - padding * 2)) / 18;
                      const consumedY = chartHeight - padding - consumedHeight;

                      const regenHeight = (d.regen * (chartHeight - padding * 2)) / 18;
                      const regenY = chartHeight - padding - regenHeight;

                      return (
                        <g key={i} className="group cursor-pointer">
                          {/* Consumed Bar */}
                          <rect 
                            x={groupX} 
                            y={consumedY} 
                            width={barWidth} 
                            height={consumedHeight} 
                            rx="3" 
                            className="fill-primary hover:fill-primary/80 transition-colors" 
                            style={{ filter: "drop-shadow(0 2px 6px rgba(110, 56, 247, 0.2))" }}
                          />
                          {/* Regen Bar */}
                          <rect 
                            x={groupX + barWidth + 4} 
                            y={regenY} 
                            width={barWidth} 
                            height={regenHeight} 
                            rx="3" 
                            className="fill-green-500 hover:fill-green-400 transition-colors" 
                            style={{ filter: "drop-shadow(0 2px 6px rgba(34, 197, 94, 0.2))" }}
                          />                          {/* Tooltip values on hover */}
                          <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <rect x={groupX - 16} y={Math.min(consumedY, regenY) - 36} width="66" height="24" rx="6" className="fill-[#110822]" />
                            <text x={groupX + barWidth} y={Math.min(consumedY, regenY) - 24} className="fill-white text-[8px] font-bold font-mono" textAnchor="middle">
                              {d.consumed} / {d.regen} kWh
                            </text>
                          </g>

                          {/* X-axis label */}
                          <text x={groupX + barWidth} y={chartHeight - 12} className="fill-muted-foreground text-[9px] font-mono font-bold" textAnchor="middle">
                            {d.day}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Driving / Charging Tips Section */}
        <div className="glass-card rounded-[32px] p-6 md:p-8 border border-primary/20 bg-primary/5 relative overflow-hidden shadow-sm">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] pointer-events-none"></div>
          <h2 className="text-xl font-bold mb-1">Green Fleet Strategy</h2>
          <p className="text-sm text-muted-foreground mb-8">Optimize your driving telemetry to save battery energy and maximize distance.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-border/50 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-sm">Steady Speed Control</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Maintaining constant highway speed can boost range by up to 15% and stabilize energy draw.</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-border/50 flex items-center justify-center">
                <Battery className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-sm">Regen Optimization</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Leverage maximum regenerative braking settings to recover kinetic charge and feed it back to your cell.</p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-border/50 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-sm">Preconditioning Advantage</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Condition your battery cell during active charging slot hours to conserve valuable driving range.</p>
            </div>
          </div>
        </div>
      </AnimatedPage>
    </div>
  );
}
