import { Router } from 'express';
import { validateParams, validateBody } from '@/middlewares';
import { cardIdSchema, cardSearchSchema } from '@/schemas/';
import { getCardCovers, getCards, getCardInfo } from '@/controllers/cardController';

const cardRouter = Router();

cardRouter.get('/covers', validateBody(cardSearchSchema), getCardCovers);
cardRouter.get('/', validateBody(cardSearchSchema), getCards);
cardRouter.get('/:id', validateParams(cardIdSchema), getCardInfo);

export { cardRouter };
