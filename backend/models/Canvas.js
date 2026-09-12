import mongoose from "mongoose";

const canvasSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    width: {
      type: Number,
      required: true,
      min: 1,
    },

    height: {
      type: Number,
      required: true,
      min: 1,
    },

    elements: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Canvas = mongoose.model("Canvas", canvasSchema);

export default Canvas;