import { type Request, type Response } from 'express';

export function getHealth(req: Request, res: Response) {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
}
