import { RequestHandler } from "express";
import Course from "../models/course.models";
import School from "../models/school.models";
import mongoose from "mongoose";

const getCourseList: RequestHandler = async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = ((req.query.search || "") as string)?.trim();
  const skip = (page - 1) * limit;
  const { schoolId } = req.params;

  const result = await Course.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [{ name: { $regex: search, $options: "i" } }],
          },
          {
            school: new mongoose.Types.ObjectId(schoolId),
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

  const course = result[0].data;
  const total = result[0].metadata[0]?.total || 0;

  res.status(200).json({
    success: true,
    message: "Course retrieved successfully.",
    data: {
      course,
      pagination: {
        page: page,
        rows: course.length,
        size: limit,
        total: total,
      },
    },
  });
};

const createCourse: RequestHandler = async (req, res) => {
  const { name } = req.body;
  const { schoolId } = req.params;

  const school = await School.findById(schoolId);

  if (!school) {
    res.status(404).json({
      success: true,
      message: "School not found.",
    });
    return;
  }

  const course = await Course.create({
    name,
    school: schoolId,
  });

  res.status(201).json({
    success: true,
    message: "Course created successfully",
    course,
  });
};

export { getCourseList, createCourse };
