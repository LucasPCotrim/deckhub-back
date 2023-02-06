import { deckRepository, formatRepository, cardRepository, userRepository } from '@/repositories';
import { decks, cards, sets, users, formats } from '@prisma/client';
import { deckNotFoundError, cardNotFoundError, formatNotFoundError, userNotFoundError } from '@/errors';

type DeckCover = Omit<decks, 'formatId' | 'userId' | 'createdAt' | 'updatedAt'> & { format: formats } & {
  user: Omit<users, 'email' | 'password' | 'createdAt'>;
};

async function getDecks(name?: string): Promise<DeckCover[]> {
  const decks = await deckRepository.findMany(name);
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

type DeckInfo = Omit<decks, 'formatId' | 'userId'> & { format: formats } & {
  user: Omit<users, 'email' | 'password' | 'createdAt'>;
} & { cards: CardInfoType[] };
type CardInfoType = Omit<cards, 'setId'> & { amount: number; set: sets };

async function getDeckInfo(id: number): Promise<DeckInfo> {
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
      flavorText: cardInfo.flavorText,
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

type cardSimpleInfo = {
  id: number;
  name: string;
  amount: number;
};
type createDeckInputType = {
  name: string;
  format: string;
  image: string;
  cards: cardSimpleInfo[];
};
async function createDeck(userId: number, deckInfo: createDeckInputType): Promise<decks> {
  const user = await userRepository.findById(userId);
  if (!user) throw userNotFoundError();

  const format = await formatRepository.findByName(deckInfo.format);
  if (!format) throw formatNotFoundError();

  const cards = [];
  for (const c of deckInfo.cards) {
    const card = await cardRepository.findById(c.id);
    if (!card) throw cardNotFoundError();

    cards.push({ ...card, amount: c.amount });
  }
  const deck = await deckRepository.createDeck(deckInfo.name, deckInfo.image, user, format, cards);
  return deck;
}

const deckService = {
  getDecks,
  getDeckInfo,
  createDeck,
};

export { deckService };
