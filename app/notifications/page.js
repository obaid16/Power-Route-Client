"use client";

import { useState } from "react";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Bell, Zap, CalendarCheck, ShieldAlert, CreditCard } from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "Booking Confirmed",
    message: "Your slot at Neon Charge Hub is confirmed for tomorrow at 14:30.",
    time: "2 hours ago",
    icon: CalendarCheck,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    read: false,
  },
  {
    id: 2,
    title: "Charge Complete",
    message: "Your Tesla Model 3 has reached 100% charge. Please move your vehicle within 15 mins to avoid idle fees.",
    time: "Yesterday",
    icon: Zap,
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    read: true,
  },
  {
    id: 3,
    title: "Payment Successful",
    message: "$21.75 was successfully charged to your Visa ending in 4242.",
    time: "Yesterday",
    icon: CreditCard,
    color: "text-primary",
    bgColor: "bg-primary/20",
    read: true,
  },
  {
    id: 4,
    title: "Safety Alert Update",
    message: "A minor incident was reported near Nexus Pulse Grid. Extra security has been deployed.",
    time: "3 days ago",
    icon: ShieldAlert,
    color: "text-red-400",
    bgColor: "bg-red-500/20",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  return (
    <AnimatedPage className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center neon-glow">
            <Bell className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight neon-text">Notifications</h1>
            <p className="text-muted-foreground">Stay updated on your charging activity</p>
          </div>
        </div>
        <button 
          onClick={markAllAsRead}
          className="text-sm font-medium text-primary hover:text-white transition-colors"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifs.map((notification) => {
          const Icon = notification.icon;
          return (
            <div 
              key={notification.id}
              className={`glass-card rounded-2xl p-4 flex gap-4 transition-all hover:bg-white/5 border ${
                notification.read ? "border-white/5" : "border-primary/40 bg-primary/5"
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notification.bgColor}`}>
                <Icon className={`h-6 w-6 ${notification.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-semibold text-lg ${notification.read ? "text-foreground" : "text-white"}`}>
                    {notification.title}
                  </h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {notification.time}
                  </span>
                </div>
                <p className={`text-sm ${notification.read ? "text-muted-foreground" : "text-gray-300"}`}>
                  {notification.message}
                </p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
              )}
            </div>
          );
        })}
      </div>
    </AnimatedPage>
  );
}
