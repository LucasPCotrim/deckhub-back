import { cardRepository } from '@/repositories';
import { cards, sets } from '@prisma/client';
import { cardNotFoundError } from '@/errors';

type CardCover = Pick<cards, 'id' | 'name' | 'imageUri'>;
async function getCards(name?: string): Promise<CardCover[]> {
  const cards = await cardRepository.findMany(name);
  return cards;
}

type CardInfoType = Omit<cards, 'setId'> & { set: sets };
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
  getCards,
  getCardInfo,
};

export { cardService };
