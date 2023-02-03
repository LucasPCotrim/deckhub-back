import { deckRepository } from '@/repositories';
import { decks, users, formats } from '@prisma/client';
import { deckNotFoundError } from '@/errors';

type deckCover = Omit<decks, 'formatId' | 'userId' | 'createdAt' | 'updatedAt'> & { format: formats } & {
  user: Omit<users, 'email' | 'password' | 'createdAt'>;
};
async function getDecks(): Promise<deckCover[]> {
  const decks = await deckRepository.findMany();
  return decks.map((deck) => ({
    id: deck.id,
    name: deck.name,
    image: deck.image,
    numVisits: deck.numVisits,
    format: deck.formats,
    user: {
      id: deck.users.id,
      name: deck.users.name,
      profilePic: deck.users.profilePic,
    },
  }));
}

type deckInfo = decks;
async function getDeckInfo(id: number): Promise<deckInfo> {
  const deckInfo = await deckRepository.findById(id);
  if (!deckInfo) throw deckNotFoundError();
  return deckInfo;
}

const deckService = {
  getDecks,
  getDeckInfo,
};

export { deckService };
