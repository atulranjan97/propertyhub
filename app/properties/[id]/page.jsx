import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import connectDB from "@/config/database";
import Property from "@/models/PropertyModel";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
// import "@/assets/styles/global.css";

const PropertyPage = async ({ params }) => {
  const { id } = await params;
  await connectDB();
  const property = await Property.findById(id).lean();

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />

      {/* Go Back */}
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          {/* <i className="fas fa-arrow-left mr-2"></i> Back to Properties */}
          <FaArrowLeft className="mr-2" /> Back to Properties
        </Link>
      </div>

      <section className="bg-teal-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70-30 w-full gap-6">
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyPage;

{
  /* grid-col-70/30 is not a standard tailwind className, that is the custom className that we created in the beginning in tailwind config file */
}
/*

const PropertyPage = async ({ params, searchParams }) => {
  const { id } = await params;
  const { name } = await searchParams;

  return <div>Property Page {id} {name}</div>;
};

export default PropertyPage;
*/
