import { Types } from "mongoose";

export interface ISemester {
  _id?: Types.ObjectId;
  name: string;
  course: Types.ObjectId;
  school: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
