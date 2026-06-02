"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const GlassInput = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-xl border border-black/10 dark:border-white/10 bg-background/40 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] backdrop-blur-md",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
GlassInput.displayName = "GlassInput";

export { GlassInput };
