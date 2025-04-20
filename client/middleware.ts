import { NextResponse } from 'next/server';
import  { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log('Middleware executing for path:', pathname);
  
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  if (!pathname.includes('/auth/')) {
    console.log('Redirecting to auth');
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api).*)'],
};