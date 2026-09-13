import { useEffect, useState } from "react";

import {
  createCanvas,
  getCanvases,
  getCanvasById,
  updateCanvas,
  deleteCanvas,
} from "../services/canvasApi";

const INITIAL_ELEMENTS = [
  {
    id: 1,
    type: "rect",
    x: 50,
    y: 50,
    width: 200,
    height: 100,
    rotation: 0,
  },
  {
    id: 2,
    type: "text",
    x: 100,
    y: 90,
    text: "Hello Editor",
    fontSize: 24,
    rotation: 0,
  },
];

export default function useCanvas() {
  const [elements, setElements] = useState(INITIAL_ELEMENTS);
  const [selectedId, setSelectedId] = useState(null);
  const [canvasId, setCanvasId] = useState(null);
  const [canvases, setCanvases] = useState([]);
  const [canvasName, setCanvasName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedElement = elements.find(
    (element) => element.id === selectedId
  );

  const addText = () => {
    const newText = {
      id: Date.now(),
      type: "text",
      x: 200,
      y: 150,
      text: "New Text",
      fontSize: 24,
      rotation: 0,
    };

    setElements((currentElements) => [
      ...currentElements,
      newText,
    ]);

    setSelectedId(newText.id);
  };

  const addShape = (shapeType) => {
    const newShape =
      shapeType === "circle"
        ? {
            id: Date.now(),
            type: "circle",
            x: 300,
            y: 200,
            radius: 60,
            rotation: 0,
          }
        : {
            id: Date.now(),
            type: "rect",
            x: 250,
            y: 180,
            width: 200,
            height: 100,
            rotation: 0,
          };

    setElements((currentElements) => [
      ...currentElements,
      newShape,
    ]);

    setSelectedId(newShape.id);
  };

  const addImage = (imageUrl) => {
    const newImage = {
      id: Date.now(),
      type: "image",
      x: 150,
      y: 100,
      width: 250,
      height: 150,
      src: imageUrl,
      rotation: 0,
    };

    setElements((currentElements) => [
      ...currentElements,
      newImage,
    ]);

    setSelectedId(newImage.id);
  };

  const handleDragEnd = (event, id) => {
    const newX = event.target.x();
    const newY = event.target.y();

    setElements((currentElements) =>
      currentElements.map((element) =>
        element.id === id
          ? {
              ...element,
              x: newX,
              y: newY,
            }
          : element
      )
    );
  };

  const updateElement = (property, value) => {
    setElements((currentElements) =>
      currentElements.map((element) =>
        element.id === selectedId
          ? {
              ...element,
              [property]: value,
            }
          : element
      )
    );
  };

  const deleteSelectedElement = () => {
    if (selectedId === null) {
      return;
    }

    setElements((currentElements) =>
      currentElements.filter(
        (element) => element.id !== selectedId
      )
    );

    setSelectedId(null);
  };

  const loadCanvases = async () => {
    try {
      const savedCanvases = await getCanvases();
      setCanvases(savedCanvases);
    } catch (error) {
      console.error("Failed to load canvases:", error);
    }
  };

  const handleSave = async () => {
    setErrorMessage("");

    try {
      if (!canvasName.trim()) {
        setErrorMessage("Canvas name is required");
        return;
      }

      const canvasData = {
        name: canvasName.trim(),
        width: 800,
        height: 500,
        elements: elements,
      };

      if (!canvasId) {
        const savedCanvas = await createCanvas(canvasData);

        setCanvasId(savedCanvas._id);

        setCanvases((currentCanvases) => [
          savedCanvas,
          ...currentCanvases,
        ]);
      } else {
        const updatedCanvas = await updateCanvas(
          canvasId,
          canvasData
        );

        setCanvases((currentCanvases) =>
          currentCanvases.map((canvas) =>
            canvas._id === canvasId
              ? updatedCanvas
              : canvas
          )
        );
      }
    } catch (error) {
      console.error("Save failed:", error);

      setErrorMessage(
        "Failed to save canvas. Please try again."
      );
    }
  };

  const handleOpenCanvas = async (id) => {
    setErrorMessage("");

    try {
      const savedCanvas = await getCanvasById(id);

      setElements(savedCanvas.elements);
      setCanvasId(savedCanvas._id);
      setCanvasName(savedCanvas.name);
      setSelectedId(null);
    } catch (error) {
      console.error("Open failed:", error);

      setErrorMessage(
        "Failed to open canvas. Please try again."
      );
    }
  };

  const handleDeleteCanvas = async (id) => {
    setErrorMessage("");

    try {
      await deleteCanvas(id);

      setCanvases((currentCanvases) =>
        currentCanvases.filter(
          (canvas) => canvas._id !== id
        )
      );

      if (canvasId === id) {
        setCanvasId(null);
        setElements([]);
        setSelectedId(null);
        setCanvasName("");
      }
    } catch (error) {
      console.error("Delete failed:", error);

      setErrorMessage(
        "Failed to delete canvas. Please try again."
      );
    }
  };

  useEffect(() => {
    loadCanvases();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const activeElement = document.activeElement;

      const isTyping =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.isContentEditable;

      if (isTyping) {
        return;
      }

      if (
        (event.key === "Delete" ||
          event.key === "Backspace") &&
        selectedId !== null
      ) {
        deleteSelectedElement();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedId]);

  return {
    elements,
    selectedId,
    setSelectedId,
    selectedElement,
    canvases,
    canvasName,
    setCanvasName,
    errorMessage,
    addText,
    addShape,
    addImage,
    handleDragEnd,
    updateElement,
    deleteSelectedElement,
    handleSave,
    handleOpenCanvas,
    handleDeleteCanvas,
  };
}