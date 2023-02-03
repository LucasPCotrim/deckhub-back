import { Router } from 'express';
import { getDecks, getDeckInfo } from '@/controllers/deckController';

const deckRouter = Router();

deckRouter.get('/', getDecks);
deckRouter.get('/:id', getDeckInfo);

export { deckRouter };
