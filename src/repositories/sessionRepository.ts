import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function create(data: Prisma.sessionsUncheckedCreateInput) {
  return prisma.sessions.create({
    data,
  });
}

async function upsert(data: Prisma.sessionsUncheckedCreateInput) {
  return prisma.sessions.upsert({
    where: {
      userId: data.userId,
    },
    create: {
      userId: data.userId,
      token: data.token,
    },
    update: {
      token: data.token,
    },
  });
}

const sessionRepository = { create, upsert };

export { sessionRepository };
