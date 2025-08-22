import Joi from "joi";

const createCourseSchema = Joi.object({
  name: Joi.string().trim().required(),
}).required();

const editCourseSchema = Joi.object({
  name: Joi.string().trim().required(),
}).required();

export { createCourseSchema, editCourseSchema };
