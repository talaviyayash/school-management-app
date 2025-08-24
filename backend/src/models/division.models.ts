import mongoose, { Model, Schema } from "mongoose";
import { IDivision } from "../types/division.type";

const divisionSchema: Schema<IDivision> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // e.g., "A" or "Div 1"
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
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

const Division: Model<IDivision> = mongoose.model<IDivision>(
  "Division",
  divisionSchema
);

export default Division;
