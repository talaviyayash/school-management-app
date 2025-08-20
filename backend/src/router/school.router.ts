import { Router } from "express";
import {
  createSchool,
  editSchool,
  getSchoolList,
} from "../controllers/school.controller";
import { validateRequest } from "../utils/validateRequest";
import {
  createSchoolSchema,
  editSchoolSchema,
} from "../validations/school.validation";

const schoolRouter = Router();

schoolRouter.post("/", validateRequest(createSchoolSchema), createSchool);
schoolRouter.get("/", getSchoolList);
schoolRouter.put("/:schoolId", validateRequest(editSchoolSchema), editSchool);

export { schoolRouter };
