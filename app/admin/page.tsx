'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  NormalizedBusiness,
  PreviewData,
  Industry,
  PlanType,
} from '@/lib/types';
import { TEMPLATE_REGISTRY } from '@/lib/template-recommender';
import {
  Users,
  Eye,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Globe,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  RefreshCw,
  Plus,
  Upload,
  Search,
  Filter,
  Sliders,
  Send,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  ChevronRight,
  Lock,
} from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [items, setItems] = useState<{ business: NormalizedBusiness; preview: PreviewData; domain?: any }[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'businesses' | 'import' | 'outreach' | 'feedback' | 'leads'>('businesses');

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Copy indicator
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Outreach modal lead
  const [outreachLead, setOutreachLead] = useState<{ business: NormalizedBusiness; preview: PreviewData } | null>(null);

  // Manual & Import Form
  const [importType, setImportType] = useState<'manual' | 'csv' | 'json'>('manual');
  const [newBiz, setNewBiz] = useState({
    name: '',
    industry: 'handyman' as Industry,
    category: '',
    description: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    address: '',
    templateOverride: '',
  });
  const [csvContent, setCsvContent] = useState('');
  const [jsonContent, setJsonContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [resBiz, resFb, resLd] = await Promise.all([
        fetch('/api/admin/businesses'),
        fetch('/api/feedback'),
        fetch('/api/leads'),
      ]);
      const dataBiz = await resBiz.json();
      const dataFb = await resFb.json();
      const dataLd = await resLd.json();

      setItems(dataBiz.items || []);
      setStats(dataBiz.stats || null);
      setFeedbacks(dataFb.feedbacks || []);
      setLeads(dataLd.leads || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTemplateChange = async (businessId: string, newTemplateId: string) => {
    try {
      await fetch('/api/admin/businesses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId, templateId: newTemplateId }),
      });
      fetchDashboardData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleStatusChange = async (businessId: string, previewStatus: string) => {
    try {
      await fetch('/api/admin/businesses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId, previewStatus }),
      });
      fetchDashboardData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDmStatusChange = async (businessId: string, dmStatus: string) => {
    try {
      await fetch('/api/admin/businesses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId, dmStatus }),
      });
      fetchDashboardData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleFeedbackStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      fetchDashboardData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleLeadStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      fetchDashboardData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBiz.name.trim() || !newBiz.city.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBiz),
      });
      const data = await res.json();
      if (res.ok) {
        setNewBiz({
          name: '',
          industry: 'handyman',
          category: '',
          description: '',
          phone: '',
          email: '',
          city: '',
          state: '',
          address: '',
          templateOverride: '',
        });
        setActiveTab('businesses');
        fetchDashboardData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCsvImport = async () => {
    if (!csvContent.trim()) return;
    setIsSubmitting(true);
    try {
      const lines = csvContent.split('\n').filter(l => l.trim().length > 0);
      for (const line of lines) {
        const parts = line.split(',').map(p => p.trim());
        if (parts.length >= 2) {
          const [name, city, industry = 'handyman', phone = '', email = ''] = parts;
          if (name.toLowerCase() === 'name' || name.toLowerCase() === 'business') continue;
          await fetch('/api/admin/businesses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, city, industry: industry as Industry, phone, email }),
          });
        }
      }
      setCsvContent('');
      setActiveTab('businesses');
      fetchDashboardData();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredItems = items.filter(({ business, preview }) => {
    const matchesSearch =
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = industryFilter === 'ALL' || business.industry === industryFilter;
    const matchesStatus = statusFilter === 'ALL' || preview.status === statusFilter;
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base text-slate-950 block leading-tight">Admin Operations</span>
              <span className="text-[11px] text-slate-500 font-medium">Local Business Preview Engine</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchDashboardData}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Public Home
            </Link>
            <button
              onClick={() => setActiveTab('import')}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Import Lead</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Metric Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Total Leads</div>
              <div className="text-2xl font-black text-slate-950">{stats.totalLeads}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Pre-Views</div>
              <div className="text-2xl font-black text-blue-600">{stats.activePreviews}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Active Paid</div>
              <div className="text-2xl font-black text-emerald-600">{stats.activeCustomers}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Expired</div>
              <div className="text-2xl font-black text-amber-600">{stats.expiredPreviews}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Total Views</div>
              <div className="text-2xl font-black text-purple-600">{stats.totalViews}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">DMs Sent</div>
              <div className="text-2xl font-black text-slate-800">{stats.dmsSent}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Feedback</div>
              <div className="text-2xl font-black text-indigo-600">{stats.feedbackCount}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="text-xs text-slate-500 font-medium">Conversion</div>
              <div className="text-2xl font-black text-emerald-700">{stats.conversionRate}%</div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 gap-6">
          <button
            onClick={() => setActiveTab('businesses')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'businesses'
                ? 'border-slate-950 text-slate-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Leads & Previews ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'import'
                ? 'border-slate-950 text-slate-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            + Import / Create Lead
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'feedback'
                ? 'border-slate-950 text-slate-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Customer Feedback</span>
            {feedbacks.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                {feedbacks.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'leads'
                ? 'border-slate-950 text-slate-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Customer Website Inquiries</span>
            {leads.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {leads.length}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: BUSINESSES & PREVIEWS */}
        {activeTab === 'businesses' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search business, city, or slug..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-slate-950 outline-hidden bg-white"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="p-2 text-xs rounded-xl border border-slate-300 bg-white font-medium"
                >
                  <option value="ALL">All Industries</option>
                  <option value="handyman">Handyman</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="restaurant">Restaurant</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2 text-xs rounded-xl border border-slate-300 bg-white font-medium"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PREVIEW_ACTIVE">Preview Active</option>
                  <option value="ACTIVE">Active (Paid)</option>
                  <option value="EXPIRED">Expired</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Business</th>
                      <th className="py-3 px-4">Industry</th>
                      <th className="py-3 px-4">Template</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Views</th>
                      <th className="py-3 px-4">Timer / Expiry</th>
                      <th className="py-3 px-4">Plan</th>
                      <th className="py-3 px-4">Outreach DM</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredItems.map(({ business, preview }) => {
                      const isHandyman = business.industry === 'handyman';
                      const isCleaning = business.industry === 'cleaning';
                      const isRestaurant = business.industry === 'restaurant';

                      const availableTemplates = Object.keys(TEMPLATE_REGISTRY).filter(
                        k => TEMPLATE_REGISTRY[k].industry === business.industry
                      );

                      return (
                        <tr key={business.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 text-sm">{business.name}</div>
                            <div className="text-slate-500 text-[11px]">
                              {business.city}, {business.state} • {formatPhoneNumber(business.phone)}
                            </div>
                            <div className="text-[10px] text-emerald-700 font-mono mt-0.5">
                              /preview/{business.slug}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                isHandyman
                                  ? 'bg-amber-100 text-amber-900'
                                  : isCleaning
                                  ? 'bg-cyan-100 text-cyan-900'
                                  : 'bg-rose-100 text-rose-900'
                              }`}
                            >
                              {business.industry.toUpperCase()}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={business.templateId}
                              onChange={(e) => handleTemplateChange(business.id, e.target.value)}
                              className="p-1 rounded border border-slate-300 font-bold bg-white text-xs"
                            >
                              {availableTemplates.map(t => (
                                <option key={t} value={t}>
                                  {t} — {TEMPLATE_REGISTRY[t]?.name}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                                preview.status === 'ACTIVE'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : preview.status === 'EXPIRED'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {preview.status}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            {preview.viewCount || 0}
                          </td>

                          <td className="py-3.5 px-4 text-[11px]">
                            {preview.status === 'ACTIVE' ? (
                              <span className="text-emerald-700 font-bold">Active Forever</span>
                            ) : preview.firstViewedAt ? (
                              <div>
                                <span className="text-slate-500">Expires:</span>
                                <div className="font-semibold text-slate-800">
                                  {new Date(preview.previewExpiresAt!).toLocaleDateString()}
                                </div>
                              </div>
                            ) : (
                              <span className="text-slate-400 italic">Timer pending first visit</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            {preview.plan !== 'NONE' ? (
                              <span className="font-bold text-slate-900">
                                {preview.plan === 'WEBSITE_LEAD_149' ? '$149/mo' : '$79/mo'}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">Free Preview</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => setOutreachLead({ business, preview })}
                              className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[11px] flex items-center gap-1 transition-colors"
                            >
                              <Send className="w-3 h-3" />
                              <span>{preview.dmStatus === 'NOT_CONTACTED' ? 'Send DMs' : preview.dmStatus}</span>
                            </button>
                          </td>

                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            <Link
                              href={`/preview/${business.slug}`}
                              target="_blank"
                              className="p-1.5 inline-flex items-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
                              title="Open Live Preview"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>

                            <button
                              onClick={() => {
                                const url = `${window.location.origin}/preview/${business.slug}`;
                                copyToClipboard(url, `url-${business.id}`);
                              }}
                              className="p-1.5 inline-flex items-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
                              title="Copy Preview URL"
                            >
                              {copiedKey === `url-${business.id}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {preview.status !== 'ACTIVE' && (
                              <button
                                onClick={() => handleStatusChange(business.id, 'ACTIVE')}
                                className="p-1.5 inline-flex items-center rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                title="Instantly Activate"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {preview.status !== 'EXPIRED' && (
                              <button
                                onClick={() => handleStatusChange(business.id, 'EXPIRED')}
                                className="p-1.5 inline-flex items-center rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100"
                                title="Simulate Expiration"
                              >
                                <Lock className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: IMPORT / CREATE LEAD */}
        {activeTab === 'import' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-950">Add Lead & Auto-Generate Website</h2>
                <p className="text-xs text-slate-500">Provide basic lead information and let the recommendation engine do the rest.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setImportType('manual')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    importType === 'manual' ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Manual Entry
                </button>
                <button
                  onClick={() => setImportType('csv')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    importType === 'csv' ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Bulk CSV
                </button>
              </div>
            </div>

            {importType === 'manual' ? (
              <form onSubmit={handleCreateBusiness} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Business Name *</label>
                    <input
                      required
                      type="text"
                      value={newBiz.name}
                      onChange={(e) => setNewBiz({ ...newBiz, name: e.target.value })}
                      placeholder="e.g. Apex Home Works"
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-slate-950 outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Industry</label>
                    <select
                      value={newBiz.industry}
                      onChange={(e) => setNewBiz({ ...newBiz, industry: e.target.value as Industry })}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
                    >
                      <option value="handyman">Handyman Services</option>
                      <option value="cleaning">Cleaning Services</option>
                      <option value="restaurant">Restaurant / Dining</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">City *</label>
                    <input
                      required
                      type="text"
                      value={newBiz.city}
                      onChange={(e) => setNewBiz({ ...newBiz, city: e.target.value })}
                      placeholder="e.g. Austin"
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-slate-950 outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">State</label>
                    <input
                      type="text"
                      value={newBiz.state}
                      onChange={(e) => setNewBiz({ ...newBiz, state: e.target.value })}
                      placeholder="e.g. TX"
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-slate-950 outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Phone</label>
                    <input
                      type="text"
                      value={newBiz.phone}
                      onChange={(e) => setNewBiz({ ...newBiz, phone: e.target.value })}
                      placeholder="512-555-0199"
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-slate-950 outline-hidden"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Category Tag (Optional)</label>
                  <input
                    type="text"
                    value={newBiz.category}
                    onChange={(e) => setNewBiz({ ...newBiz, category: e.target.value })}
                    placeholder="e.g. Residential Repair, Fine Dining, Janitorial"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-slate-950 outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Description / Real Notes</label>
                  <textarea
                    rows={3}
                    value={newBiz.description}
                    onChange={(e) => setNewBiz({ ...newBiz, description: e.target.value })}
                    placeholder="Paste business bio or service summary from Facebook / Google..."
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-slate-950 outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{isSubmitting ? 'Generating...' : 'Auto-Select Template & Generate Preview'}</span>
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <p className="font-bold text-slate-900">Format: Name, City, Industry, Phone, Email</p>
                  <p className="text-slate-500 font-mono">
                    Lone Star Plumbing, Dallas, handyman, 214-555-0182, lonestar@example.com
                  </p>
                </div>

                <textarea
                  rows={6}
                  value={csvContent}
                  onChange={(e) => setCsvContent(e.target.value)}
                  placeholder="Paste rows here..."
                  className="w-full p-3 font-mono text-xs rounded-xl border border-slate-300 focus:border-slate-950 outline-hidden"
                />

                <button
                  onClick={handleCsvImport}
                  disabled={isSubmitting || !csvContent.trim()}
                  className="w-full py-3 rounded-xl bg-slate-950 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>{isSubmitting ? 'Importing Leads...' : 'Import CSV & Generate Previews'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CUSTOMER FEEDBACK */}
        {activeTab === 'feedback' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-950">Feedback Submitted from Previews</h2>
              <p className="text-xs text-slate-500">Owner change requests and suggestions.</p>
            </div>

            {feedbacks.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No feedback submitted yet. Preview visitors can submit feedback via the "Have Feedback?" button.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {feedbacks.map((fb) => (
                  <div key={fb.id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">
                          {items.find(i => i.business.id === fb.businessId)?.business.name || fb.businessId}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(fb.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-slate-700 text-xs max-w-2xl bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        "{fb.message}"
                      </p>
                      <div className="text-[11px] text-slate-500">
                        Submitted by: {fb.authorName} {fb.authorEmail ? `(${fb.authorEmail})` : ''}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={fb.status}
                        onChange={(e) => handleFeedbackStatus(fb.id, e.target.value)}
                        className="p-1.5 text-xs rounded-lg border border-slate-300 font-bold bg-white"
                      >
                        <option value="NEW">NEW</option>
                        <option value="REVIEWED">REVIEWED</option>
                        <option value="CHANGE_REQUESTED">CHANGE REQUESTED</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CUSTOMER WEBSITE INQUIRIES ($149 LEAD PIPELINE) */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-950">Customer Inquiries Captured from Websites</h2>
              <p className="text-xs text-slate-500">The $149 Lead Qualification System pipeline.</p>
            </div>

            {leads.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No customer inquiries submitted yet. Inquiries will appear here when visitors fill out the estimate/reservation forms on client websites.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {leads.map((ld) => (
                  <div key={ld.id} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{ld.customerName}</span>
                        <span className="text-slate-400 text-xs">• {formatPhoneNumber(ld.customerPhone)}</span>
                        <span className="text-slate-400 text-xs">• {ld.customerEmail}</span>
                      </div>
                      <div className="text-xs text-slate-600 font-medium">
                        Target Business:{' '}
                        <strong>{items.find(i => i.business.id === ld.businessId)?.business.name || ld.businessId}</strong>
                        {ld.serviceRequested && ` (Request: ${ld.serviceRequested})`}
                      </div>
                      {/* Qualification Answers */}
                      {ld.answers && Object.keys(ld.answers).length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {Object.entries(ld.answers).map(([k, v]) => (
                            <span key={k} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                              <strong>{k}:</strong> {String(v)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={ld.status}
                        onChange={(e) => handleLeadStatus(ld.id, e.target.value)}
                        className={`p-1.5 text-xs rounded-lg border font-bold ${
                          ld.status === 'WON'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : ld.status === 'QUALIFIED'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-white text-slate-800 border-slate-300'
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="WON">WON</option>
                        <option value="LOST">LOST</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* OUTREACH ASSISTANT MODAL (FACEBOOK 3-STEP DM WORKFLOW) */}
      {outreachLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setOutreachLead(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              ✕
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Facebook Outreach Assistant
              </span>
              <h2 className="text-xl font-black text-slate-950 mt-1">{outreachLead.business.name}</h2>
              <p className="text-xs text-slate-500">
                Personalized 3-step outreach sequence designed to get permission before sending the preview.
              </p>
            </div>

            <div className="space-y-4">
              {/* DM 1 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">Step 1: Initial DM (Verification)</span>
                  <button
                    onClick={() => {
                      const msg = `Hey! 👋 Are you the owner of ${outreachLead.business.name}?`;
                      copyToClipboard(msg, 'dm1');
                      handleDmStatusChange(outreachLead.business.id, 'DM1_SENT');
                    }}
                    className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold rounded-lg flex items-center gap-1 shadow-2xs"
                  >
                    {copiedKey === 'dm1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy DM 1</span>
                  </button>
                </div>
                <p className="text-xs font-medium text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200">
                  Hey! 👋 Are you the owner of {outreachLead.business.name}?
                </p>
              </div>

              {/* DM 2 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">Step 2: After Response (Request Permission)</span>
                  <button
                    onClick={() => {
                      const msg = `Nice 👍 I had something I wanted to run by you about the business. Mind if I send it over?`;
                      copyToClipboard(msg, 'dm2');
                      handleDmStatusChange(outreachLead.business.id, 'DM2_SENT');
                    }}
                    className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold rounded-lg flex items-center gap-1 shadow-2xs"
                  >
                    {copiedKey === 'dm2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy DM 2</span>
                  </button>
                </div>
                <p className="text-xs font-medium text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200">
                  Nice 👍 I had something I wanted to run by you about the business. Mind if I send it over?
                </p>
              </div>

              {/* DM 3 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">Step 3: After Permission (Send Preview Link)</span>
                  <button
                    onClick={() => {
                      const previewLink = `${window.location.origin}/preview/${outreachLead.business.slug}`;
                      const msg = `Awesome 👍 I put this together for ${outreachLead.business.name} based on your business information. I'd really like your feedback on it:\n\n${previewLink}\n\nWhat do you think?`;
                      copyToClipboard(msg, 'dm3');
                      handleDmStatusChange(outreachLead.business.id, 'DM3_SENT');
                    }}
                    className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold rounded-lg flex items-center gap-1 shadow-2xs"
                  >
                    {copiedKey === 'dm3' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy DM 3</span>
                  </button>
                </div>
                <p className="text-xs font-medium text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200 whitespace-pre-line">
                  Awesome 👍 I put this together for {outreachLead.business.name} based on your business information. I'd really like your feedback on it:{'\n\n'}
                  <span className="text-emerald-700 underline font-mono">
                    {typeof window !== 'undefined' ? `${window.location.origin}/preview/${outreachLead.business.slug}` : `/preview/${outreachLead.business.slug}`}
                  </span>{'\n\n'}
                  What do you think?
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-between gap-3">
              <a
                href={outreachLead.business.facebookUrl || `https://facebook.com/search/top?q=${encodeURIComponent(outreachLead.business.name)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Facebook Profile</span>
              </a>

              <Link
                href={`/preview/${outreachLead.business.slug}`}
                target="_blank"
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
              >
                Test Preview
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
