import { prisma } from '@/config';

async function findMany() {
  return prisma.decks.findMany({
    include: {
      formats: true,
      users: true,
    },
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
          cards: true,
        },
      },
    },
  });
}

const deckRepository = { findMany, findById };

export { deckRepository };
