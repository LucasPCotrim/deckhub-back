import { Router } from 'express';
import { validateParams } from '@/middlewares';
import { cardIdSchema } from '@/schemas/cardIdSchema';
import { getCards, getCardInfo } from '@/controllers/cardController';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.get('/:id', validateParams(cardIdSchema), getCardInfo);

export { cardRouter };
