import Joi from 'joi';

export const userIdSchema = Joi.object({
  id: Joi.number().min(1).required(),
});
