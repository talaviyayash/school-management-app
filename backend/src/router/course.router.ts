import { Router } from "express";
import { editCourse, getCourse } from "../controllers/course.controller";
import { validateRequest } from "../utils/validateRequest";
import { editCourseSchema } from "../validations/course.validation";
import { createSemester, getSemesterList } from "../controllers/sem.controller";
import { createSemesterSchema } from "../validations/semester.validation";

const courseRouter = Router();

courseRouter.put("/:courseId", validateRequest(editCourseSchema), editCourse);
courseRouter.post(
  "/:courseId/semester",
  validateRequest(createSemesterSchema),
  createSemester
);
courseRouter.get("/:courseId", getCourse);
courseRouter.get("/:courseId/semester", getSemesterList);

export { courseRouter };
