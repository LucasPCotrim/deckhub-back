import { users } from '@prisma/client';

export type ApplicationError = {
  name: string;
  message: string;
};

export type SignupParams = Pick<users, 'name', 'email' | 'password'>;
