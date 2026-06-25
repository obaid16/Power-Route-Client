"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import useSettingsStore from "@/store/useSettingsStore";

export function AuthProvider({ children }) {
  const initAuth = useAuthStore((state) => state.init);
  const initSettings = useSettingsStore((state) => state.init);
  
  useEffect(() => {
    initAuth();
    initSettings();
  }, [initAuth, initSettings]);

  return <>{children}</>;
}
