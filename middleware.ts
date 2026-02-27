import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const FIREBASE_CONNECT_SOURCES = [
    "https://firestore.googleapis.com",
    "https://identitytoolkit.googleapis.com",
    "https://securetoken.googleapis.com",
    "https://firebaseinstallations.googleapis.com",
    "https://www.googleapis.com",
    "https://*.firebaseio.com",
];

const CONTENT_SECURITY_POLICY_BASE = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src 'self' ${FIREBASE_CONNECT_SOURCES.join(" ")}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "frame-src 'none'",
    "upgrade-insecure-requests",
];

const buildContentSecurityPolicy = (nonce: string) => {
    const csp = [...CONTENT_SECURITY_POLICY_BASE];

    csp[1] = `script-src 'self' 'nonce-${nonce}'`;
    csp[2] = `style-src 'self' 'nonce-${nonce}'`;

    return csp.join("; ");
};

export function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    const nonce = btoa(crypto.randomUUID()).replace(/=+$/g, "");
    requestHeaders.set("x-nonce", nonce);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
    const contentSecurityPolicy = buildContentSecurityPolicy(nonce);
    const cspHeaderName = process.env.CSP_REPORT_ONLY === "true"
        ? "Content-Security-Policy-Report-Only"
        : "Content-Security-Policy";

    response.headers.set("x-nonce", nonce);

    // Security Headers (local/dev fallback; production headers are configured in firebase.json)
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
    response.headers.set("X-DNS-Prefetch-Control", "off");
    response.headers.set("X-Permitted-Cross-Domain-Policies", "none");
    response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
    response.headers.set(cspHeaderName, contentSecurityPolicy);

    return response;
}

export const config = {
    matcher: "/:path*",
};
