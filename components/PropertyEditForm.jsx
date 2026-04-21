import updateProperty from "@/app/actions/updateProperty";

const PropertyEditForm = ({ property }) => {

  const updatePropertyById = updateProperty.bind(null, property._id);
  // it creates a bound function that has the same body as the original function and the `this` object of the bound function is associated with the specific object. 

  return (
    <form action={updatePropertyById}>
      <h2 className="text-3xl text-center font-semibold mb-6">Edit Property</h2>

      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
          Property Type
        </label>
        <select
          id="type"
          name="type"
          defaultValue={property.type}
          className="border border-gray-300 rounded w-full py-2 px-3"
          required
        >
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="CabinOrCottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {/* Listing Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Listing Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={property.name}
          className="border border-gray-300 rounded w-full py-2 px-3 mb-2"
          placeholder="eg. Beautiful Apartment In Miami"
          required
        />
      </div>
      {/* Description */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={property.description}
          className="border border-gray-300 rounded w-full py-2 px-3"
          rows="4"
          placeholder="Add an optional description of your property"
        ></textarea>
      </div>

      {/* Location */}
      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>
        <input
          type="text"
          id="street"
          name="location.street"
          defaultValue={property.location.street}
          className="border border-gray-300 rounded w-full py-2 px-3 mb-2"
          placeholder="Street"
        />
        <input
          type="text"
          id="city"
          name="location.city"
          defaultValue={property.location.city}
          className="border border-gray-300 rounded w-full py-2 px-3 mb-2"
          placeholder="City"
          required
        />
        <input
          type="text"
          id="state"
          name="location.state"
          defaultValue={property.location.state}
          className="border border-gray-300 rounded w-full py-2 px-3 mb-2"
          placeholder="State"
          required
        />
        <input
          type="text"
          id="zipcode"
          name="location.zipcode"
          defaultValue={property.location.zipcode}
          className="border border-gray-300 rounded w-full py-2 px-3 mb-2"
          placeholder="Zipcode"
        />
      </div>

      <div className="mb-4 flex flex-wrap">
        {/* Beds */}
        <div className="w-full sm:w-1/3 pr-2">
          <label htmlFor="beds" className="block text-gray-700 font-bold mb-2">
            Beds
          </label>
          <input
            type="number"
            id="beds"
            name="beds"
            defaultValue={property.beds}
            className="border border-gray-300 rounded w-full py-2 px-3"
            required
          />
        </div>
        {/* Baths */}
        <div className="w-full sm:w-1/3 px-2">
          <label htmlFor="baths" className="block text-gray-700 font-bold mb-2">
            Baths
          </label>
          <input
            type="number"
            id="baths"
            name="baths"
            defaultValue={property.baths}
            className="border border-gray-300 rounded w-full py-2 px-3"
            required
          />
        </div>
        {/* Square feet */}
        <div className="w-full sm:w-1/3 pl-2">
          <label
            htmlFor="square_feet"
            className="block text-gray-700 font-bold mb-2"
          >
            Square Feet
          </label>
          <input
            type="number"
            id="square_feet"
            name="square_feet"
            defaultValue={property.square_feet}
            className="border border-gray-300 rounded w-full py-2 px-3"
            required
          />
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div>
            <input
              type="checkbox"
              id="amenity_wifi"
              name="amenities"
              value="Wifi"
              defaultChecked={property.amenities.includes('Wifi')}
              className="mr-2"
            />
            <label htmlFor="amenity_wifi">Wifi</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_kitchen"
              name="amenities"
              value="Full kitchen"
              defaultChecked={property.amenities.includes('Full kitchen')}
              className="mr-2"
            />
            <label htmlFor="amenity_kitchen">Full kitchen</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_washer_dryer"
              name="amenities"
              value="Washer & Dryer"
              defaultChecked={property.amenities.includes('Washer & Dryer')}
              className="mr-2"
            />
            <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_free_parking"
              name="amenities"
              value="Free Parking"
              defaultChecked={property.amenities.includes('Free Parking')}
              className="mr-2"
            />
            <label htmlFor="amenity_free_parking">Free Parking</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_pool"
              name="amenities"
              value="Swimming Pool"
              defaultChecked={property.amenities.includes('Swimming Pool')}
              className="mr-2"
            />
            <label htmlFor="amenity_pool">Swimming Pool</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_hot_tub"
              name="amenities"
              value="Hot Tub"
              defaultChecked={property.amenities.includes('Hot Tub')}
              className="mr-2"
            />
            <label htmlFor="amenity_hot_tub">Hot Tub</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_24_7_security"
              name="amenities"
              value="24/7 Security"
              defaultChecked={property.amenities.includes('24/7 Security')}
              className="mr-2"
            />
            <label htmlFor="amenity_24_7_security">24/7 Security</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_wheelchair_accessible"
              name="amenities"
              value="Wheelchair Accessible"
              defaultChecked={property.amenities.includes(
                'Wheelchair Accessible',
              )}
              className="mr-2"
            />
            <label htmlFor="amenity_wheelchair_accessible">
              Wheelchair Accessible
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_elevator_access"
              name="amenities"
              value="Elevator Access"
              defaultChecked={property.amenities.includes('Elevator Access')}
              className="mr-2"
            />
            <label htmlFor="amenity_elevator_access">Elevator Access</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_dishwasher"
              name="amenities"
              value="Dishwasher"
              defaultChecked={property.amenities.includes('Dishwasher')}
              className="mr-2"
            />
            <label htmlFor="amenity_dishwasher">Dishwasher</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_gym_fitness_center"
              name="amenities"
              value="Gym/Fitness Center"
              defaultChecked={property.amenities.includes('Gym/Fitness Center')}
              className="mr-2"
            />
            <label htmlFor="amenity_gym_fitness_center">
              Gym/Fitness Center
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_air_conditioning"
              name="amenities"
              value="Air Conditioning"
              defaultChecked={property.amenities.includes('Air Conditioning')}
              className="mr-2"
            />
            <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_balcony_patio"
              name="amenities"
              value="Balcony/Patio"
              defaultChecked={property.amenities.includes('Balcony/Patio')}
              className="mr-2"
            />
            <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_smart_tv"
              name="amenities"
              value="Smart TV"
              defaultChecked={property.amenities.includes('Smart TV')}
              className="mr-2"
            />
            <label htmlFor="amenity_smart_tv">Smart TV</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_coffee_maker"
              name="amenities"
              value="Coffee Maker"
              defaultChecked={property.amenities.includes('Coffee Maker')}
              className="mr-2"
            />
            <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
          </div>
        </div>
      </div>

      {/* Rates */}
      <div className="mb-4 bg-teal-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Rates (Leave blank if not applicable)
        </label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <label htmlFor="weekly_rate" className="mr-2">
              Weekly
            </label>
            <input
              type="number"
              id="weekly_rate"
              name="rates.weekly"
              defaultValue={property.rates.weekly}
              className="border border-gray-300 rounded w-full py-2 px-3"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="monthly_rate" className="mr-2">
              Monthly
            </label>
            <input
              type="number"
              id="monthly_rate"
              name="rates.monthly"
              defaultValue={property.rates.monthly}
              className="border border-gray-300 rounded w-full py-2 px-3"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="nightly_rate" className="mr-2">
              Nightly
            </label>
            <input
              type="number"
              id="nightly_rate"
              name="rates.nightly"
              defaultValue={property.rates.nightly}
              className="border border-gray-300 rounded w-full py-2 px-3"
            />
          </div>
        </div>
      </div>

      {/* Seller info */}
      <div className="mb-4">
        <label
          htmlFor="seller_name"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Name
        </label>
        <input
          type="text"
          id="seller_name"
          name="seller_info.name"
          defaultValue={property.seller_info.name}
          className="border border-gray-300 rounded w-full py-2 px-3"
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_email"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Email
        </label>
        <input
          type="email"
          id="seller_email"
          name="seller_info.email"
          defaultValue={property.seller_info.email}
          className="border border-gray-300 rounded w-full py-2 px-3"
          placeholder="Email address"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_phone"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Phone
        </label>
        <input
          type="tel"
          id="seller_phone"
          name="seller_info.phone"
          defaultValue={property.seller_info.phone}
          className="border border-gray-300 rounded w-full py-2 px-3"
          placeholder="Phone"
        />
      </div>

      <div>
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline cursor-pointer"
          type="submit"
        >
          Update Property
        </button>
      </div>
    </form>
  );
};

export default PropertyEditForm;

// You can see, this is so much easier than making this a client side form where we have to bring in useState and we have to assign state to each field.
// If you have a really interactive form then yeah but if you just doing this ie just filling out inputs and submitting, then there's no need for that. This is so much easier.
