import fs from 'fs';
import path from 'path';
import {
  NormalizedBusiness,
  PreviewData,
  PlanType,
  PreviewStatus,
  StructuredWebsite,
  WebsiteSection,
  BlogPost,
  MediaItem,
  WebsiteRevision,
  ThemeConfig,
} from './types';
import { INITIAL_LEADS } from './seed-data';
import { buildStructuredWebsite, TEMPLATE_COMPOSITIONS } from './template-compositions';

export interface FeedbackRecord {
  id: string;
  businessId: string;
  authorName?: string;
  authorEmail?: string;
  message: string;
  status: 'NEW' | 'REVIEWED' | 'CHANGE_REQUESTED' | 'COMPLETED';
  createdAt: string;
}

export interface LeadRecord {
  id: string;
  businessId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceRequested?: string;
  answers: Record<string, string>;
  status: 'NEW' | 'QUALIFIED' | 'CONTACTED' | 'WON' | 'LOST';
  createdAt: string;
}

export interface DomainRecord {
  businessId: string;
  domain: string;
  verified: boolean;
  dnsRecords: { type: string; name: string; value: string }[];
  connectedAt: string;
}

export interface EventRecord {
  id: string;
  previewId: string;
  businessId: string;
  eventType: string;
  metadata?: any;
  createdAt: string;
}

