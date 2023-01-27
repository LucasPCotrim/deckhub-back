import { Request, Response } from 'express';
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
    const session = await authenticationService.login({ email, password });
    return res.status(httpStatus.CREATED).send({
      session: session,
    });
  } catch (error) {
    if (error.name === 'userNotFoundError') return res.status(httpStatus.NOT_FOUND).send(error);
    if (error.name === 'invalidCredentialsError') return res.status(httpStatus.UNAUTHORIZED).send(error);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
