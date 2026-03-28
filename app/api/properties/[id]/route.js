import connectDB from "@/config/database";
import Property from "@/models/PropertyModel";

export const GET = async (request, {params}) => {
  try {
    await connectDB();
    const {id} = await params

    const property = await Property.findById(id);
    if (!property) return new Response("Property not found", {status: 404})

    return new Response(property, { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};

// now if we wanted to, from our property page, we could bring in useEffect, and then we could run the useEffect, run a fetch request but we have to make the component a client component(`use client`) because we can't use useEffect in a server component
// we did this in the first version of this code