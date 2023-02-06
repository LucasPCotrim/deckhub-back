import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { deckService } from '@/services';
import { AuthenticatedRequest } from '@/middlewares';

export async function getDecks(req: Request, res: Response) {
  const name = req.query.name as string;

  try {
    const decks = await deckService.getDecks(name);
    return res.status(httpStatus.OK).send(decks);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getDeckInfo(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const deckInfo = await deckService.getDeckInfo(id);
    return res.status(httpStatus.OK).send(deckInfo);
  } catch (error) {
    if (error.name === 'deckNotFoundError') return res.status(httpStatus.NOT_FOUND).send(error);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function createDeck(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { name, formatName, image, cards } = req.body;
  console.log({ name, formatName, image, cards });
  try {
    const deckInfo = await deckService.createDeck(userId, { name, formatName, image, cards });
    return res.status(httpStatus.OK).send(deckInfo);
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
