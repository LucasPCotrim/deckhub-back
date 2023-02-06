import { cardRepository } from '@/repositories';
import { cards, sets } from '@prisma/client';
import { cardNotFoundError } from '@/errors';

type CardCover = Pick<cards, 'id' | 'name' | 'imageUri'>;
async function getCardCovers(name?: string): Promise<CardCover[]> {
  const cards = await cardRepository.findMany(name);
  return cards;
}

type CardInfoType = Omit<cards, 'setId'> & { set: sets };
async function getCards(name?: string): Promise<CardInfoType[]> {
  const cards = await cardRepository.findManyCompleteInfo(name);
  return cards.map((card) => {
    return {
      id: card.id,
      scryfallId: card.scryfallId,
      oracleId: card.oracleId,
      name: card.name,
      typeLine: card.typeLine,
      rarity: card.rarity,
      oracleText: card.oracleText,
      flavorText: card.flavorText,
      manaCost: card.manaCost,
      cmc: card.cmc,
      colors: card.colors,
      colorIdentity: card.colorIdentity,
      releasedAt: card.releasedAt,
      scryfallUri: card.scryfallUri,
      gathererUri: card.gathererUri,
      imageUri: card.imageUri,
      imageArtCrop: card.imageArtCrop,
      price: card.price,
      set: card.sets,
    };
  });
}

async function getCardInfo(id: number): Promise<CardInfoType> {
  const cardInfo = await cardRepository.findById(id);
  if (!cardInfo) throw cardNotFoundError();

  return {
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
}

const cardService = {
  getCardCovers,
  getCards,
  getCardInfo,
};

export { cardService };
