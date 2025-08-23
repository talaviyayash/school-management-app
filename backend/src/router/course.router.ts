import { Router } from "express";
import { editCourse, getCourse } from "../controllers/course.controller";
import { validateRequest } from "../utils/validateRequest";
import { editCourseSchema } from "../validations/course.validation";

const courseRouter = Router();

courseRouter.put("/:courseId", validateRequest(editCourseSchema), editCourse);
courseRouter.get("/:courseId", getCourse);

export { courseRouter };
