import mongoose, { Model, Schema } from "mongoose";
import { ISchool } from "../types/school.type";

const schoolSchema: Schema<ISchool> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: { type: String, required: true, trim: true },
    principalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

const School: Model<ISchool> = mongoose.model<ISchool>("School", schoolSchema);

export default School;
