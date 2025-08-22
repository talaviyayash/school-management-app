import { Types } from "mongoose";

export interface ICourse {
  _id: Types.ObjectId;
  name: string;
  school?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
