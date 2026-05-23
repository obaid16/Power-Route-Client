"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Menu, Bell, User, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/map", label: "Map" },
  { href: "/van", label: "Van" },
  { href: "/safety", label: "Safety" },
  { href: "/women-safety", label: "Women Safety" },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { user, logout, isInitialized } = useAuthStore();

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
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5">
      <div className="container flex h-20 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden drop-shadow-[0_0_15px_rgba(110,56,247,0.3)]">
              <img src="/logo.png" alt="PoweRoute Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-wider">
              POWEROUTE
            </span>
          </Link>
        </div>

        {/* Center Navigation Links (Only shown if logged in) */}
        {mounted && isInitialized && user && (
          <nav className="hidden md:flex items-center gap-8 h-full">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative flex items-center h-full text-sm font-medium transition-colors hover:text-foreground dark:hover:text-white",
                    isActive ? "text-foreground dark:text-white" : "text-muted-foreground dark:text-[#9AA0A6]"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-[#6E38F7] shadow-[0_-2px_10px_rgba(110,56,247,0.5)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-4 h-full">
          {mounted && isInitialized && user ? (
            <>
              {/* Notifications */}
              <Link href="/notifications" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground dark:text-[#9AA0A6] dark:hover:text-white transition-colors">
                <div className="relative flex items-center justify-center">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-background leading-none">
                    3
                  </span>
                </div>
              </Link>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full text-muted-foreground hover:text-foreground dark:text-[#9AA0A6] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              >
                <span className="sr-only">Toggle theme</span>
                {mounted ? (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />) : <Moon className="h-5 w-5" />}
              </Button>

              {/* Profile Dropdown */}
              <div className="relative flex items-center h-full ml-2" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full border border-white/10 overflow-hidden cursor-pointer"
                >
                  <img src="https://i.pravatar.cc/150?img=32" alt="Profile" className="w-full h-full object-cover" />
                </button>
                
                <div className={`absolute right-0 top-[70px] w-48 rounded-xl border border-border/50 bg-background/95 dark:bg-[#06020E]/95 backdrop-blur-xl shadow-xl transition-all duration-300 transform origin-top-right z-50 ${isProfileOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"}`}>
                  <div className="p-2 space-y-1">
                    <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted/50 rounded-lg transition-colors">
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    <div className="h-px bg-border/50 my-1 mx-2" />
                    <button 
                      onClick={() => {
                        setIsProfileOpen(false);
                        logout();
                        window.location.href = '/login';
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            mounted && isInitialized && !user && (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full text-[#9AA0A6] hover:text-white hover:bg-white/5"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Link href="/login">
                  <Button variant="ghost" className="hidden sm:inline-flex rounded-full text-[#9AA0A6] hover:text-white hover:bg-white/5 cursor-pointer">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="rounded-full bg-[#6E38F7] hover:bg-[#5a2ce0] text-white px-6 cursor-pointer shadow-[0_0_15px_rgba(110,56,247,0.4)]">
                    Sign up
                  </Button>
                </Link>
              </div>
            )
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-background/95 dark:bg-[#06020E]/95 backdrop-blur-xl border-b border-border/50 p-4 flex flex-col gap-2 shadow-xl z-40 transition-transform duration-300 ease-in-out transform ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        {NAV_LINKS.map(link => (
          <Link 
            key={link.href}
            href={link.href} 
            onClick={() => setIsMobileMenuOpen(false)} 
            className={cn(
              "px-4 py-3 rounded-lg hover:bg-white/5 transition-colors font-medium",
              pathname === link.href ? "text-[#6E38F7] bg-[#6E38F7]/10" : "text-[#9AA0A6]"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>

    </header>
  );
}
