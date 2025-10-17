import { useState } from "react";
import LakeDepthForm from "../components/LakeDepthForm";
import Map from "../components/Map";

const Home = () => {
  const [lastDepth, setLastDepth] = useState<number | null>(null);

  const handleDepthSubmit = (depth: number) => {
    setLastDepth(depth);
    console.log("Lake depth submitted:", depth);
  };

  return (
    <div className="p-8 text-center bg-gray-50 min-h-screen">
      <h1 className="text-orange-600 font-bold text-3xl mb-6">
        Lake Depth Mapping
      </h1>

      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          Lake Depth Entry
        </h2>

        <LakeDepthForm onSubmit={handleDepthSubmit} />

        {lastDepth !== null && (
          <p className="mt-2 text-gray-700">
            Last submitted depth:{" "}
            <span className="font-semibold">{lastDepth} ft</span>
          </p>
        )}
      </div>

      <div className="mt-4">
        <Map />
      </div>
    </div>
  );
};

export default Home;
