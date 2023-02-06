import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { cardService } from '@/services';

export async function getCardCovers(req: Request, res: Response) {
  const name = req.query.name as string;

  try {
    const cardCovers = await cardService.getCardCovers(name);
    return res.status(httpStatus.OK).send(cardCovers);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getCards(req: Request, res: Response) {
  const name = req.query.name as string;

  try {
    const cards = await cardService.getCards(name);
    return res.status(httpStatus.OK).send(cards);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getCardInfo(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const cardInfo = await cardService.getCardInfo(id);
    return res.status(httpStatus.OK).send(cardInfo);
  } catch (error) {
    if (error.name === 'cardNotFoundError') return res.status(httpStatus.NOT_FOUND).send(error);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
