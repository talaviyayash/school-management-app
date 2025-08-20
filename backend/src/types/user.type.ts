import { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "student" | "teacher" | "admin";

  school?: Types.ObjectId; // optional school reference
  batch?: Types.ObjectId; // optional current batch
  batchHistory?: Types.ObjectId[]; // history of batches

  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;

  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Instance methods
  comparePassword(candidatePassword: string): Promise<boolean>;
}
