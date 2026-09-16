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
import { Calendar, Clock, ArrowLeft, Share2, Phone, MapPin, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function BlogPostDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const postSlug = params.postSlug as string;

  const [business, setBusiness] = useState<NormalizedBusiness | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [website, setWebsite] = useState<StructuredWebsite | null>(null);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

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
          const posts: BlogPost[] = blogData.posts || [];
          setAllPosts(posts);
          const found = posts.find((p) => p.slug === postSlug);
          if (found) {
            setPost(found);
          } else {
            setError('Article not found');
          }
        }
      } catch (err: any) {
        setError(err.message || 'Error loading article');
      } finally {
        setLoading(false);
      }
    }

    if (slug && postSlug) {
      loadData();
    }
  }, [slug, postSlug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4" />
        <p className="text-slate-600 text-sm font-semibold">Loading article...</p>
      </div>
    );
  }

  if (error || !business || !website || !post) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-black text-slate-900 mb-2">Article Not Found</h1>
        <p className="text-slate-600 text-sm mb-6">The article you requested could not be located.</p>
        <Link
          href={`/preview/${slug}/blog`}
          className="px-5 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-bold"
        >
          Back to All Articles
        </Link>
      </div>
    );
  }

  const readTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));
  const relatedPosts = allPosts.filter((p) => p.id !== post.id && p.status === 'published').slice(0, 2);

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

      {/* 3. Article Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold overflow-hidden">
          <Link href={`/preview/${slug}`} className="hover:text-slate-950 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href={`/preview/${slug}/blog`} className="hover:text-slate-950 transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-bold truncate">{post.title}</span>
        </div>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-black uppercase tracking-wider">
            {post.category || 'General'}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                  {business.name.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{post.author || business.name}</span>
                  <span className="text-[10px] text-slate-400">Verified Business</span>
                </div>
              </div>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{new Date(post.publishDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{readTime} min read</span>
              </span>
            </div>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="rounded-3xl overflow-hidden aspect-16/9 bg-slate-100 shadow-md">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="text-slate-800 text-base sm:text-lg leading-relaxed space-y-6">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-black text-slate-950 pt-4">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-2xl sm:text-3xl font-black text-slate-950 pt-6">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={idx} className="list-disc pl-6 space-y-2 text-slate-700 text-base">
                    {paragraph.split('\n').map((li, lIdx) => (
                      <li key={lIdx}>{li.replace(/^- /, '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-slate-700 leading-relaxed font-normal">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Business Author / Quote CTA Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Locally Owned & Operated</span>
            </div>
            <h3 className="text-xl font-black text-slate-950">
              Need assistance with your next project?
            </h3>
            <p className="text-xs text-slate-600 max-w-md">
              {business.name} proudly serves {business.city} and surrounding areas. Speak with our team today for an upfront estimate.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{business.city}, {business.state}</span>
              </span>
              <span className="flex items-center gap-1 font-bold text-slate-800">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatPhoneNumber(business.phone)}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full md:w-auto">
            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black text-xs transition-colors text-center shadow-md"
            >
              Get Free Estimate
            </button>
            <Link
              href={`/preview/${slug}`}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors text-center"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-950">More from our blog</h3>
              <Link
                href={`/preview/${slug}/blog`}
                className="text-xs font-bold text-slate-600 hover:text-slate-950 flex items-center gap-1 transition-colors"
              >
                <span>View All Articles</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/preview/${slug}/blog/${rPost.slug}`}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow flex gap-4 group"
                >
                  {rPost.featuredImage && (
                    <img
                      src={rPost.featuredImage}
                      alt={rPost.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                  )}
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {rPost.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-950 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {rPost.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="pt-4 text-center">
          <Link
            href={`/preview/${slug}/blog`}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Articles</span>
          </Link>
        </div>
      </main>

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
