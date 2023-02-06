import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { userService } from '@/services';

export async function getUserInfo(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const userInfo = await userService.getUserInfo(id);
    return res.status(httpStatus.OK).send(userInfo);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
