import Joi from "joi";

const createSchoolSchema = Joi.object({
  name: Joi.string().trim().required(),
  principal: Joi.string().email().lowercase().required(),
  address: Joi.string().min(6).required(),
}).required();

const editSchoolSchema = Joi.object({
  name: Joi.string().trim().required(),
  address: Joi.string().min(6).required(),
}).required();

export { createSchoolSchema, editSchoolSchema };
