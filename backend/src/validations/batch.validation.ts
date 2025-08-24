import Joi from "joi";

const createBatchSchema = Joi.object({
  name: Joi.string().trim().required(),
}).required();

const editBatchSchema = Joi.object({
  name: Joi.string().trim().required(),
}).required();

export { createBatchSchema, editBatchSchema };
