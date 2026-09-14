"use client";

export default function CanvasList({
  canvases,
  onOpen,
  onDelete,
}) {
  return (
    <aside className="w-full bg-white border-t p-3 sm:p-4">

      <h2 className="font-semibold text-blue-700 mb-4">
        Saved Canvases
      </h2>

      {canvases.length === 0 && (
        <p className="text-sm text-gray-500">
          No saved canvases yet.
        </p>
      )}

      <div className="space-y-2">

        {canvases.map((canvas) => (
          <div
            key={canvas._id}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border rounded-md p-3"
          >

            <div className="min-w-0">
              <p className="font-medium text-black break-words">
                {canvas.name}
              </p>

              <p className="text-xs text-gray-500">
                {canvas.width} × {canvas.height}
              </p>
            </div>

            <div className="flex gap-2 shrink-0">

              <button
                onClick={() => onOpen(canvas._id)}
                className="flex-1 sm:flex-none bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 text-sm"
              >
                Open
              </button>

              <button
                onClick={() => onDelete(canvas._id)}
                className="flex-1 sm:flex-none bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 text-sm"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </aside>
  );
}
