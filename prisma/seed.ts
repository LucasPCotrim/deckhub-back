import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { users } from '@prisma/client';
const cardsDataset = require('./cards.json');
const setsDataset = require('./sets.json');

const prisma = new PrismaClient();

async function createUser(): Promise<users> {
  const hashedPassword = await bcrypt.hash('123456', 12);
  const testUser = await prisma.users.create({
    data: {
      name: 'teste',
      email: 'teste@gmail.com',
      password: hashedPassword,
      profilePic:
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Original_Doge_meme.jpg/300px-Original_Doge_meme.jpg',
    },
  });
  console.log({ testUser });
  return testUser;
}

async function createSets(): Promise<void> {
  let count = 0;
  for (const set of setsDataset) {
    const setToAdd = {
      name: set.name,
      scryfallId: set.id,
      scryfallUri: set.scryfall_uri,
      iconSvgUri: set.icon_svg_uri,
      setType: set.set_type,
      code: set.code,
    } as Prisma.setsCreateInput;
    await prisma.sets.create({ data: setToAdd });
    count++;
  }
  console.log(`Added ${count} sets to database`);
}

async function createCards(): Promise<void> {
  let count = 0;
  for (const card of cardsDataset) {
    if (card.layout === 'art_series') continue;
    if (card.games.indexOf('paper') < 0) continue;
    if (!card.prices.usd) card.prices.usd = 0;
    if (card.border_color === 'silver') continue;

    const cardSet = await prisma.sets.findFirst({
      where: {
        scryfallId: card.set_id,
      },
    });
    if (!cardSet) continue;

    const cardToAdd = {
      scryfallId: card.id,
      oracleId: card.oracle_id,
      name: card.name,
      typeLine: card.type_line,
      oracleText: card.oracle_text || '',
      manaCost: card.mana_cost || '',
      cmc: card.cmc,
      colors: card.colors ? card.colors.join('') : '',
      colorIdentity: card.color_identity ? card.color_identity.join('') : '',
      releasedAt: new Date(card.released_at),
      scryfallUri: card.scryfall_uri || '',
      gathererUri: card.related_uris?.gatherer || '',
      imageUri: card.image_uris?.normal || '',
      imageArtCrop: card.image_uris?.art_crop || '',
      price: Math.round(Number(100 * parseFloat(card.prices.usd))),
      sets: { connect: { id: cardSet.id } },
    } as Prisma.cardsCreateInput;
    await prisma.cards.create({ data: cardToAdd });
    count++;
  }
  console.log(`Added ${count} cards to database`);
}

async function main() {
  await prisma.users.deleteMany({});
  await prisma.sets.deleteMany({});
  await prisma.cards.deleteMany({});

  const user = await createUser();
  await createSets();
  await createCards();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
