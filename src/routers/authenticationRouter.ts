import { Router } from 'express';
import { validateBody, authenticateToken } from '@/middlewares';
import { signupSchema, loginSchema } from '@/schemas/';
import { signUp, login, logout } from '@/controllers/authenticationController';

const authenticationRouter = Router();

authenticationRouter.post('/sign-up', validateBody(signupSchema), signUp);
authenticationRouter.post('/login', validateBody(loginSchema), login);

authenticationRouter.all('/*', authenticateToken);
authenticationRouter.post('/logout', logout);

export { authenticationRouter };
