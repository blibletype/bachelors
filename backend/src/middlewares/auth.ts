import type { Request, Response, NextFunction } from 'express';
import { HttpRequestError } from '../utils/error';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/auth';
import { User } from '../types/user';
import { findOneById } from '../services/users.service';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(
      new HttpRequestError(
        StatusCodes.UNAUTHORIZED,
        'Authorization header missing'
      )
    );
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(
      new HttpRequestError(StatusCodes.UNAUTHORIZED, 'Token missing')
    );
  }

  try {
    const decodedToken = await verifyToken(token);

    const { id, email, role } = decodedToken as Pick<
      User,
      'id' | 'email' | 'role'
    >;

    const user = await findOneById(id);

    if (!user || user.accessToken !== token) {
      return next(
        new HttpRequestError(
          StatusCodes.UNAUTHORIZED,
          'Invalid or expired token'
        )
      );
    }

    req.user = { id, email, role };

    next();
  } catch (error) {
    return next(error);
  }
};
