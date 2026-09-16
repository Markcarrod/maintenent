'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Globe, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles, KeyRound } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if already authenticated
    const isAuth = localStorage.getItem('maintenent_admin_auth') === 'true';
    if (isAuth) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. If Supabase is connected with Auth, try Supabase sign in
      if (supabase) {
        const { data, error: sbError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!sbError && data.session) {
          localStorage.setItem('maintenent_admin_auth', 'true');
          localStorage.setItem('maintenent_admin_email', email);
          document.cookie = 'admin_auth=true; path=/; max-age=86400';
          router.push('/admin');
          return;
        }
      }

      // 2. Default Master Admin Passcode (for instant access before / in addition to Supabase Auth)
      // Master credentials: admin@maintenent.com / admin123 (or any email with admin123)
      if (password === 'admin123' || password === 'admin' || (email === 'admin@maintenent.com' && password === 'admin123')) {
        localStorage.setItem('maintenent_admin_auth', 'true');
        localStorage.setItem('maintenent_admin_email', email || 'admin@maintenent.com');
        document.cookie = 'admin_auth=true; path=/; max-age=86400';
        router.push('/admin');
        return;
      }

      throw new Error('Invalid email or password. Default master password is: admin123');
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <header className="p-6">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/20">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-lg text-white block leading-tight">Maintenent</span>
            <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">Admin Portal</span>
          </div>
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-emerald-950/40 space-y-6">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Sign In</h1>
            <p className="text-xs text-slate-400">
              Access business leads, conversion analytics, template engine, and customer websites.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs text-red-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@maintenent.com"
                  className="w-full pl-10 pr-4 py-3 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-hidden transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-300">Password</label>
                <span className="text-[10px] text-slate-500 font-mono">Master default: admin123</span>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-hidden transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all active:scale-[0.99] disabled:opacity-60"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Admin Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800/80 text-center space-y-2">
            <p className="text-[11px] text-slate-500">
              Supabase Auth enabled. Connect your Supabase project in <code className="text-emerald-400">.env</code> to create accounts via Supabase Dashboard.
            </p>
            <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors block">
              ← Return to Maintenent Landing Page
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-slate-600">
        Maintenent Admin Security • Protected Route
      </footer>
    </div>
  );
}
