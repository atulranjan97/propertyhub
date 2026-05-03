import Image from 'next/image';
import Link from 'next/link';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa';

const PropertyCard = ({ property, index }) => {
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) {
      return `₹ ${rates.monthly.toLocaleString('en-IN')}/mo`;
    } else if (rates.weekly) {
      return `₹ ${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `₹ ${rates.nightly.toLocaleString()}/night`;
    }
  };

  return (
    <div className="rounded-xl shadow-md relative">
      <Link href={`/properties/${property._id}`}>
        <Image
          src={property.images[0]}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          preload={index < 3} // first three image ko lazy load mat karo, immediately load karo.
          className="w-full h-auto rounded-t-xl"
        />
      </Link>
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold truncate">{property.name}</h3>
        </div>
        <h3 className="absolute top-2.5 right-2.5 bg-white px-4 py-2 rounded-lg text-teal-600 font-bold text-right md:text-center lg:text-right">
          {getRateDisplay()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          {/* <p> */}
          <p className="flex items-center gap-1">
            <FaBed className="md:hidden lg:inline" /> {property.beds}{' '}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          {/* <p> */}
          <p className="flex items-center gap-1">
            <FaBath className="md:hidden lg:inline" /> {property.baths}{' '}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          {/* <p> */}
          <p className="flex items-center gap-1">
            <FaRulerCombined className="md:hidden lg:inline" />
            {property.square_feet}{' '}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          <p>
            <FaMoneyBill className="md:hidden lg:inline" /> Weekly
          </p>
          <p>
            <FaMoneyBill className="md:hidden lg:inline" /> Monthly
          </p>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle items-center gap-2 mb-4 lg:mb-0">
            {/* <i className="fa-solid fa-location-dot text-lg text-orange-700"></i> */}
            <FaMapMarker className="md:hidden lg:inline text-orange-700" />
            <span className="text-orange-700">
              {property.location.city}, {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-9 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

/* Next.js image optimization
In Next.js, the Image component automatically optimizes images to improve performance and user experience. Instead of directly serving the original image file, Next.js processes the image on the server and delivers an optimized version based on the user’s device and screen size. This includes resizing large images to appropriate dimensions, converting them to modern formats like WebP when supported, and compressing them to reduce file size without noticeable quality loss. It also implements lazy loading by default, meaning images load only when they enter the viewport, which speeds up initial page load time. Additionally, Next.js prevents layout shift by requiring either width and height or fill, allowing the browser to reserve the correct space before the image loads. Overall, this built-in optimization results in faster loading pages, lower bandwidth usage, improved Core Web Vitals, and better SEO compared to using a normal <img> tag without optimization.
*/
