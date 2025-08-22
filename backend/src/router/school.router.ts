import { Router } from "express";
import { createCourse, getCourseList } from "../controllers/course.controller";
import {
  createSchool,
  editSchool,
  getSchool,
  getSchoolList,
} from "../controllers/school.controller";
import { validateRequest } from "../utils/validateRequest";
import { createCourseSchema } from "../validations/course.validation";
import {
  createSchoolSchema,
  editSchoolSchema,
} from "../validations/school.validation";

const schoolRouter = Router();

schoolRouter.post("/", validateRequest(createSchoolSchema), createSchool);
schoolRouter.get("/", getSchoolList);
schoolRouter.put("/:schoolId", validateRequest(editSchoolSchema), editSchool);
schoolRouter.get("/:schoolId", getSchool);
schoolRouter.get("/:schoolId/course", getCourseList);
schoolRouter.post(
  "/:schoolId/course",
  validateRequest(createCourseSchema),
  createCourse
);

export { schoolRouter };
