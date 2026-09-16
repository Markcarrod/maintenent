'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  NormalizedBusiness,
  StructuredWebsite,
  PreviewData,
  BlogPost,
  MediaItem,
  ServiceItem,
  MenuCategory,
  MenuItemStructured,
} from '@/lib/types';
import {
  Layout,
  Globe,
  Edit3,
  Image as ImageIcon,
  FileText,
  Star,
  HelpCircle,
  Clock,
  MapPin,
  Palette,
  Shield,
  Search,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle,
  Copy,
  Check,
  Upload,
  ArrowRight,
  Menu as MenuIcon,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  ChevronDown,
  ChevronUp,
  Instagram,
  Globe2,
  DollarSign,
} from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function CustomerDashboardPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [business, setBusiness] = useState<NormalizedBusiness | null>(null);
  const [website, setWebsite] = useState<StructuredWebsite | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Active section tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'about' | 'services' | 'contact' | 'gallery' | 'menu' | 'menu_editor' | 'restaurant' | 'testimonials' | 'faqs' | 'blog' | 'media' | 'theme' | 'domain'
  >('overview');

  // Copy helper
  const [copied, setCopied] = useState(false);

  // New Service / New Post / New Media modal states
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');

  // About edit state
  const [aboutHeading, setAboutHeading] = useState('');
  const [aboutStory, setAboutStory] = useState('');
  const [aboutTagline, setAboutTagline] = useState('');

  // Contact edit state
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [contactCity, setContactCity] = useState('');
  const [contactState, setContactState] = useState('');
  const [contactZip, setContactZip] = useState('');
  const [contactServiceAreas, setContactServiceAreas] = useState('');
  const [contactHours, setContactHours] = useState<Record<string, string>>({});

  // Restaurant info state
  const [restCuisine, setRestCuisine] = useState('');
  const [restOrderUrl, setRestOrderUrl] = useState('');
  const [restReservationUrl, setRestReservationUrl] = useState('');
  const [restInstagramUrl, setRestInstagramUrl] = useState('');
  const [restCurrency, setRestCurrency] = useState<'USD' | 'GBP' | 'EUR'>('USD');

  // Menu editor state
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newItemFields, setNewItemFields] = useState<Record<string, { name: string; desc: string; price: string; tags: string }>>({});

  const [savingSettings, setSavingSettings] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);


  const loadData = async () => {
    try {
      setLoading(true);
      const [resWeb, resBlog, resMedia] = await Promise.all([
        fetch(`/api/websites/${slug}`),
        fetch(`/api/websites/${slug}/blog`),
        fetch(`/api/websites/${slug}/media`),
      ]);
      const dataWeb = await resWeb.json();
      const dataBlog = await resBlog.json();
      const dataMedia = await resMedia.json();

      if (dataWeb.success) {
        const b = dataWeb.business;
        const site = dataWeb.website;
        setBusiness(b);
        setWebsite(site);
        setPreview(dataWeb.preview);

        const aboutSec = site?.pages?.[0]?.sections?.find((s: any) => s.type === 'about');
        setAboutHeading(aboutSec?.content?.heading || `About ${b.name}`);
        setAboutStory(aboutSec?.content?.story || b.description || '');
        setAboutTagline(b.tagline || '');

        setContactPhone(b.phone || '');
        setContactEmail(b.email || '');
        setContactAddress(b.address || '');
        setContactCity(b.city || '');
        setContactState(b.state || '');
        setContactZip(b.zip || '');
        setContactServiceAreas((b.serviceAreas || []).join(', '));
        setContactHours(b.hours || {
          'Monday - Friday': '8:00 AM - 6:00 PM',
          'Saturday': '9:00 AM - 3:00 PM',
          'Sunday': 'Closed',
        });

        // Restaurant fields
        if (b.industry === 'restaurant') {
          setRestCuisine(b.cuisine || '');
          setRestOrderUrl(b.orderUrl || '');
          setRestReservationUrl(b.reservationUrl || '');
          setRestInstagramUrl(b.instagramUrl || '');
          setRestCurrency((b.currency as 'USD' | 'GBP' | 'EUR') || 'USD');
          setMenuCategories(b.menuCategories || []);
        }
      }
      setPosts(dataBlog.posts || []);
      setMedia(dataMedia.media || []);

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) loadData();
  }, [slug]);

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setStatusMessage(null);
    try {
      await fetch(`/api/websites/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_business',
          updates: {
            description: aboutStory,
            tagline: aboutTagline,
          },
        }),
      });

      const aboutSec = website?.pages[0]?.sections.find((s) => s.type === 'about');
      if (aboutSec) {
        await fetch(`/api/websites/${slug}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'update_section',
            sectionId: aboutSec.id,
            content: {
              ...aboutSec.content,
              heading: aboutHeading,
              story: aboutStory,
            },
          }),
        });
      }

      setStatusMessage('About story & mission saved successfully!');
      setTimeout(() => setStatusMessage(null), 3500);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setStatusMessage(null);
    try {
      const areas = contactServiceAreas.split(',').map((s) => s.trim()).filter(Boolean);
      await fetch(`/api/websites/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_business',
          updates: {
            phone: contactPhone,
            email: contactEmail,
            address: contactAddress,
            city: contactCity,
            state: contactState,
            zip: contactZip,
            serviceAreas: areas,
            hours: contactHours,
          },
        }),
      });

      setStatusMessage('Contact information & schedule saved successfully!');
      setTimeout(() => setStatusMessage(null), 3500);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setSavingSettings(false);
    }
  };

  const copyUrl = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business) return;
    setSavingSettings(true);
    setStatusMessage(null);
    try {
      await fetch(`/api/websites/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_business',
          updates: {
            cuisine: restCuisine,
            orderUrl: restOrderUrl,
            reservationUrl: restReservationUrl,
            instagramUrl: restInstagramUrl,
            currency: restCurrency,
          },
        }),
      });
      setStatusMessage('Restaurant info saved successfully!');
      setTimeout(() => setStatusMessage(null), 3000);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSaveMenu = async () => {
    if (!business) return;
    setSavingSettings(true);
    setStatusMessage(null);
    try {
      await fetch(`/api/websites/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_menu', menuCategories }),
      });
      setStatusMessage('Menu saved successfully!');
      setTimeout(() => setStatusMessage(null), 3000);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setSavingSettings(false);
    }
  };

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  };

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    const newCat: MenuCategory = {
      id: `cat-${Date.now()}`,
      name: newCategoryName.trim(),
      description: '',
      items: [],
    };
    setMenuCategories((prev) => [...prev, newCat]);
    setNewCategoryName('');
    setExpandedCategories((prev) => new Set([...Array.from(prev), newCat.id]));
  };

  const deleteCategory = (catId: string) => {
    setMenuCategories((prev) => prev.filter((c) => c.id !== catId));
  };

  const addItemToCategory = (catId: string) => {
    const fields = newItemFields[catId];
    if (!fields?.name?.trim()) return;
    const price = parseFloat(fields.price) || 0;
    const newItem: MenuItemStructured = {
      id: `item-${Date.now()}`,
      name: fields.name.trim(),
      description: fields.desc || '',
      price,
      tags: fields.tags ? fields.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      available: true,
    };
    setMenuCategories((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, items: [...c.items, newItem] } : c))
    );
    setNewItemFields((prev) => ({ ...prev, [catId]: { name: '', desc: '', price: '', tags: '' } }));
  };

  const deleteItem = (catId: string, itemId: string) => {
    setMenuCategories((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c))
    );
  };

  const updateItemAvailable = (catId: string, itemId: string, available: boolean) => {
    setMenuCategories((prev) =>
      prev.map((c) =>
        c.id === catId
          ? { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, available } : i)) }
          : c
      )
    );
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business || !newServiceName.trim()) return;

    const newSvc: ServiceItem = {
      id: `srv-${Date.now()}`,
      name: newServiceName,
      description: newServiceDesc || 'Professional reliable service.',
      popular: false,
    };
    const updatedServices = [...(business.services || []), newSvc];

    // Update business & website section
    await fetch('/api/admin/businesses', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessId: business.id }),
    });

    setNewServiceName('');
    setNewServiceDesc('');
    loadData();
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    await fetch(`/api/websites/${slug}/blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newPostTitle,
        content: newPostContent,
      }),
    });

    setNewPostTitle('');
    setNewPostContent('');
    loadData();
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaUrl.trim()) return;

    await fetch(`/api/websites/${slug}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: newMediaUrl, name: 'Uploaded Photo' }),
    });

    setNewMediaUrl('');
    loadData();
  };

  if (loading || !business || !website) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-600 text-sm">
        Loading Client Dashboard...
      </div>
    );
  }

  const isRestaurant = business.industry === 'restaurant';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base text-slate-950 block leading-tight">{business.name}</span>
              <span className="text-[11px] text-slate-500 font-medium">Customer Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Status:{' '}
              <strong className={preview?.status === 'ACTIVE' ? 'text-emerald-600' : 'text-blue-600'}>
                {preview?.status === 'ACTIVE' ? 'ACTIVE & PUBLISHED' : 'PREVIEW ACTIVE (7-DAY)'}
              </strong>
            </span>

            <Link
              href={`/preview/${slug}`}
              target="_blank"
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              href={`/dashboard/${slug}/editor`}
              className="px-4 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Visual Editor</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 flex flex-col md:flex-row gap-8 w-full">
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-64 space-y-6 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-1 shadow-2xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors ${
                activeTab === 'overview' ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <Link
              href={`/dashboard/${slug}/editor`}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-4 h-4" />
                <span>Visual Website Editor</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Content & Pages
            </div>

            <button
              onClick={() => setActiveTab('about')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                activeTab === 'about' ? 'bg-slate-950 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>About & Story</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                activeTab === 'services' ? 'bg-slate-950 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{isRestaurant ? 'Menu Courses' : 'Services Manager'}</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                activeTab === 'contact' ? 'bg-slate-950 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>Contact & Location</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                activeTab === 'gallery' ? 'bg-slate-950 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>Gallery & Photos</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                activeTab === 'testimonials' ? 'bg-slate-950 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>Testimonials & Reviews</span>
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                activeTab === 'faqs' ? 'bg-slate-950 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>FAQ Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                activeTab === 'blog' ? 'bg-slate-950 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>Blog CMS</span>
              <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700 font-bold">
                {posts.length}
              </span>
            </button>

            <div className="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Settings & Assets
            </div>

            {/* Restaurant-only tabs */}
            {isRestaurant && (
              <>
                <div className="pt-1 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-orange-400">
                  🍽 Restaurant
                </div>
                <button
                  onClick={() => setActiveTab('restaurant')}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                    activeTab === 'restaurant' ? 'bg-orange-600 text-white font-bold' : 'text-slate-600 hover:bg-orange-50'
                  }`}
                >
                  <Globe2 className="w-4 h-4" />
                  <span>Restaurant Info</span>
                </button>
                <button
                  onClick={() => setActiveTab('menu_editor')}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                    activeTab === 'menu_editor' ? 'bg-orange-600 text-white font-bold' : 'text-slate-600 hover:bg-orange-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <UtensilsCrossed className="w-4 h-4" />
                    <span>Menu Editor</span>
                  </div>
                  {menuCategories.length > 0 && (
                    <span className="text-[10px] bg-orange-100 px-1.5 py-0.5 rounded text-orange-700 font-bold">
                      {menuCategories.length}
                    </span>
                  )}
                </button>
              </>
            )}

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                activeTab === 'media' ? 'bg-slate-950 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>Media Library</span>
            </button>

            <button
              onClick={() => setActiveTab('domain')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                activeTab === 'domain' ? 'bg-slate-950 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>Custom Domain</span>
            </button>
          </div>
        </aside>

        {/* Right Main Content */}
        <main className="flex-1 space-y-6">
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Welcome to Your Website Portal
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-950">{business.name}</h1>
                  <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                    Your professional website is active. You can customize sections, edit copy, upload project photos, publish blog articles, or connect your custom domain at any time.
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Link
                    href={`/dashboard/${slug}/editor`}
                    className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Edit3 className="w-4 h-4 text-emerald-400" />
                    <span>Open Visual Editor</span>
                  </Link>
                  <Link
                    href={`/preview/${slug}`}
                    target="_blank"
                    className="px-6 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs text-center"
                  >
                    View Public Site
                  </Link>
                </div>
              </div>

              {/* Quick Action Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Link
                  href={`/dashboard/${slug}/editor`}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-400 transition-all shadow-2xs space-y-2 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-950">Edit Website</h3>
                  <p className="text-[11px] text-slate-500">Reorder sections & change copy</p>
                </Link>

                <button
                  onClick={() => setActiveTab('services')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-400 text-left transition-all shadow-2xs space-y-2 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Plus className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-950">Add Service</h3>
                  <p className="text-[11px] text-slate-500">Add new capability or dish</p>
                </button>

                <button
                  onClick={() => setActiveTab('gallery')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-400 text-left transition-all shadow-2xs space-y-2 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-950">Add Photos</h3>
                  <p className="text-[11px] text-slate-500">Upload recent project pictures</p>
                </button>

                <button
                  onClick={() => setActiveTab('blog')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-400 text-left transition-all shadow-2xs space-y-2 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-950">Write Blog Post</h3>
                  <p className="text-[11px] text-slate-500">Publish articles & tips</p>
                </button>
              </div>
            </div>
          )}

          {/* TAB: ABOUT & STORY */}
          {activeTab === 'about' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-950">About Story & Company Mission</h2>
                  <p className="text-xs text-slate-500">Edit the background story, mission, and headlines shown on your About page.</p>
                </div>
                <Link
                  href={`/preview/${slug}/about`}
                  target="_blank"
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <span>View Live About Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              {statusMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <form onSubmit={handleSaveAbout} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    About Page Heading
                  </label>
                  <input
                    type="text"
                    value={aboutHeading}
                    onChange={(e) => setAboutHeading(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Company Tagline / Value Proposition
                  </label>
                  <input
                    type="text"
                    value={aboutTagline}
                    onChange={(e) => setAboutTagline(e.target.value)}
                    placeholder="e.g. Prompt, Honest, Quality Home Repairs in Austin"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Narrative Story & Heritage
                  </label>
                  <textarea
                    rows={6}
                    value={aboutStory}
                    onChange={(e) => setAboutStory(e.target.value)}
                    placeholder="Share how your company was founded, your commitment to craftsmanship, and what sets you apart..."
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950 resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingSettings}
                    className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    {savingSettings ? 'Saving Changes...' : 'Save About Page'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: CONTACT & LOCATION */}
          {activeTab === 'contact' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-950">Contact & Operating Schedule</h2>
                  <p className="text-xs text-slate-500">Update customer-facing contact methods, operating hours, and service coverage.</p>
                </div>
                <Link
                  href={`/preview/${slug}/contact`}
                  target="_blank"
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <span>View Live Contact Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              {statusMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <form onSubmit={handleSaveContact} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number</label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g. 512-555-0194"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. info@business.com"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Street Address</label>
                  <input
                    type="text"
                    value={contactAddress}
                    onChange={(e) => setContactAddress(e.target.value)}
                    placeholder="e.g. 4209 S Congress Ave"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">City</label>
                    <input
                      type="text"
                      value={contactCity}
                      onChange={(e) => setContactCity(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">State</label>
                    <input
                      type="text"
                      value={contactState}
                      onChange={(e) => setContactState(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">ZIP Code</label>
                    <input
                      type="text"
                      value={contactZip}
                      onChange={(e) => setContactZip(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Service Areas (Comma separated neighborhoods/cities)
                  </label>
                  <input
                    type="text"
                    value={contactServiceAreas}
                    onChange={(e) => setContactServiceAreas(e.target.value)}
                    placeholder="e.g. South Austin, Downtown, Zilker, Bouldin Creek"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700">
                    Weekly Operating Hours
                  </label>
                  <div className="space-y-2 text-xs">
                    {['Monday - Friday', 'Saturday', 'Sunday'].map((day) => (
                      <div key={day} className="flex items-center gap-3">
                        <span className="w-32 font-medium text-slate-600">{day}:</span>
                        <input
                          type="text"
                          value={contactHours[day] || ''}
                          onChange={(e) =>
                            setContactHours({ ...contactHours, [day]: e.target.value })
                          }
                          placeholder="e.g. 8:00 AM - 6:00 PM or Closed"
                          className="flex-1 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingSettings}
                    className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    {savingSettings ? 'Saving Changes...' : 'Save Contact Information'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: SERVICES */}
          {activeTab === 'services' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-950">
                    {isRestaurant ? 'Menu Items & Specialties' : 'Service Offerings'}
                  </h2>
                  <p className="text-xs text-slate-500">Add, edit, or remove services displayed on your site.</p>
                </div>
              </div>

              {/* Service List */}
              <div className="space-y-3">
                {business.services?.map((svc) => (
                  <div key={svc.id} className="p-4 rounded-xl border border-slate-200 flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-slate-950">{svc.name}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{svc.description}</p>
                    </div>
                    {svc.badge && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {svc.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Add New Service Form */}
              <form onSubmit={handleAddService} className="pt-4 border-t border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-900">Add New Service</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    placeholder="Service Name (e.g. Deck Weather Staining)"
                    className="p-2.5 text-xs rounded-xl border border-slate-300 outline-hidden"
                  />
                  <input
                    type="text"
                    value={newServiceDesc}
                    onChange={(e) => setNewServiceDesc(e.target.value)}
                    placeholder="Brief description of the work..."
                    className="p-2.5 text-xs rounded-xl border border-slate-300 outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-950 text-white font-bold text-xs"
                >
                  + Add Service to Website
                </button>
              </form>
            </div>
          )}

          {/* TAB: BLOG CMS */}
          {activeTab === 'blog' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-950">Blog CMS Articles</h2>
                  <p className="text-xs text-slate-500">Publish articles to improve local authority and answer customer questions.</p>
                </div>
                <Link
                  href={`/preview/${slug}/blog`}
                  target="_blank"
                  className="text-xs text-emerald-600 hover:underline flex items-center gap-1 font-bold"
                >
                  <span>View Public Blog</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {posts.map((p) => (
                  <div key={p.id} className="p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-slate-950">{p.title}</h4>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="capitalize">{p.category}</span>
                        <span>•</span>
                        <span>{new Date(p.publishDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold uppercase text-[10px]">{p.status}</span>
                      </div>
                    </div>
                    <Link
                      href={`/preview/${slug}/blog/${p.slug}`}
                      target="_blank"
                      className="text-xs font-bold text-slate-700 hover:text-slate-950"
                    >
                      Read →
                    </Link>
                  </div>
                ))}
              </div>

              {/* Create Post Form */}
              <form onSubmit={handleCreatePost} className="pt-4 border-t border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-900">Create New Article</h3>
                <input
                  type="text"
                  required
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="Post Title (e.g. 5 Signs Your Home Needs Drywall Repair)"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 outline-hidden"
                />
                <textarea
                  rows={4}
                  required
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Article body content..."
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 outline-hidden resize-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold text-xs"
                >
                  Publish Article
                </button>
              </form>
            </div>
          )}

          {/* TAB: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-950">Tenant Media Library</h2>
                <p className="text-xs text-slate-500">Your dedicated private asset storage. All uploaded photos are available in the editor.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {media.map((m) => (
                  <div key={m.id} className="rounded-xl overflow-hidden border border-slate-200 aspect-square group relative bg-slate-100">
                    <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddMedia} className="pt-4 border-t border-slate-200 flex gap-2">
                <input
                  type="text"
                  required
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
                  className="flex-1 p-2.5 text-xs rounded-xl border border-slate-300 outline-hidden"
                />
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold text-xs">
                  Upload Photo
                </button>
              </form>
            </div>
          )}

          {/* TAB: CUSTOM DOMAIN */}
          {activeTab === 'domain' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-950">Custom Domain Configuration</h2>
                <p className="text-xs text-slate-500">Connect your own domain name (e.g. {business.slug}.com).</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="font-bold text-slate-900">Current Temporary Preview URL:</div>
                <div className="font-mono text-emerald-700 bg-white p-2 rounded border border-slate-200">
                  https://{business.slug}.previewplatform.com
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="font-bold text-slate-900">Required DNS Records for Custom Domain:</div>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="p-2 rounded bg-white border border-slate-200 flex justify-between">
                    <span>Type: <strong>A</strong> | Host: <strong>@</strong></span>
                    <span>Value: <strong>76.76.21.21</strong></span>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200 flex justify-between">
                    <span>Type: <strong>CNAME</strong> | Host: <strong>www</strong></span>
                    <span>Value: <strong>cname.vercel-dns.com</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: RESTAURANT INFO */}
          {activeTab === 'restaurant' && isRestaurant && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-950">Restaurant Info</h2>
                <p className="text-xs text-slate-500 mt-1">Update your cuisine type, ordering links, and social profiles.</p>
              </div>

              {statusMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-700 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {statusMessage}
                </div>
              )}

              <form onSubmit={handleSaveRestaurant} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Cuisine / Category</label>
                    <input
                      type="text"
                      value={restCuisine}
                      onChange={(e) => setRestCuisine(e.target.value)}
                      placeholder="e.g. Italian-American, Mexican & Tex-Mex"
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Currency</label>
                    <select
                      value={restCurrency}
                      onChange={(e) => setRestCurrency(e.target.value as 'USD' | 'GBP' | 'EUR')}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="USD">USD — US Dollar ($)</option>
                      <option value="GBP">GBP — British Pound (£)</option>
                      <option value="EUR">EUR — Euro (€)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Online Order URL</label>
                    <input
                      type="url"
                      value={restOrderUrl}
                      onChange={(e) => setRestOrderUrl(e.target.value)}
                      placeholder="https://order.yourrestaurant.com"
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Leave blank if you don't offer online ordering.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Reservation URL (OpenTable, Resy, etc.)</label>
                    <input
                      type="url"
                      value={restReservationUrl}
                      onChange={(e) => setRestReservationUrl(e.target.value)}
                      placeholder="https://resy.com/cities/nyc/your-restaurant"
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Leave blank to use our built-in reservation form.</p>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Instagram Profile URL</label>
                    <input
                      type="url"
                      value={restInstagramUrl}
                      onChange={(e) => setRestInstagramUrl(e.target.value)}
                      placeholder="https://instagram.com/yourrestaurant"
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={savingSettings}
                    className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-60"
                  >
                    {savingSettings ? 'Saving...' : 'Save Restaurant Info'}
                  </button>
                  <Link
                    href={`/preview/${slug}/menu`}
                    target="_blank"
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-50 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Live Menu
                  </Link>
                </div>
              </form>
            </div>
          )}

          {/* TAB: MENU EDITOR */}
          {activeTab === 'menu_editor' && isRestaurant && (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">Menu Editor</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Build your full menu. Prices must always be entered by you — we never auto-generate them.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/preview/${slug}/menu`}
                      target="_blank"
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-50 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Preview Menu
                    </Link>
                    <button
                      onClick={handleSaveMenu}
                      disabled={savingSettings}
                      className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm transition disabled:opacity-60"
                    >
                      {savingSettings ? 'Saving...' : 'Save All Changes'}
                    </button>
                  </div>
                </div>

                {statusMessage && (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-700 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {statusMessage}
                  </div>
                )}

                {/* Add New Category */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex gap-2">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                    placeholder="New category name (e.g. Starters, Mains, Desserts)"
                    className="flex-1 p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <button
                    type="button"
                    onClick={addCategory}
                    className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Category
                  </button>
                </div>
              </div>

              {/* Categories */}
              {menuCategories.length === 0 ? (
                <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-10 text-center">
                  <UtensilsCrossed className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-500">No menu categories yet</p>
                  <p className="text-xs text-slate-400 mt-1">Add a category above to get started.</p>
                </div>
              ) : (
                menuCategories.map((cat) => {
                  const isExpanded = expandedCategories.has(cat.id);
                  const fields = newItemFields[cat.id] || { name: '', desc: '', price: '', tags: '' };
                  return (
                    <div key={cat.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                      {/* Category Header */}
                      <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => toggleCategoryExpand(cat.id)}>
                        <div className="flex items-center gap-3">
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                          <span className="font-bold text-sm text-slate-900">{cat.name}</span>
                          <span className="text-[11px] text-slate-500 font-medium">{cat.items.length} item{cat.items.length !== 1 ? 's' : ''}</span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteCategory(cat.id); }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Category Items */}
                      {isExpanded && (
                        <div className="px-5 pb-5 space-y-3 border-t border-slate-100">
                          {cat.items.map((item) => (
                            <div key={item.id} className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-xs text-slate-900">{item.name}</span>
                                  <span className="text-xs font-bold text-orange-600">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: restCurrency }).format(item.price)}
                                  </span>
                                  {item.tags?.slice(0, 2).map((tag) => (
                                    <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-medium">{tag}</span>
                                  ))}
                                </div>
                                {item.description && <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>}
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <label className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={item.available !== false}
                                    onChange={(e) => updateItemAvailable(cat.id, item.id, e.target.checked)}
                                    className="accent-orange-500"
                                  />
                                  Available
                                </label>
                                <button
                                  onClick={() => deleteItem(cat.id, item.id)}
                                  className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}

                          {/* Add New Item Form */}
                          <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Item name *"
                              value={fields.name}
                              onChange={(e) => setNewItemFields((prev) => ({ ...prev, [cat.id]: { ...fields, name: e.target.value } }))}
                              className="p-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                            <input
                              type="number"
                              placeholder="Price (e.g. 12.99) *"
                              min="0"
                              step="0.01"
                              value={fields.price}
                              onChange={(e) => setNewItemFields((prev) => ({ ...prev, [cat.id]: { ...fields, price: e.target.value } }))}
                              className="p-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                            <input
                              type="text"
                              placeholder="Description (optional)"
                              value={fields.desc}
                              onChange={(e) => setNewItemFields((prev) => ({ ...prev, [cat.id]: { ...fields, desc: e.target.value } }))}
                              className="p-2 text-xs rounded-lg border border-slate-300 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                            <input
                              type="text"
                              placeholder="Tags (comma separated: vegan, spicy, popular)"
                              value={fields.tags}
                              onChange={(e) => setNewItemFields((prev) => ({ ...prev, [cat.id]: { ...fields, tags: e.target.value } }))}
                              className="p-2 text-xs rounded-lg border border-slate-300 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                            <button
                              type="button"
                              onClick={() => addItemToCategory(cat.id)}
                              className="sm:col-span-2 py-2 px-4 rounded-lg bg-orange-50 border border-orange-200 text-orange-700 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-orange-100 transition"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Add Item to {cat.name}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}

              {/* Bottom Save */}
              {menuCategories.length > 0 && (
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveMenu}
                    disabled={savingSettings}
                    className="px-8 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm transition disabled:opacity-60"
                  >
                    {savingSettings ? 'Saving...' : '✓ Save Menu'}
                  </button>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
