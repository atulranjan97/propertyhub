import PropertyCard from '@/components/PropertyCard';
import Pagination from '@/components/Pagination';
import connectDB from '@/config/database';
import Property from '@/models/PropertyModel';

const PropertiesPage = async ({ searchParams }) => {
  const { page = 1, pageSize = 6 } = await searchParams;
  // pageSize is the number of items(properties in our case) on the page

  await connectDB();
  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});
  const properties = await Property.find({}).skip(skip).limit(pageSize);
  // what lean does is it optimizes query performance by returning plain JS objects instead of mongoose documents. and you can do this as long as it's read only, we're not going to be using any mongoose methods or anything on the results, so this is perfectly fine to do here

  const showPagination = total > pageSize;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {showPagination && (
          <Pagination
            page={parseInt(page)}
            pageSize={parseInt(pageSize)}
            totalItems={total}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;

// here we're bringing in the json data and we're going over the properties and outputing a property card for each one, so this is to me where Next.js really shines, I mean if you think of this as a React SPA, we would've to create some kind of backend, some kind of API route, probably with express or something like that, and then we would have to have a `useEffect`, we would then fetch it from that API. But here we can connect to the database and make a query right from the component, which is great and then the data is just loaded with the page.
