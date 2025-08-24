import { Router } from "express";
import { validateRequest } from "../utils/validateRequest";
import { editSemesterSchema } from "../validations/semester.validation";
import { editSemester, getSemester } from "../controllers/sem.controller";
import { createBatch, getBatchList } from "../controllers/batch.controller";
import { createBatchSchema } from "../validations/batch.validation";

const semRouter = Router();

semRouter.put("/:semId", validateRequest(editSemesterSchema), editSemester);
semRouter.get("/:semId", getSemester);
semRouter.post(
  "/:semId/batch",
  validateRequest(createBatchSchema),
  createBatch
);

semRouter.get("/:semId/batch", getBatchList);

export { semRouter };
