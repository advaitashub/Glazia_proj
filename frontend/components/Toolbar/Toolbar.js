"use client";

import { useState } from "react";

export default function Toolbar({
  onAddText,
  onAddImage,
  onAddShape,
}) {
  const [showShapes, setShowShapes] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    onAddImage(imageUrl);
  };

  const handleRectangle = () => {
    onAddShape("rect");
    setShowShapes(false);
  };

  const handleCircle = () => {
    onAddShape("circle");
    setShowShapes(false);
  };

  return (
    <aside className="w-full lg:w-56 shrink-0 bg-white border-b lg:border-b-0 lg:border-r p-4">

      <h2 className="font-semibold text-blue-700 mb-4">
        Elements
      </h2>

      <div className="flex flex-row lg:flex-col gap-2">

        {/* Text */}

        <button
          onClick={onAddText}
          className="flex-1 lg:w-full text-black border rounded-md p-2 text-left hover:bg-gray-100"
        >
          + Text
        </button>


        {/* Image */}

        <label className="flex-1 lg:w-full text-black border rounded-md p-2 text-left hover:bg-gray-100 cursor-pointer">
          + Image

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>


        {/* Shape */}

        <div className="relative flex-1 lg:w-full">

          <button
            onClick={() => setShowShapes(!showShapes)}
            className="w-full text-black border rounded-md p-2 text-left hover:bg-gray-100"
          >
            + Shape ▾
          </button>


          {showShapes && (
            <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-md shadow-md z-10">

              <button
                onClick={handleRectangle}
                className="w-full text-black p-2 text-left hover:bg-gray-100"
              >
                Rectangle
              </button>

              <button
                onClick={handleCircle}
                className="w-full text-black p-2 text-left hover:bg-gray-100"
              >
                Circle
              </button>

            </div>
          )}

        </div>

      </div>

    </aside>
  );
}