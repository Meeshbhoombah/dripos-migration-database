import { Request, Response } from 'express';
import { dropDatabase } from '../services/mongoDb';
import { flushCache } from '../services/redisCache';

export const cleanData = async (req: Request, res: Response) => {
    flushCache();
    dropDatabase();
}


export const cleanRedis = async (req: Request, res: Response) => {
    flushCache();
}


export const cleanMongo = async (req: Request, res: Response) => {
    dropDatabase();
}

