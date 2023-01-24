import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { users } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser(): Promise<users> {
  const hashedPassword = await bcrypt.hash("123456", 12);
  const testUser = await prisma.users.create({
    data: {
      name: "teste",
      email: "teste@gmail.com",
      password: hashedPassword,
      profilePic:
        "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Original_Doge_meme.jpg/300px-Original_Doge_meme.jpg",
    },
  });
  console.log({ testUser });
  return testUser;
}

async function main() {
  await prisma.users.deleteMany({});

  const user = await createUser();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
