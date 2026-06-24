"use client";

import { useState, useEffect, useRef } from "react";
import api from "@/lib/api";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { GlassInput } from "@/components/ui/glass-input";
import { Button } from "@/components/ui/button";
import {
  Search, MapPin, Zap, Navigation, Star, Battery, Filter, Loader2,
  Play, Pause, RotateCcw, FastForward, Sliders, Volume2, VolumeX,
  Compass, ShieldAlert, ArrowLeft, CheckCircle2, RefreshCw, Layers,
  Car, Eye, Gauge, Clock, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import Image from "next/image";

const stationImages = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Electric_car_charging_station_in_Amsterdam.jpg/800px-Electric_car_charging_station_in_Amsterdam.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Tesla_Supercharger_at_Kettleman_City.jpg/800px-Tesla_Supercharger_at_Kettleman_City.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Nissan_Leaf_charging_at_a_public_station.jpg/800px-Nissan_Leaf_charging_at_a_public_station.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/BMW_i3_charging_at_a_ChargePoint_station.jpg/800px-BMW_i3_charging_at_a_ChargePoint_station.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Electric_vehicle_charging_station_in_Toronto.jpg/800px-Electric_vehicle_charging_station_in_Toronto.jpg"
];

// Custom Road Network & Station Paths
const STATIONS_CONFIG = {
  "1": { // Downtown Superhub
    x: 480,
    y: 220,
    path: [
      { x: 120, y: 150 },
      { x: 480, y: 150 },
      { x: 480, y: 220 }
    ],
    getInstructions: (prog) => {
      if (prog < 25) return "Head east on North Ave toward Center Dr.";
      if (prog < 70) return "Continue straight on North Ave. Cruising at 55 mph.";
      if (prog < 85) return "In 200m, turn right onto Center Dr.";
      if (prog < 95) return "Turn right onto Center Dr. Preconditioning battery for fast charging.";
      return "Arrived at Downtown Superhub on your left.";
    }
  },
  "2": { // Westside Fast Charge
    x: 200,
    y: 320,
    path: [
      { x: 120, y: 150 },
      { x: 120, y: 320 },
      { x: 200, y: 320 }
    ],
    getInstructions: (prog) => {
      if (prog < 25) return "Head south on West Ring Rd toward Main St.";
      if (prog < 60) return "Continue south on West Ring Rd. Speed limit 45 mph.";
      if (prog < 80) return "In 150m, turn left onto Main St.";
      if (prog < 95) return "Turn left onto Main St. Speed limit 35 mph.";
      return "Arriving at Westside Fast Charge on your right.";
    }
  },
  "3": { // City Center Parking Station
    x: 700,
    y: 480,
    path: [
      { x: 120, y: 150 },
      { x: 120, y: 320 },
      { x: 480, y: 320 },
      { x: 480, y: 480 },
      { x: 700, y: 480 }
    ],
    getInstructions: (prog) => {
      if (prog < 15) return "Head south on West Ring Rd.";
      if (prog < 35) return "Turn left onto Central Blvd.";
      if (prog < 60) return "Continue straight on Central Blvd.";
      if (prog < 80) return "Turn right onto Center Ave.";
      if (prog < 95) return "Turn left onto South Lane.";
      return "Arriving at City Center Parking Station.";
    }
  }
};

// Math helper to get coordinates and angle on path based on progress %
function getPositionOnPath(points, progress) {
  if (!points || points.length === 0) return { x: 120, y: 150, angle: 0 };
  if (points.length === 1) return { x: points[0].x, y: points[0].y, angle: 0 };

  let totalLength = 0;
  const segments = [];
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    const dy = points[i + 1].y - points[i].y;
    const len = Math.sqrt(dx * dx + dy * dy);
    segments.push({ from: points[i], to: points[i + 1], length: len, dx, dy });
    totalLength += len;
  }

  const targetLen = (progress / 100) * totalLength;
  let currentLen = 0;

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (currentLen + seg.length >= targetLen || i === segments.length - 1) {
      const remaining = targetLen - currentLen;
      const ratio = seg.length > 0 ? remaining / seg.length : 0;
      const x = seg.from.x + seg.dx * ratio;
      const y = seg.from.y + seg.dy * ratio;
      const angle = Math.atan2(seg.dy, seg.dx) * (180 / Math.PI);
      return { x, y, angle };
    }
    currentLen += seg.length;
  }

  const last = points[points.length - 1];
  return { x: last.x, y: last.y, angle: 0 };
}

