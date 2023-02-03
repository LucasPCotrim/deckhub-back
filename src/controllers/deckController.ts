import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { deckService } from '@/services';

export async function getDecks(req: Request, res: Response) {
  try {
    const decks = await deckService.getDecks();
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