// MockHome.tsx
import { useState, useEffect } from "react";
import LakeDepthForm from "../components/LakeDepthForm";
import Map from "../components/Map";

const MockHome = () => {
  const [lastDepth, setLastDepth] = useState<number | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Start at the chosen pond coordinates
  useEffect(() => {
    setCoords({ lat: 39.847885, lng: -83.185597 });
  }, []);

  const handleDepthSubmit = (depth: number) => {
    setLastDepth(depth);

    // Move the mock coordinates slightly for the next submission
    setCoords((prev) => {
      if (!prev) return null;

      // You can define multiple offsets to make it look more natural
      const offsets = [
        { lat: 0.00001, lng: 0.00001 },
        { lat: -0.00001, lng: 0.00002 },
        { lat: 0.00002, lng: -0.00001 },
      ];

      // Cycle through offsets
      const step = lastDepth !== null ? lastDepth % offsets.length : 0;
      return {
        lat: prev.lat + offsets[step].lat,
        lng: prev.lng + offsets[step].lng,
      };
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Lake Depth Tracker (Mock)</h1>

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 mb-8">
        <LakeDepthForm onSubmit={handleDepthSubmit} />

        {lastDepth !== null && (
          <p className="mt-4 text-gray-700">
            Last recorded depth:{" "}
            <span className="font-semibold text-blue-600">{lastDepth} ft</span>
          </p>
        )}

        {coords && (
          <p className="mt-2 text-gray-600">
            Coordinates:{" "}
            <span className="font-medium">
              {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
            </span>
          </p>
        )}
      </div>

      {coords && (
        <div className="w-full max-w-3xl h-[400px] rounded-2xl overflow-hidden shadow-md">
          <Map coordinates={coords} lastDepth={lastDepth} />
        </div>
      )}
    </div>
  );
};

export default MockHome;
