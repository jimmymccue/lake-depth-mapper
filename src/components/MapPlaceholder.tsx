const MapPlaceholder: React.FC = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div className="flex h-96 w-full items-center justify-center rounded-2xl border border-gray-300 bg-gray-100">
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-700">Google Maps Placeholder</p>
        <p className="text-sm text-gray-500 mt-2">
          API Key: {apiKey ? "✅ Loaded" : "❌ Missing"}
        </p>
      </div>
    </div>
  );
};

export default MapPlaceholder;