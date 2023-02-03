import Joi from 'joi';

export const deckIdSchema = Joi.object({
  id: Joi.number().min(1).required(),
});
