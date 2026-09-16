import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Exclude static assets, api routes, admin, dashboard, preview, and files
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/dashboard') ||
    url.pathname.startsWith('/favicon.ico') ||
    url.pathname.startsWith('/preview') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Detect subdomain routing
  const currentHost = hostname.split(':')[0].toLowerCase();
  const parts = currentHost.split('.');

  let subdomain: string | null = null;

  if (currentHost.endsWith('localhost') || currentHost === '127.0.0.1') {
    // e.g. "mikes-handyman.localhost" (2 parts)
    if (parts.length >= 2 && parts[0] !== 'localhost' && parts[0] !== '127') {
      subdomain = parts[0];
    }
  } else if (currentHost.endsWith('vercel.app')) {
    // e.g. "mikes-handyman.maintenent.vercel.app" (4 parts)
    // "maintenent.vercel.app" (3 parts) is the ROOT domain -> do NOT rewrite!
    if (parts.length >= 4 && parts[0] !== 'www' && parts[0] !== 'app') {
      subdomain = parts[0];
    }
  } else {
    // Custom domain platform, e.g. "mikes-handyman.previewplatform.com" (3 parts)
    // Root domain "previewplatform.com" (2 parts)
    if (parts.length >= 3 && parts[0] !== 'www' && parts[0] !== 'app') {
      subdomain = parts[0];
    }
  }

  if (subdomain) {
    url.pathname = /preview/;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
