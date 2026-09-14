"use client";

import { useRef, useState } from "react";

export default function Toolbar({
  onAddText,
  onAddImage,
  onAddShape,
}) {
  const fileInputRef = useRef(null);

  const [shapeType, setShapeType] = useState("rect");

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    onAddImage(imageUrl);

    event.target.value = "";
  };

  const handleAddShape = () => {
    onAddShape(shapeType);
  };

  return (
    <aside className="w-full lg:w-52 shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm p-3">

      {/* ================= TITLE ================= */}

      <div className="mb-4 px-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Elements
        </p>

        <h2 className="text-base font-bold text-gray-800 mt-1">
          Add to canvas
        </h2>
      </div>


      {/* ================= TOOLS ================= */}

      <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">

        {/* TEXT */}

        <button
          onClick={onAddText}
          className="group flex items-center gap-3 p-3 rounded-lg border border-purple-100 bg-purple-50 text-left hover:bg-purple-100 hover:border-purple-200 transition"
        >
          <span className="w-9 h-9 shrink-0 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg group-hover:bg-purple-200">
            T
          </span>

          <span>
            <span className="block text-sm font-semibold text-gray-800">
              Text
            </span>

            <span className="block text-xs text-gray-500">
              Add a heading
            </span>
          </span>
        </button>


        {/* SHAPE */}

        <div className="border border-blue-100 bg-blue-50 rounded-lg p-2">

          <div className="flex items-center gap-2 mb-2 px-1">

            <span className="w-9 h-9 shrink-0 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              ◇
            </span>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                Shape
              </p>

              <p className="text-xs text-gray-500">
                Choose a shape
              </p>
            </div>

          </div>


          <div className="flex gap-2">

            <select
              value={shapeType}
              onChange={(event) =>
                setShapeType(event.target.value)
              }
              className="flex-1 min-w-0 border border-blue-200 bg-white rounded-md px-2 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="rect">
                Rectangle
              </option>

              <option value="circle">
                Circle
              </option>
            </select>


            <button
              onClick={handleAddShape}
              className="bg-blue-600 text-white px-3 rounded-md hover:bg-blue-700 transition font-semibold"
              title="Add shape"
            >
              +
            </button>

          </div>

        </div>


        {/* IMAGE */}

        <button
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="group flex items-center gap-3 p-3 rounded-lg border border-pink-100 bg-pink-50 text-left hover:bg-pink-100 hover:border-pink-200 transition"
        >
          <span className="w-9 h-9 shrink-0 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center text-lg">
            ▧
          </span>

          <span>
            <span className="block text-sm font-semibold text-gray-800">
              Image
            </span>

            <span className="block text-xs text-gray-500">
              Upload from device
            </span>
          </span>
        </button>


        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

      </div>


      {/* ================= TIP ================= */}

      <div className="hidden lg:block mt-5 pt-4 border-t border-gray-100">

        <p className="text-xs text-gray-400 leading-relaxed">
          Tip: Select an element on the canvas to edit its properties.
        </p>

      </div>

    </aside>
  );
}

