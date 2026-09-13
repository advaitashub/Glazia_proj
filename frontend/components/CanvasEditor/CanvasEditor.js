"use client";

import { useEffect, useRef, useState } from "react";

import {
  Stage,
  Layer,
  Rect,
  Circle,
  Text,
  Image as KonvaImage,
  Transformer,
} from "react-konva";


function CanvasImage({
  element,
  onSelect,
  onDragEnd,
  shapeRef,
  onTransformEnd,
}) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new window.Image();

    img.src = element.src;

    img.onload = () => {
      setImage(img);
    };
  }, [element.src]);

  if (!image) {
    return null;
  }

  return (
    <KonvaImage
      ref={shapeRef}
      image={image}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      rotation={element.rotation || 0}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
    />
  );
}


export default function CanvasEditor({
  elements,
  setSelectedId,
  handleDragEnd,
  updateElement,
}) {

  const [selectedElementId, setSelectedElementId] =
    useState(null);

  const transformerRef = useRef(null);

  const shapeRefs = useRef({});


  // =====================================
  // Keep Transformer attached
  // =====================================

  useEffect(() => {

    const transformer = transformerRef.current;

    if (!transformer) {
      return;
    }

    const selectedNode =
      shapeRefs.current[selectedElementId];

    if (selectedNode) {
      transformer.nodes([selectedNode]);
    } else {
      transformer.nodes([]);
    }

    transformer.getLayer()?.batchDraw();

  }, [selectedElementId, elements]);


  // =====================================
  // Select Element
  // =====================================

  const handleSelect = (id) => {

    setSelectedId(id);
    setSelectedElementId(id);

  };


  // =====================================
  // Clear Selection
  // =====================================

  const handleStageMouseDown = (event) => {

    const clickedOnEmptyArea =
      event.target === event.target.getStage();

    if (clickedOnEmptyArea) {

      setSelectedId(null);
      setSelectedElementId(null);

    }

  };


  // =====================================
  // Transform Element
  // =====================================

  const handleTransformEnd = (id, event) => {

    const node = event.target;

    const element = elements.find(
      (item) => item.id === id
    );

    if (!element) {
      return;
    }


    // =====================================
    // SAVE ROTATION
    // =====================================

    const newRotation = node.rotation();

    updateElement(
      "rotation",
      newRotation
    );


    // =====================================
    // TEXT RESIZE
    // =====================================

    if (element.type === "text") {

      const scaleY = node.scaleY();

      const newFontSize =
        element.fontSize * scaleY;

      node.scaleX(1);
      node.scaleY(1);

      updateElement(
        "fontSize",
        Math.max(
          8,
          Math.round(newFontSize)
        )
      );

      return;
    }


    // =====================================
    // CIRCLE RESIZE
    // =====================================

    if (element.type === "circle") {

      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      // Use the smaller scale so the circle
      // remains a circle.

      const scale =
        Math.min(scaleX, scaleY);

      const newRadius =
        element.radius * scale;

      node.scaleX(1);
      node.scaleY(1);

      updateElement(
        "radius",
        Math.max(
          10,
          Math.round(newRadius)
        )
      );

      return;
    }


    // =====================================
    // RECTANGLE / IMAGE RESIZE
    // =====================================

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const newWidth =
      node.width() * scaleX;

    const newHeight =
      node.height() * scaleY;

    node.scaleX(1);
    node.scaleY(1);

    updateElement(
      "width",
      Math.max(
        30,
        Math.round(newWidth)
      )
    );

    updateElement(
      "height",
      Math.max(
        30,
        Math.round(newHeight)
      )
    );

  };


  return (
    <main className="flex-1 min-w-0 flex items-center justify-center bg-gray-200 p-4 overflow-auto">

      <div className="bg-white shadow-lg w-full max-w-[800px] aspect-[8/5]">

        <Stage
          width={800}
          height={500}
          className="w-full h-auto"
          onMouseDown={handleStageMouseDown}
          onTouchStart={handleStageMouseDown}
        >

          <Layer>

            {elements.map((element) => {


              // =====================================
              // RECTANGLE
              // =====================================

              if (element.type === "rect") {

                return (
                  <Rect
                    key={element.id}

                    ref={(node) => {
                      shapeRefs.current[element.id] =
                        node;
                    }}

                    x={element.x}
                    y={element.y}

                    width={element.width}
                    height={element.height}

                    rotation={
                      element.rotation || 0
                    }

                    fill={
                      element.fill || "lightblue"
                    }

                    draggable

                    onClick={() =>
                      handleSelect(element.id)
                    }

                    onTap={() =>
                      handleSelect(element.id)
                    }

                    onDragEnd={(event) =>
                      handleDragEnd(
                        event,
                        element.id
                      )
                    }

                    onTransformEnd={(event) =>
                      handleTransformEnd(
                        element.id,
                        event
                      )
                    }
                  />
                );
              }


              // =====================================
              // CIRCLE
              // =====================================

              if (element.type === "circle") {

                return (
                  <Circle
                    key={element.id}

                    ref={(node) => {
                      shapeRefs.current[element.id] =
                        node;
                    }}

                    x={element.x}
                    y={element.y}

                    radius={element.radius}

                    rotation={
                      element.rotation || 0
                    }

                    fill={
                      element.fill || "lightgreen"
                    }

                    draggable

                    onClick={() =>
                      handleSelect(element.id)
                    }

                    onTap={() =>
                      handleSelect(element.id)
                    }

                    onDragEnd={(event) =>
                      handleDragEnd(
                        event,
                        element.id
                      )
                    }

                    onTransformEnd={(event) =>
                      handleTransformEnd(
                        element.id,
                        event
                      )
                    }
                  />
                );
              }


              // =====================================
              // TEXT
              // =====================================

              if (element.type === "text") {

                return (
                  <Text
                    key={element.id}

                    ref={(node) => {
                      shapeRefs.current[element.id] =
                        node;
                    }}

                    x={element.x}
                    y={element.y}

                    text={element.text}

                    fontSize={element.fontSize}

                    rotation={
                      element.rotation || 0
                    }

                    fill={
                      element.fill || "black"
                    }

                    draggable

                    onClick={() =>
                      handleSelect(element.id)
                    }

                    onTap={() =>
                      handleSelect(element.id)
                    }

                    onDragEnd={(event) =>
                      handleDragEnd(
                        event,
                        element.id
                      )
                    }

                    onTransformEnd={(event) =>
                      handleTransformEnd(
                        element.id,
                        event
                      )
                    }
                  />
                );
              }


              // =====================================
              // IMAGE
              // =====================================

              if (element.type === "image") {

                return (
                  <CanvasImage
                    key={element.id}

                    element={element}

                    shapeRef={(node) => {
                      shapeRefs.current[element.id] =
                        node;
                    }}

                    onSelect={() =>
                      handleSelect(element.id)
                    }

                    onDragEnd={(event) =>
                      handleDragEnd(
                        event,
                        element.id
                      )
                    }

                    onTransformEnd={(event) =>
                      handleTransformEnd(
                        element.id,
                        event
                      )
                    }
                  />
                );
              }


              return null;

            })}


            {/* =====================================
                TRANSFORMER
            ===================================== */}

            <Transformer
              ref={transformerRef}

              rotateEnabled={true}

              enabledAnchors={[
                "top-left",
                "top-right",
                "bottom-left",
                "bottom-right",
              ]}

              rotateAnchorOffset={40}

              rotationSnaps={[
                0,
                45,
                90,
                135,
                180,
                225,
                270,
                315,
              ]}

              rotationSnapTolerance={5}

              boundBoxFunc={(oldBox, newBox) => {

                const minSize = 30;

                if (
                  newBox.width < minSize ||
                  newBox.height < minSize
                ) {
                  return oldBox;
                }

                return newBox;

              }}

              keepRatio={false}

            />

          </Layer>

        </Stage>

      </div>

    </main>
  );
}

