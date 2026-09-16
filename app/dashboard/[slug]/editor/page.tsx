'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  StructuredWebsite,
  NormalizedBusiness,
  PreviewData,
  WebsiteSection,
  SectionType,
} from '@/lib/types';
import { TEMPLATE_REGISTRY } from '@/lib/template-recommender';
import SectionRenderer from '@/components/sections/SectionRenderer';
import SiteHeader from '@/components/sections/SiteHeader';
import {
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  Plus,
  Save,
  Globe,
  Smartphone,
  Tablet,
  Laptop,
  Check,
  Undo2,
  ChevronLeft,
  Settings,
  Sparkles,
  Palette,
  Layout,
  History,
  X,
  RefreshCw,
} from 'lucide-react';

export default function VisualWebsiteEditorPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [website, setWebsite] = useState<StructuredWebsite | null>(null);
  const [business, setBusiness] = useState<NormalizedBusiness | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(true);

  // Editor states
  const [activeTab, setActiveTab] = useState<'sections' | 'theme' | 'template' | 'revisions'>('sections');
  const [editingSection, setEditingSection] = useState<WebsiteSection | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'dirty'>('saved');
  const [revisionLabel, setRevisionLabel] = useState('');

  const loadWebsite = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/websites/${slug}`);
      const data = await res.json();
      if (data.success) {
        setWebsite(data.website);
        setBusiness(data.business);
        setPreview(data.preview);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) loadWebsite();
  }, [slug]);

  // Section operations
  const handleMoveSection = async (index: number, direction: 'up' | 'down') => {
    if (!website) return;
    const page = website.pages[0];
    const sections = [...page.sections];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sections.length) return;

    const [moved] = sections.splice(index, 1);
    sections.splice(targetIdx, 0, moved);

    setSaveStatus('saving');
    try {
      const res = await fetch(`/api/websites/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reorder_sections',
          sectionIds: sections.map(s => s.id),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setWebsite(data.website);
        setSaveStatus('saved');
      }
    } catch (e) {
      console.error(e);
      setSaveStatus('dirty');
    }
  };

  const handleToggleVisibility = async (sectionId: string) => {
    setSaveStatus('saving');
    try {
      const res = await fetch(`/api/websites/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle_visibility',
          sectionId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setWebsite(data.website);
        setSaveStatus('saved');
      }
    } catch (e) {
      console.error(e);
      setSaveStatus('dirty');
    }
  };

  const handleSwitchVariant = async (sectionId: string, newVariant: string) => {
    setSaveStatus('saving');
    try {
      const res = await fetch(`/api/websites/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'switch_variant',
          sectionId,
          newVariant,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setWebsite(data.website);
        setSaveStatus('saved');
      }
    } catch (e) {
      console.error(e);
      setSaveStatus('dirty');
    }
  };

  const handleSaveSectionContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;

    setSaveStatus('saving');
    try {
      const res = await fetch(`/api/websites/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_section',
          sectionId: editingSection.id,
          content: editingSection.content,
          settings: editingSection.settings,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setWebsite(data.website);
        setEditingSection(null);
        setSaveStatus('saved');
      }
    } catch (e) {
      console.error(e);
      setSaveStatus('dirty');
    }
  };

  const handleUpdateTheme = async (updates: any) => {
    if (!website) return;
    const newTheme = { ...website.theme, ...updates };
    setSaveStatus('saving');
    try {
      const res = await fetch(`/api/websites/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_theme',
          theme: newTheme,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setWebsite(data.website);
        setSaveStatus('saved');
      }
    } catch (e) {
      console.error(e);
      setSaveStatus('dirty');
    }
  };

  const handleSwitchTemplate = async (templateId: string) => {
    setSaveStatus('saving');
    try {
      const res = await fetch(`/api/websites/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'switch_template',
          templateId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setWebsite(data.website);
        setBusiness(data.business);
        setSaveStatus('saved');
      }
    } catch (e) {
      console.error(e);
      setSaveStatus('dirty');
    }
  };

  const handleSaveRevision = async () => {
    if (!revisionLabel.trim()) return;
    try {
      const res = await fetch(`/api/websites/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_revision',
          label: revisionLabel,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setWebsite(data.website);
        setRevisionLabel('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRestoreRevision = async (revisionId: string) => {
    try {
      const res = await fetch(`/api/websites/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'restore_revision',
          revisionId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setWebsite(data.website);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePublish = async () => {
    setSaveStatus('saving');
    try {
      const res = await fetch(`/api/websites/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish' }),
      });
      const data = await res.json();
      if (data.success) {
        setWebsite(data.website);
        setSaveStatus('saved');
        alert('🎉 Your website changes have been published to your live site!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading || !website || !business) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
          <span className="font-semibold text-sm">Opening Website Editor...</span>
        </div>
      </div>
    );
  }

  const sections = website.pages[0]?.sections || [];
  const variantOptions: Record<SectionType, string[]> = {
    hero: ['HeroA', 'HeroB', 'HeroC', 'HeroD', 'HeroE'],
    services: ['ServicesA', 'ServicesB', 'ServicesC', 'ServicesD'],
    about: ['AboutA', 'AboutB', 'AboutC'],
    gallery: ['GalleryA', 'GalleryB', 'GalleryC'],
    reviews: ['ReviewsA', 'ReviewsB', 'ReviewsC'],
    faq: ['FAQA', 'FAQB'],
    cta: ['CTAA', 'CTAB', 'CTAC'],
    contact: ['ContactA', 'ContactB'],
    menu: ['MenuA', 'MenuB', 'MenuC'],
    reservations: ['ReservationsA'],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased overflow-hidden h-screen">
      {/* Top Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/${slug}`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <span className="text-slate-600">|</span>
          <div>
            <div className="font-bold text-sm text-white flex items-center gap-2">
              <span>{business.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                Visual Editor
              </span>
            </div>
          </div>
        </div>

        {/* Center: Device Switcher */}
        <div className="hidden md:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
              viewMode === 'desktop' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
            title="Desktop View (100%)"
          >
            <Laptop className="w-4 h-4" />
            <span className="hidden lg:inline">Desktop</span>
          </button>
          <button
            onClick={() => setViewMode('tablet')}
            className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
              viewMode === 'tablet' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden lg:inline">Tablet</span>
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
              viewMode === 'mobile' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden lg:inline">Mobile</span>
          </button>
        </div>

        {/* Right: Autosave status & Publish */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
            {saveStatus === 'saving' ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Autosaved</span>
              </>
            )}
          </span>

          <Link
            href={`/preview/${slug}`}
            target="_blank"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <span>Live Preview</span>
            <Globe className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handlePublish}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Publish Site</span>
          </button>
        </div>
      </header>

      {/* Main Split Interface */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL: Editor Controls */}
        <div className="w-80 lg:w-96 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 overflow-hidden">
          {/* Editor Tabs */}
          <div className="flex border-b border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab('sections')}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                activeTab === 'sections'
                  ? 'border-emerald-500 text-white bg-slate-800/40'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Sections ({sections.length})
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                activeTab === 'theme'
                  ? 'border-emerald-500 text-white bg-slate-800/40'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Theme & Logo
            </button>
            <button
              onClick={() => setActiveTab('template')}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                activeTab === 'template'
                  ? 'border-emerald-500 text-white bg-slate-800/40'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Template
            </button>
            <button
              onClick={() => setActiveTab('revisions')}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                activeTab === 'revisions'
                  ? 'border-emerald-500 text-white bg-slate-800/40'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Revisions
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* 1. SECTIONS OUTLINE TAB */}
            {activeTab === 'sections' && (
              <div className="space-y-3">
                <div className="text-[11px] text-slate-400">
                  Reorder, toggle visibility, swap layout variants, or edit content.
                </div>

                <div className="space-y-2">
                  {sections.map((sec, idx) => (
                    <div
                      key={sec.id}
                      className={`p-3 rounded-xl border transition-all ${
                        sec.visible
                          ? 'bg-slate-800/70 border-slate-700'
                          : 'bg-slate-950/60 border-slate-800 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-slate-700 text-slate-300 text-[10px] font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold capitalize text-white">{sec.type}</span>
                        </div>

                        {/* Order and visibility controls */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMoveSection(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveSection(idx, 'down')}
                            disabled={idx === sections.length - 1}
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleToggleVisibility(sec.id)}
                            className="p-1 text-slate-400 hover:text-white"
                            title={sec.visible ? 'Hide section' : 'Show section'}
                          >
                            {sec.visible ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
                          </button>
                        </div>
                      </div>

                      {/* Variant Switcher & Edit Button */}
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-700/60">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <span>Variant:</span>
                          <select
                            value={sec.variant}
                            onChange={(e) => handleSwitchVariant(sec.id, e.target.value)}
                            className="p-1 text-[10px] font-bold rounded bg-slate-900 border border-slate-700 text-slate-200 outline-hidden"
                          >
                            {variantOptions[sec.type]?.map(v => (
                              <option key={v} value={v}>{v}</option>
                            ))}
                          </select>
                        </div>

                        <button
                          onClick={() => setEditingSection({ ...sec })}
                          className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-bold flex items-center gap-1 transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit Text/Img</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. THEME & LOGO TAB */}
            {activeTab === 'theme' && (
              <div className="space-y-4 text-xs">
                <div className="space-y-2">
                  <label className="font-bold text-slate-300">Primary Brand Accent Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={website.theme.primaryColor}
                      onChange={(e) => handleUpdateTheme({ primaryColor: e.target.value })}
                      className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <span className="font-mono text-slate-300 font-bold">{website.theme.primaryColor}</span>
                  </div>
                  {/* Quick Color Presets */}
                  <div className="flex gap-2 pt-1">
                    {['#059669', '#2563eb', '#d97706', '#dc2626', '#0891b2', '#78716c'].map(col => (
                      <button
                        key={col}
                        onClick={() => handleUpdateTheme({ primaryColor: col })}
                        style={{ backgroundColor: col }}
                        className="w-6 h-6 rounded-full border-2 border-slate-800 shadow-xs"
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <label className="font-bold text-slate-300">Typography Pairing</label>
                  <select
                    value={website.theme.fontFamily}
                    onChange={(e) => handleUpdateTheme({ fontFamily: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium"
                  >
                    <option value="sans">Modern Sans (Clean & High Readability)</option>
                    <option value="serif">Editorial Serif (Luxury & Artisan)</option>
                  </select>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <label className="font-bold text-slate-300">Button Style</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['rounded', 'pill', 'square'].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateTheme({ buttonStyle: st })}
                        className={`py-2 px-1 text-center font-bold capitalize rounded-lg border ${
                          website.theme.buttonStyle === st
                            ? 'border-emerald-500 bg-emerald-950/40 text-white'
                            : 'border-slate-800 bg-slate-800/40 text-slate-400'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Logo Generator */}
                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <label className="font-bold text-slate-300">Text Logo Generator</label>
                  <input
                    type="text"
                    value={website.theme.textLogo.line1}
                    onChange={(e) =>
                      handleUpdateTheme({
                        textLogo: { ...website.theme.textLogo, line1: e.target.value },
                      })
                    }
                    placeholder="Line 1: Business Name"
                    className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                  <input
                    type="text"
                    value={website.theme.textLogo.line2 || ''}
                    onChange={(e) =>
                      handleUpdateTheme({
                        textLogo: { ...website.theme.textLogo, line2: e.target.value },
                      })
                    }
                    placeholder="Line 2: Subtitle / Tagline"
                    className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-[11px]"
                  />
                </div>
              </div>
            )}

            {/* 3. TEMPLATE SWITCHER TAB */}
            {activeTab === 'template' && (
              <div className="space-y-3 text-xs">
                <div className="text-[11px] text-slate-400">
                  Switch template layouts while <strong>preserving all your custom services, texts, and photos</strong>.
                </div>

                <div className="space-y-2">
                  {Object.values(TEMPLATE_REGISTRY)
                    .filter(t => t.industry === business.industry)
                    .map((t) => (
                      <div
                        key={t.id}
                        onClick={() => handleSwitchTemplate(t.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          website.templateId === t.id
                            ? 'border-emerald-500 bg-emerald-950/40 text-white shadow-xs'
                            : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm">{t.name}</span>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800">
                            {t.id}
                          </span>
                        </div>
                        <p className="text-[11px] opacity-75">{t.style}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 4. REVISIONS TAB */}
            {activeTab === 'revisions' && (
              <div className="space-y-3 text-xs">
                <div className="space-y-2">
                  <label className="font-bold text-slate-300">Save Snapshot Revision</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={revisionLabel}
                      onChange={(e) => setRevisionLabel(e.target.value)}
                      placeholder="e.g. Before big spring sale"
                      className="flex-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                    />
                    <button
                      onClick={handleSaveRevision}
                      className="px-3 py-2 bg-emerald-600 rounded-lg text-white font-bold"
                    >
                      Save
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <div className="text-[11px] text-slate-400 font-bold">Past Revisions:</div>
                  {website.revisions?.length === 0 ? (
                    <div className="text-slate-500 text-[11px]">No saved snapshots yet.</div>
                  ) : (
                    website.revisions.map((rev) => (
                      <div key={rev.id} className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-white text-xs">{rev.label}</div>
                          <div className="text-[10px] text-slate-400">{new Date(rev.timestamp).toLocaleTimeString()}</div>
                        </div>
                        <button
                          onClick={() => handleRestoreRevision(rev.id)}
                          className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-bold flex items-center gap-1"
                        >
                          <Undo2 className="w-3 h-3" />
                          <span>Restore</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Live Interactive Preview Container */}
        <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-4 overflow-y-auto">
          <div
            className={`h-full bg-white rounded-2xl shadow-2xl overflow-y-auto transition-all duration-300 border-4 border-slate-800 ${
              viewMode === 'mobile'
                ? 'w-[375px] max-w-[375px]'
                : viewMode === 'tablet'
                ? 'w-[768px] max-w-[768px]'
                : 'w-full max-w-6xl'
            }`}
          >
            {/* Render Public Header */}
            <SiteHeader
              business={business}
              theme={website.theme}
              navigation={website.navigation}
              currentSlug={business.slug}
            />

            {/* Render All Enabled Sections in Order */}
            <main>
              {sections.map((sec) => (
                <SectionRenderer
                  key={sec.id}
                  section={sec}
                  business={business}
                  theme={website.theme}
                />
              ))}
            </main>
          </div>
        </div>
      </div>

      {/* SECTION EDIT MODAL / DRAWER */}
      {editingSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 text-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-800 relative max-h-[90vh] overflow-y-auto space-y-4">
            <button
              onClick={() => setEditingSection(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                Edit Section Content
              </span>
              <h2 className="text-xl font-black mt-1 capitalize">{editingSection.type} Section ({editingSection.variant})</h2>
            </div>

            <form onSubmit={handleSaveSectionContent} className="space-y-4 text-xs">
              {/* Common Content Fields */}
              {editingSection.content.headline !== undefined && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Headline</label>
                  <input
                    type="text"
                    value={editingSection.content.headline || ''}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, headline: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-hidden"
                  />
                </div>
              )}

              {editingSection.content.subheadline !== undefined && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Subheadline / Supporting Text</label>
                  <textarea
                    rows={3}
                    value={editingSection.content.subheadline || ''}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, subheadline: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-hidden resize-none"
                  />
                </div>
              )}

              {editingSection.content.heading !== undefined && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Section Heading</label>
                  <input
                    type="text"
                    value={editingSection.content.heading || ''}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, heading: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-hidden"
                  />
                </div>
              )}

              {editingSection.content.primaryCta !== undefined && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Primary Button Text</label>
                    <input
                      type="text"
                      value={editingSection.content.primaryCta || ''}
                      onChange={(e) =>
                        setEditingSection({
                          ...editingSection,
                          content: { ...editingSection.content, primaryCta: e.target.value },
                        })
                      }
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-hidden"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Secondary Button Text</label>
                    <input
                      type="text"
                      value={editingSection.content.secondaryCta || ''}
                      onChange={(e) =>
                        setEditingSection({
                          ...editingSection,
                          content: { ...editingSection.content, secondaryCta: e.target.value },
                        })
                      }
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-hidden"
                    />
                  </div>
                </div>
              )}

              {editingSection.content.image !== undefined && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Section Image URL</label>
                  <input
                    type="text"
                    value={editingSection.content.image || ''}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, image: e.target.value },
                      })
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-hidden"
                  />
                  {editingSection.content.image && (
                    <div className="mt-2 w-24 h-24 rounded-lg overflow-hidden border border-slate-700">
                      <img src={editingSection.content.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}

              {editingSection.content.story !== undefined && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">About Story / Company Mission</label>
                  <textarea
                    rows={4}
                    value={editingSection.content.story || ''}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, story: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-hidden resize-none"
                  />
                </div>
              )}

              {editingSection.content.buttonText !== undefined && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Call-to-Action Button Label</label>
                  <input
                    type="text"
                    value={editingSection.content.buttonText || ''}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, buttonText: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-hidden"
                  />
                </div>
              )}

              {editingSection.content.badge !== undefined && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Highlight Badge Text</label>
                  <input
                    type="text"
                    value={editingSection.content.badge || ''}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, badge: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-hidden"
                  />
                </div>
              )}

              {editingSection.content.phone !== undefined && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Phone Number</label>
                    <input
                      type="text"
                      value={editingSection.content.phone || ''}
                      onChange={(e) =>
                        setEditingSection({
                          ...editingSection,
                          content: { ...editingSection.content, phone: e.target.value },
                        })
                      }
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-hidden"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Email Address</label>
                    <input
                      type="email"
                      value={editingSection.content.email || ''}
                      onChange={(e) =>
                        setEditingSection({
                          ...editingSection,
                          content: { ...editingSection.content, email: e.target.value },
                        })
                      }
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-hidden"
                    />
                  </div>
                </div>
              )}

              {editingSection.content.address !== undefined && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Street Address</label>
                  <input
                    type="text"
                    value={editingSection.content.address || ''}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, address: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-hidden"
                  />
                </div>
              )}

              {/* Settings: Background Style */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <label className="font-bold text-slate-300">Background Style</label>
                <div className="grid grid-cols-4 gap-2">
                  {['white', 'slate', 'dark', 'brand'].map((bg) => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() =>
                        setEditingSection({
                          ...editingSection,
                          settings: { ...editingSection.settings, backgroundStyle: bg as any },
                        })
                      }
                      className={`p-2 rounded-lg text-center font-bold capitalize border ${
                        editingSection.settings.backgroundStyle === bg
                          ? 'border-emerald-500 bg-emerald-950/40 text-white'
                          : 'border-slate-800 bg-slate-800/40 text-slate-400'
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Save Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
