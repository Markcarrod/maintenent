import { NormalizedBusiness, StructuredWebsite, WebsiteSection, ThemeConfig, NavigationItem, WebsitePage } from './types';
import { generateIndustryContent } from './content-generator';

export interface TemplateCompositionDef {
  id: string;
  name: string;
  industry: string;
  theme: Partial<ThemeConfig>;
  sections: {
    type: WebsiteSection['type'];
    variant: string;
    settings?: WebsiteSection['settings'];
  }[];
}

export const TEMPLATE_COMPOSITIONS: Record<string, TemplateCompositionDef> = {
  // Handyman Templates
  H1: {
    id: 'H1',
    name: 'Local Pro',
    industry: 'handyman',
    theme: {
      primaryColor: '#059669', // Emerald
      secondaryColor: '#0f172a',
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      fontFamily: 'sans',
      buttonStyle: 'rounded',
      logoType: 'text',
    },
    sections: [
      { type: 'hero', variant: 'HeroA', settings: { alignment: 'left', backgroundStyle: 'white' } },
      { type: 'services', variant: 'ServicesA', settings: { columns: 3, backgroundStyle: 'white' } },
      { type: 'about', variant: 'AboutA', settings: { alignment: 'left', backgroundStyle: 'dark' } },
      { type: 'gallery', variant: 'GalleryA', settings: { columns: 4, backgroundStyle: 'white' } },
      { type: 'reviews', variant: 'ReviewsA', settings: { columns: 3, backgroundStyle: 'white' } },
      { type: 'faq', variant: 'FAQA', settings: { backgroundStyle: 'slate' } },
      { type: 'cta', variant: 'CTAA', settings: { backgroundStyle: 'brand' } },
      { type: 'contact', variant: 'ContactA', settings: { backgroundStyle: 'dark' } },
    ],
  },
  H2: {
    id: 'H2',
    name: 'Project Focused',
    industry: 'handyman',
    theme: {
      primaryColor: '#d97706', // Amber
      secondaryColor: '#18181b',
      backgroundColor: '#ffffff',
      textColor: '#18181b',
      fontFamily: 'sans',
      buttonStyle: 'rounded',
      logoType: 'text',
    },
    sections: [
      { type: 'hero', variant: 'HeroB', settings: { alignment: 'left', overlay: true, backgroundStyle: 'dark' } },
      { type: 'gallery', variant: 'GalleryB', settings: { columns: 2, backgroundStyle: 'slate' } },
      { type: 'services', variant: 'ServicesC', settings: { columns: 3, backgroundStyle: 'white' } },
      { type: 'about', variant: 'AboutB', settings: { backgroundStyle: 'dark' } },
      { type: 'reviews', variant: 'ReviewsB', settings: { columns: 3, backgroundStyle: 'white' } },
      { type: 'faq', variant: 'FAQB', settings: { backgroundStyle: 'slate' } },
      { type: 'cta', variant: 'CTAC', settings: { backgroundStyle: 'white' } },
      { type: 'contact', variant: 'ContactB', settings: { backgroundStyle: 'dark' } },
    ],
  },
  H3: {
    id: 'H3',
    name: 'Fast Local Service',
    industry: 'handyman',
    theme: {
      primaryColor: '#dc2626', // Red
      secondaryColor: '#0f172a',
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
      fontFamily: 'sans',
      buttonStyle: 'rounded',
      logoType: 'text',
    },
    sections: [
      { type: 'hero', variant: 'HeroC', settings: { alignment: 'center', backgroundStyle: 'white' } },
      { type: 'services', variant: 'ServicesA', settings: { columns: 2, backgroundStyle: 'slate' } },
      { type: 'about', variant: 'AboutA', settings: { backgroundStyle: 'white' } },
      { type: 'reviews', variant: 'ReviewsA', settings: { columns: 3, backgroundStyle: 'slate' } },
      { type: 'faq', variant: 'FAQA', settings: { backgroundStyle: 'white' } },
      { type: 'cta', variant: 'CTAB', settings: { backgroundStyle: 'brand' } },
      { type: 'contact', variant: 'ContactA', settings: { backgroundStyle: 'dark' } },
    ],
  },
  H4: {
    id: 'H4',
    name: 'Premium Home Improvement',
    industry: 'handyman',
    theme: {
      primaryColor: '#78716c', // Stone
      secondaryColor: '#1c1917',
      backgroundColor: '#fafaf9',
      textColor: '#1c1917',
      fontFamily: 'serif',
      buttonStyle: 'square',
      logoType: 'text',
    },
    sections: [
      { type: 'hero', variant: 'HeroD', settings: { alignment: 'left', backgroundStyle: 'white' } },
      { type: 'services', variant: 'ServicesD', settings: { columns: 3, backgroundStyle: 'white' } },
      { type: 'about', variant: 'AboutB', settings: { backgroundStyle: 'dark' } },
      { type: 'gallery', variant: 'GalleryC', settings: { columns: 3, backgroundStyle: 'white' } },
      { type: 'reviews', variant: 'ReviewsA', settings: { columns: 3, backgroundStyle: 'slate' } },
      { type: 'cta', variant: 'CTAC', settings: { backgroundStyle: 'dark' } },
      { type: 'contact', variant: 'ContactA', settings: { backgroundStyle: 'dark' } },
    ],
  },
  H5: {
    id: 'H5',
    name: 'Trust First',
    industry: 'handyman',
    theme: {
      primaryColor: '#2563eb', // Blue
      secondaryColor: '#0f172a',
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      fontFamily: 'sans',
      buttonStyle: 'rounded',
      logoType: 'text',
    },
    sections: [
      { type: 'hero', variant: 'HeroE', settings: { alignment: 'left', backgroundStyle: 'slate' } },
      { type: 'reviews', variant: 'ReviewsC', settings: { backgroundStyle: 'white' } },
      { type: 'services', variant: 'ServicesA', settings: { columns: 3, backgroundStyle: 'white' } },
      { type: 'about', variant: 'AboutA', settings: { backgroundStyle: 'slate' } },
      { type: 'gallery', variant: 'GalleryA', settings: { columns: 4, backgroundStyle: 'white' } },
      { type: 'faq', variant: 'FAQA', settings: { backgroundStyle: 'slate' } },
      { type: 'cta', variant: 'CTAA', settings: { backgroundStyle: 'brand' } },
      { type: 'contact', variant: 'ContactA', settings: { backgroundStyle: 'dark' } },
    ],
  },

  // Cleaning Templates
  C1: {
    id: 'C1',
    name: 'Professional Cleaning',
    industry: 'cleaning',
    theme: {
      primaryColor: '#0891b2', // Cyan
      secondaryColor: '#0f172a',
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      fontFamily: 'sans',
      buttonStyle: 'pill',
      logoType: 'text',
    },
    sections: [
      { type: 'hero', variant: 'HeroA', settings: { alignment: 'left', backgroundStyle: 'white' } },
      { type: 'services', variant: 'ServicesA', settings: { columns: 3, backgroundStyle: 'white' } },
      { type: 'about', variant: 'AboutA', settings: { backgroundStyle: 'slate' } },
      { type: 'reviews', variant: 'ReviewsA', settings: { columns: 3, backgroundStyle: 'white' } },
      { type: 'faq', variant: 'FAQA', settings: { backgroundStyle: 'slate' } },
      { type: 'cta', variant: 'CTAA', settings: { backgroundStyle: 'brand' } },
      { type: 'contact', variant: 'ContactA', settings: { backgroundStyle: 'dark' } },
    ],
  },
  C2: {
    id: 'C2',
    name: 'House Cleaning',
    industry: 'cleaning',
    theme: {
      primaryColor: '#059669', // Emerald
      secondaryColor: '#064e3b',
      backgroundColor: '#ffffff',
      textColor: '#064e3b',
      fontFamily: 'sans',
      buttonStyle: 'pill',
      logoType: 'text',
    },
    sections: [
      { type: 'hero', variant: 'HeroC', settings: { alignment: 'center', backgroundStyle: 'slate' } },
      { type: 'services', variant: 'ServicesB', settings: { columns: 3, backgroundStyle: 'white' } },
      { type: 'about', variant: 'AboutA', settings: { backgroundStyle: 'slate' } },
      { type: 'reviews', variant: 'ReviewsA', settings: { columns: 3, backgroundStyle: 'white' } },
      { type: 'faq', variant: 'FAQB', settings: { backgroundStyle: 'slate' } },
      { type: 'cta', variant: 'CTAA', settings: { backgroundStyle: 'brand' } },
      { type: 'contact', variant: 'ContactA', settings: { backgroundStyle: 'dark' } },
    ],
  },
  C3: {
    id: 'C3',
    name: 'Commercial Cleaning',
    industry: 'cleaning',
    theme: {
      primaryColor: '#0d9488', // Teal
      secondaryColor: '#0f172a',
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      fontFamily: 'sans',
      buttonStyle: 'rounded',
      logoType: 'text',
    },
    sections: [
      { type: 'hero', variant: 'HeroB', settings: { alignment: 'center', overlay: true, backgroundStyle: 'dark' } },
      { type: 'services', variant: 'ServicesC', settings: { columns: 3, backgroundStyle: 'white' } },
      { type: 'about', variant: 'AboutB', settings: { backgroundStyle: 'slate' } },
      { type: 'reviews', variant: 'ReviewsA', settings: { columns: 3, backgroundStyle: 'white' } },
      { type: 'cta', variant: 'CTAC', settings: { backgroundStyle: 'dark' } },
      { type: 'contact', variant: 'ContactA', settings: { backgroundStyle: 'dark' } },
    ],
  },
  C4: {
    id: 'C4',
    name: 'Premium Cleaning',
    industry: 'cleaning',
    theme: {
      primaryColor: '#10b981', // Emerald
      secondaryColor: '#020617',
      backgroundColor: '#020617',
      textColor: '#f8fafc',
      fontFamily: 'serif',
      buttonStyle: 'square',
      logoType: 'text',
    },
    sections: [
      { type: 'hero', variant: 'HeroD', settings: { alignment: 'left', backgroundStyle: 'dark' } },
      { type: 'services', variant: 'ServicesD', settings: { columns: 3, backgroundStyle: 'dark' } },
      { type: 'about', variant: 'AboutB', settings: { backgroundStyle: 'dark' } },
      { type: 'reviews', variant: 'ReviewsA', settings: { columns: 3, backgroundStyle: 'dark' } },
      { type: 'cta', variant: 'CTAC', settings: { backgroundStyle: 'dark' } },
      { type: 'contact', variant: 'ContactA', settings: { backgroundStyle: 'dark' } },
    ],
  },
  C5: {
    id: 'C5',
    name: 'Simple Local Cleaner',
    industry: 'cleaning',
    theme: {
      primaryColor: '#0d9488',
      secondaryColor: '#0f172a',
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      fontFamily: 'sans',
      buttonStyle: 'pill',
      logoType: 'text',
    },
    sections: [
      { type: 'hero', variant: 'HeroC', settings: { alignment: 'center', backgroundStyle: 'slate' } },
      { type: 'services', variant: 'ServicesA', settings: { columns: 2, backgroundStyle: 'white' } },
      { type: 'reviews', variant: 'ReviewsA', settings: { columns: 2, backgroundStyle: 'slate' } },
      { type: 'faq', variant: 'FAQA', settings: { backgroundStyle: 'white' } },
      { type: 'cta', variant: 'CTAB', settings: { backgroundStyle: 'brand' } },
      { type: 'contact', variant: 'ContactA', settings: { backgroundStyle: 'dark' } },
    ],
  },

  // Restaurant Templates
  // R1 = Pizza & Italian — Rustic, warm, wood-fire imagery
  R1: {
    id: 'R1',
    name: 'Pizza & Italian',
    industry: 'restaurant',
    theme: {
      primaryColor: '#c2410c', // Terracotta/brick orange
      secondaryColor: '#1c0a00',
      backgroundColor: '#fffbf5', // Warm cream
      textColor: '#1c0a00',
      fontFamily: 'serif',
      buttonStyle: 'rounded',
      logoType: 'text',
    },
    sections: [
      { type: 'hero', variant: 'HeroB', settings: { alignment: 'center', overlay: true, backgroundStyle: 'dark' } },
      { type: 'menu', variant: 'MenuA', settings: { backgroundStyle: 'white' } },
      { type: 'gallery', variant: 'GalleryA', settings: { columns: 4, backgroundStyle: 'slate' } },
      { type: 'about', variant: 'AboutB', settings: { backgroundStyle: 'white' } },
      { type: 'reviews', variant: 'ReviewsA', settings: { columns: 3, backgroundStyle: 'slate' } },
      { type: 'cta', variant: 'CTAC', settings: { backgroundStyle: 'brand' } },
      { type: 'contact', variant: 'ContactA', settings: { backgroundStyle: 'dark' } },
    ],
  },
  // R2 = Mexican & Latin — Bold, vibrant, festive
  R2: {
    id: 'R2',
    name: 'Mexican & Latin',
    industry: 'restaurant',
    theme: {
      primaryColor: '#ea580c', // Bold orange
      secondaryColor: '#713f12', // Dark brown
      backgroundColor: '#ffffff',
      textColor: '#1c0a00',
      fontFamily: 'sans',
      buttonStyle: 'pill',
      logoType: 'text',
    },
    sections: [
      { type: 'hero', variant: 'HeroA', settings: { alignment: 'left', backgroundStyle: 'white' } },
      { type: 'menu', variant: 'MenuB', settings: { backgroundStyle: 'slate' } },
      { type: 'gallery', variant: 'GalleryB', settings: { columns: 3, backgroundStyle: 'white' } },
      { type: 'about', variant: 'AboutA', settings: { backgroundStyle: 'slate' } },
      { type: 'reviews', variant: 'ReviewsB', settings: { columns: 3, backgroundStyle: 'white' } },
      { type: 'cta', variant: 'CTAB', settings: { backgroundStyle: 'brand' } },
      { type: 'contact', variant: 'ContactA', settings: { backgroundStyle: 'dark' } },
    ],
  },
  // R3 = Fast Food & Burgers — High-energy, bold, craveable
  R3: {
    id: 'R3',
    name: 'Fast Food & Burgers',
    industry: 'restaurant',
    theme: {
      primaryColor: '#dc2626', // Bold red
      secondaryColor: '#f59e0b', // Yellow accent
      backgroundColor: '#0c0a09', // Dark bg
      textColor: '#f5f5f4',
      fontFamily: 'sans',
      buttonStyle: 'square',
      logoType: 'text',
    },
    sections: [
      { type: 'hero', variant: 'HeroC', settings: { alignment: 'center', backgroundStyle: 'dark' } },
      { type: 'menu', variant: 'MenuA', settings: { backgroundStyle: 'dark' } },
      { type: 'about', variant: 'AboutC', settings: { backgroundStyle: 'dark' } },
      { type: 'reviews', variant: 'ReviewsC', settings: { backgroundStyle: 'dark' } },
      { type: 'cta', variant: 'CTAB', settings: { backgroundStyle: 'brand' } },
      { type: 'contact', variant: 'ContactA', settings: { backgroundStyle: 'dark' } },
    ],
  },
  // R4 = Chinese & Asian Fusion — Elegant, minimal, modern
  R4: {
    id: 'R4',
    name: 'Chinese & Asian Fusion',
    industry: 'restaurant',
    theme: {
      primaryColor: '#b45309', // Deep gold
      secondaryColor: '#0f172a',
      backgroundColor: '#0f172a', // Very dark navy
      textColor: '#f8fafc',
      fontFamily: 'serif',
      buttonStyle: 'square',
      logoType: 'text',
    },
    sections: [
      { type: 'hero', variant: 'HeroD', settings: { alignment: 'center', backgroundStyle: 'dark' } },
      { type: 'menu', variant: 'MenuC', settings: { backgroundStyle: 'dark' } },
      { type: 'gallery', variant: 'GalleryC', settings: { columns: 3, backgroundStyle: 'dark' } },
      { type: 'about', variant: 'AboutB', settings: { backgroundStyle: 'dark' } },
      { type: 'reviews', variant: 'ReviewsA', settings: { columns: 3, backgroundStyle: 'dark' } },
      { type: 'cta', variant: 'CTAC', settings: { backgroundStyle: 'dark' } },
      { type: 'contact', variant: 'ContactA', settings: { backgroundStyle: 'dark' } },
    ],
  },
  // R5 = American Diner & BBQ — Nostalgic, hearty, classic
  R5: {
    id: 'R5',
    name: 'American Diner & BBQ',
    industry: 'restaurant',
    theme: {
      primaryColor: '#1d4ed8', // Classic diner blue
      secondaryColor: '#dc2626', // Red accent
      backgroundColor: '#fefce8', // Warm yellow-white
      textColor: '#1c1917',
      fontFamily: 'sans',
      buttonStyle: 'rounded',
      logoType: 'text',
    },
    sections: [
      { type: 'hero', variant: 'HeroA', settings: { alignment: 'left', backgroundStyle: 'white' } },
      { type: 'about', variant: 'AboutC', settings: { backgroundStyle: 'slate' } },
      { type: 'menu', variant: 'MenuB', settings: { backgroundStyle: 'white' } },
      { type: 'gallery', variant: 'GalleryA', settings: { columns: 4, backgroundStyle: 'slate' } },
      { type: 'reviews', variant: 'ReviewsA', settings: { columns: 3, backgroundStyle: 'white' } },
      { type: 'cta', variant: 'CTAA', settings: { backgroundStyle: 'brand' } },
      { type: 'contact', variant: 'ContactA', settings: { backgroundStyle: 'dark' } },
    ],
  },
};

