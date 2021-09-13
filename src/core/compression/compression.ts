import { Request, Response } from '@app/core';
import * as compression from 'compression';

export const shouldCompress = (req: Request, res: Response) => {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
};
