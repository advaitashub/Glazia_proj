"use client";

import { useEffect, useState } from "react";

import Toolbar from "../components/Toolbar/Toolbar";
import CanvasEditor from "../components/CanvasEditor/CanvasEditor";
import PropertiesPanel from "../components/PropertiesPanel/PropertiesPanel";
import CanvasList from "../components/CanvasList/CanvasList";

import {
  createCanvas,
  getCanvases,
  getCanvasById,
  updateCanvas,
  deleteCanvas,
} from "../services/canvasApi";

export default function Home() {

  // ===============================
  // Elements
  // ===============================

  const [elements, setElements] = useState([
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
  ]);

  // ===============================
  // Selected Element / Canvas
  // ===============================

  const [selectedId, setSelectedId] = useState(null);
  const [canvasId, setCanvasId] = useState(null);
  const [canvases, setCanvases] = useState([]);
  const [canvasName, setCanvasName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedElement = elements.find(
    (element) => element.id === selectedId
  );

  // ===============================
  // Add Text
  // ===============================

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

  // ===============================
  // Add Shape
  // ===============================

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

  // ===============================
  // Add Image
  // ===============================

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

  // ===============================
  // Drag Element
  // ===============================

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

  // ===============================
  // Update Element
  // ===============================

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

  // ===============================
  // Delete Element
  // ===============================

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

  // ===============================
  // Load Saved Canvases List
  // ===============================

  const loadCanvases = async () => {
    try {
      const savedCanvases = await getCanvases();

      setCanvases(savedCanvases);
    } catch (error) {
      console.error(
        "Failed to load canvases:",
        error
      );
    }
  };

  // ===============================
  // Save Canvas
  // ===============================

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
        const savedCanvas =
          await createCanvas(canvasData);

        setCanvasId(savedCanvas._id);

        // Update saved canvas list
        setCanvases((currentCanvases) => [
          savedCanvas,
          ...currentCanvases,
        ]);

        console.log(
          "Canvas created:",
          savedCanvas
        );
      } else {
        const updatedCanvas =
          await updateCanvas(
            canvasId,
            canvasData
          );

        // Update saved canvas list
        setCanvases((currentCanvases) =>
          currentCanvases.map((canvas) =>
            canvas._id === canvasId
              ? updatedCanvas
              : canvas
          )
        );

        console.log(
          "Canvas updated:",
          updatedCanvas
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

  // ===============================
  // Open Saved Canvas
  // ===============================

  const handleOpenCanvas = async (id) => {
    setErrorMessage("");

    try {
      const savedCanvas = await getCanvasById(id);

      setElements(savedCanvas.elements);
      setCanvasId(savedCanvas._id);
      setCanvasName(savedCanvas.name);
      setSelectedId(null);

      console.log("Canvas opened:", savedCanvas);
    } catch (error) {
      console.error("Open failed:", error);
      setErrorMessage("Failed to open canvas. Please try again.");
    }
  };

  // ===============================
  // Delete Saved Canvas
  // ===============================

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

      console.log("Canvas deleted");
    } catch (error) {
      console.error("Delete failed:", error);
      setErrorMessage("Failed to delete canvas. Please try again.");
    }
  };

  // ===============================
  // Load Saved Canvases On Startup
  // ===============================

  useEffect(() => {
    loadCanvases();
  }, []);

  // ===============================
  // Keyboard Delete
  // ===============================

  useEffect(() => {
    const handleKeyDown = (event) => {

      // Don't delete elements while typing
      // inside an input, textarea, or editable element.

      const activeElement =
        document.activeElement;

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
  }, [selectedId]);

  // ===============================
  // UI
  // ===============================

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Header */}

      <header className="h-14 shrink-0 bg-white border-b flex items-center justify-between px-4">

        <h1 className="text-xl text-black font-bold">
          My Visual Editor
        </h1>

        <div className="flex items-center gap-2">

          <input
            type="text"
            placeholder="Canvas name"
            value={canvasName}
            onChange={(event) =>
              setCanvasName(event.target.value)
            }
            className="border rounded-md px-3 py-2 text-black w-40"
          />

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
          >
            Save
          </button>

        </div>

      </header>
      {errorMessage && (
        <div className="bg-red-100 text-red-700 px-4 py-3 text-sm border-b">
          {errorMessage}
        </div>
      )}

      {/* Editor */}

      <div className="flex flex-1 flex-col lg:flex-row overflow-auto">

        {/* Toolbar */}

        <Toolbar
          onAddText={addText}
          onAddImage={addImage}
          onAddShape={addShape}
        />

        {/* Canvas */}

        <CanvasEditor
          elements={elements}
          setSelectedId={setSelectedId}
          handleDragEnd={handleDragEnd}
          updateElement={updateElement}
        />

        {/* Properties */}

        <PropertiesPanel
          selectedElement={selectedElement}
          updateElement={updateElement}
          deleteSelectedElement={
            deleteSelectedElement
          }
        />

      </div>

      {/* Saved Canvases */}

      <CanvasList
        canvases={canvases}
        onOpen={handleOpenCanvas}
        onDelete={handleDeleteCanvas}
      />

    </div>
  );
}