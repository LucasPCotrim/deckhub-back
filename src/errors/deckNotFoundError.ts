import { ApplicationError } from '@/protocols';

export function deckNotFoundError(): ApplicationError {
  return {
    name: 'deckNotFoundError',
    message: 'No deck was found with this id',
  };
}
