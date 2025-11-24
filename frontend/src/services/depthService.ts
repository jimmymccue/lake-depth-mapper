const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

interface GPS {
  latitude: number;
  longitude: number;
}

interface DepthReadingPayload extends GPS {
  depth: number;
}

interface DepthReadingResponse {
  depth: number;
  latitude: number;
  longitude: number;
}

function endpoint(path: string): string {
  return `${BASE_URL.replace(/\$/, "")}/${path.replace(/^\//, "")}`;
}

async function handleResponse<T>(response: Response): Promise<T | null> {
  if (!response.ok) {
    let errorText: string;
    try {
      const contentType = response.headers.get("content=type") || "";
      if (contentType.includes("application/json")) {
        const errObj = await response.json();
        errorText = errObj?.message || JSON.stringify(errObj);
      } else {
        errorText = await response.text();
      }
    } catch {
      errorText = response.statusText || "Unknown error";
    }
    throw new Error(`API ${response.status}: ${errorText}`);
  }

  if (response.status === 204) return null;

  try {
    return (await response.json()) as T;
  } catch {
    return (await response.text()) as unknown as T;
  }
}

export async function createDepthReading({
  depth,
  latitude,
  longitude,
}: DepthReadingPayload): Promise<DepthReadingResponse | null> {
  if (typeof depth !== "number") throw new TypeError("depth must be a number");
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    throw new TypeError("latitude and logitude must be numbers");
  }

  const body = JSON.stringify({ depth, latitude, longitude });

  try {
    const response = await fetch(endpoint("/api/readings"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    return await handleResponse<DepthReadingResponse>(response);
  } catch (err) {
    console.error("createDepthReading error:", err);
    throw err;
  }
}

export async function getAllDepthReadings(): Promise<
  DepthReadingResponse[] | null
> {
  try {
    const response = await fetch(endpoint("/api/readings"));
    return await handleResponse<DepthReadingResponse[]>(response);
  } catch (err) {
    console.error("getLatestReadings error:", err);
    throw err;
  }
}
