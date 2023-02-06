import { prisma } from '@/config';

async function findByName(name: string) {
  return prisma.formats.findFirst({
    where: {
      name,
    },
  });
}

const formatRepository = { findByName };

export { formatRepository };
