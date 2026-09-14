"use client";

export default function PropertiesPanel({
  selectedElement,
  updateElement,
}) {
  if (!selectedElement) {
    return (
      <aside className="w-full lg:w-64 shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Inspector
          </p>

          <h2 className="text-lg font-bold text-gray-800 mt-1">
            Properties
          </h2>
        </div>

        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5 text-center">
          <div className="mx-auto mb-3 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            +
          </div>

          <p className="text-sm font-medium text-gray-700">
            No element selected
          </p>

          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Select an element on the canvas to edit its properties.
          </p>
        </div>
      </aside>
    );
  }

  const updateNumber = (property, value) => {
    updateElement(property, Number(value));
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm p-5">

      {/* Header */}
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Inspector
        </p>

        <div className="flex items-center justify-between mt-1">
          <h2 className="text-lg font-bold text-gray-800">
            Properties
          </h2>

          <span className="px-2 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-600 capitalize">
            {selectedElement.type}
          </span>
        </div>
      </div>

      <div className="space-y-5">

        {/* Position */}
        <section>
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Position
          </p>

          <div className="grid grid-cols-2 gap-3">

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                X
              </label>

              <input
                type="number"
                value={Math.round(selectedElement.x)}
                onChange={(event) =>
                  updateNumber("x", event.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Y
              </label>

              <input
                type="number"
                value={Math.round(selectedElement.y)}
                onChange={(event) =>
                  updateNumber("y", event.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

          </div>
        </section>

        {/* Size */}
        {selectedElement.type !== "text" &&
          selectedElement.type !== "circle" && (
            <section>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Size
              </p>

              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Width
                  </label>

                  <input
                    type="number"
                    value={Math.round(selectedElement.width)}
                    onChange={(event) =>
                      updateNumber("width", event.target.value)
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Height
                  </label>

                  <input
                    type="number"
                    value={Math.round(selectedElement.height)}
                    onChange={(event) =>
                      updateNumber("height", event.target.value)
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

              </div>
            </section>
          )}

        {/* Circle size */}
        {selectedElement.type === "circle" && (
          <section>
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Size
            </p>

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Radius
              </label>

              <input
                type="number"
                value={Math.round(selectedElement.radius)}
                onChange={(event) =>
                  updateNumber("radius", event.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </section>
        )}

        {/* Rotation */}
        <section>
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Rotation
          </p>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Degrees
            </label>

            <input
              type="number"
              value={Math.round(selectedElement.rotation || 0)}
              onChange={(event) =>
                updateNumber("rotation", event.target.value)
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </section>

        {/* Text */}
        {selectedElement.type === "text" && (
          <section>
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Text
            </p>

            <div className="space-y-3">

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Content
                </label>

                <input
                  type="text"
                  value={selectedElement.text}
                  onChange={(event) =>
                    updateElement("text", event.target.value)
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Font Size
                </label>

                <input
                  type="number"
                  value={selectedElement.fontSize}
                  onChange={(event) =>
                    updateNumber(
                      "fontSize",
                      event.target.value
                    )
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>

            </div>
          </section>
        )}

        {/* Fill */}
        {selectedElement.type !== "image" && (
          <section>
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Appearance
            </p>

            <div>
              <label className="block text-xs text-gray-500 mb-2">
                Fill Colour
              </label>

              <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-2 bg-gray-50">

                <input
                  type="color"
                  value={selectedElement.fill || "#000000"}
                  onChange={(event) =>
                    updateElement(
                      "fill",
                      event.target.value
                    )
                  }
                  className="w-10 h-10 rounded-md border-0 cursor-pointer bg-transparent"
                />

                <span className="text-sm font-medium text-gray-600 uppercase">
                  {selectedElement.fill || "#000000"}
                </span>

              </div>
            </div>
          </section>
        )}

      </div>
    </aside>
  );
}