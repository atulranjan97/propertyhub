/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',  // sirf http wali images allowed
        hostname: 'lh3.googleusercontent.com',  // sirf Google ke server se images allowed
        pathname: '**',   // is domain ke sare paths allowed
      },
    ],
  },
};

export default nextConfig;


/* ---------------------Displaying Google Profile Images in Next.js (NextAuth)---------------------
When using NextAuth.js with Google authentication in a Next.js application, the user’s profile image is available through session.user.image. However, a common problem arises when trying to display this image using the built-in <Image /> component. By default, Next.js does not allow loading images from external URLs for security and performance reasons. Since Google profile images are hosted on an external domain (typically https://lh3.googleusercontent.com/...), the image may fail to load or appear broken.

To solve this issue, Next.js requires explicit configuration to allow images from trusted external sources. This is done in the next.config.js file using the images configuration. The modern and recommended approach is to use remotePatterns, which provides more control and security compared to the older domains option. In this configuration, you define the allowed protocol (such as https), the hostname (such as lh3.googleusercontent.com), and the pathname pattern (** means all paths are allowed). This tells Next.js that it is safe to fetch and optimize images from this specific source.

Here is the configuration:
@type {import('next').NextConfig} 

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;

After adding this configuration, Next.js will allow Google profile images to be rendered properly using the <Image /> component. You can then display the user’s profile image like this:

import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();

  return (
    <Image
      src={session.user.image}
      alt="User Profile"
      width={50}
      height={50}
    />
  );
}

It is important to restart the development server after making changes to next.config.js, otherwise the new settings will not take effect. Once everything is configured correctly, the Google profile image will load smoothly with all the optimization benefits provided by Next.js, such as lazy loading and improved performance.

*/