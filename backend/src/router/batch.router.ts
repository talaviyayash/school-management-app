import { Router } from "express";
import { editBatch } from "../controllers/batch.controller";
import { validateRequest } from "../utils/validateRequest";
import { editBatchSchema } from "../validations/batch.validation";

const batchRouter = Router();

batchRouter.put("/:batchId", validateRequest(editBatchSchema), editBatch);

export { batchRouter };
