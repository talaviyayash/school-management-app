import { Router } from "express";
import { editSchool } from "../controllers/school.controller";
import { validateRequest } from "../utils/validateRequest";
import { editCourseSchema } from "../validations/course.validation";

const courseRouter = Router();

courseRouter.put("/:courseId", validateRequest(editCourseSchema), editSchool);

export { courseRouter };
