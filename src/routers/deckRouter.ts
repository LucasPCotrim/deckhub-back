import { Router } from 'express';
import { validateParams } from '@/middlewares';
import { deckIdSchema } from '@/schemas/';
import { getDecks, getDeckInfo } from '@/controllers/deckController';

const deckRouter = Router();

deckRouter.get('/', getDecks);
deckRouter.get('/:id', validateParams(deckIdSchema), getDeckInfo);

export { deckRouter };
