// middleware.js
// export { default } from 'next-auth/middleware';

// export const config = {
//   matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
// };

// Method 1:
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req) {
  const path = req.nextUrl.pathname;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    // return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
// ye function har request pe run hoga

export const config = {
  matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
};

// getToken(...):
//  - Cookie se token uthata hai
//  - `NEXTAUTH_SECRET` se verify karta hai
//  - Decode karke object de deta hai

// This protects:
//  - pages
//  - API routes
//  - everything under /properties/add, /profile, /properties/saved, /message
