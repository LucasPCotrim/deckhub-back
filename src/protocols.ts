import { users } from '@prisma/client';

export type ApplicationError = {
  name: string;
  message: string;
};

export type SignupParams = Pick<users, 'name' | 'email' | 'password'>;

export type LoginParams = Pick<users, 'email' | 'password'>;