// Haversine distance in km
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function MapPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = !mounted || resolvedTheme === 'dark';

  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [filter, setFilter] = useState('All');

  // Geolocation states
  const [userLocation, setUserLocation] = useState(null);
  const [locatingText, setLocatingText] = useState("Detecting Location...");

  // Navigation simulation states
  const [isNavigating, setIsNavigating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [startBattery, setStartBattery] = useState(24);
  const [currentBattery, setCurrentBattery] = useState(24);
  const [speed, setSpeed] = useState(0);
  const [powerFlow, setPowerFlow] = useState(0);
  const [isRegenActive, setIsRegenActive] = useState(false);
  const [isPreconditioning, setIsPreconditioning] = useState(false);
  const [isTrafficActive, setIsTrafficActive] = useState(false);
  const [mapMode, setMapMode] = useState('cyberpunk'); // cyberpunk, satellite
  const [navigationMessage, setNavigationMessage] = useState("Initializing Navigation...");
  const [powerHistory, setPowerHistory] = useState(Array(15).fill(0));
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showNavSetup, setShowNavSetup] = useState(false);

  // Fetch stations and location on load
  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));

    const fetchStations = async (userLat, userLng) => {
      try {
        const baseLat = userLat || 37.7749;
        const baseLng = userLng || -122.4194;

        const res = await api.get(`/stations?lat=${baseLat}&lng=${baseLng}`);
        const data = res.data?.data || [];

        let formattedData = data.map((st, i) => {
          // Use actual coordinates returned by the API
          // Mongoose GeoJSON coordinates are [longitude, latitude]
          const lng = st.location?.coordinates?.[0] || baseLng;
          const lat = st.location?.coordinates?.[1] || baseLat;

          const distVal = getDistanceFromLatLonInKm(baseLat, baseLng, lat, lng);
          const distStr = distVal.toFixed(1) + " km";

          return {
            id: st._id || i.toString(),
            name: st.name || "Unknown Station",
            distance: distStr,
            distVal, // keep for sorting
            slots: st.chargers?.filter(c => c.status === 'available').length || 2,
            type: st.chargers?.[0]?.type || 'Standard CCS',
            rating: st.rating || 4.5,
            power: st.chargers?.[0]?.power || '150kW',
            lat,
            lng,
            address: st.location?.formattedAddress || st.location?.city || "123 EV Avenue, Tech District",
            price: st.pricing?.ratePerKwh ? `₹${st.pricing.ratePerKwh}/kWh` : "₹15/kWh",
            portType: st.chargers?.[0]?.portType || "CCS1"
          };
        });

        // Sort stations by true nearest physical distance
        formattedData.sort((a, b) => a.distVal - b.distVal);

        setStations(formattedData);
        if (formattedData.length > 0) setSelectedStation(formattedData[0]);
      } catch (error) {
        console.error("Failed to fetch stations", error);
      } finally {
        setIsLoading(false);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          fetchStations(latitude, longitude);
        },
        (error) => {
          console.warn("Geolocation denied or failed, falling back to mock:", error.message);
          setLocatingText("Location not found");
          fetchStations(null, null);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      fetchStations(null, null);
    }
  }, []);

  // Battery state is updated directly via event handlers to avoid cascading render effects.

  // Main simulation tick loop
  useEffect(() => {
    if (!isNavigating || isPaused) return;

    const activeStation = STATIONS_CONFIG[selectedStation?.id] || STATIONS_CONFIG["1"];
    const tickInterval = 50; // update speed in milliseconds
    const baseIncrement = (tickInterval / 30000) * 100; // 30s base trip duration

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + baseIncrement * speedMultiplier;
        if (next >= 100) {
          clearInterval(interval);
          setSpeed(0);
          setPowerFlow(0);
          setIsRegenActive(false);
          setNavigationMessage("Route completed. Welcome to your charging hub!");
          return 100;
        }

        // Voice instruction simulations
        setNavigationMessage(activeStation.getInstructions(next));

        // Speed limit / turn / traffic logic
        let isTurning = false;
        let isStopped = false;

        if (selectedStation?.id === "1") {
          if (next > 65 && next < 78) isTurning = true;
        } else if (selectedStation?.id === "2") {
          if (next > 50 && next < 65) isTurning = true;
        } else {
          if ((next > 15 && next < 25) || (next > 40 && next < 52) || (next > 72 && next < 80)) isTurning = true;
        }

        // Traffic Light stop at ~35% progress
        if (next > 33 && next < 37) {
          isStopped = true;
        }

        const trafficFactor = isTrafficActive ? 0.6 : 1.0;
        let targetSpeed = 55;
        let targetPower = 20;
        let regen = false;

        if (isStopped) {
          targetSpeed = 0;
          targetPower = 2; // Idle draw
        } else if (isTurning) {
          targetSpeed = 15;
          targetPower = -12; // Charging regen
          regen = true;
        } else {
          targetSpeed = Math.round((50 + Math.sin(next * 0.15) * 12) * trafficFactor);
          targetPower = Math.round(targetSpeed * 0.45 + Math.cos(next * 0.3) * 6);
        }

        setSpeed(targetSpeed);
        setPowerFlow(targetPower);
        setIsRegenActive(regen);

        // Update battery telemetry
        setCurrentBattery(battery => {
          if (regen) {
            return Math.min(100, parseFloat((battery + 0.03 * speedMultiplier).toFixed(2)));
          } else {
            const drain = (targetPower / 25) * 0.02 * speedMultiplier;
            return Math.max(0, parseFloat((battery - drain).toFixed(2)));
          }
        });

        // Precondition battery on final approach for DC Fast Stations
        const isFast = selectedStation?.power && parseInt(selectedStation.power) >= 150;
        if (next > 70 && isFast) {
          setIsPreconditioning(true);
        } else {
          setIsPreconditioning(false);
        }

        // Push telemetry graph points
        setPowerHistory(hist => [...hist.slice(1), targetPower]);

        return next;
      });
    }, tickInterval);

    return () => clearInterval(interval);
  }, [isNavigating, isPaused, speedMultiplier, selectedStation, isTrafficActive]);

  // Set up standard configs
  const activeConfig = STATIONS_CONFIG[selectedStation?.id] || STATIONS_CONFIG["1"];
  const carPosition = getPositionOnPath(activeConfig.path, progress);

  const startNavigation = () => {
    setProgress(0);
    setIsPaused(false);
    setIsNavigating(true);
    setShowNavSetup(false);
    setPowerHistory(Array(15).fill(0));
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    setProgress(0);
    setIsPaused(false);
    setCurrentBattery(startBattery);
  };

  const getBatteryColor = (bat) => {
    if (bat < 15) return "text-red-500 stroke-red-500 border-red-500/20 bg-red-500/10";
    if (bat < 25) return "text-amber-500 stroke-amber-500 border-amber-500/20 bg-amber-500/10";
    return "text-green-400 stroke-green-400 border-green-500/20 bg-green-500/10";
  };

  return (
    <AnimatedPage stagger className="px-4 md:px-0 mt-8 md:mt-10 max-w-7xl mx-auto w-full md:h-[calc(100vh-8rem)] flex flex-col-reverse md:flex-row gap-6 md:gap-10 lg:gap-14">

      {/* Left Column Sidebar */}
      <div className="w-full md:w-[300px] lg:w-[320px] flex flex-col gap-4 h-[50vh] md:h-full shrink-0">

        <AnimatePresence mode="wait">
          {!isNavigating ? (
            // Search / Filter and Station List Panel
            <motion.div
              key="list-panel"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4 h-full overflow-hidden"
            >
              <div className="glass-card p-4 rounded-2xl flex flex-col gap-4">
                <div className="relative">
                  <GlassInput placeholder="Search location or station..." className="pl-10" />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  <Button
                    onClick={() => setFilter(filter === 'DC Fast' ? 'All' : 'DC Fast')}
                    variant="outline"
                    size="sm"
                    className={`rounded-full transition-colors ${filter === 'DC Fast' ? 'bg-primary/20 border-primary/50 text-primary neon-glow' : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10'}`}
                  >
                    <Zap className="mr-1 h-3 w-3" /> DC Fast (150kW+)
                  </Button>
                  <Button
                    onClick={() => setFilter(filter === 'Level 2' ? 'All' : 'Level 2')}
                    variant="outline"
                    size="sm"
                    className={`rounded-full transition-colors ${filter === 'Level 2' ? 'bg-primary/20 border-primary/50 text-primary neon-glow' : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10'}`}
                  >
                    <Battery className="mr-1 h-3 w-3" /> Level 2
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`rounded-full transition-colors ${filter === 'More' ? 'bg-primary/20 border-primary/50 text-primary neon-glow' : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10'}`}
                    onClick={() => setFilter(filter === 'More' ? 'All' : 'More')}
                  >
                    <Filter className="mr-1 h-3 w-3" /> More
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide pr-2 pb-24 md:pb-6">
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                  </div>
                ) : isViewingDetails && selectedStation ? (
                  <div className="space-y-4">
                    <Button variant="ghost" onClick={() => setIsViewingDetails(false)} className="text-muted-foreground hover:text-foreground pl-0 h-8 mb-2">
                      <ArrowLeft className="h-4 w-4 mr-2" /> Back to list
                    </Button>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="glass-card p-5 rounded-3xl border-primary/30 shadow-lg relative overflow-hidden"
                    >
                      {/* Backside details background glow */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />

                      {!showNavSetup ? (
                        // Standard details card
                        <div className="space-y-4">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <span className="text-[9px] font-extrabold bg-primary/25 border border-primary/30 px-2 py-0.5 rounded text-primary uppercase tracking-widest">
                                {parseInt(selectedStation.power) >= 150 ? "Ultra DC Fast" : "Level 2 Charge"}
                              </span>
                              <h3 className="font-extrabold text-lg text-foreground dark:text-white mt-1.5 leading-snug">{selectedStation.name}</h3>
                              <p className="text-xs text-muted-foreground mt-0.5">{selectedStation.distance} away • {selectedStation.slots} plugs available</p>
                            </div>

                            <div className="flex items-center text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/10">
                              <Star className="h-3 w-3 mr-1 fill-current" /> {selectedStation.rating}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2.5">
                            {isNavigating ? (
                              <Button onClick={stopNavigation} variant="outline" className="w-full border-red-500/30 text-red-500 bg-red-500/5 hover:bg-red-500/15 rounded-xl">
                                Cancel Navigation
                              </Button>
                            ) : (
                              <>
                                <a 
                                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedStation?.lat},${selectedStation?.lng}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full"
                                >
                                  <Button
                                    className="w-full bg-primary text-white hover:bg-primary/95 neon-glow rounded-xl flex items-center justify-center gap-1.5 font-semibold py-5"
                                  >
                                    <Navigation className="h-4 w-4" /> Navigate
                                  </Button>
                                </a>
                                <Link href={`/booking?station=${selectedStation.id}`} className="w-full">
                                  <Button variant="outline" className="w-full py-5 border-black/10 dark:border-white/10 bg-background/50 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl">
                                    Book Plugs
                                  </Button>
                                </Link>
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                        // Navigation settings panel
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-4"
                        >
                          <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
                            <h4 className="font-bold text-sm text-foreground dark:text-white">JOURNEY PRESETS</h4>
                            <Button variant="ghost" size="xs" className="h-6 text-xs text-muted-foreground p-0 hover:bg-transparent" onClick={() => setShowNavSetup(false)}>
                              Back
                            </Button>
                          </div>

                          {/* Battery customizer slider */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-muted-foreground flex items-center gap-1">
                                <Battery className="h-3.5 w-3.5 text-green-500 dark:text-green-400" /> Starting Battery (SoC)
                              </span>
                              <span className={`font-bold ${startBattery < 15 ? 'text-red-500' : startBattery < 25 ? 'text-amber-500' : 'text-green-500'}`}>
                                {startBattery}%
                              </span>
                            </div>
                            <input
                              type="range"
                              min="5"
                              max="100"
                              value={startBattery}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                setStartBattery(val);
                                if (!isNavigating) {
                                  setCurrentBattery(val);
                                }
                              }}
                              className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-[9px] text-muted-foreground font-semibold">
                              <span>Low (5%)</span>
                              <span>Mid (50%)</span>
                              <span>Full (100%)</span>
                            </div>
                          </div>

                          {/* Info helper */}
                          <div className="p-2 rounded-xl bg-primary/5 border border-primary/20 text-[10px] text-muted-foreground flex gap-2">
                            <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <p>
                              Simulating route along local highway. Lower starting battery to trigger real-time low power alarms.
                            </p>
                          </div>

                          <Button
                            onClick={startNavigation}
                            className="w-full bg-primary text-white hover:bg-primary/95 neon-glow rounded-xl font-bold py-5 text-sm"
                          >
                            Start Simulated Journey
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* NEW SECTION: Other nearby stations */}
                    {!showNavSetup && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 space-y-3 pb-6"
                      >
                        <h4 className="text-sm font-bold text-foreground">More Nearby Stations</h4>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                          {stations
                            .filter(s => s.id !== selectedStation.id)
                            .slice(0, 3)
                            .map(station => (
                              <div
                                key={station.id}
                                onClick={() => {
                                  setSelectedStation(station);
                                  setShowNavSetup(false);
                                }}
                                className="min-w-[180px] shrink-0 rounded-2xl cursor-pointer glass-card border border-black/5 dark:border-white/5 hover:border-primary/50 transition-all overflow-hidden flex flex-col"
                              >
                                <div className="w-full h-20 relative bg-gradient-to-br from-primary/20 to-purple-500/20 overflow-hidden flex items-center justify-center">
                                  <Image
                                    src={stationImages[parseInt(station.id.slice(-2), 16) % stationImages.length || 0]}
                                    alt={station.name}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                  />
                                  <Zap className="h-6 w-6 text-primary/40 -z-10" />
                                </div>
                                <div className="p-3">
                                  <div className="flex justify-between items-start mb-1">
                                    <h5 className="font-bold text-sm truncate">{station.name}</h5>
                                  </div>
                                  <p className="text-[11px] text-muted-foreground mt-0.5">{station.distance} • {station.slots} slots</p>
                                  <div className="mt-2 flex items-center gap-2">
                                    <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-md border border-primary/20">
                                      {station.power}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : stations.length === 0 ? (
                  <div className="text-center text-muted-foreground pt-10">No stations found nearby.</div>
                ) : filter === 'More' ? (
                  <div className="text-center text-muted-foreground pt-10">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Filter className="w-6 h-6 text-primary" />
                    </div>
                    <p className="font-medium text-foreground">Advanced Filters</p>
                    <p className="text-sm">Coming soon in the next update!</p>
                  </div>
                ) : (
                  stations
                    .filter(st => {
                      if (filter === 'All') return true;
                      if (filter === 'DC Fast') return parseInt(st.power) >= 150;
                      if (filter === 'Level 2') return parseInt(st.power) < 150;
                      return true;
                    })
                    .map((station) => (
                      <motion.div
                        key={station.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedStation(station);
                          setIsViewingDetails(true);
                        }}
                        className={`rounded-3xl cursor-pointer transition-all overflow-hidden flex flex-col ${selectedStation?.id === station.id
                            ? "glass-card border-primary/50 neon-glow"
                            : "bg-background/40 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 backdrop-blur-sm"
                          }`}
                      >
                        <div className="w-full h-32 relative bg-gradient-to-br from-primary/20 to-purple-500/20 overflow-hidden flex items-center justify-center">
                          <Image
                            src={stationImages[parseInt(station.id.slice(-2), 16) % stationImages.length || 0]}
                            alt={station.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                          <Zap className="h-10 w-10 text-primary/40 -z-10" />
                        </div>
                        
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg leading-tight tracking-wide">{station.name}</h3>
                            <div className="flex items-center text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full shrink-0 ml-2 border border-yellow-500/20">
                              <Star className="h-3.5 w-3.5 mr-1 fill-current" /> {station.rating}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 mb-4">
                            <div className="flex items-center text-[11px] text-muted-foreground font-medium">
                              <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary shrink-0" />
                              <span className="truncate">{station.distance} • {station.address}</span>
                            </div>
                            <div className="flex items-center text-[11px] text-muted-foreground font-medium">
                              <Zap className="h-3.5 w-3.5 mr-1.5 text-primary shrink-0" />
                              {station.portType} • {station.price}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/5 dark:border-white/5">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-1 rounded-lg border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.05)]">
                                {station.power}
                              </span>
                              <span className="text-[10px] font-bold bg-green-500/10 text-green-500 px-2 py-1 rounded-lg border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.05)]">
                                {station.slots} available
                              </span>
                            </div>
                            <Button size="sm" className="h-7 px-3 text-[11px] rounded-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-md hover:shadow-primary/30 transition-all">
                              Select
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                )}
              </div>
            </motion.div>
          ) : (
            // LIVE NAV HUD PANEL
            <motion.div
              key="nav-panel"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4 h-full overflow-y-auto scrollbar-hide pb-24 md:pb-6"
            >
              {/* Header with Exit & Speaker wave */}
              <div className="flex justify-between items-center bg-background/25 border border-black/5 dark:border-white/5 rounded-2xl p-3">
                <Button onClick={stopNavigation} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground dark:hover:text-white gap-1.5 rounded-xl">
                  <ArrowLeft className="h-4 w-4" /> Cancel
                </Button>
                <div className="flex items-center gap-3">
                  {/* Bouncing Audio Wave Animation */}
                  <div className="flex items-end gap-0.5 h-3.5 w-6 px-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 bg-primary rounded-full"
                        animate={{ height: isPaused ? 2 : [2, 10, 4, 14, 2][i % 5] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1, ease: "easeInOut" }}
                      />
                    ))}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                  >
                    {audioEnabled ? <Volume2 className="h-4 w-4 text-primary" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                </div>
              </div>

              {/* Driving Directions Prompt */}
              <div className="glass-card p-5 rounded-3xl border-primary/30 relative overflow-hidden flex gap-4">
                <div className="h-12 w-12 bg-primary/25 rounded-2xl flex items-center justify-center border border-primary/30 text-primary shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)] animate-pulse">
                  <Navigation className="h-6 w-6 rotate-45" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">NAV ROUTE ACTIVE</p>
                  <p className="text-sm font-semibold text-foreground dark:text-white leading-snug">{navigationMessage}</p>
                </div>
              </div>

              {/* Trip ETA Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-2xl border-black/5 dark:border-white/5 flex flex-col justify-center">
                  <span className="text-xs text-muted-foreground uppercase flex items-center mb-1">
                    <Clock className="h-3.5 w-3.5 mr-1 text-primary" /> ETA
                  </span>
                  <p className="text-2xl font-bold text-foreground dark:text-white">
                    {progress >= 100 ? "0" : Math.ceil(9 * (1 - progress / 100) * (isTrafficActive ? 1.5 : 1))} mins
                  </p>
                </div>
                <div className="glass-card p-4 rounded-2xl border-black/5 dark:border-white/5 flex flex-col justify-center">
                  <span className="text-xs text-muted-foreground uppercase flex items-center mb-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-primary" /> Distance
                  </span>
                  <p className="text-2xl font-bold text-foreground dark:text-white">
                    {progress >= 100 ? "0.0" : (6.8 * (1 - progress / 100)).toFixed(1)} km
                  </p>
                </div>
              </div>

              {/* EV Battery State HUD */}
              <div className="glass-card p-5 rounded-3xl border-black/5 dark:border-white/5 relative overflow-hidden space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold flex items-center text-sm tracking-wide">
                    <Battery className="h-4 w-4 mr-2 text-green-400" /> BATTERY TELEMETRY
                  </h3>
                  {isPreconditioning && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.3)]">
                      PRECONDITIONING
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-5">
                  {/* Gauge Arc */}
                  <div className="relative w-20 h-20 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <path
                        className="stroke-white/10"
                        strokeWidth="3.5"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <motion.path
                        className={`${getBatteryColor(currentBattery).split(' ')[1]}`}
                        strokeWidth="3.5"
                        strokeDasharray={`${currentBattery}, 100`}
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-black tracking-tighter text-foreground dark:text-white">{Math.round(currentBattery)}%</span>
                      <span className="text-[8px] text-muted-foreground uppercase font-bold">SOC</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-muted-foreground">Range Est</span>
                        <span className="text-foreground dark:text-white font-bold">{Math.round(currentBattery * 4.2)} km</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${currentBattery < 15 ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                              currentBattery < 25 ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" :
                                "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"
                            }`}
                          style={{ width: `${currentBattery}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-muted-foreground">
                      Target arrival charge: <span className="font-semibold text-foreground dark:text-white">~{Math.max(2, Math.round(startBattery - 7.5))}% SoC</span>
                    </p>
                  </div>
                </div>

                {/* Low Battery and Warning Alerts */}
                {currentBattery < 15 && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                  >
                    <ShieldAlert className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5 animate-pulse" />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-red-200 uppercase">CRITICAL ENERGY LEVEL</p>
                      <p className="text-[11px] text-red-300 leading-relaxed">
                        Battery low. Navigation optimizes to reserve range. Keep acceleration smooth.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Driving Telemetry HUD (Speed + Power Draw) */}
              <div className="glass-card p-5 rounded-3xl border-black/5 dark:border-white/5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center mb-1">
                      <Gauge className="h-3 w-3 mr-1 text-primary" /> VELOCITY
                    </span>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-black text-foreground dark:text-white font-mono">{speed}</span>
                      <span className="text-xs text-muted-foreground ml-1 font-bold">mph</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center mb-1">
                      <Zap className="h-3 w-3 mr-1 text-primary" /> ENERGY FLOW
                    </span>
                    <div className="flex items-baseline">
                      <span className={`text-3xl font-black font-mono ${isRegenActive ? "text-green-400 animate-pulse" : "text-foreground dark:text-white"}`}>
                        {isRegenActive ? `+${Math.abs(powerFlow)}` : powerFlow}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1 font-bold">kW</span>
                    </div>
                  </div>
                </div>

                {/* Powertrain Flow Bar */}
                <div className="relative h-4 w-full bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10 overflow-hidden flex">
                  {/* Regen side (left half) */}
                  <div className="w-1/2 h-full flex justify-end items-center pr-0.5 border-r border-black/20 dark:border-white/20">
                    <div
                      className="h-2.5 bg-green-500 rounded-l shadow-[0_0_8px_rgba(34,197,94,0.5)] transition-all duration-300"
                      style={{ width: isRegenActive ? `${Math.min(100, (Math.abs(powerFlow) / 25) * 100)}%` : '0%' }}
                    />
                  </div>
                  {/* Consumption side (right half) */}
                  <div className="w-1/2 h-full flex justify-start items-center pl-0.5">
                    <div
                      className="h-2.5 bg-red-500 rounded-r shadow-[0_0_8px_rgba(239,68,68,0.5)] transition-all duration-300"
                      style={{ width: !isRegenActive && speed > 0 ? `${Math.min(100, (powerFlow / 60) * 100)}%` : '0%' }}
                    />
                  </div>

                  {/* Center line */}
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-0.5 h-full bg-white" />
                </div>

                <div className="flex justify-between text-[10px] text-muted-foreground font-bold px-1 uppercase">
                  <span className="text-green-400">REGEN CHARGING</span>
                  <span className="text-red-400">POWER DRAIN</span>
                </div>
              </div>

              {/* Simulation Controls Overlay */}
              <div className="glass-card p-4 rounded-2xl border-black/5 dark:border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">SIM SPEED</span>
                  <div className="flex gap-1.5">
                    {[1, 2, 5, 10].map((mult) => (
                      <Button
                        key={mult}
                        size="xs"
                        variant={speedMultiplier === mult ? "default" : "outline"}
                        className={`text-xs px-2.5 py-1 h-auto rounded-lg ${speedMultiplier === mult ? 'bg-primary text-white neon-glow' : 'bg-black/5 dark:bg-white/5 text-muted-foreground'}`}
                        onClick={() => setSpeedMultiplier(mult)}
                      >
                        {mult}x
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsPaused(!isPaused)}
                    variant="outline"
                    className="flex-1 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground dark:text-white rounded-xl py-2 h-auto"
                  >
                    {isPaused ? <Play className="h-4 w-4 mr-2 text-green-400" /> : <Pause className="h-4 w-4 mr-2 text-amber-400" />}
                    {isPaused ? "Resume" : "Pause"}
                  </Button>
                  <Button
                    onClick={() => setProgress(0)}
                    variant="outline"
                    className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground dark:text-white rounded-xl py-2 h-auto"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column - Map Container */}
      <div className="flex-1 relative rounded-3xl overflow-hidden glass-card border border-primary/20 min-h-[400px] flex flex-col">
        <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-end pointer-events-none">
          <div className="flex gap-2 pointer-events-auto">

            <Button
              size="sm"
              variant="outline"
              className="rounded-full px-3 py-1.5 h-auto text-xs bg-background/90 backdrop-blur-xl border-black/10 dark:border-white/10 text-foreground hover:bg-background flex items-center gap-1.5"
              onClick={() => setMapMode(mapMode === 'cyberpunk' ? 'satellite' : 'cyberpunk')}
            >
              <Layers className="h-3.5 w-3.5" />
              {mapMode === 'cyberpunk' ? 'Grid' : 'Satellite'}
            </Button>
          </div>
        </div>

        {/* Dynamic Canvas/SVG map */}
        <div className={`flex-1 relative w-full h-full transition-colors duration-500 ${isDark ? 'bg-[#0B0416]' : 'bg-[#FAF9FD]'}`}>
          <iframe
            src={(isViewingDetails || isNavigating) && userLocation && selectedStation
              ? `https://maps.google.com/maps?saddr=${userLocation.lat},${userLocation.lng}&daddr=${selectedStation.lat},${selectedStation.lng}&t=${mapMode === 'satellite' ? 'k' : 'm'}&output=embed`
              : `https://maps.google.com/maps?q=${selectedStation?.lat || userLocation?.lat || 37.7749},${selectedStation?.lng || userLocation?.lng || -122.4194}&t=${mapMode === 'satellite' ? 'k' : 'm'}&z=13&ie=UTF8&iwloc=&output=embed`
            }
            width="100%"
            height="100%"
            style={{ border: 0, filter: isDark ? 'invert(90%) hue-rotate(180deg) contrast(80%)' : 'none' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>

    </AnimatedPage>
  );
}

