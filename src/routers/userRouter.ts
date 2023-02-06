import { Router } from 'express';
import { validateParams } from '@/middlewares';
import { userIdSchema } from '@/schemas';
import { getUserInfo } from '@/controllers/userController';

const userRouter = Router();

userRouter.get('/:id', validateParams(userIdSchema), getUserInfo);

export { userRouter };
