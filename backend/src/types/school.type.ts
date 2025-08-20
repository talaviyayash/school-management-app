import { Document, Types } from "mongoose";

export interface ISchool extends Document {
  name: string;
  address: string;
  principalId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
