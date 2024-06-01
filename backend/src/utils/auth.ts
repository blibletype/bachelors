import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import { HttpRequestError } from './error';

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyToken = async (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error: any) {
    throw new HttpRequestError(StatusCodes.UNAUTHORIZED, error.message);
  }
};
