// middleware.js
// export { default } from 'next-auth/middleware';

// export const config = {
//   matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
// };

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req) {
  const path = req.nextUrl.pathname;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // console.log(token)

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
// ye function har request pe run hoga

export const config = {
  matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
};
