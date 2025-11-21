import type { FC } from "react";
import { useState } from "react";

interface LakeDepthFormProps {
  onSubmit: (depth: number) => void;
}

const LakeDepthForm: FC<LakeDepthFormProps> = ({ onSubmit }) => {
  const [depth, setDepth] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isNaN(Number(depth)) && depth !== "") {
      onSubmit(Number(depth));
      setDepth("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="text-gray-700 font-medium">
        Enter Lake Depth (ft):
      </label>
      <input
        type="number"
        value={depth}
        onChange={(e) => setDepth(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition"
      >
        Submit Depth
      </button>
    </form>
  );
};

export default LakeDepthForm;
