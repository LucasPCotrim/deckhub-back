import Joi from 'joi';

export const createDeckSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': `"name" should be of type 'string'`,
    'string.empty': `"name" cannot be an empty field`,
    'any.required': `"name" is a required field`,
  }),
  formatName: Joi.string().required().messages({
    'string.base': `"formatName" should be of type 'string'`,
    'string.empty': `"formatName" cannot be an empty field`,
    'any.required': `"formatName" is a required field`,
  }),
  image: Joi.string().required().messages({
    'string.base': `"image" should be of type 'string'`,
    'string.empty': `"image" cannot be an empty field`,
    'any.required': `"image" is a required field`,
  }),
  cards: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        amount: Joi.number().integer().min(1).required(),
      }),
    )
    .required()
    .unique((a, b) => a.cardName !== b.cardName),
});
