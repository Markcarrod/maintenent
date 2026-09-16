import fs from 'fs';
import path from 'path';
import { NormalizedBusiness, PreviewData, StructuredWebsite } from '../lib/types';
import { buildStructuredWebsite } from '../lib/template-compositions';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseAddress(fullAddr: string): { address: string; city: string; state: string; zip: string } {
  if (!fullAddr) {
    return { address: '', city: 'Local Area', state: 'US', zip: '' };
  }
  const parts = fullAddr.split(',').map((p) => p.trim());
  if (parts.length >= 3) {
    const address = parts[0];
    const city = parts[1];
    const stateZip = parts[2].trim().split(/\s+/);
    const state = stateZip[0] || 'US';
    const zip = stateZip[1] || '';
    return { address, city, state, zip };
  } else if (parts.length === 2) {
    return { address: parts[0], city: parts[1], state: 'US', zip: '' };
  }
  return { address: fullAddr, city: 'Local Area', state: 'US', zip: '' };
}

function determineIndustry(category: string, name: string): 'restaurant' | 'cleaning' | 'handyman' {
  const c = (category + ' ' + name).toLowerCase();
  if (
    c.includes('restaurant') ||
    c.includes('pizza') ||
    c.includes('pub') ||
    c.includes('grill') ||
    c.includes('cafe') ||
    c.includes('diner') ||
    c.includes('bar') ||
    c.includes('food') ||
    c.includes('ice cream') ||
    c.includes('bakery') ||
    c.includes('confection') ||
    c.includes('brewery') ||
    c.includes('steak') ||
    c.includes('sushi') ||
    c.includes('catering') ||
    c.includes('supermarket') ||
    c.includes('grocery') ||
    c.includes('nutrition') ||
    c.includes('dessert') ||
    c.includes('coffee') ||
    c.includes('taco') ||
    c.includes('bbq') ||
    c.includes('barbecue') ||
    c.includes('market') ||
    c.includes('liquor') ||
    c.includes('donut') ||
    c.includes('eats') ||
    c.includes('eatery')
  ) {
    return 'restaurant';
  }

  if (c.includes('clean') || c.includes('maid') || c.includes('wash') || c.includes('janitorial')) {
    return 'cleaning';
  }

  return 'handyman';
}

function getPhotosForIndustry(industry: string, name: string) {
  const n = name.toLowerCase();
  if (industry === 'restaurant') {
    if (n.includes('pizza')) {
      return {
        hero: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80',
        about: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
        ],
        services: [],
      };
    }
    if (n.includes('coffee') || n.includes('cafe') || n.includes('bakery') || n.includes('donut') || n.includes('ice cream')) {
      return {
        hero: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80',
        about: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80',
        ],
        services: [],
      };
    }
    if (n.includes('bbq') || n.includes('barbecue') || n.includes('grill') || n.includes('steak') || n.includes('burger')) {
      return {
        hero: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80',
        about: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        ],
        services: [],
      };
    }
    return {
      hero: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
      about: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
      ],
      services: [],
    };
  }

  if (industry === 'cleaning') {
    return {
      hero: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80',
      about: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      ],
      services: [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
      ],
    };
  }

  // Handyman & Trades
  return {
    hero: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80',
    about: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    ],
  };
}

