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

    undo,

    redo,

    canUndo,

    canRedo,
  } = useCanvas();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 overflow-x-hidden">

      {/* =====================================
          Header
      ===================================== */}

      <header className="bg-white border-b px-3 sm:px-4 py-3">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          {/* Title */}

          <h1 className="text-lg sm:text-xl text-black font-bold">
            My Visual Editor
          </h1>


          {/* Header Controls */}

          <div className="flex flex-wrap items-center gap-2">

            {/* Undo */}

            <button
              onClick={undo}
              disabled={!canUndo}
              className="border px-2 sm:px-3 py-2 rounded-md text-sm sm:text-base text-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
              title="Undo"
            >
              ↶ Undo
            </button>


            {/* Redo */}

            <button
              onClick={redo}
              disabled={!canRedo}
              className="border px-2 sm:px-3 py-2 rounded-md text-sm sm:text-base text-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
              title="Redo"
            >
              ↷ Redo
            </button>


            {/* Canvas Name */}

            <input
              type="text"
              placeholder="Canvas name"
              value={canvasName}
              onChange={(event) =>
                setCanvasName(
                  event.target.value
                )
              }
              className="border rounded-md px-3 py-2 text-black text-sm w-full sm:w-40"
            />


            {/* Save */}

            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-blue-700"
            >
              Save
            </button>

          </div>

        </div>

      </header>


      {/* =====================================
          Error Message
      ===================================== */}

      {errorMessage && (
        <div className="bg-red-100 text-red-700 px-4 py-3 text-sm border-b">
          {errorMessage}
        </div>
      )}


      {/* =====================================
          Editor
      ===================================== */}

      <div className="flex flex-1 min-w-0 flex-col lg:flex-row">

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
          deleteSelectedElement={
            deleteSelectedElement
          }
        />

      </div>


      {/* =====================================
          Saved Canvases
      ===================================== */}

      <CanvasList
        canvases={canvases}
        onOpen={handleOpenCanvas}
        onDelete={handleDeleteCanvas}
      />

    </div>
  );
}

