import mongoose, { Model, Schema } from "mongoose";
import { IBatch } from "../types/batch.type";

const batchSchema: Schema<IBatch> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // e.g., "2022-23"
    },
    semester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
  },
  { timestamps: true }
);

const Batch: Model<IBatch> = mongoose.model<IBatch>("Batch", batchSchema);

export default Batch;
