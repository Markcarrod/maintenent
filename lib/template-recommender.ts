import { Industry } from './types';

export interface TemplateDefinition {
  id: string;
  industry: Industry;
  name: string;
  target: string;
  style: string;
  recommendedFor: string;
  badge: string;
}

export const TEMPLATE_REGISTRY: Record<string, TemplateDefinition> = {
  // Handyman
  H1: {
    id: 'H1',
    industry: 'handyman',
    name: 'Local Pro',
    target: 'General handyman / home repair',
    style: 'Clean white, strong dark typography, large hero photo, phone CTA & free quote banner',
    recommendedFor: 'General home repairs & handyman services',
    badge: 'Popular Pro',
  },
  H2: {
    id: 'H2',
    industry: 'handyman',
    name: 'Project Focused',
    target: 'Handymen doing larger home remodeling & renovation',
    style: 'Large project photography, before/after showcase, structured visual hierarchy',
    recommendedFor: 'Remodeling, decks, carpentry, larger installations',
    badge: 'Showcase',
  },
  H3: {
    id: 'H3',
    industry: 'handyman',
    name: 'Fast Local Service',
    target: 'Handymen focused on repairs, small jobs, and urgent fixes',
    style: 'Ultra-fast loading, phone-first, high-visibility same-day availability badge',
    recommendedFor: 'Urgent repairs, small fixture fixes, quick turnaround',
    badge: 'Fast Response',
  },
  H4: {
    id: 'H4',
    industry: 'handyman',
    name: 'Premium Home Improvement',
    target: 'Higher-end craftsman, bespoke carpentry & luxury remodels',
    style: 'Sophisticated typography, spacious airy layout, craftsmanship philosophy',
    recommendedFor: 'High-end carpentry, custom cabinetry, luxury finishes',
    badge: 'Luxury Finish',
  },
  H5: {
    id: 'H5',
    industry: 'handyman',
    name: 'Trust First',
    target: 'Established local handyman businesses with extensive reviews',
    style: 'Trust-oriented, verified reviews banner, transparent credentials & guarantees',
    recommendedFor: 'Established businesses with 30+ 5-star reviews',
    badge: 'Top Rated',
  },

  // Cleaning
  C1: {
    id: 'C1',
    industry: 'cleaning',
    name: 'Professional Cleaning',
    target: 'Residential cleaning companies & maid services',
    style: 'Bright, crisp, premium, high-res photography, instant quote estimator banner',
    recommendedFor: 'Standard residential recurring cleaning',
    badge: 'Most Popular',
  },
  C2: {
    id: 'C2',
    industry: 'cleaning',
    name: 'House Cleaning',
    target: 'Residential house cleaners & deep clean specialists',
    style: 'Room-by-room breakdown, eco-friendly badge, detailed checklists',
    recommendedFor: 'Housekeeping, move-in/move-out, room checklists',
    badge: 'Deep Clean',
  },
  C3: {
    id: 'C3',
    industry: 'cleaning',
    name: 'Commercial Cleaning',
    target: 'Janitorial, commercial offices, medical & corporate facilities',
    style: 'Corporate B2B layout, industries served matrix, compliance highlights',
    recommendedFor: 'Offices, commercial spaces, janitorial contracts',
    badge: 'Commercial',
  },
  C4: {
    id: 'C4',
    industry: 'cleaning',
    name: 'Premium Cleaning',
    target: 'Higher-end residential estates & luxury detailing',
    style: 'Spacious editorial, white-glove experience narrative, high-end interior gallery',
    recommendedFor: 'Estates, luxury residences, bespoke housekeeping',
    badge: 'White-Glove',
  },
  C5: {
    id: 'C5',
    industry: 'cleaning',
    name: 'Simple Local Cleaner',
    target: 'Independent local cleaners & small friendly teams',
    style: 'Direct, friendly, one-tap quote/phone CTA, transparent service radius',
    recommendedFor: 'Sole proprietors & boutique neighborhood teams',
    badge: 'Local Friendly',
  },

  // Restaurants
  R1: {
    id: 'R1',
    industry: 'restaurant',
    name: 'Modern Restaurant',
    target: 'Contemporary bistros, modern grills, and urban dining',
    style: 'Large food photography, modern typography, clean categorized menu & reservations',
    recommendedFor: 'Contemporary dining, gastro-pubs, bistros',
    badge: 'Modern Dining',
  },
  R2: {
    id: 'R2',
    industry: 'restaurant',
    name: 'Casual Local Restaurant',
    target: 'Family restaurants, diners, neighborhood pizzerias & cafes',
    style: 'Warm, welcoming, chef specials showcase, easy pickup/call banner',
    recommendedFor: 'Family restaurants, diners, neighborhood spots',
    badge: 'Family Favorite',
  },
  R3: {
    id: 'R3',
    industry: 'restaurant',
    name: 'Premium Dining',
    target: 'Fine dining, upscale steakhouses & wine bars',
    style: 'Luxury editorial typography, tasting experience narrative, chef story',
    recommendedFor: 'Fine dining, upscale steakhouses, tasting menus',
    badge: 'Fine Dining',
  },
  R4: {
    id: 'R4',
    industry: 'restaurant',
    name: 'Takeout / Fast Casual',
    target: 'Takeout, quick-service, burger joints, sushi-to-go',
    style: 'High-conversion ordering banner, combo highlights, quick pickup/delivery info',
    recommendedFor: 'Fast casual, takeout, delivery-heavy restaurants',
    badge: 'Quick Order',
  },
  R5: {
    id: 'R5',
    industry: 'restaurant',
    name: 'Food & Community',
    target: 'Community gathering spots, breweries, cafes with live events',
    style: 'Storytelling-heavy, community gallery, weekly specials & events schedule',
    recommendedFor: 'Taprooms, community cafes, event-friendly venues',
    badge: 'Community Hub',
  },
};

