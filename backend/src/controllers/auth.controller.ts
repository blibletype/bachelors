import crypto from 'node:crypto';
import { StatusCodes } from 'http-status-codes';

import { RequestHandler } from '../types/api';
import { HttpRequestError } from '../utils/error';
import { CreateUserDTO, Roles } from '../types/user';
import usersService from '../services/users.service';
import { generateToken, hashPassword } from '../utils/auth';

class AuthController {
  public register: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body as CreateUserDTO;

    const isUserExist = await usersService.findOneByEmail(email);

    if (isUserExist) {
      return next(
        new HttpRequestError(StatusCodes.CONFLICT, 'User already exists')
      );
    }

    const id = crypto.randomUUID();
    const hashedPassword = await hashPassword(password);

    const token = generateToken({ id, email, role: Roles.User });

    const user = await usersService.insertOne({
      id,
      email,
      accessToken: token,
      password: hashedPassword,
    });

    res.status(StatusCodes.CREATED).json(user);
  };

  public login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await usersService.findOneByEmail(email);

    if (!user) {
      return next(
        new HttpRequestError(StatusCodes.NOT_FOUND, 'User not found')
      );
    }

    const expectedHash = await hashPassword(password);

    if (user.password !== expectedHash) {
      return next(
        new HttpRequestError(StatusCodes.UNAUTHORIZED, 'Invalid credentials')
      );
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    await usersService.updateOneById(user.id, {
      accessToken: token,
      updatedAt: new Date(),
    });

    res.status(StatusCodes.OK).json({ accessToken: token });
  };

  public getMe: RequestHandler = async (req, res, next) => {
    if (!req.user) {
      return next(
        new HttpRequestError(StatusCodes.UNAUTHORIZED, 'Unauthorized')
      );
    }

    const { id } = req.user;

    const user = await usersService.findOneById(id);

    if (!user) {
      return next(
        new HttpRequestError(StatusCodes.UNAUTHORIZED, 'Unauthorized')
      );
    }

    res.status(StatusCodes.OK).json(user);
  };
}

export default new AuthController();
