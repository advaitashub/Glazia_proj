"use client";

export default function CanvasList({
  canvases,
  onOpen,
  onDelete,
}) {
  return (
    <aside className="w-full bg-white border-t p-4">

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
            className="flex items-center justify-between border rounded-md p-3"
          >

            <div>
              <p className="font-medium text-black">
                {canvas.name}
              </p>

              <p className="text-xs text-gray-500">
                {canvas.width} × {canvas.height}
              </p>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => onOpen(canvas._id)}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
              >
                Open
              </button>

              <button
                onClick={() => onDelete(canvas._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
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