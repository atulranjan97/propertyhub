'use client';   // This MUST be a client component

import dynamic from 'next/dynamic';
import Spinner from './Spinner';

const PropertyMap = dynamic(() => import('./PropertyMap'), {
  ssr: false,
  loading: () => <Spinner />,
});

const PropertyMapWrapper = ({ property }) => {
  return <PropertyMap property={property} />;
};

export default PropertyMapWrapper;

// In the `Next.js` App Router, the component that performs the dynamic import with `{ ssr: false }` must be a Client Component
// Unsupported in Server Components: Next.js does not allow the `ssr: false` option within Server Components. Attempting to do so will result in an error during the build or runtime.
// SSR Restriction: The App Router requires that anything disabling server-side rendering (like Leaflet, which needs the `window` object) happens within the client-side module graph.