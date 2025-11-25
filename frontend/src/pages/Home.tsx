import { useState, useEffect } from "react";
import LakeDepthForm from "../components/LakeDepthForm";
import Map from "../components/Map";

const Home = () => {
  const [lastDepth, setLastDepth] = useState<number | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch current location on app load
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const handleDepthSubmit = (depth: number) => {
    setLastDepth(depth);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Lake Depth Tracker</h1>

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 mb-8">
        {coords && (
          <LakeDepthForm
            latitude={coords.lat}
            longitude={coords.lng}
            onSubmit={handleDepthSubmit}
          />
        )}

        {error && <p className="mt-3 text-red-500">{error}</p>}
      </div>

      {coords && (
        <div className="w-full max-w-3xl h-[400px] rounded-2xl overflow-hidden shadow-md">
          <Map coordinates={coords} lastDepth={lastDepth} />
        </div>
      )}
    </div>
  );
};

export default Home;
