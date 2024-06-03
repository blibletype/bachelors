import { NextFunction, Request, Response } from 'express';
import { HttpRequestError } from '../utils/error';

export const handleError = (
  error: HttpRequestError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  const status = error instanceof HttpRequestError ? error.statusCode : 500;
  const message = error.message || 'Internal Server Error';
  res.status(status).json({ message });
};
