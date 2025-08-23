import Joi from "joi";

const createTeacherSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().lowercase().required(),
}).required();

const editTeacherSchema = Joi.object({
  name: Joi.string().trim().required(),
}).required();

export { createTeacherSchema, editTeacherSchema };
