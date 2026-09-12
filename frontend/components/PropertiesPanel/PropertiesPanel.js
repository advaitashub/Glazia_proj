export default function PropertiesPanel({
  selectedElement,
  updateElement,
  deleteSelectedElement,
}) {
  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white border-t lg:border-t-0 lg:border-l p-4">
      
      <h2 className="font-semibold text-blue-700 mb-4">
        Properties
      </h2>

      {!selectedElement && (
        <p className="text-sm text-gray-500">
          Select an element to edit its properties.
        </p>
      )}

      {selectedElement && (
        <div className="space-y-4">

          {/* Selected ID */}

          <div>
            <p className="text-sm font-medium text-gray-700">
              Selected ID
            </p>

            <p className="text-sm text-gray-500">
              {selectedElement.id}
            </p>
          </div>


          {/* Text Properties */}

          {selectedElement.type === "text" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text
                </label>

                <input
                  type="text"
                  value={selectedElement.text}
                  onChange={(event) =>
                    updateElement(
                      "text",
                      event.target.value
                    )
                  }
                  className="w-full border rounded-md p-2 text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Size
                </label>

                <input
                  type="number"
                  min="1"
                  value={selectedElement.fontSize}
                  onChange={(event) => {
                    const newFontSize = Number(
                      event.target.value
                    );

                    if (newFontSize > 0) {
                      updateElement(
                        "fontSize",
                        newFontSize
                      );
                    }
                  }}
                  className="w-full border rounded-md p-2 text-black"
                />
              </div>
            </>
          )}


          {/* X Position */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              X Position
            </label>

            <input
              type="number"
              value={Math.round(selectedElement.x)}
              onChange={(event) =>
                updateElement(
                  "x",
                  Number(event.target.value)
                )
              }
              className="w-full border rounded-md p-2 text-black"
            />
          </div>


          {/* Y Position */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Y Position
            </label>

            <input
              type="number"
              value={Math.round(selectedElement.y)}
              onChange={(event) =>
                updateElement(
                  "y",
                  Number(event.target.value)
                )
              }
              className="w-full border rounded-md p-2 text-black"
            />
          </div>


          {/* Circle Radius */}

          {selectedElement.type === "circle" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Radius
              </label>

              <input
                type="number"
                min="10"
                value={Math.round(selectedElement.radius)}
                onChange={(event) => {
                  const newRadius = Number(
                    event.target.value
                  );

                  if (newRadius >= 10) {
                    updateElement(
                      "radius",
                      newRadius
                    );
                  }
                }}
                className="w-full border rounded-md p-2 text-black"
              />
            </div>
          )}


          {/* Width */}

          {selectedElement.type !== "text" &&
            selectedElement.type !== "circle" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Width
                </label>

                <input
                  type="number"
                  min="30"
                  value={Math.round(selectedElement.width)}
                  onChange={(event) =>
                    updateElement(
                      "width",
                      Number(event.target.value)
                    )
                  }
                  className="w-full border rounded-md p-2 text-black"
                />
              </div>
            )}


          {/* Height */}

          {selectedElement.type !== "text" &&
            selectedElement.type !== "circle" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height
                </label>

                <input
                  type="number"
                  min="30"
                  value={Math.round(selectedElement.height)}
                  onChange={(event) =>
                    updateElement(
                      "height",
                      Number(event.target.value)
                    )
                  }
                  className="w-full border rounded-md p-2 text-black"
                />
              </div>
            )}


          {/* Rotation */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rotation
            </label>

            <input
              type="number"
              value={Math.round(selectedElement.rotation || 0)}
              onChange={(event) =>
                updateElement(
                  "rotation",
                  Number(event.target.value)
                )
              }
              className="w-full border rounded-md p-2 text-black"
            />
          </div>


          {/* Delete */}

          <button
            onClick={deleteSelectedElement}
            className="w-full bg-red-500 text-white rounded-md p-2 hover:bg-red-600"
          >
            Delete Element
          </button>

        </div>
      )}
    </aside>
  );
}