'use server';
import connectDB from '@/config/database';
import Property from '@/models/PropertyModel';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache'; // that will make it so that once we submit it'll update the cache and it'll update the listings so that it does not show it
import { redirect } from 'next/navigation';
import cloudinary from '@/config/cloudinary';

async function addProperty(formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }
  // Now, when we throw an error the way we're doing this here, it's actually going to show a page called `error.jsx` which we haven't created(at this point of time, 7 april), so `next.js` allows you to just use that name convention and have an error page. We'll make it so it shows this message on the screen

  const { userId } = sessionUser;

  // access all values from amenities and images
  const amenities = formData.getAll('amenities');

  const images = formData.getAll('images').filter((image) => image.name !== '');
  // .getAll('images') is gonna give us image object, not just the name and we want just an array of the just the image name, so we can use the combination of filter and map for that. The filter is just a filter out any empty names but with map we can basically reformat it to just an array of image names
  // It will go through each image(object) and just return the name and add it to the array

  const propertyData = {
    owner: userId,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities,
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.nightly'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
  };

  const imageUrls = [];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert to base64(because that's how we need to send it with the request)
    const imageBase64 = imageData.toString('base64');

    // Make request to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: 'propertyhub',
      },
    );

    imageUrls.push(result.secure_url);
  }
  // we're converting each image, looping through converting each one to base64. And then we're attaching that when we send the request to upload, so it'll upload the image and then we get back a result object and on that result is the URL to access the image then we're adding it to the property data and submitting it to the database.

  propertyData.images = imageUrls;

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath('/', 'layout');    // tells Next.js to refresh cached data for a given path, so the next request gets fresh content instead of stale cached data.

  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
