import { deckRepository } from '@/repositories';
import { decks, cards, sets, users, formats } from '@prisma/client';
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

type deckInfo = Omit<decks, 'formatId' | 'userId'> & { format: formats } & {
  user: Omit<users, 'email' | 'password' | 'createdAt'>;
} & { cards: cardInfoType[] };
type cardInfoType = Omit<cards, 'setId'> & { amount: number; set: sets };

async function getDeckInfo(id: number): Promise<deckInfo> {
  const deckInfo = await deckRepository.findById(id);
  if (!deckInfo) throw deckNotFoundError();

  const cardInfos = deckInfo.cardsDecks.map((e) => {
    const cardInfo = e.cards;
    return {
      amount: e.amount,
      id: cardInfo.id,
      scryfallId: cardInfo.scryfallId,
      oracleId: cardInfo.oracleId,
      name: cardInfo.name,
      typeLine: cardInfo.typeLine,
      rarity: cardInfo.rarity,
      oracleText: cardInfo.oracleText,
      manaCost: cardInfo.manaCost,
      cmc: cardInfo.cmc,
      colors: cardInfo.colors,
      colorIdentity: cardInfo.colorIdentity,
      releasedAt: cardInfo.releasedAt,
      scryfallUri: cardInfo.scryfallUri,
      gathererUri: cardInfo.gathererUri,
      imageUri: cardInfo.imageUri,
      imageArtCrop: cardInfo.imageArtCrop,
      price: cardInfo.price,
      set: cardInfo.sets,
    };
  });

  return {
    id: deckInfo.id,
    name: deckInfo.name,
    image: deckInfo.image,
    numVisits: deckInfo.numVisits,
    format: deckInfo.formats,
    user: {
      id: deckInfo.users.id,
      name: deckInfo.users.name,
      profilePic: deckInfo.users.profilePic,
    },
    cards: cardInfos,
    createdAt: deckInfo.createdAt,
    updatedAt: deckInfo.updatedAt,
  };
}

const deckService = {
  getDecks,
  getDeckInfo,
};

export { deckService };
