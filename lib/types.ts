export type Industry = 'handyman' | 'cleaning' | 'restaurant';
export type RestaurantCategory = 'pizza' | 'mexican' | 'fastfood' | 'asian' | 'american';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  badge?: string;
  popular?: boolean;
  iconName?: string;
  features?: string[];
  image?: string;
  visible?: boolean;
}

// Legacy flat MenuItem (kept for backward compatibility)
export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  dietary?: string[]; // e.g. ["Vegetarian", "Gluten-Free", "Chef Special"]
  popular?: boolean;
  image?: string;
  visible?: boolean;
}

// New structured menu item for restaurant module
export interface MenuItemStructured {
  id: string;
  name: string;
  description: string;
  price: number; // Always entered by owner — never auto-generated
  image?: string;
  tags?: string[]; // e.g. ["vegan", "gluten-free", "popular", "spicy"]
  available: boolean;
}

export interface MenuCategory {
  id: string;
  name: string; // e.g. "Starters", "Mains", "Desserts"
  description?: string;
  items: MenuItemStructured[];
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  serviceOrDish?: string;
  verified: boolean;
  visible?: boolean;
}

export interface BusinessHours {
  [day: string]: string;
}

export interface BusinessPhotos {
  hero: string;
  about?: string;
  gallery: string[];
  services?: string[];
}

export interface NormalizedBusiness {
  id: string;
  slug: string;
  name: string;
  industry: Industry;
  category: string;
  description: string;
  tagline?: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  hours: BusinessHours;
  rating: number;
  reviewCount: number;
  photos: BusinessPhotos;
  services: ServiceItem[];
  menu?: MenuItem[]; // Legacy flat menu
  menuCategories?: MenuCategory[]; // Structured restaurant menu
  reviews: CustomerReview[];
  website?: string;
  facebookUrl?: string;
  googleMapsUrl?: string;
  latitude?: number;
  longitude?: number;
  templateId: string;
  customDomain?: string;
  serviceAreas?: string[];
  // Restaurant-specific fields
  restaurantCategory?: RestaurantCategory;
  cuisine?: string; // e.g. "Italian-American"
  orderUrl?: string;
  reservationUrl?: string;
  instagramUrl?: string;
  currency?: 'USD' | 'GBP' | 'EUR';
}

export type PreviewStatus = 'DRAFT' | 'PREVIEW_ACTIVE' | 'EXPIRED' | 'ACTIVE';
export type PlanType = 'NONE' | 'WEBSITE_79' | 'WEBSITE_LEAD_149';

export interface PreviewData {
  id: string;
  businessId: string;
  status: PreviewStatus;
  firstViewedAt: string | null;
  previewExpiresAt: string | null;
  plan: PlanType;
  paymentStatus: 'UNPAID' | 'PAID';
  viewCount: number;
  dmStatus: 'NOT_CONTACTED' | 'DM1_SENT' | 'DM2_SENT' | 'DM3_SENT' | 'REPLIED';
  lastContactedAt: string | null;
}

export interface GeneratedContent {
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta?: string;
  aboutStory: string;
  whyChooseUs: { title: string; desc: string; icon?: string }[];
  faqs: { question: string; answer: string }[];
  serviceAreaSummary: string;
  metaTitle: string;
  metaDescription: string;
}

// ----------------------------------------------------------------------
// STRUCTURED WEBSITE & SECTION LIBRARY MODELS
// ----------------------------------------------------------------------

export type SectionType =
  | 'hero'
  | 'services'
  | 'about'
  | 'gallery'
  | 'reviews'
  | 'faq'
  | 'cta'
  | 'contact'
  | 'menu'
  | 'reservations';

export interface SectionSettings {
  alignment?: 'left' | 'center' | 'right';
  overlay?: boolean;
  backgroundStyle?: 'white' | 'slate' | 'dark' | 'brand';
  padding?: 'compact' | 'normal' | 'spacious';
  columns?: 2 | 3 | 4;
}

export interface WebsiteSection {
  id: string;
  type: SectionType;
  variant: string; // e.g., 'HeroA', 'HeroB', 'ServicesA', 'ReviewsC'
  order: number;
  visible: boolean;
  content: Record<string, any>;
  settings: SectionSettings;
}

export interface WebsitePage {
  id: string;
  name: string;
  slug: string;
  title: string;
  description?: string;
  sections: WebsiteSection[];
  visible: boolean;
  isProtected?: boolean; // Home cannot be deleted
}

export interface NavigationItem {
  id: string;
  label: string;
  pageSlug: string;
  visible: boolean;
  order: number;
}

export interface ThemeConfig {
  primaryColor: string; // Hex e.g. #059669
  secondaryColor: string; // Hex e.g. #0284c7
  backgroundColor: string; // Hex e.g. #ffffff
  textColor: string; // Hex e.g. #0f172a
  fontFamily: 'sans' | 'serif' | 'display';
  logoType: 'text' | 'image';
  textLogo: {
    line1: string;
    line2?: string;
    style: 'stacked' | 'inline' | 'serif';
  };
  logoUrl?: string;
  buttonStyle: 'rounded' | 'square' | 'pill';
}

export interface BlogPost {
  id: string;
  businessId: string;
  title: string;
  slug: string;
  featuredImage: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishDate: string;
  seoTitle?: string;
  metaDescription?: string;
  status: 'draft' | 'published' | 'scheduled';
  createdAt: string;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  businessId: string;
  name: string;
  url: string;
  size: string;
  type: 'image/jpeg' | 'image/png' | 'image/webp';
  createdAt: string;
}

export interface WebsiteRevision {
  id: string;
  timestamp: string;
  label: string;
  sections: WebsiteSection[];
  theme: ThemeConfig;
}

export interface StructuredWebsite {
  id: string;
  businessId: string;
  templateId: string;
  theme: ThemeConfig;
  pages: WebsitePage[];
  navigation: NavigationItem[];
  revisions: WebsiteRevision[];
  isDraft: boolean;
  lastSavedAt: string;
  publishedAt?: string;
}
