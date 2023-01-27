import Joi from 'joi';
import { SignupParams } from './../protocols';

export const signupSchema = Joi.object<SignupParams>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
