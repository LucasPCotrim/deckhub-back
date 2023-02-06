import { users, decks, formats } from '@prisma/client';
import { userRepository, deckRepository } from '@/repositories';
import { userNotFoundError } from '@/errors';

type DeckInfo = Omit<decks, 'formatId' | 'userId' | 'formats'> & { format: formats };
type UserInfo = Omit<users, 'password'> & { decks: DeckInfo[] };
async function getUserInfo(id: number): Promise<UserInfo> {
  const user = await userRepository.findById(id);
  if (!user) throw userNotFoundError();
  delete user.password;

  const decks = await deckRepository.findManyByUserId(id);
  const deckCovers = decks.map((d) => {
    return {
      id: d.id,
      name: d.name,
      image: d.image,
      numVisits: d.numVisits,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
      format: {
        id: d.formats.id,
        name: d.formats.name,
      },
    };
  });
  return { ...user, decks: deckCovers };
}

const userService = {
  getUserInfo,
};

export { userService };
