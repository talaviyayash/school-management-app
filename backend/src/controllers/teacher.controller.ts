import { RequestHandler } from "express";
import mongoose from "mongoose";
import School from "../models/school.models";
import User from "../models/user.models";
import { AppError } from "../utils/AppError";

const getTeacherList: RequestHandler = async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = ((req.query.search || "") as string)?.trim();
  const skip = (page - 1) * limit;
  const { schoolId } = req.params;

  const result = await User.aggregate([
    {
      $match: {
        $and: [
          { role: "teacher" },
          {
            school: new mongoose.Types.ObjectId(schoolId),
          },
          {
            $or: [{ name: { $regex: search, $options: "i" } }],
          },
        ],
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        isActive: 1,
      },
    },

    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
      },
    },
  ]);

  const teacher = result[0].data;
  const total = result[0].metadata[0]?.total || 0;

  res.status(200).json({
    success: true,
    message: "Teacher retrieved successfully.",
    data: {
      teacher,
      pagination: {
        page: page,
        rows: teacher.length,
        size: limit,
        total: total,
      },
    },
  });
};

const createTeacher: RequestHandler = async (req, res) => {
  const { name, email } = req.body;
  const { schoolId } = req.params;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  const school = await School.findById(schoolId);

  if (!school) {
    res.status(404).json({
      success: true,
      message: "School not found.",
    });
    return;
  }

  const newUser = new User({
    name,
    email,
    password: "Teacher@123",
    role: "teacher",
    school: schoolId,
  });
  await newUser.save();

  res.status(201).json({
    success: true,
    message: "Teacher added successfully",
  });
};

const editTeacher: RequestHandler = async (req, res) => {
  const { name } = req.body;
  const { teacherId } = req.params;

  await User.findByIdAndUpdate(
    teacherId,
    {
      name,
    },
    { new: true, runValidators: true }
  );

  res.status(201).json({
    success: true,
    message: "Teacher updated successfully",
  });
};

const getTeacher: RequestHandler = async (req, res) => {
  const { teacherId } = req.params;

  const teacher = await User.findById(teacherId)
    .select("name email isActive school")
    .populate("school", "name address");

  if (!teacher) {
    res.status(4040).json({
      success: true,
      message: "Teacher Not found.",
      teacher,
    });
  }

  res.status(201).json({
    success: true,
    message: "Teacher updated successfully",
    teacher,
  });
};
export { createTeacher, editTeacher, getTeacherList, getTeacher };
