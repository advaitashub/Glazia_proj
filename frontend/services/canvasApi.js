const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/canvases";
export const createCanvas = async (canvasData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(canvasData),
  });

  if (!response.ok) {
    throw new Error("Failed to create canvas");
  }

  return response.json();
};


export const getCanvases = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch canvases");
  }

  return response.json();
};


export const getCanvasById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch canvas");
  }

  return response.json();
};


export const updateCanvas = async (id, canvasData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(canvasData),
  });

  if (!response.ok) {
    throw new Error("Failed to update canvas");
  }

  return response.json();
};


export const deleteCanvas = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete canvas");
  }

  return response.json();
};