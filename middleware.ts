/**
 * Next.js Middleware
 * Purpose: Apply rate limiting and security headers at the edge
 * 
 * This file already exists, but we're adding rate limiting here
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// OPTIMIZED: In-memory rate limiter with automatic cleanup
// CRITICAL FIX: Removed setInterval to prevent CPU usage
// Instead, cleanup happens during rate limit checks (lazy cleanup)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_MAP_SIZE = 10000; // Prevent memory leak
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes

function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  
  // Lazy cleanup: Only clean up periodically during checks (not with setInterval)
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    let cleaned = 0;
    for (const [mapIp, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(mapIp);
        cleaned++;
      }
    }
    lastCleanup = now;
    
    // If map is too large, remove oldest entries
    if (rateLimitMap.size > MAX_MAP_SIZE) {
      const entries = Array.from(rateLimitMap.entries());
      entries.sort((a, b) => a[1].resetTime - b[1].resetTime);
      const toRemove = entries.slice(0, Math.floor(MAX_MAP_SIZE * 0.2));
      toRemove.forEach(([mapIp]) => rateLimitMap.delete(mapIp));
    }
  }
  
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  return true;
}

export function middleware(request: NextRequest) {
  // Get IP from headers (NextRequest doesn't have .ip property)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown';
  const pathname = request.nextUrl.pathname;
  
  // Apply rate limiting to API routes
  if (pathname.startsWith('/api/')) {
    // Stricter limits for contact form
    if (pathname.startsWith('/api/contact')) {
      if (!checkRateLimit(ip, 3, 60 * 60 * 1000)) { // 3 per hour
        return NextResponse.json(
          { success: false, error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
    } else {
      // General API rate limit
      if (!checkRateLimit(ip, 100, 15 * 60 * 1000)) { // 100 per 15 minutes
        return NextResponse.json(
          { success: false, error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
    }
  }
  
  // Security headers (already configured in next.config.ts, but adding here for edge)
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // HTTPS redirect (if not already in production)
  if (process.env.NODE_ENV === 'production' && request.headers.get('x-forwarded-proto') !== 'https') {
    const url = request.nextUrl.clone();
    url.protocol = 'https';
    return NextResponse.redirect(url);
  }
  
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
