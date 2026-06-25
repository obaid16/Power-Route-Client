"use client";

import React, { useState } from "react";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { ArrowLeft, CreditCard, Plus, Wallet, TrendingUp, TrendingDown, Leaf, CheckCircle2, ChevronRight, Banknote, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WalletPage() {
  const [balance, setBalance] = useState(2450.0);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [transactions, setTransactions] = useState([
    { id: 1, station: "Neon Charge Hub", date: "Today, 2:30 PM", amount: -21.75, type: "charge", status: "Success" },
    { id: 2, station: "Added Funds (UPI)", date: "Yesterday, 11:15 AM", amount: 1000.0, type: "deposit", status: "Success" },
    { id: 3, station: "Marina Inn charging", date: "May 20, 4:00 PM", amount: -15.5, type: "charge", status: "Success" },
    { id: 4, station: "Aurora Superhub", date: "May 18, 9:30 AM", amount: -18.9, type: "charge", status: "Success" }
  ]);

  const handleAddMoney = (e) => {
    e.preventDefault();
    const amount = parseFloat(addAmount);
    if (isNaN(amount) || amount <= 0) return alert("Please enter a valid amount");
    
    setBalance(prev => prev + amount);
    setTransactions(prev => [
      {
        id: Date.now(),
        station: "Added Funds (Direct Card)",
        date: "Just Now",
        amount: amount,
        type: "deposit",
        status: "Success"
      },
      ...prev
    ]);
    setShowAddMoneyModal(false);
    setAddAmount("");
  };

  return (
    <AnimatedPage className="min-h-[calc(100vh-5rem)] text-foreground pb-20 transition-colors duration-300">
      <AnimatedPage stagger className="max-w-5xl mx-auto px-4 md:px-8 space-y-8 mt-8">
        
        {/* Header */}
        <div className="shrink-0">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white">Wallet & Billing</h1>
              </div>
              <p className="text-muted-foreground">Manage your payment cards, review billing history, and monitor your EV fuel savings.</p>
            </div>
            
            <Button 
              onClick={() => setShowAddMoneyModal(true)}
              className="bg-primary text-white hover:bg-primary/90 h-12 px-6 rounded-xl shadow-lg shadow-primary/25 font-semibold flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add Money
            </Button>
          </div>
        </div>

        {/* Top Layout: Card & Savings Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Virtual Contactless Payment Card */}
          <div className="md:col-span-5 flex flex-col justify-center">
            <div className="relative w-full aspect-[1.586/1] rounded-[24px] bg-gradient-to-br from-[#8B5CF6] via-[#6E38F7] to-[#4C1D95] p-6 text-white shadow-2xl overflow-hidden border border-white/20 hover:scale-[1.02] transition-transform duration-300 group cursor-pointer">
              {/* Card aesthetic lines */}
              <div className="absolute -right-20 -top-20 w-52 h-52 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500" />
              <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              
              <div className="h-full flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest font-mono text-white/70">PoweRoute Pay</p>
                    <h2 className="text-sm font-bold tracking-wider mt-0.5">DIGITAL CARNET</h2>
                  </div>
                  {/* Contactless symbol */}
                  <svg className="w-6 h-6 stroke-current opacity-80" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M5 18a9 9 0 0 1 0-12m3 10a5 5 0 0 1 0-8m3 8a2 2 0 0 1 0-4m3 6v-8" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="my-auto">
                  <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider">Available Balance</p>
                  <h3 className="text-3xl font-black tracking-tight mt-1">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[8px] text-white/60 font-mono uppercase tracking-wider">Card Number</p>
                    <p className="text-sm font-mono tracking-widest font-semibold">•••• •••• •••• 4242</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] text-white/60 font-mono uppercase tracking-wider">Expires</p>
                    <p className="text-xs font-mono font-semibold">08/29</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EV Savings vs Diesel Visualizer Card */}
          <div className="md:col-span-7 glass-card rounded-[32px] p-6 lg:p-8 border border-black/5 dark:border-white/5 bg-white/40 dark:bg-[#110822]/40 backdrop-blur-md relative overflow-hidden shadow-xl flex flex-col justify-between">
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground dark:text-white flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-500" /> Fuel Cost Savings Tracker
                </h3>
                <p className="text-xs text-muted-foreground">Direct financial comparisons based on 1,256 km traveled.</p>
              </div>
              <div className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> ₹4,500 Saved
              </div>
            </div>

            {/* Savings visual progress bars */}
            <div className="space-y-5">
              {/* EV Charging Cost */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-[#6E38F7]">EV Charging Cost</span>
                  <span>₹1,890</span>
                </div>
                <div className="h-3 w-full bg-black/5 dark:bg-[#1C1238] rounded-full overflow-hidden p-[2px]">
                  <div className="h-full bg-gradient-to-r from-[#A855F7] to-[#6E38F7] w-[29.5%] rounded-full shadow-[0_0_10px_rgba(110,56,247,0.4)]" />
                </div>
              </div>

              {/* Diesel Equivalent Cost */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-muted-foreground">Diesel Cost (Equivalent)</span>
                  <span>₹6,390</span>
                </div>
                <div className="h-3 w-full bg-black/5 dark:bg-[#1C1238] rounded-full overflow-hidden p-[2px]">
                  <div className="h-full bg-slate-400 dark:bg-slate-700 w-full rounded-full" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-black/5 dark:border-white/5 flex flex-wrap gap-4 justify-between items-center text-xs text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                98% lower carbon emissions
              </p>
              <p className="flex items-center gap-1.5 font-semibold text-primary dark:text-[#A87BFF]">
                <TrendingDown className="w-4 h-4" />
                Saved ₹3.58 per kilometer
              </p>
            </div>
          </div>
        </div>

        {/* Transaction History Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Transaction Ledger</h2>
              <p className="text-sm text-muted-foreground">Review your recent payments and wallet updates.</p>
            </div>
            <button className="text-sm font-semibold border border-border px-4 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              Export Statement
            </button>
          </div>

          <div className="glass-card rounded-3xl border border-black/5 dark:border-white/5 divide-y divide-black/5 dark:divide-white/5 overflow-hidden shadow-sm">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${t.type === 'deposit' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'}`}>
                    {t.type === 'deposit' ? <TrendingUp className="w-5 h-5" /> : <Banknote className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground dark:text-white group-hover:text-[#6E38F7] transition-colors">{t.station}</h4>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className={`font-bold text-sm ${t.type === 'deposit' ? 'text-green-500' : 'text-foreground dark:text-white'}`}>
                      {t.type === 'deposit' ? '+' : '-'}₹{Math.abs(t.amount).toFixed(2)}
                    </p>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{t.type === 'deposit' ? 'Refill' : 'Debited'}</p>
                  </div>
                  
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-green-500 font-bold bg-green-500/15 border border-green-500/20 rounded-md px-2.5 py-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {t.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Add Money Modal */}
        {showAddMoneyModal && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowAddMoneyModal(false)}>
            <form 
              onSubmit={handleAddMoney}
              className="bg-white dark:bg-[#110822] w-full max-w-md rounded-3xl p-6 shadow-[0_0_50px_rgba(110,56,247,0.15)] border border-primary/20 transform scale-100 animate-in fade-in zoom-in duration-200 space-y-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Add Funds to Wallet</h3>
                <p className="text-sm text-muted-foreground mt-1">Refill your digital charging card balance.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground ml-1">Deposit Amount (₹)</label>
                  <input 
                    type="number"
                    required
                    min="100"
                    max="10000"
                    placeholder="Enter amount (e.g. 1000)"
                    value={addAmount}
                    onChange={e => setAddAmount(e.target.value)}
                    className="w-full h-12 bg-black/5 dark:bg-[#1C1238] border border-black/10 dark:border-white/10 dark:border-[#2D1B54] rounded-xl px-4 text-sm font-semibold focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddMoneyModal(false)}
                  className="flex-1 rounded-xl h-12 font-semibold"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="flex-1 bg-primary text-white hover:bg-primary/90 rounded-xl h-12 font-semibold shadow-lg shadow-primary/25"
                >
                  Confirm Deposit
                </Button>
              </div>
            </form>
          </div>
        )}

      </AnimatedPage>
    </AnimatedPage>
  );
}
