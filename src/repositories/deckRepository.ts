import { cards, formats, users } from '.prisma/client';
import { prisma } from '@/config';

async function findMany(name?: string) {
  let whereClause = {};
  if (name) {
    whereClause = {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    };
  }

  return prisma.decks.findMany({
    include: {
      formats: true,
      users: true,
    },
    where: whereClause,
  });
}

async function findById(id: number) {
  return prisma.decks.findUnique({
    where: {
      id,
    },
    include: {
      formats: true,
      users: true,
      cardsDecks: {
        include: {
          cards: {
            include: {
              sets: true,
            },
          },
        },
      },
    },
  });
}

type cardWithAmount = cards & { amount: number };
async function createDeck(name: string, image: string, user: users, format: formats, cards: cardWithAmount[]) {
  return prisma.$transaction(async () => {
    const newDeck = await prisma.decks.create({
      data: {
        name,
        formatId: format.id,
        userId: user.id,
        image,
      },
    });
    cards.forEach(async (card) => {
      await prisma.cardsDecks.create({
        data: {
          cardId: card.id,
          deckId: newDeck.id,
          amount: card.amount,
        },
      });
    });
    return newDeck;
  });
}

const deckRepository = { findMany, findById, createDeck };

export { deckRepository };
