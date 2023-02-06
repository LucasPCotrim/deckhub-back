import { Router } from 'express';
import { validateParams, validateBody, authenticateToken } from '@/middlewares';
import { deckIdSchema, createDeckSchema } from '@/schemas/';
import { getDecks, getDeckInfo, createDeck } from '@/controllers/deckController';

const deckRouter = Router();

deckRouter.get('/', getDecks);
deckRouter.get('/:id', validateParams(deckIdSchema), getDeckInfo);
deckRouter.all('/*', authenticateToken);
deckRouter.post('/', validateBody(createDeckSchema), createDeck);

export { deckRouter };
