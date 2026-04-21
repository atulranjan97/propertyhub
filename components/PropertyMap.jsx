'use client';
import { useEffect, useState } from 'react';
// import { setDefaults, fromAddress } from 'react-geocode';
import opencage from 'opencage-api-client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import Image from 'next/image';
import pin from '@/assets/images/pin.svg';
import Spinner from './Spinner';

const customIcon = L.icon({
  iconUrl: pin.src,
  iconSize: [40, 40], // adjust size
});

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  });

  const [loading, setLoading] = useState(true);
  const [geoCodeError, setGeoCodeError] = useState(false);

  useEffect(() => {
    async function fetchCoordinates() {
      try {
        const res = await opencage.geocode({
          q: `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`,
          key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
        });

        // console.log(res);

        // Check geocode results
        if (res.status.code !== 200 || res.results.length === 0) {
          setGeoCodeError(true);
          return;
        }

        const { lat, lng } = res.results[0].geometry;
        // console.log(lat, lng);

        setLat(lat);
        setLng(lng);
        setViewport((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
        }));
      } catch (error) {
        console.log(error);
        setGeoCodeError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCoordinates();
  }, []);

  if (loading) return <Spinner />;

  if (geoCodeError)
    return <div className="text-xl text-red-500">No location data found</div>;

  return (
    !loading && (
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: 500, width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy;"
        />
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>Property Location</Popup>
        </Marker>
      </MapContainer>
    )
  );
};

export default PropertyMap;
