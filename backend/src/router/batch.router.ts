import { Router } from "express";
import { editBatch, getBatch } from "../controllers/batch.controller";
import { validateRequest } from "../utils/validateRequest";
import { editBatchSchema } from "../validations/batch.validation";

const batchRouter = Router();

batchRouter.put("/:batchId", validateRequest(editBatchSchema), editBatch);
batchRouter.get("/:batchId", getBatch);

export { batchRouter };
