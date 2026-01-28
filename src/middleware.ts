import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    if ((path.startsWith('/admin') || path.startsWith('/api/admin')) && process.env.NODE_ENV === 'production') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (path.startsWith('/admin')) {
        const adminCookie = request.cookies.get('admin_access');

        if (!adminCookie || adminCookie.value !== 'true') {
            return NextResponse.redirect(new URL('/auth/signin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
