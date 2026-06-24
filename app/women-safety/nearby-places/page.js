"use client";

import { useState, useEffect } from "react";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { 
  ArrowLeft, Hotel, Shield, Hospital, Zap, Navigation, 
  Phone, Search, SlidersHorizontal, MapPin, Coffee, 
  Loader2, AlertTriangle, AlertCircle, RefreshCw 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export default function NearbySafePlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [locationText, setLocationText] = useState("Detecting your location...");
  const [gpsError, setGpsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Places");

  // Fetch places based on coordinates
  const fetchPlaces = async (lat, lng) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/safety/nearby-places?lat=${lat}&lng=${lng}&radius=5000`);
      if (res.data && res.data.success) {
        setPlaces(res.data.data);
      } else {
        setError("Failed to retrieve nearby safe places.");
      }
    } catch (err) {
      console.error("Error fetching nearby safe places:", err);
      setError(err.response?.data?.error || "Failed to connect to the safety service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get user location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lng: longitude });
          setGpsError(false);
          
          // Get clean neighborhood/city name using OSM Nominatim reverse geocoding
          try {
            setLocationText("Resolving address...");
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            if (res.ok) {
              const data = await res.json();
              const city = data.address?.city || data.address?.town || data.address?.village || "";
              const neighbourhood = data.address?.neighbourhood || data.address?.suburb || "";
              if (neighbourhood && city) {
                setLocationText(`${neighbourhood}, ${city}`);
              } else if (city) {
                setLocationText(city);
              } else if (data.display_name) {
                setLocationText(data.display_name.split(',').slice(0, 2).join(', '));
              } else {
                setLocationText("Location detected");
              }
            } else {
              setLocationText("Location detected");
            }
          } catch (err) {
            console.error("Reverse geocoding failed:", err);
            setLocationText("Location detected");
          }
          
          // Fetch real places from backend
          fetchPlaces(latitude, longitude);
        },
        (err) => {
          console.warn("Geolocation permission denied or failed:", err.message);
          setGpsError(true);
          setLocationText("Mumbai (Default Location)");
          // Fallback to Mumbai central coordinates
          const defaultLat = 19.0760;
          const defaultLng = 72.8777;
          setCoords({ lat: defaultLat, lng: defaultLng });
          fetchPlaces(defaultLat, defaultLng);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    } else {
      setGpsError(true);
      setLocationText("Mumbai (Default Location)");
      const defaultLat = 19.0760;
      const defaultLng = 72.8777;
      setCoords({ lat: defaultLat, lng: defaultLng });
      fetchPlaces(defaultLat, defaultLng);
    }
  }, []);

  // Helper to map type string to Lucide icon
  const getIconForType = (type) => {
    switch (type) {
      case "Police Station": return Shield;
      case "Hospital": return Hospital;
      case "Hotel": return Hotel;
      case "Cafe": return Coffee;
      case "EV Charging Station": return Zap;
      default: return Shield;
    }
  };

  // Filter list based on selected filter chip and search query
  const filteredPlaces = places.filter(place => {
    // Filter by chip category
    if (selectedFilter !== "All Places") {
      if (selectedFilter === "Police Stations" && place.type !== "Police Station") return false;
      if (selectedFilter === "Hospitals" && place.type !== "Hospital") return false;
      if (selectedFilter === "Hotels" && place.type !== "Hotel") return false;
      if (selectedFilter === "Cafes" && place.type !== "Cafe") return false;
      if (selectedFilter === "EV Charging Station" && place.type !== "EV Charging Station") return false;
    }
    
    // Filter by search query text
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      return (
        place.name.toLowerCase().includes(query) ||
        place.address.toLowerCase().includes(query) ||
        place.type.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <AnimatedPage stagger className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 pb-20 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link href="/women-safety" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Safety Center
          </Link>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Hotel className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white">Nearby Safe Places</h1>
          </div>
          <p className="text-muted-foreground text-sm">Find verified, secure locations around you instantly.</p>
          
          <div className="flex items-center gap-2 mt-3 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full w-fit text-xs font-semibold text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{locationText}</span>
          </div>
        </div>

        {coords.lat && (
          <Button 
            onClick={() => fetchPlaces(coords.lat, coords.lng)} 
            variant="outline" 
            size="sm" 
            className="rounded-xl border-black/5 dark:border-white/5 glass-card shrink-0"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        )}
      </div>

      {/* GPS Warning Banner if applicable */}
      {gpsError && (
        <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-amber-600 dark:text-amber-400 text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Location Permission Needed:</span> We couldn't access your real-time location. Showing safe havens near Mumbai by default. Please enable GPS permissions for your browser to locate safe places near you.
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="glass-card flex-1 rounded-2xl p-2 flex items-center border border-black/5 dark:border-white/5 shadow-sm">
          <Search className="w-5 h-5 text-muted-foreground ml-3 mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="Search hospitals, hotels, police stations, cafes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none w-full h-10 text-sm text-foreground dark:text-white placeholder:text-muted-foreground"
          />
        </div>
        <Button variant="outline" className="h-14 sm:w-14 shrink-0 rounded-2xl border-black/5 dark:border-white/5 glass-card">
          <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {["All Places", "Police Stations", "Hospitals", "Hotels", "Cafes", "EV Charging Station"].map((filter, i) => (
          <button 
            key={i} 
            onClick={() => setSelectedFilter(filter)}
            className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              selectedFilter === filter 
                ? 'bg-primary text-white shadow-sm shadow-primary/25' 
                : 'bg-black/5 dark:bg-white/5 text-muted-foreground hover:text-foreground'
            }`}
          >
            {filter === "EV Charging Station" ? "EV Charging" : filter}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      {loading ? (
        // Beautiful Skeleton Loading Grid
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="glass-card rounded-3xl p-6 border border-black/5 dark:border-white/5 shadow-sm space-y-5 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-black/10 dark:bg-white/10" />
                <div className="w-20 h-6 rounded-full bg-black/10 dark:bg-white/10" />
              </div>
              <div className="space-y-2">
                <div className="h-6 w-[70%] rounded bg-black/10 dark:bg-white/10" />
                <div className="h-4 w-[40%] rounded bg-black/10 dark:bg-white/10" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-[90%] rounded bg-black/10 dark:bg-white/10" />
                <div className="h-4 w-[50%] rounded bg-black/10 dark:bg-white/10" />
              </div>
              <div className="flex gap-3 pt-2">
                <div className="h-12 flex-1 rounded-xl bg-black/10 dark:bg-white/10" />
                <div className="h-12 flex-1 rounded-xl bg-black/10 dark:bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        // Error Display State
        <div className="glass-card rounded-3xl p-10 border border-red-500/10 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto text-red-500">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-xl text-foreground dark:text-white">Failed to Load Places</h3>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button 
            onClick={() => fetchPlaces(coords.lat || 19.0760, coords.lng || 72.8777)} 
            className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-sm shadow-primary/20 mt-2"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Retry Fetch
          </Button>
        </div>
      ) : filteredPlaces.length === 0 ? (
        // Empty State
        <div className="glass-card rounded-3xl p-12 border border-black/5 dark:border-white/5 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-xl text-foreground dark:text-white">No Safe Places Found</h3>
          <p className="text-sm text-muted-foreground">
            {searchQuery 
              ? "We couldn't find any locations matching your search. Try typing a different name or checking another category."
              : "No verified safe places found in this category within 5 km of your location."}
          </p>
          {searchQuery && (
            <Button onClick={() => setSearchQuery("")} variant="outline" className="rounded-xl mt-2">
              Clear Search Query
            </Button>
          )}
        </div>
      ) : (
        // Places Grid
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPlaces.map((place, i) => {
            const PlaceIcon = getIconForType(place.type);
            return (
              <div key={i} className="glass-card rounded-3xl p-6 border border-black/5 dark:border-white/5 hover:border-primary/20 transition-all group shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm ${place.color}`}>
                      <PlaceIcon className="w-6 h-6" />
                    </div>
                    <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {place.status}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-1 text-foreground dark:text-white group-hover:text-primary transition-colors line-clamp-1">{place.name}</h3>
                  <p className="text-sm text-muted-foreground font-medium mb-3">{place.type}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5" /> 
                      <span className="line-clamp-2">{place.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                      <Navigation className="w-4 h-4 shrink-0" /> {place.distance} away
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto pt-2">
                  <a href={`tel:${place.phone}`} className="flex-1">
                    <Button variant="outline" className="w-full rounded-xl h-12 border-black/10 dark:border-white/10 hover:border-primary hover:text-primary transition-colors">
                      <Phone className="w-4 h-4 mr-2" /> Call
                    </Button>
                  </a>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1"
                  >
                    <Button className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90 text-white shadow-sm shadow-primary/20">
                      <Navigation className="w-4 h-4 mr-2" /> Navigate
                    </Button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AnimatedPage>
  );
}
