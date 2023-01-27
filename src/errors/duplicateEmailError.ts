import { ApplicationError } from '@/protocols';

export function duplicateEmailError(): ApplicationError {
  return {
    name: 'duplicateEmailError',
    message: 'There is already an user with this email',
  };
}
