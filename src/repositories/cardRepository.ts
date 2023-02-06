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
  return prisma.cards.findMany({
    select: {
      id: true,
      name: true,
      imageUri: true,
    },
    where: whereClause,
    skip: 0,
    take: 50,
  });
}

async function findById(id: number) {
  return prisma.cards.findUnique({
    where: {
      id,
    },
    include: {
      sets: true,
    },
  });
}

const cardRepository = { findMany, findById };

export { cardRepository };
