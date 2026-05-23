"use client";

import { MapPin, Route, Zap, Wallet, Clock, Wrench, Settings, ChevronRight, Battery, Truck, Phone } from "lucide-react";
import Link from "next/link";

export default function VanPage() {
  return (
    <div className="min-h-screen bg-[#F4F2FA] dark:bg-[#06020E] text-[#1A0E38] dark:text-[#F8F9FA] p-4 md:p-8 font-sans transition-colors duration-300 pb-20">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Left Card - My Van */}
          <div className="xl:col-span-7 bg-white dark:bg-[#110822] rounded-[24px] p-6 lg:p-8 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] transition-colors duration-300">
            <div className="mb-6">
              <h2 className="text-sm font-medium text-[#6B7280] dark:text-[#9AA0A6] mb-1">My Van</h2>
              <h1 className="text-3xl font-bold mb-4">PoweRoute Van</h1>
              <div className="inline-flex items-center gap-2 bg-[#F3E8FF] dark:bg-[#2D1B54]/40 text-[#6E38F7] dark:text-[#A87BFF] px-4 py-1.5 rounded-full text-xs font-semibold border border-[#E9D5FF] dark:border-[#4C1D95]/30">
                <div className="w-2 h-2 rounded-full bg-[#6E38F7] shadow-[0_0_8px_rgba(110,56,247,0.8)]"></div>
                Ready to Drive
              </div>
            </div>

            {/* Van Image Placeholder */}
            <div className="relative w-full h-[300px] lg:h-[380px] bg-gradient-to-r from-[#2e1065] to-[#1e1b4b] dark:from-[#3b0764] dark:to-[#0f172a] rounded-[20px] overflow-hidden mb-8 flex items-center justify-center shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] border border-primary/20">
              <img src="/van_image.png" alt="PoweRoute Van" className="w-full h-full object-cover opacity-90 mix-blend-screen" />
            </div>

            {/* Battery & Range Info */}
            <div className="flex justify-between items-end px-2">
              <div className="w-1/2 pr-6">
                <div className="flex items-center gap-2 text-sm text-[#6B7280] dark:text-[#9AA0A6] mb-3">
                  <Battery className="w-4 h-4" /> Battery
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">80%</span>
                  <div className="h-2 flex-grow bg-[#E5E0F1] dark:bg-[#1A0E38] rounded-full overflow-hidden">
                    <div className="h-full bg-[#6E38F7] w-[80%] rounded-full shadow-[0_0_10px_rgba(110,56,247,0.8)]"></div>
                  </div>
                </div>
              </div>
              <div className="text-right pl-4">
                <div className="flex items-center justify-end gap-2 text-sm text-[#6B7280] dark:text-[#9AA0A6] mb-3">
                  <MapPin className="w-4 h-4" /> Range
                </div>
                <span className="text-2xl font-bold">260 km</span>
              </div>
            </div>
          </div>

          {/* Right Column - Van Overview */}
          <div className="xl:col-span-5 flex flex-col">
            <h2 className="text-lg font-bold mb-4 ml-1">Van Overview</h2>
            <div className="grid grid-cols-2 gap-4 lg:gap-6 flex-grow">
              
              <div className="bg-white dark:bg-[#110822] rounded-[24px] p-6 lg:p-8 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] flex flex-col justify-center transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-[#F3E8FF] dark:bg-[#2D1B54]/40 flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6 text-[#6E38F7] dark:text-[#A87BFF]" />
                </div>
                <p className="text-sm text-[#6B7280] dark:text-[#9AA0A6] mb-2">Total Distance</p>
                <h3 className="text-3xl font-bold">1,256 <span className="text-xl font-medium">km</span></h3>
              </div>
              
              <div className="bg-white dark:bg-[#110822] rounded-[24px] p-6 lg:p-8 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] flex flex-col justify-center transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-[#F3E8FF] dark:bg-[#2D1B54]/40 flex items-center justify-center mb-6">
                  <Route className="w-6 h-6 text-[#6E38F7] dark:text-[#A87BFF]" />
                </div>
                <p className="text-sm text-[#6B7280] dark:text-[#9AA0A6] mb-2">Total Trips</p>
                <h3 className="text-3xl font-bold">28</h3>
              </div>
              
              <div className="bg-white dark:bg-[#110822] rounded-[24px] p-6 lg:p-8 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] flex flex-col justify-center transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-[#F3E8FF] dark:bg-[#2D1B54]/40 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-[#6E38F7] dark:text-[#A87BFF]" />
                </div>
                <p className="text-sm text-[#6B7280] dark:text-[#9AA0A6] mb-2">Total Energy</p>
                <h3 className="text-3xl font-bold">320 <span className="text-xl font-medium">kWh</span></h3>
              </div>
              
              <div className="bg-white dark:bg-[#110822] rounded-[24px] p-6 lg:p-8 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] flex flex-col justify-center transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-[#F3E8FF] dark:bg-[#2D1B54]/40 flex items-center justify-center mb-6">
                  <Wallet className="w-6 h-6 text-[#6E38F7] dark:text-[#A87BFF]" />
                </div>
                <p className="text-sm text-[#6B7280] dark:text-[#9AA0A6] mb-2">Total Cost</p>
                <h3 className="text-3xl font-bold">₹1,890</h3>
              </div>

            </div>
          </div>

        </div>

        {/* Quick Actions Container */}
        <div className="bg-white dark:bg-[#110822] rounded-[24px] p-6 lg:p-8 shadow-sm border border-[#E5E0F1] dark:border-[#2D1B54] transition-colors duration-300">
          <h2 className="text-lg font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
            
            <Link href="/tracking" className="group cursor-pointer flex items-center justify-between p-5 rounded-[16px] border border-[#E5E0F1] dark:border-[#2D1B54] hover:border-[#6E38F7] dark:hover:border-[#6E38F7] hover:bg-[#F3E8FF]/30 dark:hover:bg-[#1A0E38] transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#F3E8FF] dark:bg-[#2D1B54]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-[#6E38F7]" />
                </div>
                <span className="font-semibold text-[15px]">Location Tracking</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#6B7280] dark:text-[#9AA0A6] group-hover:text-[#6E38F7] transition-colors" />
            </Link>

            <Link href="/van" className="group cursor-pointer flex items-center justify-between p-5 rounded-[16px] border border-[#E5E0F1] dark:border-[#2D1B54] hover:border-[#6E38F7] dark:hover:border-[#6E38F7] hover:bg-[#F3E8FF]/30 dark:hover:bg-[#1A0E38] transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#F3E8FF] dark:bg-[#2D1B54]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-6 h-6 text-[#6E38F7]" />
                </div>
                <span className="font-semibold text-[15px]">Trip History</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#6B7280] dark:text-[#9AA0A6] group-hover:text-[#6E38F7] transition-colors" />
            </Link>

            <Link href="/maintenance" className="group cursor-pointer flex items-center justify-between p-5 rounded-[16px] border border-[#E5E0F1] dark:border-[#2D1B54] hover:border-[#6E38F7] dark:hover:border-[#6E38F7] hover:bg-[#F3E8FF]/30 dark:hover:bg-[#1A0E38] transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#F3E8FF] dark:bg-[#2D1B54]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Wrench className="w-6 h-6 text-[#6E38F7]" />
                </div>
                <span className="font-semibold text-[15px]">Maintenance</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#6B7280] dark:text-[#9AA0A6] group-hover:text-[#6E38F7] transition-colors" />
            </Link>

            <Link href="/settings" className="group cursor-pointer flex items-center justify-between p-5 rounded-[16px] border border-[#E5E0F1] dark:border-[#2D1B54] hover:border-[#6E38F7] dark:hover:border-[#6E38F7] hover:bg-[#F3E8FF]/30 dark:hover:bg-[#1A0E38] transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#F3E8FF] dark:bg-[#2D1B54]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Settings className="w-6 h-6 text-[#6E38F7]" />
                </div>
                <span className="font-semibold text-[15px]">Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#6B7280] dark:text-[#9AA0A6] group-hover:text-[#6E38F7] transition-colors" />
            </Link>

          </div>
        </div>

        {/* Towing Services Section */}
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 dark:from-red-500/5 dark:to-orange-500/5 rounded-[24px] p-6 lg:p-8 border border-red-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                <Truck className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground dark:text-white mb-1">Emergency Towing Services</h2>
                <p className="text-[#6B7280] dark:text-[#9AA0A6] text-sm max-w-md">Stranded or out of charge? Contact our 24/7 verified EV towing partners for immediate assistance.</p>
              </div>
            </div>
            <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] shrink-0" onClick={() => alert('Calling Emergency Towing Services: 1-800-EV-RESCUE')}>
              <Phone className="w-5 h-5" />
              Call Tow Truck Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
