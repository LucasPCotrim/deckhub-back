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
    if (error.name === 'DuplicatedEmailError') return res.status(httpStatus.CONFLICT).send(error);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
