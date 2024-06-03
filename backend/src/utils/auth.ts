import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
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

export const hashPassword = async (password: string): Promise<string> => {
  return crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');
};