async function run() {
  const filePath = path.join(process.cwd(), 'fbreply3.txt');
  if (!fs.existsSync(filePath)) {
    console.error('fbreply3.txt not found!');
    return;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);

  // Skip header: Name|Category|Phone|Address|Rating|Review Count|Website|Pitch Strategy
  const dataLines = lines.slice(1);

  const dbPath = path.join(process.cwd(), 'data', 'db.json');
  let db: any = {
    businesses: [],
    websites: {},
    previews: {},
    feedbacks: [],
    leads: [],
    domains: {},
    events: [],
    blogPosts: [],
    mediaItems: [],
  };

  if (fs.existsSync(dbPath)) {
    try {
      db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    } catch {}
  }

  const outputList: string[] = [];
  const usedSlugs = new Set<string>(db.businesses.map((b: any) => b.slug));

  for (const line of dataLines) {
    const cols = line.split('|').map((c) => c.trim());
    if (cols.length < 2) continue;

    const name = cols[0];
    const rawCategory = cols[1] || 'Local Business';
    const phone = cols[2] || '(555) 019-2831';
    const fullAddress = cols[3] || '';
    const rating = parseFloat(cols[4]) || 4.8;
    const reviewCount = parseInt(cols[5], 10) || 45;

    let baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 1;
    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    usedSlugs.add(slug);

    const { address, city, state, zip } = parseAddress(fullAddress);
    const industry = determineIndustry(rawCategory, name);
    const photos = getPhotosForIndustry(industry, name);

    const business: NormalizedBusiness = {
      id: `lead-${slug}`,
      slug,
      name,
      industry,
      category: rawCategory,
      description: `Welcome to ${name}. We proudly serve ${city} and surrounding areas with top-tier ${rawCategory.toLowerCase()} services, prioritizing customer satisfaction, quality craftsmanship, and reliable communication.`,
      tagline: `Your Trusted Local Destination for ${rawCategory} in ${city}`,
      phone,
      email: `contact@${slug}.com`,
      address: address || '100 Main St',
      city: city || 'Local Area',
      state: state || 'US',
      zip: zip || '',
      hours: {
        'Monday - Friday': '8:00 AM - 6:00 PM',
        'Saturday': '9:00 AM - 4:00 PM',
        'Sunday': 'Closed',
      },
      rating,
      reviewCount,
      photos,
      services:
        industry === 'restaurant'
          ? []
          : [
              {
                id: `srv-${slug}-1`,
                name: 'Primary Service & Consultation',
                description: `Professional, prompt ${rawCategory.toLowerCase()} service tailored to your exact specifications.`,
                badge: 'Most Popular',
                popular: true,
                image: photos.hero,
              },
              {
                id: `srv-${slug}-2`,
                name: 'Complete Maintenance & Upkeep',
                description: 'Comprehensive routine care and emergency callouts delivered with utmost reliability.',
                badge: 'Verified Care',
                popular: true,
                image: photos.about,
              },
            ],
      menuCategories:
        industry === 'restaurant'
          ? [
              {
                id: `cat-${slug}-1`,
                name: 'House Favorites',
                description: 'Chef-prepared favorites crafted fresh daily with quality local ingredients.',
                items: [
                  {
                    id: `dish-${slug}-1`,
                    name: `${name} Signature Special`,
                    description: 'Our award-winning house specialty served fresh to order.',
                    price: 18.5,
                    tags: ['chef-signature', 'popular'],
                    available: true,
                    image: photos.hero,
                  },
                  {
                    id: `dish-${slug}-2`,
                    name: 'Artisan Combo Platter',
                    description: 'A generous combination of our most popular seasonal selections.',
                    price: 15.0,
                    tags: ['popular'],
                    available: true,
                    image: photos.about,
                  },
                ],
              },
            ]
          : undefined,
      reviews: [
        {
          id: `rev-${slug}-1`,
          author: 'Alex M.',
          rating: 5,
          date: '2 weeks ago',
          comment: `Hands down the best ${rawCategory.toLowerCase()} in ${city}! Fantastic customer service and great experience from start to finish.`,
          serviceOrDish: 'Verified Service',
          verified: true,
        },
        {
          id: `rev-${slug}-2`,
          author: 'Jessica T.',
          rating: 5,
          date: '1 month ago',
          comment: `Super friendly staff and prompt service. Highly recommend ${name} to everyone in our community!`,
          serviceOrDish: 'Community Favorite',
          verified: true,
        },
      ],
      templateId: industry === 'restaurant' ? 'R1' : industry === 'cleaning' ? 'C1' : 'H1',
      serviceAreas: [city, 'Surrounding Metro Areas'],
    };

    // Add or update in db.businesses
    const existingIdx = db.businesses.findIndex((b: any) => b.slug === slug || b.id === business.id);
    if (existingIdx >= 0) {
      db.businesses[existingIdx] = business;
    } else {
      db.businesses.push(business);
    }

    // Initialize Preview record
    if (!db.previews[business.id]) {
      db.previews[business.id] = {
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

    // Build structured website
    db.websites[business.id] = buildStructuredWebsite(business);

    outputList.push(`${name}|https://${slug}.buyerradar.app (Preview: https://buyerradar.app/preview/${slug})`);
  }

  // Save DB
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');

  console.log(`\n=== GENERATED ${outputList.length} WEBSITES SUCCESSFULLY ===\n`);
  outputList.forEach((line) => {
    console.log(line);
  });
}

run();
