"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { GlassInput } from "@/components/ui/glass-input";
import { Button } from "@/components/ui/button";
import { Zap, Eye, EyeOff, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Signup() {
  const router = useRouter();
  const { register, isLoading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    emergencyName: "",
    emergencyPhone: "",
    brand: "",
    model: "",
    portType: "",
    preferredSpeed: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      city: formData.city,
      state: formData.state,
      emergencyContact: {
        name: formData.emergencyName,
        phone: formData.emergencyPhone
      },
      evDetails: {
        brand: formData.brand,
        model: formData.model,
        portType: formData.portType,
        preferredSpeed: formData.preferredSpeed
      }
    };

    const success = await register(payload);
    if (success) {
      router.push('/map');
    }
  };

  return (
    <AnimatedPage className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
      <div className="w-full max-w-4xl glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden border border-primary/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-900/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4 neon-glow">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 neon-text">Create Account</h1>
            <p className="text-muted-foreground">Join the next-generation EV charging network</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl p-4 mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-primary border-b border-white/10 pb-2">Personal Details</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
                <GlassInput name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
                <GlassInput name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Phone Number</label>
                <GlassInput name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">City</label>
                  <GlassInput name="city" value={formData.city} onChange={handleChange} placeholder="New York" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">State</label>
                  <GlassInput name="state" value={formData.state} onChange={handleChange} placeholder="NY" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Emergency Contact</label>
                <div className="flex gap-2">
                  <GlassInput name="emergencyName" value={formData.emergencyName} onChange={handleChange} placeholder="Name" className="w-1/3" />
                  <GlassInput name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} type="tel" placeholder="Phone Number" className="w-2/3" />
                </div>
              </div>
            </div>

            {/* Vehicle & Security */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-primary border-b border-white/10 pb-2">Vehicle & Security</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">EV Brand</label>
                  <GlassInput name="brand" value={formData.brand} onChange={handleChange} placeholder="Tesla" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">EV Model</label>
                  <GlassInput name="model" value={formData.model} onChange={handleChange} placeholder="Model 3" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Port Type</label>
                  <select name="portType" value={formData.portType} onChange={handleChange} className="flex h-12 w-full rounded-xl border border-white/10 bg-background/40 px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary backdrop-blur-md text-foreground appearance-none">
                    <option value="" disabled>Select Port</option>
                    <option value="ccs1">CCS1</option>
                    <option value="ccs2">CCS2</option>
                    <option value="chademo">CHAdeMO</option>
                    <option value="tesla">NACS (Tesla)</option>
                    <option value="type2">Type 2</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Pref. Charging</label>
                  <select name="preferredSpeed" value={formData.preferredSpeed} onChange={handleChange} className="flex h-12 w-full rounded-xl border border-white/10 bg-background/40 px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary backdrop-blur-md text-foreground appearance-none">
                    <option value="" disabled>Select Speed</option>
                    <option value="fast">DC Fast</option>
                    <option value="level2">Level 2</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Password</label>
                <div className="relative">
                  <GlassInput 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Confirm Password</label>
                <div className="relative">
                  <GlassInput 
                    type={showConfirmPassword ? "text" : "password"} 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="••••••••" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="col-span-1 md:col-span-2 mt-6 space-y-4">
              <Button disabled={isLoading} type="submit" className="w-full h-14 rounded-xl bg-primary text-white text-lg font-semibold hover:bg-primary/90 neon-glow transition-all">
                {isLoading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Creating Account...</>
                ) : (
                  <>Create Account <CheckCircle2 className="ml-2 h-5 w-5" /></>
                )}
              </Button>
              
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm">Or continue with</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button type="button" variant="outline" className="h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-foreground backdrop-blur-sm">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </Button>
                <Button type="button" variant="outline" className="h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-foreground backdrop-blur-sm">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  Apple
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </AnimatedPage>
  );
}
