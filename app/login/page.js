"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { useGoogleLogin } from "@react-oauth/google";
import api from "@/lib/api";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { GlassInput } from "@/components/ui/glass-input";
import { Button } from "@/components/ui/button";
import { Zap, Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      router.push('/');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await api.post('/auth/google', { token: tokenResponse.access_token });
        if (res.data.success) {
          useAuthStore.getState().setToken(res.data.token, res.data.user);
          router.push('/map');
        }
      } catch (err) {
        useAuthStore.setState({ error: `Backend Error: ${err.response?.data?.error || err.message}` });
      }
    },
    onError: (err) => useAuthStore.setState({ error: `Google UI Error: ${err?.message || "Popup closed"}` })
  });

  return (
    <AnimatedPage className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-10 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/auth_bg.png" alt="EV Charging Station Background" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      </div>
      
      <div className="w-full max-w-md glass-card rounded-3xl p-8 relative overflow-hidden border border-primary/20 z-10 shadow-2xl">
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/20 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-900/20 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4 neon-glow">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 neon-text">Welcome Back</h1>
            <p className="text-muted-foreground">Log in to your PoweRoute account</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl p-4 mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
              <GlassInput type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-muted-foreground">Password</label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <GlassInput 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <Button disabled={isLoading} type="submit" className="w-full h-12 rounded-xl bg-primary text-white text-lg font-semibold hover:bg-primary/90 neon-glow transition-all">
              {isLoading ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Signing In...</>
              ) : (
                <>Sign In <LogIn className="ml-2 h-5 w-5" /></>
              )}
            </Button>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm">Or continue with</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <div className="flex justify-center">
              <Button type="button" onClick={() => googleLogin()} variant="outline" className="w-full h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-foreground backdrop-blur-sm">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign in with Google
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AnimatedPage>
  );
}
