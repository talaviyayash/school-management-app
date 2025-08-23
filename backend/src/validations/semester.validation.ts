import Joi from "joi";

const createSemesterSchema = Joi.object({
  name: Joi.string().trim().required(),
}).required();

const editSemesterSchema = Joi.object({
  name: Joi.string().trim().required(),
}).required();

export { createSemesterSchema, editSemesterSchema };
