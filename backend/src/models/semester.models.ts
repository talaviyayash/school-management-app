import mongoose, { Model, Schema } from "mongoose";
import { ISemester } from "../types/semester.type";

const semesterSchema: Schema<ISemester> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // e.g., "Sem 1"
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
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

const Semester: Model<ISemester> = mongoose.model<ISemester>(
  "Semester",
  semesterSchema
);

export default Semester;
