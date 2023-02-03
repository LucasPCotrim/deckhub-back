import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { users } from '@prisma/client';
import { faker } from '@faker-js/faker';
const cardsDataset1 = require('./cards1.json');
const cardsDataset2 = require('./cards2.json');
const setsDataset = require('./sets.json');
const formatsDataset = require('./formats.json');
const sampleDeck = require('./sampleDeck.json');

const prisma = new PrismaClient();

async function createUser(): Promise<users> {
  const hashedPassword = await bcrypt.hash('123456', 12);
  const testUser = await prisma.users.create({
    data: {
      name: 'teste',
      email: 'teste@gmail.com',
      password: hashedPassword,
      profilePic: 'https://cards.scryfall.io/art_crop/front/4/9/496849a5-4b24-4eae-8bfb-d46f645d85ea.jpg?1664930445',
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
  for (const card of cardsDataset1.concat(cardsDataset2)) {
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
      rarity: card.rarity,
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

async function createFormats(): Promise<void> {
  let count = 0;
  for (const format of formatsDataset) {
    await prisma.formats.create({ data: { name: format.name } });
    count++;
  }
  console.log(`Added ${count} formats to database`);
}

async function createDeck(user: users): Promise<void> {
  const format = await prisma.formats.findFirst({
    where: {
      name: sampleDeck.format,
    },
  });
  const deck = await prisma.decks.create({
    data: {
      name: sampleDeck.name,
      formatId: format.id,
      userId: user.id,
    },
  });
  let count = 0;
  for (const cardInfo of sampleDeck.cards) {
    console.log(cardInfo);
    const card = await prisma.cards.findFirst({
      where: {
        name: cardInfo.cardName,
      },
    });
    if (!card) throw new Error('Card not found!');
    await prisma.cardsDecks.create({
      data: {
        cardId: card.id,
        deckId: deck.id,
        amount: cardInfo.amount,
      },
    });
    count++;
  }
  console.log(`Added ${count} cards to deck: ${deck.name}`);
}

async function main() {
  await prisma.sessions.deleteMany({});
  await prisma.cardsDecks.deleteMany({});
  await prisma.cards.deleteMany({});
  await prisma.sets.deleteMany({});
  await prisma.decks.deleteMany({});
  await prisma.users.deleteMany({});
  await prisma.formats.deleteMany({});

  const user = await createUser();
  await createSets();
  await createCards();
  await createFormats();
  await createDeck(user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
