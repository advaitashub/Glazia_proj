const STORAGE_KEY = "glazia-canvas";

export const saveCanvas = (elements) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(elements)
  );
};

export const loadCanvas = () => {
  const savedElements = localStorage.getItem(
    STORAGE_KEY
  );

  if (!savedElements) {
    return null;
  }

  try {
    return JSON.parse(savedElements);
  } catch (error) {
    console.error(
      "Failed to load canvas:",
      error
    );

    return null;
  }
};