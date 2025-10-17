import type { FC } from "react"; // <-- type-only import
import { useMemo } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface MapProps {
  coordinates: { lat: number; lng: number } | null;
}

const Map: FC<MapProps> = ({ coordinates }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const center = useMemo(
    () => coordinates ?? { lat: 40.7128, lng: -74.006 }, // Default NYC
    [coordinates]
  );

  if (loadError) return <div className="text-red-500">Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerClassName="w-full h-full rounded-2xl shadow-inner"
      center={center}
      zoom={17}
    >
      {coordinates && <Marker position={coordinates} />}
    </GoogleMap>
  );
};

export default Map;
