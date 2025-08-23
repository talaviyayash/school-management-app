import { Router } from "express";
import { editTeacher, getTeacher } from "../controllers/teacher.controller";
import { validateRequest } from "../utils/validateRequest";
import { editTeacherSchema } from "../validations/teacher.validation";

const teacherRouter = Router();

teacherRouter.put(
  "/:teacherId",
  validateRequest(editTeacherSchema),
  editTeacher
);

teacherRouter.get("/:teacherId", getTeacher);

export { teacherRouter };
