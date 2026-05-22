"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

export function AuthProvider({ children }) {
  const init = useAuthStore((state) => state.init);
  
  useEffect(() => {
    init();
  }, [init]);

  return <>{children}</>;
}
