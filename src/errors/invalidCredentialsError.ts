import { ApplicationError } from '@/protocols';

export function invalidCredentialsError(): ApplicationError {
  return {
    name: 'invalidCredentialsError',
    message: 'Invalid email or password',
  };
}
