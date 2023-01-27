import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { signupSchema, loginSchema } from '@/schemas/';
import { signUp, login } from '@/controllers/authenticationController';

const authenticationRouter = Router();

authenticationRouter.post('/sign-up', validateBody(signupSchema), signUp);
authenticationRouter.post('/login', validateBody(loginSchema), login);

export { authenticationRouter };
