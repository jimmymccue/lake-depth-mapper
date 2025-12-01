import type { DepthReadingResponse } from "../services/depthService";

interface ReadingListProps {
  readings: DepthReadingResponse[];
  loading?: boolean;
  error?: string | null;
}

export default function ReadingList({
  readings,
  loading = false,
  error = null,
}: ReadingListProps) {
  if (loading)
    return <p className="text-gray-500">Loading depth readings...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Depth Reading List</h2>

      {readings.length === 0 ? (
        <p className="text-gray-500">No depth readings found</p>
      ) : (
        <div className="max-h-[100px] overflow-y-auto border rounded-md bg-white shadow">
          <ul>
            {readings.map((reading, index) => (
              <li key={index} className="flex justify-between px-4 space-x-4">
                <span>Depth: {reading.depthFeet} ft</span>
                <span>Lat: {reading.latitude.toFixed(6)}</span>
                <span>Long: {reading.longitude.toFixed(6)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