/**
 * Flattens structured MenuCategory[] into legacy MenuItem[] format for section content.
 * This allows menu sections (MenuA/B/C) to render without changes.
 */
function flattenMenuCategories(categories: import('./types').MenuCategory[]): import('./types').MenuItem[] {
  return categories.flatMap((cat) =>
    cat.items.map((item) => ({
      id: item.id,
      name: item.name,
      category: cat.name,
      description: item.description,
      price: `$${item.price.toFixed(2)}`,
      popular: item.tags?.includes('popular'),
      image: item.image,
      dietary: item.tags?.filter((t) => t !== 'popular'),
      visible: item.available,
    }))
  );
}

/**
 * Returns the restaurant category label for display.
 */
function getRestaurantCategoryLabel(category?: string): string {
  const labels: Record<string, string> = {
    pizza: 'Pizza & Italian',
    mexican: 'Mexican & Latin',
    fastfood: 'Fast Food & Burgers',
    asian: 'Chinese & Asian Fusion',
    american: 'American Diner & BBQ',
  };
  return labels[category || ''] || 'Restaurant';
}

/**
 * Builds the initial StructuredWebsite object for a business based on its template.
 * Maps business information into structured section content!
 */
export function buildStructuredWebsite(business: NormalizedBusiness): StructuredWebsite {
  const tplDef = TEMPLATE_COMPOSITIONS[business.templateId] || TEMPLATE_COMPOSITIONS['H1'];
  const content = generateIndustryContent(business);
  const isRestaurant = business.industry === 'restaurant';

  // Resolve menu items — prefer structured menuCategories, fall back to flat menu
  const resolvedMenuItems =
    business.menuCategories && business.menuCategories.length > 0
      ? flattenMenuCategories(business.menuCategories)
      : business.menu || [];

  const theme: ThemeConfig = {
    primaryColor: tplDef.theme.primaryColor || '#059669',
    secondaryColor: tplDef.theme.secondaryColor || '#0f172a',
    backgroundColor: tplDef.theme.backgroundColor || '#ffffff',
    textColor: tplDef.theme.textColor || '#0f172a',
    fontFamily: tplDef.theme.fontFamily || 'sans',
    buttonStyle: tplDef.theme.buttonStyle || 'rounded',
    logoType: 'text',
    textLogo: {
      line1: business.name.toUpperCase(),
      line2: isRestaurant
        ? (business.cuisine || getRestaurantCategoryLabel(business.restaurantCategory))
        : (business.category || `${business.industry.toUpperCase()} SERVICES`),
      style: tplDef.theme.fontFamily === 'serif' ? 'serif' : 'stacked',
    },
  };

  const sections: WebsiteSection[] = tplDef.sections.map((sec, idx) => {
    let secContent: Record<string, any> = {};

    switch (sec.type) {
      case 'hero':
        secContent = {
          headline: content.headline,
          subheadline: content.subheadline,
          primaryCta: content.primaryCta,
          secondaryCta: content.secondaryCta || (isRestaurant ? 'View Menu' : 'Call Now'),
          image: business.photos.hero,
          badge: isRestaurant
            ? `${business.rating} ★ ${getRestaurantCategoryLabel(business.restaurantCategory)} in ${business.city}`
            : `${business.rating} ★ Local Service in ${business.city}`,
        };
        break;
      case 'services':
        secContent = {
          heading: isRestaurant ? 'Culinary Highlights' : 'Professional Services',
          subheading: 'High quality standards, reliable turnaround, and honest upfront pricing.',
          items: business.services,
        };
        break;
      case 'about':
        secContent = {
          heading: 'Our Story & Commitments',
          story: content.aboutStory,
          pillars: content.whyChooseUs,
          image: business.photos.about || business.photos.hero,
        };
        break;
      case 'gallery':
        secContent = {
          heading: isRestaurant ? 'Our Dishes & Atmosphere' : 'Recent Completed Work',
          subheading: isRestaurant
            ? `Experience the flavors and ambiance of ${business.name}.`
            : `Showcasing craftsmanship across ${business.city} and surrounding areas.`,
          images: business.photos.gallery,
        };
        break;
      case 'reviews':
        secContent = {
          heading: isRestaurant ? 'What Our Guests Say' : 'What Neighbors Say',
          subheading: `${business.rating} Stars based on ${business.reviewCount} verified ${isRestaurant ? 'guest' : 'local'} experiences.`,
          reviews: business.reviews,
        };
        break;
      case 'faq':
        secContent = {
          heading: 'Frequently Asked Questions',
          subheading: 'Clear, transparent answers about our process and service scheduling.',
          faqs: content.faqs,
        };
        break;
      case 'cta':
        secContent = {
          headline: isRestaurant
            ? `Visit ${business.name} in ${business.city}`
            : 'Ready to Get Started on Your Home?',
          subheadline: isRestaurant
            ? `Reserve a table, view our full menu, or order online today.`
            : `Contact ${business.name} in ${business.city} for prompt, reliable assistance.`,
          buttonText: content.primaryCta,
          orderUrl: business.orderUrl,
          reservationUrl: business.reservationUrl,
        };
        break;
      case 'contact':
        secContent = {
          heading: isRestaurant ? 'Find Us & Opening Hours' : 'Hours & Service Location',
          address: business.address,
          city: business.city,
          state: business.state,
          zip: business.zip,
          phone: business.phone,
          email: business.email,
          hours: business.hours,
          serviceAreas: business.serviceAreas || [business.city],
          googleMapsUrl: business.googleMapsUrl,
          instagramUrl: business.instagramUrl,
        };
        break;
      case 'menu':
        secContent = {
          heading: 'Our Menu',
          subheading: isRestaurant
            ? `${business.cuisine ? `${business.cuisine} cuisine` : 'Crafted'} with authentic ingredients and culinary care.`
            : 'Fresh daily offerings crafted with care.',
          items: resolvedMenuItems,
          menuCategories: business.menuCategories || [],
          orderUrl: business.orderUrl,
          currency: business.currency || 'USD',
        };
        break;
      case 'reservations':
        secContent = {
          heading: 'Reserve a Table',
          subheading: `Book your experience at ${business.name}. We look forward to hosting you.`,
          reservationUrl: business.reservationUrl,
          phone: business.phone,
        };
        break;
    }

    return {
      id: `sec-${sec.type}-${idx + 1}`,
      type: sec.type,
      variant: sec.variant,
      order: idx + 1,
      visible: true,
      content: secContent,
      settings: sec.settings || { alignment: 'left', backgroundStyle: 'white' },
    };
  });

  const defaultPages: WebsitePage[] = [
    {
      id: 'page-home',
      name: 'Home',
      slug: 'home',
      title: `${business.name} | ${business.city}, ${business.state}`,
      sections,
      visible: true,
      isProtected: true,
    },
  ];

  // Build navigation — restaurants get menu/reservations instead of services/blog
  const defaultNav: NavigationItem[] = isRestaurant
    ? [
        { id: 'nav-home', label: 'Home', pageSlug: 'home', visible: true, order: 1 },
        { id: 'nav-menu', label: 'Menu', pageSlug: 'menu', visible: true, order: 2 },
        { id: 'nav-about', label: 'About', pageSlug: 'about', visible: true, order: 3 },
        { id: 'nav-reservations', label: 'Reservations', pageSlug: 'reservations', visible: true, order: 4 },
        { id: 'nav-reviews', label: 'Reviews', pageSlug: 'reviews', visible: true, order: 5 },
        { id: 'nav-contact', label: 'Contact', pageSlug: 'contact', visible: true, order: 6 },
      ]
    : [
        { id: 'nav-home', label: 'Home', pageSlug: 'home', visible: true, order: 1 },
        { id: 'nav-services', label: 'Services', pageSlug: 'services', visible: true, order: 2 },
        { id: 'nav-about', label: 'About', pageSlug: 'about', visible: true, order: 3 },
        { id: 'nav-reviews', label: 'Reviews', pageSlug: 'reviews', visible: true, order: 4 },
        { id: 'nav-blog', label: 'Blog', pageSlug: 'blog', visible: true, order: 5 },
        { id: 'nav-contact', label: 'Contact', pageSlug: 'contact', visible: true, order: 6 },
      ];

  return {
    id: `site-${business.id}`,
    businessId: business.id,
    templateId: business.templateId,
    theme,
    pages: defaultPages,
    navigation: defaultNav,
    revisions: [],
    isDraft: false,
    lastSavedAt: new Date().toISOString(),
  };
}

