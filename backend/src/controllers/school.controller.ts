import { RequestHandler } from "express";
import { Types } from "mongoose";
import School from "../models/school.models";
import User from "../models/user.models";

const createSchool: RequestHandler = async (req, res) => {
  const { name, address, principal } = req.body;

  let principalUser = await User.findOne({ email: principal });

  if (!principalUser) {
    principalUser = await User.create({
      name: "Principal",
      email: principal,
      password: principal,
      role: "principal",
    });
  }

  const school = await School.create({
    name,
    address,
    principalId: principalUser._id,
  });

  principalUser.school = school._id as Types.ObjectId;
  await principalUser.save();

  res.status(201).json({
    success: true,
    message: "School created successfully",
    school,
  });
};

const editSchool: RequestHandler = async (req, res) => {
  const { name, address } = req.body;
  const { schoolId } = req.params;

  const school = await School.findByIdAndUpdate(
    schoolId,
    {
      name,
      address,
    },
    { new: true, runValidators: true }
  );

  res.status(201).json({
    success: true,
    message: "School updated successfully",
    school,
  });
};

const getSchoolList: RequestHandler = async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = ((req.query.search || "") as string)?.trim();
  const skip = (page - 1) * limit;

  const result = await School.aggregate([
    {
      $match: {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
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

  const school = result[0].data;
  const total = result[0].metadata[0]?.total || 0;

  res.status(200).json({
    success: true,
    message: "Division retrieved successfully.",
    data: {
      school,
      pagination: {
        page: page,
        rows: school.length,
        size: limit,
        total: total,
      },
    },
  });
};

export { createSchool, getSchoolList, editSchool };
