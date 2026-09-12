import Canvas from "../models/Canvas.js";

// POST /api/canvases
// Create a new canvas
export const createCanvas = async (req, res) => {
  try {
    const { name, width, height, elements } = req.body;

    const canvas = await Canvas.create({
      name,
      width,
      height,
      elements: elements || [],
    });

    res.status(201).json(canvas);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create canvas",
      error: error.message,
    });
  }
};


// GET /api/canvases
// Get all canvases
export const getCanvases = async (req, res) => {
  try {
    const canvases = await Canvas.find().sort({
      updatedAt: -1,
    });

    res.status(200).json(canvases);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch canvases",
      error: error.message,
    });
  }
};


// GET /api/canvases/:id
// Get one canvas
export const getCanvasById = async (req, res) => {
  try {
    const canvas = await Canvas.findById(req.params.id);

    if (!canvas) {
      return res.status(404).json({
        message: "Canvas not found",
      });
    }

    res.status(200).json(canvas);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch canvas",
      error: error.message,
    });
  }
};


// PUT /api/canvases/:id
// Update a canvas
export const updateCanvas = async (req, res) => {
  try {
    const { name, width, height, elements } = req.body;

    const canvas = await Canvas.findByIdAndUpdate(
      req.params.id,
      {
        name,
        width,
        height,
        elements,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!canvas) {
      return res.status(404).json({
        message: "Canvas not found",
      });
    }

    res.status(200).json(canvas);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update canvas",
      error: error.message,
    });
  }
};


// DELETE /api/canvases/:id
// Delete a canvas
export const deleteCanvas = async (req, res) => {
  try {
    const canvas = await Canvas.findByIdAndDelete(
      req.params.id
    );

    if (!canvas) {
      return res.status(404).json({
        message: "Canvas not found",
      });
    }

    res.status(200).json({
      message: "Canvas deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete canvas",
      error: error.message,
    });
  }
};