"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import { LandingPage } from "@/components/landing/LandingPage";
import { Dashboard } from "@/components/dashboard/Dashboard";

export default function Home() {
  const { user, isInitialized } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));
  }, []);

  if (!mounted || !isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return user ? <Dashboard /> : <LandingPage />;
}
