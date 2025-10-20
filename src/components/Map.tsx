import type { FC } from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";

interface MapProps {
  coordinates: { lat: number; lng: number } | null;
  lastDepth: number | null;
}

const Map: FC<MapProps> = ({ coordinates, lastDepth }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return <div className="text-red-500">Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;
  if (!coordinates)
    return (
      <div className="text-gray-600 text-center p-4 border border-gray-300 rounded-xl">
        Getting current location...
      </div>
    );

  return (
    <div className="w-full h-[500px] rounded-2xl shadow-inner overflow-hidden">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={coordinates}
        zoom={17}
      >
        <Marker position={coordinates}>
          <InfoWindow position={coordinates}>
            <div className="p-2 text-sm text-gray-800">
              <p className="font-semibold">
                Depth:{" "}
                <span className="text-blue-600">
                  {lastDepth !== null ? `${lastDepth} ft` : "N/A"}
                </span>
              </p>
              <p>
                Lat: <span className="text-gray-700">{coordinates.lat.toFixed(5)}</span>
                <br />
                Lng: <span className="text-gray-700">{coordinates.lng.toFixed(5)}</span>
              </p>
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    </div>
  );
};

export default Map;
