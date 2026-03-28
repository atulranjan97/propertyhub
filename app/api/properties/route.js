import connectDB from "@/config/database";
import Property from "@/models/PropertyModel";

// export const GET = () => {
//   return new Response(
//     JSON.stringify({ message: "Hello World" }),
//     { status: 200 }
//   );
// };

export const GET = async () => {
  try {
    await connectDB();
    const properties = await Property.find({});
    return new Response(properties, { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};


// again, in my app I could've have client side component where I use useEffect and I fetch this data and then use it in my client side component
// If you wanted to make a POST request to /api/properties, you would put it in this same file, except you'd create a function called POST instead of GET