export function recommendTemplate(params: {
  industry: Industry;
  category?: string;
  description?: string;
  reviewCount?: number;
  rating?: number;
}): string {
  const { industry, category = '', description = '', reviewCount = 0 } = params;
  const combinedText = `${category} ${description}`.toLowerCase();

  if (industry === 'restaurant') {
    if (combinedText.includes('fine dining') || combinedText.includes('upscale') || combinedText.includes('luxury') || combinedText.includes('wine bar') || combinedText.includes('steakhouse')) {
      return 'R3';
    }
    if (combinedText.includes('takeout') || combinedText.includes('fast casual') || combinedText.includes('quick service') || combinedText.includes('delivery') || combinedText.includes('burger') || combinedText.includes('pizza to go')) {
      return 'R4';
    }
    if (combinedText.includes('community') || combinedText.includes('brewery') || combinedText.includes('craft beer') || combinedText.includes('events') || combinedText.includes('taproom')) {
      return 'R5';
    }
    if (combinedText.includes('family') || combinedText.includes('casual') || combinedText.includes('diner') || combinedText.includes('neighborhood') || combinedText.includes('cafe')) {
      return 'R2';
    }
    return 'R1';
  }

  if (industry === 'cleaning') {
    if (combinedText.includes('commercial') || combinedText.includes('office') || combinedText.includes('janitorial') || combinedText.includes('corporate') || combinedText.includes('building')) {
      return 'C3';
    }
    if (combinedText.includes('luxury') || combinedText.includes('estate') || combinedText.includes('premium') || combinedText.includes('white glove')) {
      return 'C4';
    }
    if (combinedText.includes('deep clean') || combinedText.includes('move-in') || combinedText.includes('move out') || combinedText.includes('room by room')) {
      return 'C2';
    }
    if (combinedText.includes('solo') || combinedText.includes('simple') || combinedText.includes('independent') || combinedText.includes('neighborhood')) {
      return 'C5';
    }
    return 'C1';
  }

  // Handyman
  if (reviewCount >= 35) {
    return 'H5'; // Trust First
  }
  if (combinedText.includes('remodel') || combinedText.includes('renovation') || combinedText.includes('addition') || combinedText.includes('deck') || combinedText.includes('large project')) {
    return 'H2';
  }
  if (combinedText.includes('luxury') || combinedText.includes('craftsman') || combinedText.includes('custom carpentry') || combinedText.includes('cabinetry')) {
    return 'H4';
  }
  if (combinedText.includes('emergency') || combinedText.includes('urgent') || combinedText.includes('same day') || combinedText.includes('small job') || combinedText.includes('quick fix')) {
    return 'H3';
  }

  return 'H1';
}
