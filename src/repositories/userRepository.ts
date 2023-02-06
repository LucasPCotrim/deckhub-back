import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function create(data: Prisma.usersUncheckedCreateInput) {
  return prisma.users.create({
    data,
  });
}

async function findByEmail(email: string) {
  return prisma.users.findFirst({
    where: {
      email,
    },
  });
}

async function findById(id: number) {
  return prisma.users.findUnique({
    where: {
      id,
    },
  });
}

const userRepository = { create, findByEmail, findById };

export { userRepository };
