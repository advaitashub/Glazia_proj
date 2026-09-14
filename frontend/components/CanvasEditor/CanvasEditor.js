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

  const handleSelect = (id) => {
    setSelectedId(id);
    setSelectedElementId(id);
  };

  const handleStageMouseDown = (event) => {
    const clickedOnEmptyArea =
      event.target === event.target.getStage();

    if (clickedOnEmptyArea) {
      setSelectedId(null);
      setSelectedElementId(null);
    }
  };

  const handleTransformEnd = (id, event) => {
    const node = event.target;

    const element = elements.find(
      (item) => item.id === id
    );

    if (!element) {
      return;
    }

    const newRotation = node.rotation();

    updateElement(
      "rotation",
      newRotation
    );

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

    if (element.type === "circle") {
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

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
    <main className="flex-1 min-w-0 flex flex-col bg-gradient-to-br from-slate-100 via-gray-100 to-blue-50 rounded-xl border border-gray-200 overflow-hidden">

      {/* Workspace header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/80 border-b border-gray-200">

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Workspace
          </p>

          <p className="text-sm font-semibold text-gray-700">
            Design Canvas
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          Ready
        </div>

      </div>

      {/* Canvas area */}
      <div className="flex-1 min-h-[420px] flex items-center justify-center p-4 sm:p-6 overflow-auto">

        <div className="relative bg-white rounded-lg shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-gray-200 overflow-hidden w-full max-w-[800px] aspect-[8/5]">

          {/* Small canvas label */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400 shadow-sm">
              800 × 500
            </span>
          </div>

          <Stage
            width={800}
            height={500}
            className="w-full h-auto"
            onMouseDown={handleStageMouseDown}
            onTouchStart={handleStageMouseDown}
          >
            <Layer>
              {elements.map((element) => {
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
      </div>

      {/* Workspace footer */}
      <div className="hidden sm:flex items-center justify-center px-4 py-2 bg-white/70 border-t border-gray-200">
        <p className="text-[11px] text-gray-400">
          Drag elements to move • Use corners to resize • Drag the top handle to rotate
        </p>
      </div>

    </main>
  );
}