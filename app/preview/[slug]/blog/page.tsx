'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { NormalizedBusiness, PreviewData, StructuredWebsite, BlogPost } from '@/lib/types';
import PreviewBar from '@/components/PreviewBar';
import SiteHeader from '@/components/sections/SiteHeader';
import FeedbackModal from '@/components/FeedbackModal';
import CheckoutModal from '@/components/CheckoutModal';
import CustomDomainModal from '@/components/CustomDomainModal';
import LeadQualificationModal from '@/components/LeadQualificationModal';
import MobileStickyBar from '@/components/MobileStickyBar';
import { Calendar, Clock, ArrowRight, BookOpen, Search, ArrowLeft, Tag } from 'lucide-react';

export default function PublicBlogPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [business, setBusiness] = useState<NormalizedBusiness | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [website, setWebsite] = useState<StructuredWebsite | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDomainOpen, setIsDomainOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [prevRes, blogRes] = await Promise.all([
          fetch(`/api/preview/${slug}`),
          fetch(`/api/websites/${slug}/blog`),
        ]);

        if (!prevRes.ok) throw new Error('Business preview not found');
        const prevData = await prevRes.json();
        setBusiness(prevData.business);
        setPreview(prevData.preview);
        setWebsite(prevData.website);

        if (blogRes.ok) {
          const blogData = await blogRes.json();
          setPosts(blogData.posts || []);
        }
      } catch (err: any) {
        setError(err.message || 'Error loading blog');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadData();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4" />
        <p className="text-slate-600 text-sm font-semibold">Loading blog articles...</p>
      </div>
    );
  }

  if (error || !business || !website) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-black text-slate-900 mb-2">Blog Not Available</h1>
        <p className="text-slate-600 text-sm mb-6">Could not load blog for {slug}.</p>
        <Link
          href={`/preview/${slug}`}
          className="px-5 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-bold"
        >
          Return to Website
        </Link>
      </div>
    );
  }

  const publishedPosts = posts.filter((p) => p.status === 'published');
  const categories = ['all', ...Array.from(new Set(publishedPosts.map((p) => p.category).filter(Boolean)))];

  const filteredPosts = publishedPosts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* 1. Preview Top Bar */}
      {preview && (
        <PreviewBar
          business={business}
          preview={preview}
          onKeepWebsite={() => setIsCheckoutOpen(true)}
          onOpenFeedback={() => setIsFeedbackOpen(true)}
        />
      )}

      {/* 2. Site Header */}
      <SiteHeader
        business={business}
        theme={website.theme}
        navigation={website.navigation}
        currentSlug={business.slug}
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
      />

      {/* 3. Hero Banner */}
      <div className="bg-slate-950 text-white py-16 px-4 sm:px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${business.photos.hero})` }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <Link
            href={`/preview/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Main Website</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Articles, Guides & News</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {business.name} Journal
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Helpful tips, project highlights, industry advice, and community updates from our team in {business.city}, {business.state}.
          </p>
        </div>
      </div>

      {/* 4. Controls: Filter & Search Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-7 relative z-20 w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all capitalize ${
                  selectedCategory === cat
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat === 'all' ? 'All Posts' : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
            />
          </div>
        </div>
      </div>

      {/* 5. Blog Post Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No Articles Found</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {searchQuery
                ? `No articles match "${searchQuery}". Try a different search term or category.`
                : `We haven't published any articles yet. Check back soon for insightful local guides and updates!`}
            </p>
            <Link
              href={`/preview/${slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Homepage</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const readTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));
              return (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Thumbnail Image */}
                  <Link
                    href={`/preview/${slug}/blog/${post.slug}`}
                    className="relative aspect-16/10 overflow-hidden bg-slate-100 block"
                  >
                    <img
                      src={post.featuredImage || business.photos.hero}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(post.publishDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{readTime} min read</span>
                        </span>
                      </div>

                      <Link href={`/preview/${slug}/blog/${post.slug}`} className="block">
                        <h2 className="text-lg font-black text-slate-950 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h2>
                      </Link>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500">
                        By {post.author || business.name}
                      </span>
                      <Link
                        href={`/preview/${slug}/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-black text-slate-950 hover:text-amber-600 transition-colors"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* 6. Bottom Conversion CTA */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black">
            Ready to work with {business.name}?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Contact our dedicated specialists today for friendly customer service and quality local workmanship.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs transition-colors shadow-lg"
            >
              Request a Free Quote
            </button>
            <a
              href={`tel:${business.phone}`}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              Call {business.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Modals */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        businessId={business.id}
        businessName={business.name}
        onSuccess={() => {
          setIsCheckoutOpen(false);
          setIsDomainOpen(true);
        }}
      />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        businessId={business.id}
        businessName={business.name}
      />

      <CustomDomainModal
        isOpen={isDomainOpen}
        onClose={() => setIsDomainOpen(false)}
        businessId={business.id}
        businessName={business.name}
        defaultSubdomain={`${business.slug}.previewplatform.com`}
      />

      <LeadQualificationModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        businessId={business.id}
        businessName={business.name}
        industry={business.industry}
      />

      {/* Mobile Sticky Bottom Bar */}
      <MobileStickyBar
        business={business}
        theme={website.theme}
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
      />
    </div>
  );
}
