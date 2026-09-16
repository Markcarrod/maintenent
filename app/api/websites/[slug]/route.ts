import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const business = store.getBusinessBySlug(slug);
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    const website = store.getWebsite(business.id);
    const preview = store.getPreview(business.id);

    return NextResponse.json({
      success: true,
      business,
      website,
      preview,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const business = store.getBusinessBySlug(slug);
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    const body = await req.json();
    const { action } = body;

    let website = store.getWebsite(business.id);

    switch (action) {
      case 'reorder_sections': {
        const { sectionIds } = body;
        website = store.reorderSections(business.id, sectionIds);
        break;
      }
      case 'toggle_visibility': {
        const { sectionId } = body;
        website = store.toggleSectionVisibility(business.id, sectionId);
        break;
      }
      case 'switch_variant': {
        const { sectionId, newVariant } = body;
        website = store.switchSectionVariant(business.id, sectionId, newVariant);
        break;
      }
      case 'update_section': {
        const { sectionId, content, settings } = body;
        website = store.updateSection(business.id, sectionId, content, settings);
        break;
      }
      case 'update_theme': {
        const { theme } = body;
        website = store.updateWebsite(business.id, { theme });
        break;
      }
      case 'switch_template': {
        const { templateId } = body;
        website = store.switchWebsiteTemplate(business.id, templateId);
        break;
      }
      case 'save_revision': {
        const { label } = body;
        store.saveRevision(business.id, label || 'Manual Save');
        website = store.getWebsite(business.id);
        break;
      }
      case 'restore_revision': {
        const { revisionId } = body;
        website = store.restoreRevision(business.id, revisionId);
        break;
      }
      case 'publish': {
        website = store.publishWebsite(business.id);
        break;
      }
      case 'update_business': {
        const { updates } = body;
        store.updateBusiness(business.id, updates);
        website = store.getWebsite(business.id);
        break;
      }
      case 'update_menu': {
        const { menuCategories } = body;
        store.updateBusiness(business.id, { menuCategories });
        website = store.getWebsite(business.id);
        break;
      }
      default: {
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
      }
    }

    return NextResponse.json({
      success: true,
      website,
      business: store.getBusinessById(business.id),
    });
  } catch (error) {
    console.error('Error updating website:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
