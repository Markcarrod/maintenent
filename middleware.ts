import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Exclude static assets, api routes, admin, and _next
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/favicon.ico') ||
    url.pathname.startsWith('/preview') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Detect subdomain (e.g. "mikes-handyman.localhost:3000" or "mikes-handyman.platform.com")
  const currentHost = hostname.split(':')[0];
  const parts = currentHost.split('.');

  // If there's a subdomain and it's not "www" or "app"
  if (parts.length >= 2) {
    const isLocalhost = currentHost.endsWith('localhost');
    let subdomain: string | null = null;

    if (isLocalhost && parts.length >= 2 && parts[0] !== 'localhost') {
      subdomain = parts[0];
    } else if (!isLocalhost && parts.length >= 3 && parts[0] !== 'www' && parts[0] !== 'app') {
      subdomain = parts[0];
    }

    if (subdomain) {
      url.pathname = `/preview/${subdomain}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
