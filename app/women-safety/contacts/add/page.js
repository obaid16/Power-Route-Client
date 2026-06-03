"use client";

import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { UserPlus, ArrowLeft, User, Phone, Heart, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassInput } from "@/components/ui/glass-input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    relationship: "Family",
    isPrimary: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate saving contact
    alert(`Successfully added ${formData.name} to your emergency contacts!`);
    router.push("/women-safety/contacts");
  };

  return (
    <AnimatedPage className="p-4 md:p-8 max-w-3xl mx-auto space-y-8 pb-20 font-sans">
      {/* Header */}
      <div>
        <Link href="/women-safety/contacts" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Contacts
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white">Add Emergency Contact</h1>
        </div>
        <p className="text-muted-foreground">Add someone you trust who will be notified instantly during an emergency.</p>
      </div>

      {/* Form Container */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-black/5 dark:border-white/5 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground dark:text-white mb-2 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <GlassInput 
                  required
                  placeholder="e.g. Priya Sharma" 
                  className="pl-11 h-14 rounded-2xl"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground dark:text-white mb-2 ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <GlassInput 
                  required
                  type="tel"
                  placeholder="+91 98765 43210" 
                  className="pl-11 h-14 rounded-2xl"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground dark:text-white mb-2 ml-1">Relationship</label>
              <div className="relative">
                <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <select 
                  className="w-full h-14 pl-11 pr-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl outline-none focus:border-primary/50 text-foreground dark:text-white appearance-none"
                  value={formData.relationship}
                  onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                >
                  <option value="Family">Family Member</option>
                  <option value="Friend">Close Friend</option>
                  <option value="Partner">Partner / Spouse</option>
                  <option value="Colleague">Colleague</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-4 p-4 rounded-2xl border border-primary/20 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors">
              <div className="mt-1">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-primary/50 text-primary focus:ring-primary"
                  checked={formData.isPrimary}
                  onChange={(e) => setFormData({...formData, isPrimary: e.target.checked})}
                />
              </div>
              <div>
                <div className="font-bold flex items-center gap-2 text-foreground dark:text-white">
                  Set as Primary Contact <ShieldCheck className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Primary contacts receive an immediate automated phone call alongside the standard SMS alert during an emergency.
                </p>
              </div>
            </label>
          </div>

          <div className="pt-4 flex gap-4">
            <Link href="/women-safety/contacts" className="flex-1">
              <Button type="button" variant="outline" className="w-full h-14 rounded-2xl border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-base font-semibold">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white text-base font-semibold shadow-sm shadow-primary/25">
              Save Contact
            </Button>
          </div>

        </form>
      </div>
    </AnimatedPage>
  );
}
