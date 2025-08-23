import { Router } from "express";
import { validateRequest } from "../utils/validateRequest";
import { editSemesterSchema } from "../validations/semester.validation";
import { editSemester, getSemester } from "../controllers/sem.controller";

const semRouter = Router();

semRouter.put("/:semId", validateRequest(editSemesterSchema), editSemester);
semRouter.get("/:semId", getSemester);

export { semRouter };
