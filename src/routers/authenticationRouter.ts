import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { signupSchema } from '@/schemas/';
import { signUp } from '@/controllers/authenticationController';

const authenticationRouter = Router();

authenticationRouter.post('/sign-up', validateBody(signupSchema), signUp);

export { authenticationRouter };
