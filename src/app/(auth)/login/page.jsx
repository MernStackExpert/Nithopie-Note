"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid credentials");
      }

      
      router.refresh();
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      
      <div className="hidden lg:flex w-1/2 bg-gray-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-gray-900 to-gray-950"></div>
        
        <div className="relative z-10 p-12 max-w-xl">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-sm transition-all mb-12 backdrop-blur-md">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/50">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-black text-white leading-tight mb-6">
              Welcome back to your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Secure Vault.</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium leading-relaxed">
              Log in to access your encrypted notes, sync your latest code snippets, and continue your work in complete privacy.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-white dark:bg-gray-950 relative">
        <Link href="/" className="lg:hidden absolute top-6 left-6 inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 font-bold text-sm hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Sign In</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Enter your credentials to continue.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="name@company.com" 
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-white font-medium transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Password</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-white font-medium transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</>
              ) : (
                <>Sign In <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 dark:text-blue-400 font-black hover:underline">Create one for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}