interface DatabaseSchema {
  businesses: NormalizedBusiness[];
  websites: Record<string, StructuredWebsite>;
  previews: Record<string, PreviewData>;
  feedbacks: FeedbackRecord[];
  leads: LeadRecord[];
  domains: Record<string, DomainRecord>;
  events: EventRecord[];
  blogPosts: BlogPost[];
  mediaItems: MediaItem[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

function getInitialDb(): DatabaseSchema {
  const previews: Record<string, PreviewData> = {};
  const websites: Record<string, StructuredWebsite> = {};
  const blogPosts: BlogPost[] = [];
  const mediaItems: MediaItem[] = [];

  for (const b of INITIAL_LEADS) {
    previews[b.id] = {
      id: `prev-${b.id}`,
      businessId: b.id,
      status: 'PREVIEW_ACTIVE',
      firstViewedAt: null, // Timer starts on first real visitor visit
      previewExpiresAt: null,
      plan: 'NONE',
      paymentStatus: 'UNPAID',
      viewCount: 0,
      dmStatus: 'NOT_CONTACTED',
      lastContactedAt: null,
    };

    websites[b.id] = buildStructuredWebsite(b);

    // Seed sample blog posts
    blogPosts.push({
      id: `post-${b.id}-1`,
      businessId: b.id,
      title: b.industry === 'restaurant'
        ? 'The Secret to Our Traditional Handmade Pasta'
        : b.industry === 'cleaning'
        ? '5 Simple Habits to Keep Your Home Spotless Between Cleanings'
        : 'Why Addressing Small Drywall Cracks Early Saves Thousands',
      slug: b.industry === 'restaurant'
        ? 'secret-to-handmade-pasta'
        : b.industry === 'cleaning'
        ? 'habits-for-spotless-home'
        : 'addressing-drywall-cracks-early',
      featuredImage: b.photos.hero,
      excerpt: `Helpful guidance and local expertise from our dedicated team at ${b.name}.`,
      content: `At ${b.name}, we believe in sharing practical, honest expertise with our local community in ${b.city}. Whether you are planning a small update, scheduling routine care, or enjoying dinner with family, paying attention to craft and quality makes all the difference.\n\nWe pride ourselves on attention to detail, clear communication, and delivering lasting results for our neighbors.`,
      category: b.industry === 'restaurant' ? 'Culinary Stories' : 'Home Care Tips',
      author: b.name,
      publishDate: new Date().toISOString(),
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Seed media items
    b.photos.gallery.forEach((url, idx) => {
      mediaItems.push({
        id: `media-${b.id}-${idx + 1}`,
        businessId: b.id,
        name: `Project Photo ${idx + 1}`,
        url,
        size: '1.2 MB',
        type: 'image/jpeg',
        createdAt: new Date().toISOString(),
      });
    });
  }

  return {
    businesses: [...INITIAL_LEADS],
    websites,
    previews,
    feedbacks: [],
    leads: [],
    domains: {},
    events: [],
    blogPosts,
    mediaItems,
  };
}

class Store {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (!parsed.websites) parsed.websites = {};
        if (!parsed.blogPosts || parsed.blogPosts.length === 0) {
          const initial = getInitialDb();
          parsed.blogPosts = initial.blogPosts;
          parsed.mediaItems = initial.mediaItems;
          this.save(parsed);
        }
        if (!parsed.mediaItems) parsed.mediaItems = [];
        // Ensure each business has a structured website
        for (const b of parsed.businesses || []) {
          if (!parsed.websites[b.id]) {
            parsed.websites[b.id] = buildStructuredWebsite(b);
          }
        }
        return parsed;
      }
    } catch (e) {
      console.error('Error reading db.json, initializing fresh store:', e);
    }
    const initial = getInitialDb();
    this.save(initial);
    return initial;
  }

  private save(data = this.data) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving db.json:', e);
    }
  }

  // ------------------------------------------------------------------
  // BUSINESSES
  // ------------------------------------------------------------------
  getAllBusinesses(): NormalizedBusiness[] {
    return this.data.businesses;
  }

  getBusinessBySlug(slug: string): NormalizedBusiness | undefined {
    return this.data.businesses.find(b => b.slug.toLowerCase() === slug.toLowerCase());
  }

  getBusinessById(id: string): NormalizedBusiness | undefined {
    return this.data.businesses.find(b => b.id === id);
  }

  createBusiness(business: NormalizedBusiness): NormalizedBusiness {
    const existingIndex = this.data.businesses.findIndex(b => b.slug === business.slug || b.id === business.id);
    if (existingIndex >= 0) {
      this.data.businesses[existingIndex] = business;
    } else {
      this.data.businesses.unshift(business);
    }

    if (!this.data.previews[business.id]) {
      this.data.previews[business.id] = {
        id: `prev-${business.id}`,
        businessId: business.id,
        status: 'PREVIEW_ACTIVE',
        firstViewedAt: null,
        previewExpiresAt: null,
        plan: 'NONE',
        paymentStatus: 'UNPAID',
        viewCount: 0,
        dmStatus: 'NOT_CONTACTED',
        lastContactedAt: null,
      };
    }

    if (!this.data.websites[business.id]) {
      this.data.websites[business.id] = buildStructuredWebsite(business);
    }

    this.save();
    return business;
  }

  updateBusiness(id: string, updates: Partial<NormalizedBusiness>): NormalizedBusiness | undefined {
    const b = this.data.businesses.find(b => b.id === id);
    if (!b) return undefined;
    Object.assign(b, updates);

    // Sync changes into website sections if website exists
    const site = this.data.websites[id];
    if (site && site.pages[0]) {
      for (const sec of site.pages[0].sections) {
        if (sec.type === 'services' && updates.services) {
          sec.content.items = updates.services;
        }
        if (sec.type === 'menu') {
          // Prefer structured menuCategories; fall back to flat menu
          if (updates.menuCategories) {
            sec.content.menuCategories = updates.menuCategories;
            // Also flatten for legacy rendering
            const flat = updates.menuCategories.flatMap((cat: any) =>
              (cat.items || []).map((item: any) => ({
                id: item.id,
                name: item.name,
                category: cat.name,
                description: item.description,
                price: `$${Number(item.price).toFixed(2)}`,
                popular: (item.tags || []).includes('popular'),
                image: item.image,
                dietary: (item.tags || []).filter((t: string) => t !== 'popular'),
                visible: item.available,
              }))
            );
            sec.content.items = flat;
          } else if (updates.menu) {
            sec.content.items = updates.menu;
          }
          // Sync restaurant URL fields
          if (updates.orderUrl !== undefined) sec.content.orderUrl = updates.orderUrl;
          if (updates.currency) sec.content.currency = updates.currency;
        }
        if (sec.type === 'contact') {
          if (updates.phone) sec.content.phone = updates.phone;
          if (updates.email) sec.content.email = updates.email;
          if (updates.address) sec.content.address = updates.address;
          if (updates.city) sec.content.city = updates.city;
          if (updates.state) sec.content.state = updates.state;
          if (updates.zip) sec.content.zip = updates.zip;
          if (updates.hours) sec.content.hours = updates.hours;
          if (updates.serviceAreas) sec.content.serviceAreas = updates.serviceAreas;
          if (updates.googleMapsUrl !== undefined) sec.content.googleMapsUrl = updates.googleMapsUrl;
          if (updates.instagramUrl !== undefined) sec.content.instagramUrl = updates.instagramUrl;
        }
        if (sec.type === 'about') {
          if (updates.description) sec.content.story = updates.description;
        }
        if (sec.type === 'cta') {
          if (updates.orderUrl !== undefined) sec.content.orderUrl = updates.orderUrl;
          if (updates.reservationUrl !== undefined) sec.content.reservationUrl = updates.reservationUrl;
        }
        if (sec.type === 'reservations') {
          if (updates.reservationUrl !== undefined) sec.content.reservationUrl = updates.reservationUrl;
          if (updates.phone) sec.content.phone = updates.phone;
        }
      }
    }

    // If templateId changed, update website structure while preserving content
    if (updates.templateId && this.data.websites[id]) {
      this.switchWebsiteTemplate(id, updates.templateId);
    }

    this.save();
    return b;
  }


  // ------------------------------------------------------------------
  // STRUCTURED WEBSITES & VISUAL EDITOR
  // ------------------------------------------------------------------
  getWebsite(businessId: string): StructuredWebsite {
    if (!this.data.websites[businessId]) {
      const b = this.getBusinessById(businessId);
      if (b) {
        this.data.websites[businessId] = buildStructuredWebsite(b);
        this.save();
      }
    }
    return this.data.websites[businessId];
  }

  updateWebsite(businessId: string, updates: Partial<StructuredWebsite>): StructuredWebsite {
    const site = this.getWebsite(businessId);
    Object.assign(site, updates, { lastSavedAt: new Date().toISOString() });
    this.save();
    return site;
  }

  switchWebsiteTemplate(businessId: string, newTemplateId: string): StructuredWebsite {
    const site = this.getWebsite(businessId);
    const b = this.getBusinessById(businessId);
    if (!site || !b) return site;

    const tplDef = TEMPLATE_COMPOSITIONS[newTemplateId];
    if (!tplDef) return site;

    // Save revision before switching
    this.saveRevision(businessId, `Switch to ${newTemplateId} (${tplDef.name})`);

    // Keep existing section contents mapped into new template section order
    const existingSectionContent = new Map<string, Record<string, any>>();
    site.pages[0]?.sections.forEach(s => existingSectionContent.set(s.type, s.content));

    const updatedSections: WebsiteSection[] = tplDef.sections.map((sec, idx) => {
      const existing = existingSectionContent.get(sec.type);
      return {
        id: `sec-${sec.type}-${idx + 1}`,
        type: sec.type,
        variant: sec.variant,
        order: idx + 1,
        visible: true,
        content: existing || {},
        settings: sec.settings || { alignment: 'left', backgroundStyle: 'white' },
      };
    });

    site.templateId = newTemplateId;
    b.templateId = newTemplateId;
    if (site.pages[0]) {
      site.pages[0].sections = updatedSections;
    }
    if (tplDef.theme.primaryColor) site.theme.primaryColor = tplDef.theme.primaryColor;
    if (tplDef.theme.fontFamily) site.theme.fontFamily = tplDef.theme.fontFamily;
    if (tplDef.theme.buttonStyle) site.theme.buttonStyle = tplDef.theme.buttonStyle;

    this.save();
    return site;
  }

  switchSectionVariant(businessId: string, sectionId: string, newVariant: string): StructuredWebsite {
    const site = this.getWebsite(businessId);
    const page = site.pages[0];
    if (!page) return site;

    const sec = page.sections.find(s => s.id === sectionId);
    if (sec) {
      sec.variant = newVariant;
      site.lastSavedAt = new Date().toISOString();
      this.save();
    }
    return site;
  }

  reorderSections(businessId: string, sectionIdsInOrder: string[]): StructuredWebsite {
    const site = this.getWebsite(businessId);
    const page = site.pages[0];
    if (!page) return site;

    const newSections: WebsiteSection[] = [];
    sectionIdsInOrder.forEach((id, index) => {
      const found = page.sections.find(s => s.id === id);
      if (found) {
        found.order = index + 1;
        newSections.push(found);
      }
    });
    page.sections = newSections;
    site.lastSavedAt = new Date().toISOString();
    this.save();
    return site;
  }

  toggleSectionVisibility(businessId: string, sectionId: string): StructuredWebsite {
    const site = this.getWebsite(businessId);
    const page = site.pages[0];
    if (!page) return site;

    const sec = page.sections.find(s => s.id === sectionId);
    if (sec) {
      sec.visible = !sec.visible;
      site.lastSavedAt = new Date().toISOString();
      this.save();
    }
    return site;
  }

  updateSection(businessId: string, sectionId: string, content: Record<string, any>, settings?: any): StructuredWebsite {
    const site = this.getWebsite(businessId);
    const page = site.pages[0];
    if (!page) return site;

    const sec = page.sections.find(s => s.id === sectionId);
    if (sec) {
      sec.content = { ...sec.content, ...content };
      if (settings) sec.settings = { ...sec.settings, ...settings };
      site.lastSavedAt = new Date().toISOString();
      this.save();
    }
    return site;
  }

  saveRevision(businessId: string, label: string): WebsiteRevision {
    const site = this.getWebsite(businessId);
    const rev: WebsiteRevision = {
      id: `rev-${Date.now()}`,
      timestamp: new Date().toISOString(),
      label: label || `Revision ${site.revisions.length + 1}`,
      sections: JSON.parse(JSON.stringify(site.pages[0]?.sections || [])),
      theme: JSON.parse(JSON.stringify(site.theme)),
    };
    site.revisions.unshift(rev);
    if (site.revisions.length > 10) site.revisions.pop(); // keep last 10
    this.save();
    return rev;
  }

  restoreRevision(businessId: string, revisionId: string): StructuredWebsite {
    const site = this.getWebsite(businessId);
    const rev = site.revisions.find(r => r.id === revisionId);
    if (rev && site.pages[0]) {
      site.pages[0].sections = JSON.parse(JSON.stringify(rev.sections));
      site.theme = JSON.parse(JSON.stringify(rev.theme));
      site.lastSavedAt = new Date().toISOString();
      this.save();
    }
    return site;
  }

  publishWebsite(businessId: string): StructuredWebsite {
    const site = this.getWebsite(businessId);
    site.isDraft = false;
    site.publishedAt = new Date().toISOString();
    this.save();
    return site;
  }

  // ------------------------------------------------------------------
  // BLOG POSTS
  // ------------------------------------------------------------------
  getBlogPosts(businessId: string): BlogPost[] {
    return this.data.blogPosts.filter(p => p.businessId === businessId);
  }

  getBlogPostBySlug(businessId: string, postSlug: string): BlogPost | undefined {
    return this.data.blogPosts.find(p => p.businessId === businessId && p.slug === postSlug);
  }

  createBlogPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost {
    const newPost: BlogPost = {
      ...post,
      id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.blogPosts.unshift(newPost);
    this.save();
    return newPost;
  }

  updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost | undefined {
    const post = this.data.blogPosts.find(p => p.id === id);
    if (post) {
      Object.assign(post, updates, { updatedAt: new Date().toISOString() });
      this.save();
    }
    return post;
  }

  deleteBlogPost(id: string) {
    this.data.blogPosts = this.data.blogPosts.filter(p => p.id !== id);
    this.save();
  }

  // ------------------------------------------------------------------
  // MEDIA LIBRARY
  // ------------------------------------------------------------------
  getMediaItems(businessId: string): MediaItem[] {
    return this.data.mediaItems.filter(m => m.businessId === businessId);
  }

  addMediaItem(item: Omit<MediaItem, 'id' | 'createdAt'>): MediaItem {
    const newItem: MediaItem = {
      ...item,
      id: `media-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.data.mediaItems.unshift(newItem);
    this.save();
    return newItem;
  }

  deleteMediaItem(id: string) {
    this.data.mediaItems = this.data.mediaItems.filter(m => m.id !== id);
    this.save();
  }

  // ------------------------------------------------------------------
  // PREVIEWS & COUNTDOWN LOGIC
  // ------------------------------------------------------------------
  getPreview(businessId: string): PreviewData {
    if (!this.data.previews[businessId]) {
      this.data.previews[businessId] = {
        id: `prev-${businessId}`,
        businessId,
        status: 'PREVIEW_ACTIVE',
        firstViewedAt: null,
        previewExpiresAt: null,
        plan: 'NONE',
        paymentStatus: 'UNPAID',
        viewCount: 0,
        dmStatus: 'NOT_CONTACTED',
        lastContactedAt: null,
      };
      this.save();
    }
    return this.data.previews[businessId];
  }

  recordVisit(businessId: string): { preview: PreviewData; isFirstVisit: boolean; isExpired: boolean } {
    const preview = this.getPreview(businessId);
    let isFirstVisit = false;
    const now = new Date();

    preview.viewCount = (preview.viewCount || 0) + 1;

    if (!preview.firstViewedAt) {
      isFirstVisit = true;
      preview.firstViewedAt = now.toISOString();
      const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      preview.previewExpiresAt = expires.toISOString();
      preview.status = 'PREVIEW_ACTIVE';

      this.recordEvent({
        previewId: preview.id,
        businessId,
        eventType: 'FIRST_VISIT',
        metadata: { firstViewedAt: preview.firstViewedAt },
      });
    } else if (!preview.previewExpiresAt) {
      const firstDate = new Date(preview.firstViewedAt);
      const expires = new Date(firstDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      preview.previewExpiresAt = expires.toISOString();
    }

    let isExpired = false;
    if (preview.paymentStatus !== 'PAID' && preview.status !== 'ACTIVE' && preview.previewExpiresAt) {
      const expiry = new Date(preview.previewExpiresAt);
      if (now.getTime() > expiry.getTime()) {
        preview.status = 'EXPIRED';
        isExpired = true;
      }
    }

    this.recordEvent({
      previewId: preview.id,
      businessId,
      eventType: 'PAGE_VIEW',
      metadata: { totalViews: preview.viewCount },
    });

    this.save();
    return { preview, isFirstVisit, isExpired };
  }

  updatePreviewStatus(businessId: string, status: PreviewStatus): PreviewData {
    const p = this.getPreview(businessId);
    p.status = status;
    this.save();
    return p;
  }

  updatePreviewDmStatus(businessId: string, dmStatus: PreviewData['dmStatus']): PreviewData {
    const p = this.getPreview(businessId);
    p.dmStatus = dmStatus;
    p.lastContactedAt = new Date().toISOString();
    this.save();
    return p;
  }

  activatePlan(businessId: string, plan: PlanType): PreviewData {
    const p = this.getPreview(businessId);
    p.plan = plan;
    p.paymentStatus = 'PAID';
    p.status = 'ACTIVE';
    p.previewExpiresAt = null;

    this.recordEvent({
      previewId: p.id,
      businessId,
      eventType: 'PAYMENT_COMPLETED',
      metadata: { plan },
    });

    this.save();
    return p;
  }

  // ------------------------------------------------------------------
  // FEEDBACK
  // ------------------------------------------------------------------
  addFeedback(feedback: Omit<FeedbackRecord, 'id' | 'createdAt' | 'status'>): FeedbackRecord {
    const rec: FeedbackRecord = {
      ...feedback,
      id: `fb-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    this.data.feedbacks.unshift(rec);

    this.recordEvent({
      previewId: this.getPreview(feedback.businessId).id,
      businessId: feedback.businessId,
      eventType: 'FEEDBACK_SUBMITTED',
      metadata: { length: feedback.message.length },
    });

    this.save();
    return rec;
  }

  getFeedbacks(businessId?: string): FeedbackRecord[] {
    if (businessId) {
      return this.data.feedbacks.filter(f => f.businessId === businessId);
    }
    return this.data.feedbacks;
  }

  updateFeedbackStatus(id: string, status: FeedbackRecord['status']) {
    const fb = this.data.feedbacks.find(f => f.id === id);
    if (fb) {
      fb.status = status;
      this.save();
    }
    return fb;
  }

  // ------------------------------------------------------------------
  // LEADS
  // ------------------------------------------------------------------
  addLead(lead: Omit<LeadRecord, 'id' | 'createdAt' | 'status'>): LeadRecord {
    const rec: LeadRecord = {
      ...lead,
      id: `lead-sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    this.data.leads.unshift(rec);
    this.save();
    return rec;
  }

  getLeads(businessId?: string): LeadRecord[] {
    if (businessId) {
      return this.data.leads.filter(l => l.businessId === businessId);
    }
    return this.data.leads;
  }

  updateLeadStatus(id: string, status: LeadRecord['status']) {
    const l = this.data.leads.find(item => item.id === id);
    if (l) {
      l.status = status;
      this.save();
    }
    return l;
  }

  // ------------------------------------------------------------------
  // DOMAINS
  // ------------------------------------------------------------------
  saveDomain(businessId: string, domain: string): DomainRecord {
    const cleanDomain = domain.toLowerCase().trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
    const rec: DomainRecord = {
      businessId,
      domain: cleanDomain,
      verified: true,
      dnsRecords: [
        { type: 'A', name: '@', value: '76.76.21.21' },
        { type: 'CNAME', name: 'www', value: 'cname.vercel-dns.com' },
      ],
      connectedAt: new Date().toISOString(),
    };
    this.data.domains[businessId] = rec;
    const b = this.getBusinessById(businessId);
    if (b) {
      b.customDomain = cleanDomain;
    }
    this.save();
    return rec;
  }

  getDomain(businessId: string): DomainRecord | undefined {
    return this.data.domains[businessId];
  }

  // ------------------------------------------------------------------
  // EVENTS & ANALYTICS
  // ------------------------------------------------------------------
  recordEvent(event: Omit<EventRecord, 'id' | 'createdAt'>) {
    const rec: EventRecord = {
      ...event,
      id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    this.data.events.push(rec);
    this.save();
    return rec;
  }

  getStats() {
    const businesses = this.data.businesses;
    const previews = Object.values(this.data.previews);
    const totalLeads = businesses.length;
    const activePreviews = previews.filter(p => p.status === 'PREVIEW_ACTIVE').length;
    const activeCustomers = previews.filter(p => p.status === 'ACTIVE' || p.paymentStatus === 'PAID').length;
    const expiredPreviews = previews.filter(p => p.status === 'EXPIRED').length;
    const totalViews = previews.reduce((sum, p) => sum + (p.viewCount || 0), 0);
    const dmsSent = previews.filter(p => p.dmStatus && p.dmStatus !== 'NOT_CONTACTED').length;
    const feedbackCount = this.data.feedbacks.length;
    const totalRevenue = activeCustomers * 114;
    const conversionRate = totalLeads > 0 ? ((activeCustomers / totalLeads) * 100).toFixed(1) : '0';

    return {
      totalLeads,
      activePreviews,
      activeCustomers,
      expiredPreviews,
      totalViews,
      dmsSent,
      feedbackCount,
      totalRevenue,
      conversionRate,
    };
  }
}

export const store = new Store();
