import { RequestHandler } from "express";
import mongoose from "mongoose";
import Batch from "../models/batch.models";
import Semester from "../models/semester.models";

const createBatch: RequestHandler = async (req, res) => {
  const { name } = req.body;
  const { semId } = req.params;

  const semester = await Semester.findById(semId);

  if (!semester) {
    res.status(404).json({
      success: true,
      message: "Semester not found.",
    });
    return;
  }

  const batch = await Batch.create({
    name,
    semester: semId,
    school: semester.school,
  });

  res.status(201).json({
    success: true,
    message: "Batch created successfully",
    batch,
  });
};
const getBatchList: RequestHandler = async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = ((req.query.search || "") as string)?.trim();
  const skip = (page - 1) * limit;
  const { semId } = req.params;

  const result = await Batch.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [{ name: { $regex: search, $options: "i" } }],
          },
          {
            semester: new mongoose.Types.ObjectId(semId),
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

  const batch = result[0].data;
  const total = result[0].metadata[0]?.total || 0;

  res.status(200).json({
    success: true,
    message: "Course retrieved successfully.",
    data: {
      batch,
      pagination: {
        page: page,
        rows: batch.length,
        size: limit,
        total: total,
      },
    },
  });
};

const editBatch: RequestHandler = async (req, res) => {
  const { name } = req.body;
  const { batchId } = req.params;

  const batch = await Batch.findByIdAndUpdate(
    batchId,
    {
      name,
    },
    { new: true, runValidators: true }
  );

  res.status(201).json({
    success: true,
    message: "Batch updated successfully",
    batch,
  });
};

const getBatch: RequestHandler = async (req, res) => {
  const { batchId } = req.params;

  const batch = await Batch.findById(batchId)
    .populate("school", "name _id")
    .populate("semester", "name _id");

  res.status(201).json({
    success: true,
    message: "Batch retrieved successfully",
    batch,
  });
};

export { createBatch, editBatch, getBatch, getBatchList };
