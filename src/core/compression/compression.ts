import compression from 'compression';
import { Request, Response } from 'express';

export const shouldCompress = (req: Request, res: Response) => {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
};
