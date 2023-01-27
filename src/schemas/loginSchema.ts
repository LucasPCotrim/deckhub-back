import Joi from 'joi';
import { LoginParams } from './../protocols';

export const loginSchema = Joi.object<LoginParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
