"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function LiquidBackground({ nested = false }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark" || !resolvedTheme;

  // Position classes depending on whether it's nested in a card or global
  const containerClasses = nested
    ? "absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    : "fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0";

  // Blob opacity based on theme and mode
  const blobOpacity = isDark 
    ? (nested ? "opacity-35" : "opacity-30") 
    : (nested ? "opacity-20" : "opacity-15");

  return (
    <div className={containerClasses}>
      {/* Self-contained CSS keyframes for floating, morphing organic blobs */}
      <style>{`
        @keyframes float-blob-1 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(8% -12%) scale(1.2) rotate(120deg); }
          66% { transform: translate(-6%, 8%) scale(0.8) rotate(240deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
        }
        @keyframes float-blob-2 {
          0% { transform: translate(0px, 0px) scale(1.1) rotate(0deg); }
          50% { transform: translate(-10%, 10%) scale(0.85) rotate(-180deg); }
          100% { transform: translate(0px, 0px) scale(1.1) rotate(-360deg); }
        }
        @keyframes float-blob-3 {
          0% { transform: translate(0px, 0px) scale(0.9) rotate(0deg); }
          40% { transform: translate(12%, 12%) scale(1.15) rotate(90deg); }
          80% { transform: translate(-4%, -8%) scale(0.95) rotate(270deg); }
          100% { transform: translate(0px, 0px) scale(0.9) rotate(360deg); }
        }
        @keyframes float-blob-4 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          50% { transform: translate(8%, -8%) scale(1.1) rotate(180deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
        }
        .animate-liquid-1 {
          animation: float-blob-1 28s infinite alternate ease-in-out;
        }
        .animate-liquid-2 {
          animation: float-blob-2 34s infinite alternate ease-in-out;
        }
        .animate-liquid-3 {
          animation: float-blob-3 24s infinite alternate ease-in-out;
        }
        .animate-liquid-4 {
          animation: float-blob-4 30s infinite alternate ease-in-out;
        }
        .premium-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Blob 1: Signature Violet/Purple */}
      <div 
        className={`absolute rounded-full filter blur-[90px] md:blur-[140px] mix-blend-multiply dark:mix-blend-screen animate-liquid-1 ${blobOpacity}`}
        style={{
          backgroundColor: "#6E38F7",
          width: nested ? "70%" : "45vw",
          height: nested ? "70%" : "45vw",
          top: "-10%",
          left: nested ? "-10%" : "10%",
        }}
      />

      {/* Blob 2: Vibrant Fuchsia/Pink */}
      <div 
        className={`absolute rounded-full filter blur-[90px] md:blur-[140px] mix-blend-multiply dark:mix-blend-screen animate-liquid-2 ${blobOpacity}`}
        style={{
          backgroundColor: "#EC4899",
          width: nested ? "65%" : "40vw",
          height: nested ? "65%" : "40vw",
          bottom: "-10%",
          right: nested ? "-10%" : "15%",
        }}
      />

      {/* Blob 3: High-Tech Cyan/Teal */}
      <div 
        className={`absolute rounded-full filter blur-[90px] md:blur-[140px] mix-blend-multiply dark:mix-blend-screen animate-liquid-3 ${blobOpacity}`}
        style={{
          backgroundColor: "#06B6D4",
          width: nested ? "50%" : "35vw",
          height: nested ? "50%" : "35vw",
          top: "30%",
          right: nested ? "20%" : "10%",
        }}
      />

      {/* Blob 4: Soft Deep Violet (only for full background) */}
      {!nested && (
        <div 
          className={`absolute rounded-full filter blur-[100px] md:blur-[150px] mix-blend-multiply dark:mix-blend-screen animate-liquid-4 ${blobOpacity}`}
          style={{
            backgroundColor: "#7C3AED",
            width: "40vw",
            height: "40vw",
            bottom: "20%",
            left: "-5%",
          }}
        />
      )}

      {/* Subtle Noise Texture Overlay to prevent color banding and create tactile paper/glass feel */}
      <div 
        className={`absolute inset-0 w-full h-full premium-noise pointer-events-none ${
          isDark ? "opacity-[0.035]" : "opacity-[0.015]"
        }`} 
      />
    </div>
  );
}
