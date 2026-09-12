import express from "express";

import {
  createCanvas,
  getCanvases,
  getCanvasById,
  updateCanvas,
  deleteCanvas,
} from "../controllers/canvasController.js";

const router = express.Router();

router.post("/", createCanvas);
router.get("/", getCanvases);
router.get("/:id", getCanvasById);
router.put("/:id", updateCanvas);
router.delete("/:id", deleteCanvas);

export default router;