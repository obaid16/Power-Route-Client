"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Zap, Menu, Bell, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
    
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-card">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-5 w-5 text-primary" />
          </Button>
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <Zap className="h-6 w-6 text-primary neon-glow rounded-full" />
            <span className="text-xl font-bold tracking-tighter neon-text">
              PoweRoute
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/map" className="transition-colors hover:text-primary">
            Find Charger
          </Link>
          <Link href="/booking" className="transition-colors hover:text-primary">
            Bookings
          </Link>
          <Link href="/safety" className="transition-colors hover:text-primary">
            Safety
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <span className="sr-only">Toggle theme</span>
            {mounted ? (theme === "dark" ? "🌞" : "🌙") : "🌙"}
          </Button>
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
          </Link>
          <div className="relative" ref={profileRef}>
            <Button variant="outline" size="icon" className="rounded-full border-primary/50" onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <User className="h-5 w-5 text-primary" />
            </Button>
            
            {/* Modern Glassmorphism Dropdown */}
            <div className={`absolute right-0 mt-2 w-48 rounded-xl border border-white/10 glass-card bg-background/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 transform origin-top-right z-50 ${isProfileOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"}`}>
              <div className="p-2 space-y-1">
                <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-colors">
                  <User className="h-4 w-4" /> Profile
                </Link>
                <div className="h-px bg-white/10 my-1 mx-2" />
                <button 
                  onClick={() => {
                    setIsProfileOpen(false);
                    import("@/store/useAuthStore").then(module => {
                      module.default.getState().logout();
                      window.location.href = '/login';
                    });
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border/40 p-4 flex flex-col gap-2 shadow-[0_10px_40px_rgb(0,0,0,0.5)] z-40">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-white/5 transition-colors font-medium">
            Dashboard
          </Link>
          <Link href="/map" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-white/5 transition-colors font-medium">
            Find Charger
          </Link>
          <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-white/5 transition-colors font-medium">
            My Bookings
          </Link>
          <Link href="/safety" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-white/5 transition-colors font-medium">
            Safety Center
          </Link>
          <Link href="/tracking" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-white/5 transition-colors font-medium">
            Live Tracking
          </Link>
          <div className="h-px bg-white/10 my-2 mx-2" />
          <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-white/5 transition-colors font-medium">
            Settings
          </Link>
        </div>
      )}
    </header>
  );
}
