import type { FC } from "react";
import React, { useState } from "react";
import { createDepthReading } from "../services/depthService";

interface LakeDepthFormProps {
  latitude: number;
  longitude: number;
  onSubmit: (depth: number) => void;
}

const LakeDepthForm: FC<LakeDepthFormProps> = ({
  latitude,
  longitude,
  onSubmit,
}) => {
  const [depth, setDepth] = useState("");
  const [errors, setErrors] = useState<{
    latitude?: string;
    longitude?: string;
    depth?: string;
  }>({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validationForm = () => {
    const newErrors: { depth?: string } = {};
    const depthNum = parseInt(depth);

    if (isNaN(depthNum) || depthNum <= 0) {
      newErrors.depth = "Depth must be greater than 0.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setServerError("");

    if (!validationForm()) return;

    const depthNum = parseInt(depth);
    const payload = {
      latitude,
      longitude,
      depth: depthNum,
    };

    try {
      setIsLoading(true);
      await createDepthReading(payload);
      onSubmit(depthNum);
      setSuccessMessage("Depth reading successfully created!");
      setDepth("");

    //   const updatedReadings = await getAllDepthReadings();
    //   setReadings(updatedReadings ?? []);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("Server error occurred.");
      }
    } finally {
      setIsLoading(false);
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
      {errors.depth && <span className="text-red-500">{errors.depth}</span>}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition"
      >
        {isLoading ? "Submitting..." : "Submit Depth"}
      </button>

      {successMessage && <div className="text-green-600">{successMessage}</div>}
      {serverError && <div className="text-red-600">{serverError}</div>}
    </form>
  );
};

export default LakeDepthForm;
