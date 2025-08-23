import { RequestHandler } from "express";
import Semester from "../models/semester.models";
import Course from "../models/course.models";
import mongoose from "mongoose";

const createSemester: RequestHandler = async (req, res) => {
  const { name } = req.body;
  const { courseId } = req.params;

  const course = await Course.findById(courseId);

  if (!course) {
    res.status(404).json({
      success: true,
      message: "Course not found.",
    });
    return;
  }

  const sem = await Semester.create({
    name,
    course: courseId,
    school: course.school,
  });

  res.status(201).json({
    success: true,
    message: "Semester created successfully",
    semester: sem,
  });
};
const getSemesterList: RequestHandler = async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = ((req.query.search || "") as string)?.trim();
  const skip = (page - 1) * limit;
  const { courseId } = req.params;

  const result = await Semester.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [{ name: { $regex: search, $options: "i" } }],
          },
          {
            course: new mongoose.Types.ObjectId(courseId),
          },
        ],
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

  const semester = result[0].data;
  const total = result[0].metadata[0]?.total || 0;

  res.status(200).json({
    success: true,
    message: "Course retrieved successfully.",
    data: {
      semester,
      pagination: {
        page: page,
        rows: semester.length,
        size: limit,
        total: total,
      },
    },
  });
};

const editSemester: RequestHandler = async (req, res) => {
  const { name } = req.body;
  const { semId } = req.params;

  const course = await Semester.findByIdAndUpdate(
    semId,
    {
      name,
    },
    { new: true, runValidators: true }
  );

  res.status(201).json({
    success: true,
    message: "Semester updated successfully",
    course,
  });
};

export { createSemester, getSemesterList, editSemester };
