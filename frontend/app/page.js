"use client";

import Toolbar from "../components/Toolbar/Toolbar";
import CanvasEditor from "../components/CanvasEditor/CanvasEditor";
import PropertiesPanel from "../components/PropertiesPanel/PropertiesPanel";
import CanvasList from "../components/CanvasList/CanvasList";

import useCanvas from "../hooks/useCanvas";

export default function Home() {
  const {
    elements,
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
  } = useCanvas();

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

      {/* Error Message */}
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

        {/* Properties Panel */}
        <PropertiesPanel
          selectedElement={selectedElement}
          updateElement={updateElement}
          deleteSelectedElement={deleteSelectedElement}
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