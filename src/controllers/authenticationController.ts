import { Request, Response } from 'express';
import { AuthenticatedRequest } from './../middlewares/authenticationMiddleware';
import httpStatus from 'http-status';
import { authenticationService } from '@/services/';

export async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user = await authenticationService.signUp({ name, email, password });
    return res.status(httpStatus.CREATED).send({
      id: user.id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    if (error.name === 'duplicateEmailError') return res.status(httpStatus.CONFLICT).send(error);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const userSessionInfo = await authenticationService.login({ email, password });
    return res.status(httpStatus.CREATED).send({
      user: userSessionInfo,
    });
  } catch (error) {
    if (error.name === 'userNotFoundError') return res.status(httpStatus.NOT_FOUND).send(error);
    if (error.name === 'invalidCredentialsError') return res.status(httpStatus.UNAUTHORIZED).send(error);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function logout(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    await authenticationService.logout({ userId });
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
