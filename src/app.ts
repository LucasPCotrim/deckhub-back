import express, { Express } from 'express';
import cors from 'cors';
import { loadEnv, connectDb, disconnectDB } from '@/config';
import { authenticationRouter, deckRouter } from './routers';

loadEnv();

const app = express();
app.use(cors()).use(express.json()).use('/auth', authenticationRouter).use('/decks', deckRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
