import { prisma } from '@/config';

async function findMany(name?: string) {
  return prisma.cards.findMany({
    select: {
      id: true,
      name: true,
      imageUri: true,
    },
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
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
