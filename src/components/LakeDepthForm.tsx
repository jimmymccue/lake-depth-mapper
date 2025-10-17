import React, { useState } from "react";

interface LakeDepthFormProps {
  onSubmit: (depth: number) => void;
}

const LakeDepthForm: React.FC<LakeDepthFormProps> = ({ onSubmit }) => {
  const [depth, setDepth] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (depth !== "" && depth >= 0) {
      onSubmit(depth);
      setDepth(""); // Clear input after submission
    } else {
      alert("Please enter a valid non-negative number.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-4 rounded-2xl shadow-md"

    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        Enter Lake Depth
      </h2>
      <div className="flex flex-col mb-4">
        <label htmlFor="depth" className="mb-2 font-medium text-gray-700">
          Depth (in feet)
        </label>
        <input
          id="depth"
          type="number"
          min={0}
          value={depth}
          onChange={(e) =>
            setDepth(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 12.5"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default LakeDepthForm;
