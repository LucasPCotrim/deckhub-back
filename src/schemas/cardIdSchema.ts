import Joi from 'joi';

export const cardIdSchema = Joi.object({
  id: Joi.number().min(1).required(),
});
