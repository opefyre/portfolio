import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(_request: NextRequest) {
    const response = NextResponse.next();

    // Security Headers
    // Prevent clickjacking
    response.headers.set('X-Frame-Options', 'DENY');
    // Prevent MIME type sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff');
    // Control referrer information
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    // Enforce HTTPS (HSTS) - 1 year
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

    // Minimal permissions policy
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');

    return response;
}

export const config = {
    matcher: '/:path*',
};
