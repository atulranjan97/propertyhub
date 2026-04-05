import NextAuth from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

const handler = NextAuth(authOptions);

// export handler inside of this route file convention of next.js as an HTTP request, so either as a GET request or a POST request, a PUT, a DELETE or whatever it is
// for our case we are going to export it as GET and POST, that is what next-auth uses a GET request and a POST request
export { handler as GET, handler as POST };
// so, whenever a GET request or a POST request is made to /api/auth, `NextAuth(authOptions)` is going to take over

// now we need to wrap our app to `SessionProvider`
// with the `SessionProvider`, it's gonna need to be a client component and obviously we don't want to make the `layout.jsx` a client component so what we'll do is create a seperate component for the `SessionProvider`, make that a client component and then bring it into our layout

// create `AuthProvider.jsx` in components folder and make it a client component
/* 
    export {handler as GET, handler as POST}

    is equivalent to

    export const GET = handler;
    export const POST = handler;
*/

// here we are configuring NextAuth
// telling which provider is going to be used
// Reason: NextAuth internally isi config se OAuth flow start karta hai