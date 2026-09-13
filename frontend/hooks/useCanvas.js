"use client";

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
    fill: "#ADD8E6",
  },
  {
    id: 2,
    type: "text",
    x: 100,
    y: 90,
    text: "Hello Editor",
    fontSize: 24,
    rotation: 0,
    fill: "#000000",
  },
];

export default function useCanvas() {
  // =====================================
  // Canvas State
  // =====================================

  const [elements, setElements] =
    useState(INITIAL_ELEMENTS);

  const [selectedId, setSelectedId] =
    useState(null);

  const [canvasId, setCanvasId] =
    useState(null);

  const [canvases, setCanvases] =
    useState([]);

  const [canvasName, setCanvasName] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  // =====================================
  // Undo / Redo State
  // =====================================

  const [history, setHistory] =
    useState([]);

  const [future, setFuture] =
    useState([]);

  // =====================================
  // Selected Element
  // =====================================

  const selectedElement = elements.find(
    (element) => element.id === selectedId
  );

  // =====================================
  // Update Elements
  // =====================================

  const updateElements = (newElements) => {
    setHistory((currentHistory) => [
      ...currentHistory,
      elements,
    ]);

    setElements(newElements);

    // A new change clears the redo history.
    setFuture([]);
  };

  // =====================================
  // Add Text
  // =====================================

  const addText = () => {
    const newText = {
      id: Date.now(),
      type: "text",
      x: 200,
      y: 150,
      text: "New Text",
      fontSize: 24,
      rotation: 0,
      fill: "#000000",
    };

    updateElements([
      ...elements,
      newText,
    ]);

    setSelectedId(newText.id);
  };

  // =====================================
  // Add Shape
  // =====================================

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
            fill: "#90EE90",
          }
        : {
            id: Date.now(),
            type: "rect",
            x: 250,
            y: 180,
            width: 200,
            height: 100,
            rotation: 0,
            fill: "#ADD8E6",
          };

    updateElements([
      ...elements,
      newShape,
    ]);

    setSelectedId(newShape.id);
  };

  // =====================================
  // Add Image
  // =====================================

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

    updateElements([
      ...elements,
      newImage,
    ]);

    setSelectedId(newImage.id);
  };

  // =====================================
  // Drag Element
  // =====================================

  const handleDragEnd = (event, id) => {
    const newX = event.target.x();
    const newY = event.target.y();

    const newElements = elements.map(
      (element) =>
        element.id === id
          ? {
              ...element,
              x: newX,
              y: newY,
            }
          : element
    );

    updateElements(newElements);
  };

  // =====================================
  // Update Element Property
  // =====================================

  const updateElement = (property, value) => {
    const newElements = elements.map(
      (element) =>
        element.id === selectedId
          ? {
              ...element,
              [property]: value,
            }
          : element
    );

    updateElements(newElements);
  };

  // =====================================
  // Delete Selected Element
  // =====================================

  const deleteSelectedElement = () => {
    if (selectedId === null) {
      return;
    }

    const newElements = elements.filter(
      (element) =>
        element.id !== selectedId
    );

    updateElements(newElements);

    setSelectedId(null);
  };

  // =====================================
  // Undo
  // =====================================

  const undo = () => {
    if (history.length === 0) {
      return;
    }

    const previousElements =
      history[history.length - 1];

    setHistory((currentHistory) =>
      currentHistory.slice(0, -1)
    );

    setFuture((currentFuture) => [
      elements,
      ...currentFuture,
    ]);

    setElements(previousElements);

    setSelectedId(null);
  };

  // =====================================
  // Redo
  // =====================================

  const redo = () => {
    if (future.length === 0) {
      return;
    }

    const nextElements = future[0];

    setFuture((currentFuture) =>
      currentFuture.slice(1)
    );

    setHistory((currentHistory) => [
      ...currentHistory,
      elements,
    ]);

    setElements(nextElements);

    setSelectedId(null);
  };

  // =====================================
  // Load Saved Canvases
  // =====================================

  const loadCanvases = async () => {
    try {
      const savedCanvases =
        await getCanvases();

      setCanvases(savedCanvases);
    } catch (error) {
      console.error(
        "Failed to load canvases:",
        error
      );
    }
  };

  // =====================================
  // Save Canvas
  // =====================================

  const handleSave = async () => {
    setErrorMessage("");

    try {
      if (!canvasName.trim()) {
        setErrorMessage(
          "Canvas name is required"
        );

        return;
      }

      const canvasData = {
        name: canvasName.trim(),
        width: 800,
        height: 500,
        elements: elements,
      };

      // Create new canvas
      if (!canvasId) {
        const savedCanvas =
          await createCanvas(canvasData);

        setCanvasId(
          savedCanvas._id
        );

        setCanvases(
          (currentCanvases) => [
            savedCanvas,
            ...currentCanvases,
          ]
        );
      }

      // Update existing canvas
      else {
        const updatedCanvas =
          await updateCanvas(
            canvasId,
            canvasData
          );

        setCanvases(
          (currentCanvases) =>
            currentCanvases.map(
              (canvas) =>
                canvas._id === canvasId
                  ? updatedCanvas
                  : canvas
            )
        );
      }
    } catch (error) {
      console.error(
        "Save failed:",
        error
      );

      setErrorMessage(
        "Failed to save canvas. Please try again."
      );
    }
  };

  // =====================================
  // Open Saved Canvas
  // =====================================

  const handleOpenCanvas = async (id) => {
    setErrorMessage("");

    try {
      const savedCanvas =
        await getCanvasById(id);

      setElements(
        savedCanvas.elements
      );

      setCanvasId(
        savedCanvas._id
      );

      setCanvasName(
        savedCanvas.name
      );

      setSelectedId(null);

      // Start a new history
      // for the opened canvas.
      setHistory([]);

      setFuture([]);
    } catch (error) {
      console.error(
        "Open failed:",
        error
      );

      setErrorMessage(
        "Failed to open canvas. Please try again."
      );
    }
  };

  // =====================================
  // Delete Saved Canvas
  // =====================================

  const handleDeleteCanvas = async (id) => {
    setErrorMessage("");

    try {
      await deleteCanvas(id);

      setCanvases(
        (currentCanvases) =>
          currentCanvases.filter(
            (canvas) =>
              canvas._id !== id
          )
      );

      if (canvasId === id) {
        setCanvasId(null);

        setElements([]);

        setSelectedId(null);

        setCanvasName("");

        setHistory([]);

        setFuture([]);
      }
    } catch (error) {
      console.error(
        "Delete failed:",
        error
      );

      setErrorMessage(
        "Failed to delete canvas. Please try again."
      );
    }
  };

  // =====================================
  // Load Canvases On Startup
  // =====================================

  useEffect(() => {
    loadCanvases();
  }, []);

  // =====================================
  // Keyboard Shortcuts
  // =====================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      const activeElement =
        document.activeElement;

      const isTyping =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.isContentEditable;

      if (isTyping) {
        return;
      }

      // Delete
      if (
        (event.key === "Delete" ||
          event.key === "Backspace") &&
        selectedId !== null
      ) {
        deleteSelectedElement();

        return;
      }

      // Undo
      if (
        (event.ctrlKey ||
          event.metaKey) &&
        event.key.toLowerCase() === "z" &&
        !event.shiftKey
      ) {
        event.preventDefault();

        undo();

        return;
      }

      // Redo
      if (
        (event.ctrlKey ||
          event.metaKey) &&
        (
          event.key.toLowerCase() === "y" ||
          (
            event.key.toLowerCase() === "z" &&
            event.shiftKey
          )
        )
      ) {
        event.preventDefault();

        redo();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    selectedId,
    elements,
    history,
    future,
  ]);

  // =====================================
  // Return
  // =====================================

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

    // Undo / Redo
    undo,

    redo,

    canUndo: history.length > 0,

    canRedo: future.length > 0,
  };
}

