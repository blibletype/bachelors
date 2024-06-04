import { StatusCodes } from 'http-status-codes';

import { HttpRequestError } from '../utils/error';
import { verifyToken } from '../utils/auth';
import { User } from '../types/user';
import userService from '../services/users.service';
import { RequestHandler } from '../types/api';

export const auth: RequestHandler = async (req, res, next) => {
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
    const decodedToken = (await verifyToken(token)) as Pick<
      User,
      'id' | 'email' | 'role'
    >;

    const { id, email, role } = decodedToken;

    const user = await userService.findOneById(id);

    if (!user || user?.accessToken !== token) {
      return next(
        new HttpRequestError(
          StatusCodes.UNAUTHORIZED,
          'Invalid or expired token'
        )
      );
    }

    req.user = { id, email, role: user.role };

    next();
  } catch (error) {
    return next(error);
  }
};
