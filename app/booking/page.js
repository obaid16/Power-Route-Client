"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Button } from "@/components/ui/button";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassSelect } from "@/components/ui/glass-select";
import { CalendarCheck, Clock, CreditCard, Zap, CheckCircle2, Loader2 } from "lucide-react";

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stationId = searchParams.get('station');

  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState("14:30");
  const [duration, setDuration] = useState("30");

  useEffect(() => {
    const fetchStation = async () => {
      if (!stationId) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get(`/stations/${stationId}`);
        setStation(res.data.data);
      } catch (e) {
        console.error("Failed to load station");
      } finally {
        setLoading(false);
      }
    };
    fetchStation();
  }, [stationId]);

  const handleBooking = async () => {
    if (!station) return alert("Select a station first");
    setBookingLoading(true);
    try {
      await api.post('/bookings', {
        station: station._id,
        chargerId: station.chargers[0]?._id || "64a0b22a0000000000000000", // Fallback if schema doesn't match perfectly
        date,
        startTime: time,
        durationMinutes: parseInt(duration),
        paymentDetails: {
          amount: 21.75
        }
      });
      alert("Booking confirmed successfully!");
      router.push('/map');
    } catch (e) {
      alert(e.response?.data?.error || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };
  return (
    <AnimatedPage className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4 neon-glow">
          <CalendarCheck className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 neon-text">Book a Charging Slot</h1>
        <p className="text-muted-foreground">Reserve your spot at Neon Charge Hub</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Details */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-black/5 dark:border-white/5">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Zap className="mr-2 h-5 w-5 text-primary" /> Station Details
            </h2>
            {loading ? (
              <div className="flex justify-center p-4"><Loader2 className="animate-spin" /></div>
            ) : station ? (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Station</span>
                  <span className="font-semibold">{station.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Charger Type</span>
                  <span className="font-semibold text-primary">{station.chargers?.[0]?.power || "N/A"} DC Fast</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="font-semibold">${station.pricing?.ratePerKwh || 0.45} / kWh</span>
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground text-sm text-center py-4">No station selected. Please go back to the map.</div>
            )}
          </div>

          <div className="glass-card rounded-3xl p-6 border border-black/5 dark:border-white/5">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" /> Select Time
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Date</label>
                  <GlassInput type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Time</label>
                  <GlassInput type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Duration</label>
                <GlassSelect 
                  name="duration"
                  value={duration} 
                  onChange={(e) => setDuration(e.target.value)}
                  options={[
                    { value: "30", label: "30 Minutes (Est. 80% charge)" },
                    { value: "60", label: "1 Hour (Full charge)" },
                    { value: "90", label: "1.5 Hours" }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Summary & Payment */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-primary/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px] pointer-events-none" />
            <h2 className="text-xl font-bold mb-4 flex items-center relative z-10">
              <CreditCard className="mr-2 h-5 w-5 text-primary" /> Payment Summary
            </h2>
            
            <div className="space-y-4 relative z-10">
              <div className="bg-background/40 rounded-2xl p-4 border border-black/5 dark:border-white/5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Energy</span>
                  <span>~45 kWh</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Charging Cost</span>
                  <span>$20.25</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Booking Fee</span>
                  <span>$1.50</span>
                </div>
                <div className="border-t border-black/10 dark:border-white/10 pt-2 mt-2 flex justify-between font-bold text-lg">
                  <span>Total Estimated</span>
                  <span className="text-primary neon-text">$21.75</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Payment Method</label>
                <div className="flex items-center justify-between p-3 rounded-xl border border-primary/40 bg-primary/10 cursor-pointer hover:bg-primary/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-xs font-bold text-blue-800">VISA</div>
                    <span className="text-sm font-medium">•••• 4242</span>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
              </div>

              <Button disabled={bookingLoading} onClick={handleBooking} className="w-full h-14 rounded-xl bg-primary text-white text-lg font-semibold hover:bg-primary/90 neon-glow transition-all mt-4">
                {bookingLoading ? <Loader2 className="animate-spin" /> : "Confirm Booking"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>}>
      <BookingContent />
    </Suspense>
  );
}
