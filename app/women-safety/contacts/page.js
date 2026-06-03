"use client";

import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Shield, PhoneCall, MessageCircle, MoreVertical, Plus, ArrowLeft, Search, Phone, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactsPage() {
  const contacts = [
    { name: "Priya Sharma", rel: "Sister", phone: "+91 98765 43210", initials: "PS", color: "bg-pink-500", isPrimary: true },
    { name: "Rahul Sharma", rel: "Brother", phone: "+91 91234 56789", initials: "RS", color: "bg-blue-500", isPrimary: false },
    { name: "Aarav Singh", rel: "Close Friend", phone: "+91 99887 66554", initials: "AS", color: "bg-primary", isPrimary: false },
    { name: "Mom", rel: "Mother", phone: "+91 99999 88888", initials: "M", color: "bg-orange-500", isPrimary: true },
    { name: "Dad", rel: "Father", phone: "+91 88888 77777", initials: "D", color: "bg-emerald-500", isPrimary: false },
  ];

  return (
    <AnimatedPage className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 pb-20 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link href="/women-safety" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Safety Center
          </Link>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white">Emergency Contacts</h1>
          </div>
          <p className="text-muted-foreground text-sm">Manage who gets notified instantly during an emergency.</p>
        </div>
        
        <Link href="/women-safety/contacts/add">
          <Button className="flex items-center gap-2 font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-6 shadow-sm shadow-primary/25">
            <Plus className="w-5 h-5" /> Add New Contact
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="glass-card rounded-2xl p-2 flex items-center border border-black/5 dark:border-white/5 shadow-sm max-w-md">
        <Search className="w-5 h-5 text-muted-foreground ml-3 mr-2" />
        <input 
          type="text" 
          placeholder="Search contacts..." 
          className="bg-transparent border-none outline-none w-full h-10 text-sm text-foreground dark:text-white placeholder:text-muted-foreground"
        />
      </div>

      {/* Contacts List */}
      <div className="glass-card rounded-3xl border border-black/5 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="divide-y divide-black/5 dark:divide-white/5">
          {contacts.map((contact, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-black/5 dark:hover:bg-white/5 transition-colors gap-4">
              <div className="flex items-center gap-5 sm:w-1/3">
                <div className={`w-12 h-12 rounded-full ${contact.color} flex items-center justify-center text-white font-bold shadow-sm text-lg shrink-0`}>
                  {contact.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-base text-foreground dark:text-white flex items-center gap-2">
                    {contact.name}
                    {contact.isPrimary && (
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    )}
                  </h4>
                  <p className="text-xs text-primary font-medium mt-0.5">{contact.rel}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-muted-foreground sm:w-1/3">
                <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4 text-foreground dark:text-white" />
                </div>
                {contact.phone}
              </div>
              
              <div className="flex items-center sm:justify-end gap-3 sm:w-1/3">
                <a href={`sms:${contact.phone.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-colors">
                  <Phone className="w-4 h-4" />
                </a>
                <button onClick={() => alert(`More options for ${contact.name}`)} className="inline-flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
}
