import mongoose, { Model, Schema } from "mongoose";
import { ICourse } from "../types/course.type";

const courseSchema: Schema<ICourse> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
  },
  { timestamps: true }
);

const Course: Model<ICourse> = mongoose.model<ICourse>("Course", courseSchema);

export default Course;
