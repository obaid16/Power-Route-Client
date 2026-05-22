"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Menu, Bell, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-card">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5 text-primary" />
          </Button>
          <Link href="/" className="flex items-center gap-2">
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
          <Link href="/profile">
            <Button variant="outline" size="icon" className="rounded-full border-primary/50">
              <User className="h-5 w-5 text-primary" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
