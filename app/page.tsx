'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Laptop,
  CheckCircle2,
  Utensils,
  Wrench,
  Clock,
  ExternalLink,
  Check,
  Star,
  Layers,
  PhoneCall,
  Calendar,
  Smartphone,
  TrendingUp,
  Headphones,
  Award,
  ChevronRight,
  Compass,
} from 'lucide-react';
import { TEMPLATE_REGISTRY } from '@/lib/template-recommender';

export default function BuyerRadarLandingPage() {
  const [quickName, setQuickName] = useState('');
  const [quickCity, setQuickCity] = useState('');
  const [quickIndustry, setQuickIndustry] = useState('restaurant');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'restaurant' | 'handyman' | 'cleaning'>('restaurant');

  const handleQuickGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim() || !quickCity.trim()) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/admin/businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quickName,
          city: quickCity,
          industry: quickIndustry,
        }),
      });
      const data = await res.json();
      if (data.business?.slug) {
        window.location.href = `/preview/${data.business.slug}`;
      }
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
    }
  };

  const templatesList = Object.values(TEMPLATE_REGISTRY);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-slate-300 text-xs py-2.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
              ✦ BuyerRadar Agency
            </span>
            <span>Bespoke, High-Converting Websites for Local Businesses • Launched in 48 Hours</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors text-xs"
            >
              <span>Admin Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. AGENCY NAVIGATION */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/20">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-xl text-white block leading-tight tracking-tight">BuyerRadar</span>
              <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">Digital Agency • buyerradar.app</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#services" className="hover:text-white transition-colors">Our Specialties</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Featured Work</a>
            <a href="#process" className="hover:text-white transition-colors">How We Work</a>
            <a href="#pricing" className="hover:text-white transition-colors">Agency Plans</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          {/* Header CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-bold transition-colors hidden sm:inline-flex"
            >
              Client Login
            </Link>
            <a
              href="#instant-preview"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-1.5 active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Free Preview</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-28 md:pb-32 px-4 overflow-hidden">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-emerald-400 text-xs font-bold shadow-inner">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>High-Performance Websites Engineered for Local Businesses</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08]">
            We Build Websites That Turn <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Local Searchers Into Paying Clients.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
            Stop losing customers to outdated templates or missing websites. <strong className="text-white font-semibold">BuyerRadar</strong> designs, builds, and manages ultra-fast, mobile-first websites for restaurants, contractors, and cleaning services. Experience your full site before paying a dime.
          </p>

          {/* Quick Interactive Website Generator (Agency Lead Magnet) */}
          <div id="instant-preview" className="pt-4 max-w-3xl mx-auto scroll-mt-28">
            <form
              onSubmit={handleQuickGenerate}
              className="bg-slate-900/95 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl shadow-emerald-950/50 space-y-4 text-left"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Sparkles className="w-4 h-4" /> Instant 7-Day Personalized Preview Generator
                </span>
                <span className="text-[11px] text-slate-500 font-mono">No credit card required</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Your Business Name</label>
                  <input
                    required
                    type="text"
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    placeholder="e.g. Bella Trattoria"
                    className="w-full p-3 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-hidden transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">City, State</label>
                  <input
                    required
                    type="text"
                    value={quickCity}
                    onChange={(e) => setQuickCity(e.target.value)}
                    placeholder="e.g. Austin, TX"
                    className="w-full p-3 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-hidden transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Industry / Niche</label>
                  <select
                    value={quickIndustry}
                    onChange={(e) => setQuickIndustry(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-hidden transition-colors font-medium"
                  >
                    <option value="restaurant">🍽 Restaurant & Food</option>
                    <option value="handyman">🔨 Handyman & Home Services</option>
                    <option value="cleaning">🧹 Cleaning Services</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:brightness-110 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-all active:scale-[0.99] disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? 'Engineering Your Website Preview...' : 'Generate My Website Preview Instantly'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Agency Metrics & Trust Bar */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">48 hrs</div>
              <div className="text-xs text-slate-400 mt-0.5">Average Turnaround</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">3.4x</div>
              <div className="text-xs text-slate-400 mt-0.5">Higher Lead Conversion</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">15</div>
              <div className="text-xs text-slate-400 mt-0.5">Industry Design Systems</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">Zero Fabrication Policy</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE DO / AGENCY SPECIALTIES */}
      <section id="services" className="py-20 px-4 bg-slate-900 border-t border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Tailored For Your Niche
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Built For Local Business Growth</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              We do not build generic cookie-cutter templates. Every website is custom-structured around how your specific customers buy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Restaurant Specialty */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-8 space-y-6 hover:border-orange-500/50 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                  <Utensils className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white group-hover:text-orange-400 transition-colors">
                  Restaurants & Dining
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Engineered to drive table reservations, online food orders, and showcase structured digital menus with dietary tags and clear pricing.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> Interactive categorized digital menus</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> Table booking & OpenTable/Resy links</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> DoorDash/UberEats/Direct ordering CTAs</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> Mobile sticky "View Menu" bar</li>
                </ul>
              </div>
              <Link
                href="/preview/bella-vista-trattoria"
                className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Explore Restaurant Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Handyman Specialty */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-8 space-y-6 hover:border-amber-500/50 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                  Contractors & Home Services
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Turn local homeowners searching for repairs and remodeling into instant phone calls and qualified estimate requests.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> One-tap "Call Now" mobile buttons</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> 4-step job qualification questionnaire</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Before & after project transformation gallery</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Service area maps & verified review badge</li>
                </ul>
              </div>
              <Link
                href="/preview/mikes-handyman-services"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Explore Handyman Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Cleaning Specialty */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-8 space-y-6 hover:border-cyan-500/50 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors">
                  Cleaning & Janitorial Services
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Clean, trustworthy aesthetic for recurring residential maid services, move-in/move-out turnover, and corporate B2B contracts.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Instant online estimate calculator</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> 50-point cleaning checklist breakdown</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Trust badges: Insured, bonded, eco-friendly</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Recurring frequency discounts (Weekly, Bi-Weekly)</li>
                </ul>
              </div>
              <Link
                href="/preview/sparkling-horizon-cleaning"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Explore Cleaning Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PORTFOLIO & LIVE CLIENT DEMOS */}
      <section id="portfolio" className="py-20 px-4 bg-slate-950 border-t border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Agency Portfolio
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Recent Client Websites</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Test drive our live client websites. Every build includes multi-page navigation, custom visual identity, customer portals, and lead qualification flows.
            </p>
          </div>

          {/* Niche Filter Tabs */}
          <div className="flex justify-center gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('restaurant')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'restaurant'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Restaurants (5)</span>
            </button>
            <button
              onClick={() => setActiveTab('handyman')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'handyman'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Contractors (5)</span>
            </button>
            <button
              onClick={() => setActiveTab('cleaning')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'cleaning'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Cleaning (5)</span>
            </button>
          </div>

          {/* TAB 1: RESTAURANTS */}
          {activeTab === 'restaurant' && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Bella Vista */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-orange-500/50 transition-all group">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                      R1 • Pizza/Italian
                    </span>
                    <span className="text-xs text-amber-400 font-bold">★ 4.8</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-orange-400 transition-colors">
                    Bella Vista Trattoria
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Chicago, IL • Wood-fired pizza, handmade pasta, digital menu categories & table reservations.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800">
                  <Link
                    href="/preview/bella-vista-trattoria"
                    className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>View Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Taco Libre */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-orange-500/50 transition-all group">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                      R2 • Mexican Street Food
                    </span>
                    <span className="text-xs text-amber-400 font-bold">★ 4.7</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-orange-400 transition-colors">
                    Taco Libre
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Austin, TX • Street tacos, handcrafted margaritas, vibrant warm design & online ordering.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800">
                  <Link
                    href="/preview/taco-libre-austin"
                    className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>View Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Big Stack */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-red-500/50 transition-all group">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                      R3 • Burgers & Shakes
                    </span>
                    <span className="text-xs text-amber-400 font-bold">★ 4.6</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-red-400 transition-colors">
                    Big Stack Burgers
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Houston, TX • Smashed patties, thick milkshakes, bold dark layout & fast takeout ordering.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800">
                  <Link
                    href="/preview/big-stack-burgers"
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>View Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Dragon Palace */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-amber-500/50 transition-all group">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      R4 • Asian Fusion
                    </span>
                    <span className="text-xs text-amber-400 font-bold">★ 4.9</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                    Dragon Palace
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    San Francisco, CA • Cantonese dim sum, Peking duck, elegant gold and deep navy theme.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800">
                  <Link
                    href="/preview/dragon-palace-sf"
                    className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>View Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Rusty Fork */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-blue-500/50 transition-all group">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      R5 • Diner & BBQ
                    </span>
                    <span className="text-xs text-amber-400 font-bold">★ 4.8</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors">
                    The Rusty Fork Diner
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Nashville, TN • All-day breakfast, 12-hour hickory smoked brisket, Southern comfort food.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800">
                  <Link
                    href="/preview/the-rusty-fork-diner"
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>View Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HANDYMAN */}
          {activeTab === 'handyman' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-7 flex flex-col justify-between hover:border-amber-500/50 transition-all">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    Template H1 • Classic Pro
                  </span>
                  <h3 className="font-bold text-2xl text-white">Mike's Handyman Services</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Austin, TX • Drywall repairs, fixture upgrades, trust badges, verified customer reviews, and quote funnels.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/preview/mikes-handyman-services"
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>View Handyman Website</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-7 flex flex-col justify-between hover:border-amber-500/50 transition-all">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    Template H2 • Remodeling Focus
                  </span>
                  <h3 className="font-bold text-2xl text-white">Premium Renovations</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Kitchen, bathroom, and structural renovations with gallery-first composition and estimate forms.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/preview/mikes-handyman-services"
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>View Remodeling Website</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-7 flex flex-col justify-between hover:border-amber-500/50 transition-all">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    Template H3 • 24/7 Emergency
                  </span>
                  <h3 className="font-bold text-2xl text-white">Rapid Response Repairs</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Urgent electrical, plumbing, and roof leak repairs with prominent tap-to-call buttons and dispatch hours.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/preview/mikes-handyman-services"
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>View Emergency Website</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLEANING */}
          {activeTab === 'cleaning' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-7 flex flex-col justify-between hover:border-cyan-500/50 transition-all">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                    Template C1 • Maid Service
                  </span>
                  <h3 className="font-bold text-2xl text-white">Sparkling Horizon Cleaning</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Seattle, WA • Residential recurring maid service, room checklist, customer reviews & instant estimate request.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/preview/sparkling-horizon-cleaning"
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>View Cleaning Website</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-7 flex flex-col justify-between hover:border-cyan-500/50 transition-all">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                    Template C3 • Commercial Janitorial
                  </span>
                  <h3 className="font-bold text-2xl text-white">Corporate Facility Cleans</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    B2B office contracts, medical facility sanitization, corporate compliance badges, and proposal requests.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/preview/sparkling-horizon-cleaning"
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>View Commercial Website</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-7 flex flex-col justify-between hover:border-cyan-500/50 transition-all">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                    Template C4 • Luxury Estate
                  </span>
                  <h3 className="font-bold text-2xl text-white">Luxury Home Care</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    White-glove residential cleaning, deep sanitization, elegant serif typography, and custom quote flows.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/preview/sparkling-horizon-cleaning"
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>View Luxury Website</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. OUR AGENCY PROCESS */}
      <section id="process" className="py-20 px-4 bg-slate-900/60 border-t border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              The BuyerRadar Advantage
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">How We Launch Your Website</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              No endless Zoom meetings, no 3-month delays. We engineer, deploy, and manage your website with zero friction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 relative">
              <span className="text-4xl font-black text-slate-800 font-mono">01</span>
              <h3 className="font-bold text-lg text-white">Business Ingestion</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We pull your verified Google reviews, service list, opening hours, and location data into our design system.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 relative">
              <span className="text-4xl font-black text-slate-800 font-mono">02</span>
              <h3 className="font-bold text-lg text-white">Niche Architecture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We select from our 15 conversion-tested layouts, pairing the exact fonts, colors, and CTA buttons your customers respond to.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 relative">
              <span className="text-4xl font-black text-emerald-500/40 font-mono">03</span>
              <h3 className="font-bold text-lg text-white">Live 7-Day Preview</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                You receive a private live link to test on your phone. See every page, test the booking buttons, and request any edits.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 relative">
              <span className="text-4xl font-black text-emerald-400 font-mono">04</span>
              <h3 className="font-bold text-lg text-white">Launch & Grow</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We connect your custom domain, set up fast cloud hosting and SSL, and provide you with a visual editor dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ALL 15 DESIGN FRAMEWORKS */}
      <section className="py-20 px-4 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Agency Design Library
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">15 Production-Grade Frameworks</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Customized visual hierarchies, section ordering, and conversion triggers for every local business category.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templatesList.map((tpl) => (
              <div
                key={tpl.id}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all space-y-2.5"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-white bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                    {tpl.id}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    {tpl.badge}
                  </span>
                </div>
                <h4 className="font-bold text-white text-base">{tpl.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{tpl.style}</p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
                  Target: <span className="text-slate-300 font-medium">{tpl.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PRICING & RETAINER PLANS */}
      <section id="pricing" className="py-20 px-4 bg-slate-900 border-t border-slate-800 scroll-mt-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Transparent Agency Retainers
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Simple Monthly Website Plans</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              No \$5,000 upfront design bills. Everything is included in one manageable monthly subscription.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Starter Presence</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">$79</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-400">Perfect for solo contractors, cleaners, and local trades needing a professional standalone web presence.</p>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Full 5-page responsive website</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Fast cloud hosting & SSL certificate</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Client edit portal & visual editor</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Custom domain connection</li>
                </ul>
              </div>
              <a
                href="#instant-preview"
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center transition-colors block"
              >
                Start with Starter
              </a>
            </div>

            {/* Pro - Featured */}
            <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-3xl border-2 border-emerald-500 p-8 flex flex-col justify-between space-y-6 shadow-2xl shadow-emerald-950/60 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md">
                Agency Recommended
              </span>
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Growth Engine Plan</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white">$99</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-400">Designed for restaurants, busy contractors, and commercial cleaners ready to scale local revenue.</p>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Everything in Starter</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Interactive Menu / Services CMS</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Table Reservations & Quote Estimator</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Online Order & Delivery integrations</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Monthly copy & photo updates by our team</li>
                </ul>
              </div>
              <a
                href="#instant-preview"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 text-slate-950 font-black text-xs text-center transition-all shadow-lg shadow-emerald-500/25 block"
              >
                Claim Free 7-Day Preview
              </a>
            </div>

            {/* Elite */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Market Leader Plan</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">$149</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-400">Full marketing machine with instant SMS/Email lead routing, blog CMS, and priority maintenance.</p>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Everything in Growth</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Instant Lead SMS/Email Delivery</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Blog CMS & Content Publishing</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Priority 24/7 dedicated agency support</li>
                </ul>
              </div>
              <a
                href="#instant-preview"
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center transition-colors block"
              >
                Choose Market Leader
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. AGENCY FAQ */}
      <section id="faq" className="py-20 px-4 bg-slate-950 border-t border-slate-800 scroll-mt-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Everything You Need to Know</h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-base text-white">How does the 7-Day Free Preview work?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When we build your website, you receive a private live link. The 7-day timer only begins when you visit the link for the very first time. You can test all pages, share it with your staff, and request changes. If you love it, subscribe to keep it active; if not, you owe nothing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-base text-white">Can I connect my own custom domain (e.g. mybusiness.com)?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yes! Once your subscription is active, you can connect your existing domain or connect a new one with our automated DNS records. We handle the SSL security certificates and hosting automatically.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-base text-white">Can I edit my own website after launch?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yes. Every client gets access to our private Client Portal where you can edit text, update menu items and prices, add project photos, and post blog updates directly from your phone or computer.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-base text-white">Is there a long-term contract?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No contracts. Our plans are month-to-month and you can cancel anytime with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-slate-950 text-slate-500 py-12 px-4 text-xs text-center border-t border-slate-800">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex justify-center items-center gap-6 font-semibold text-slate-400">
            <Link href="/admin" className="hover:text-emerald-400 transition-colors">Admin Portal</Link>
            <a href="#services" className="hover:text-emerald-400 transition-colors">Specialties</a>
            <a href="#portfolio" className="hover:text-emerald-400 transition-colors">Portfolio</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
          </div>
          <p className="text-slate-400 font-bold text-sm">BuyerRadar • Digital Growth Agency for Local Businesses</p>
          <p>© {new Date().getFullYear()} BuyerRadar (buyerradar.app). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


