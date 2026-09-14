"use client";

import Toolbar from "../components/Toolbar/Toolbar";
import CanvasEditor from "../components/CanvasEditor/CanvasEditor";
import PropertiesPanel from "../components/PropertiesPanel/PropertiesPanel";
import CanvasList from "../components/CanvasList/CanvasList";

import useCanvas from "../hooks/useCanvas";

export default function Home() {
  const {
    elements,
    selectedElement,
    setSelectedId,
    canvases,
    canvasName,
    setCanvasName,
    errorMessage,
    addText,
    addShape,
    addImage,
    handleDragEnd,
    updateElement,
    handleSave,
    handleOpenCanvas,
    handleDeleteCanvas,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useCanvas();

  return (
    <div className="min-h-screen bg-slate-100 text-gray-800">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">

        <div className="px-2 sm:px-5 py-3">

          {/* Brand + Controls */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Brand */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">

              {/* Creative Logo */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0">

                <div className="absolute left-0 top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-purple-500 rotate-[-8deg]" />

                <div className="absolute right-0 bottom-0 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-500 rotate-[8deg]" />

                <div className="absolute left-1.5 top-1.5 sm:left-2 sm:top-2 w-6 h-6 sm:w-6 sm:h-6 rounded-md bg-gray-900 flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                  V
                </div>

              </div>

              {/* Brand Text */}
              <div className="min-w-0 hidden xs:block">

                <h1 className="text-base sm:text-xl font-bold text-gray-900 truncate">
                  Visual Editor
                </h1>

                <p className="hidden sm:block text-[11px] sm:text-xs text-gray-400">
                  Create • Edit • Save
                </p>

              </div>

            </div>

            {/* Controls */}
            <div className="ml-auto flex items-center gap-1.5 sm:gap-2 min-w-0">

              {/* Canvas Name */}
              <input
                type="text"
                placeholder="Canvas name"
                value={canvasName}
                onChange={(event) =>
                  setCanvasName(event.target.value)
                }
                className="w-[90px] sm:w-40 min-w-0 border border-gray-200 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              />

              {/* Save */}
              <button
                onClick={handleSave}
                className="shrink-0 px-2.5 sm:px-4 py-2 rounded-lg bg-gray-900 text-white text-xs sm:text-sm font-semibold hover:bg-gray-800 transition"
              >
                Save
              </button>

              {/* Undo */}
              <button
                onClick={undo}
                disabled={!canUndo}
                title="Undo (Ctrl + Z)"
                className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg border flex items-center justify-center text-base sm:text-lg ${
                  canUndo
                    ? "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    : "bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed"
                }`}
              >
                ↶
              </button>

              {/* Redo */}
              <button
                onClick={redo}
                disabled={!canRedo}
                title="Redo (Ctrl + Y)"
                className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg border flex items-center justify-center text-base sm:text-lg ${
                  canRedo
                    ? "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    : "bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed"
                }`}
              >
                ↷
              </button>

            </div>

          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

        </div>

      </header>

      {/* Main Editor */}
      <main className="p-2 sm:p-4 lg:p-5">

        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">

          {/* Canvas */}
          <div className="order-1 lg:order-2 flex-1 min-w-0">

            <CanvasEditor
              elements={elements}
              setSelectedId={setSelectedId}
              handleDragEnd={handleDragEnd}
              updateElement={updateElement}
            />

          </div>

          {/* Toolbar */}
          <div className="order-2 lg:order-1 lg:w-52 shrink-0">

            <Toolbar
              onAddText={addText}
              onAddImage={addImage}
              onAddShape={addShape}
            />

          </div>

          {/* Properties */}
          <div className="order-3 lg:order-3 lg:w-64 shrink-0">

            <PropertiesPanel
              selectedElement={selectedElement}
              updateElement={updateElement}
            />

          </div>

        </div>

        {/* Saved Canvases */}
        <div className="mt-3 sm:mt-4">

          <CanvasList
            canvases={canvases}
            onOpen={handleOpenCanvas}
            onDelete={handleDeleteCanvas}
          />

        </div>

      </main>

      {/* Footer */}
      <footer className="px-4 py-5 text-center">

        <p className="text-xs text-gray-400">
          Built with Next.js, React Konva, Express & MongoDB
        </p>

      </footer>

    </div>
  );
}

