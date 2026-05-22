"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, CalendarCheck, ShieldAlert, Navigation, Settings, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/map", label: "Find Charger", icon: MapPin },
  { href: "/booking", label: "My Bookings", icon: CalendarCheck },
  { href: "/safety", label: "Safety Center", icon: ShieldAlert },
  { href: "/tracking", label: "Live Tracking", icon: Navigation },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-64 border-r border-border/40 bg-background/50 glass h-[calc(100vh-4rem)] sticky top-16">
      <div className="flex-1 py-6 flex flex-col gap-2 px-4">
        <h2 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Navigation
        </h2>
        {routes.map((route) => {
          const isActive = pathname === route.href;
          const Icon = route.icon;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary font-medium neon-glow"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "")} />
              {route.label}
            </Link>
          );
        })}
      </div>
      <div className="p-4 border-t border-border/40">
        <div className="glass-card p-4 rounded-xl text-center">
          <p className="text-sm font-medium mb-2">Need Help?</p>
          <p className="text-xs text-muted-foreground mb-4">Our AI assistant is ready to help 24/7</p>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-ai-assistant'))}
            className="w-full py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors shadow-[0_0_10px_rgba(168,85,247,0.4)]"
          >
            Ask AI
          </button>
        </div>
      </div>
    </div>
  );
}
