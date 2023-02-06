import Joi from 'joi';

export const cardSearchSchema = Joi.object({
  id: Joi.number().min(1),
  name: Joi.string(),
});
