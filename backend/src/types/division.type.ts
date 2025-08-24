import { Types } from "mongoose";

export interface IDivision {
  _id?: Types.ObjectId;
  name: string;
  batch: Types.ObjectId;
  school: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
