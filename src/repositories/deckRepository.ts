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

const deckRepository = { findMany, findById };

export { deckRepository };
