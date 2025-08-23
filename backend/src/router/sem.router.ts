import { Router } from "express";
import { validateRequest } from "../utils/validateRequest";
import { editSemesterSchema } from "../validations/semester.validation";
import { editSemester } from "../controllers/sem.controller";

const semRouter = Router();

semRouter.put("/:semId", validateRequest(editSemesterSchema), editSemester);

export { semRouter };
