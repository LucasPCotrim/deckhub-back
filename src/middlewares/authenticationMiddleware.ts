import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import { unauthorizedError } from '@/errors';
import { sessionRepository } from '@/repositories/sessionRepository';

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    const session = await sessionRepository.findByToken(token);
    if (!session) return res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());

    req.userId = userId;
    return next();
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
  }
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};
