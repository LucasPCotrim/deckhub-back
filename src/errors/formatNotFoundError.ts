import { ApplicationError } from '@/protocols';

export function formatNotFoundError(): ApplicationError {
  return {
    name: 'formatNotFoundError',
    message: 'No format was found with this name',
  };
}
