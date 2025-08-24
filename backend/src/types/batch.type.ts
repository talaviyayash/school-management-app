import { Types } from "mongoose";

export interface IBatch {
  _id?: Types.ObjectId;
  name: string;
  semester: Types.ObjectId;
  school: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
