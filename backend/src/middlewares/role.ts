import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import { Roles } from '../types/user';
import { HttpRequestError } from '../utils/error';

export const role = (expectedRole: Roles) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(
      new HttpRequestError(StatusCodes.UNAUTHORIZED, 'Unauthorized')
    );
  }

  const userRole = req.user.role;

  if (userRole !== expectedRole) {
    return next(
      new HttpRequestError(
        StatusCodes.FORBIDDEN,
        'Forbidden: Insufficient role'
      )
    );
  }

  next();
};
