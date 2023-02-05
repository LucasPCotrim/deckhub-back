import { ApplicationError } from '@/protocols';

export function cardNotFoundError(): ApplicationError {
  return {
    name: 'cardNotFoundError',
    message: 'No card was found with this id',
  };
}
