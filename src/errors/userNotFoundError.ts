import { ApplicationError } from '@/protocols';

export function userNotFoundError(): ApplicationError {
  return {
    name: 'userNotFoundError',
    message: 'No user was found with this email',
  };
}
