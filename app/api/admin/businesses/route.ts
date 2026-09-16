import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { recommendTemplate } from '@/lib/template-recommender';
import { NormalizedBusiness, Industry } from '@/lib/types';

export async function GET() {
  try {
    const businesses = store.getAllBusinesses();
    const previews = businesses.map(b => ({
      business: b,
      preview: store.getPreview(b.id),
      domain: store.getDomain(b.id),
    }));
    const stats = store.getStats();

    return NextResponse.json({
      items: previews,
      stats,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      industry: rawIndustry,
      category,
      description,
      phone,
      email,
      address,
      city,
      state,
      zip,
      templateOverride,
      customSlug,
    } = body;

    if (!name || !city) {
      return NextResponse.json({ error: 'Business name and city are required' }, { status: 400 });
    }

    // Auto-detect industry if not explicitly chosen
    let industry: Industry = 'handyman';
    const textToAnalyze = `${name} ${category || ''} ${description || ''} ${rawIndustry || ''}`.toLowerCase();
    if (textToAnalyze.includes('clean') || textToAnalyze.includes('maid') || textToAnalyze.includes('janitorial') || textToAnalyze.includes('housekeeping')) {
      industry = 'cleaning';
    } else if (textToAnalyze.includes('restaurant') || textToAnalyze.includes('bistro') || textToAnalyze.includes('trattoria') || textToAnalyze.includes('cafe') || textToAnalyze.includes('pizza') || textToAnalyze.includes('dining') || textToAnalyze.includes('grill') || textToAnalyze.includes('kitchen') || textToAnalyze.includes('food')) {
      industry = 'restaurant';
    } else if (rawIndustry && ['handyman', 'cleaning', 'restaurant'].includes(rawIndustry)) {
      industry = rawIndustry as Industry;
    }

    // Template selection
    const autoTemplate = recommendTemplate({
      industry,
      category,
      description,
      reviewCount: 20,
    });
    const templateId = templateOverride || autoTemplate;

    // Generate clean slug
    const baseSlug = customSlug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let slug = baseSlug;
    let counter = 1;
    while (store.getBusinessBySlug(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Fallback photos based on industry
    const photosByIndustry: Record<Industry, { hero: string; gallery: string[] }> = {
      handyman: {
        hero: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
        ],
      },
      cleaning: {
        hero: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80',
        ],
      },
      restaurant: {
        hero: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        ],
      },
    };

    const newBusiness: NormalizedBusiness = {
      id: `biz-${Date.now()}`,
      slug,
      name,
      industry,
      category: category || `${industry.charAt(0).toUpperCase() + industry.slice(1)} Services`,
      description: description || `Professional ${industry} services for local customers in ${city}, ${state || ''}. Quality, dependable, and upfront service.`,
      phone: phone || '555-0100',
      email: email || `info@${slug}.com`,
      address: address || `Main Street`,
      city,
      state: state || '',
      zip: zip || '',
      hours: {
        'Monday - Friday': '8:00 AM - 5:30 PM',
        'Saturday': '9:00 AM - 2:00 PM',
      },
      rating: 4.9,
      reviewCount: 28,
      photos: {
        hero: photosByIndustry[industry].hero,
        gallery: photosByIndustry[industry].gallery,
      },
      services: [
        {
          id: 'srv-1',
          name: industry === 'restaurant' ? 'Signature Dining' : 'Standard Service',
          description: `Reliable and prompt ${industry} service delivered with high quality standards.`,
          badge: 'Popular',
          popular: true,
        },
        {
          id: 'srv-2',
          name: industry === 'restaurant' ? 'Chef Specials' : 'Comprehensive Care',
          description: `Thorough and attentive workmanship tailored to your exact needs.`,
        },
      ],
      menu: industry === 'restaurant' ? [
        { id: 'm-1', name: 'Chef Special Course', category: 'Entrees', description: 'Fresh seasonal preparation with premium local ingredients.', price: '$24' },
        { id: 'm-2', name: 'Artisan Appetizer', category: 'Starters', description: 'Crisp, handcrafted opening dish to start your meal.', price: '$14' },
      ] : undefined,
      reviews: [
        {
          id: 'rev-1',
          author: 'Alex G.',
          rating: 5,
          date: '1 week ago',
          comment: `Great experience with ${name}. Communicative, punctual, and delivered quality work.`,
          verified: true,
        },
      ],
      templateId,
      serviceAreas: [city, 'Surrounding neighborhoods'],
    };

    store.createBusiness(newBusiness);

    return NextResponse.json({
      success: true,
      business: newBusiness,
      previewUrl: `/preview/${slug}`,
    });
  } catch (error) {
    console.error('Error importing business:', error);
    return NextResponse.json({ error: 'Failed to import business' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessId, templateId, previewStatus, dmStatus } = body;

    if (!businessId) {
      return NextResponse.json({ error: 'Missing businessId' }, { status: 400 });
    }

    if (templateId) {
      store.updateBusiness(businessId, { templateId });
    }

    if (previewStatus) {
      store.updatePreviewStatus(businessId, previewStatus);
    }

    if (dmStatus) {
      store.updatePreviewDmStatus(businessId, dmStatus);
    }

    const business = store.getBusinessById(businessId);
    const preview = store.getPreview(businessId);

    return NextResponse.json({ success: true, business, preview });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
