import crypto from 'crypto';
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../api';
import { signJwt } from '../auth';
import { db } from '../datastore';
import { ExpressHandler, User } from '../types';

function getSalt(): string {
  const salt = process.env.PASSWORD_SALT?.trim();
  if (!salt) throw new Error('PASSWORD_SALT environment variable is missing');
  return salt;
}

function hashPassword(password: string) {
  return crypto.pbkdf2Sync(password, getSalt(), 100_000, 64, 'sha512').toString('hex');
}

export const signInHandler: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.sendStatus(400);
  }

  const existing = (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));
  if (!existing) {
    return res.sendStatus(403);
  }

  const hashPasswordAttempt = hashPassword(password);

  const passwordBuffer = Buffer.from(existing.password, 'hex');
  const attemptBuffer = Buffer.from(hashPasswordAttempt, 'hex');

  if (passwordBuffer.length !== attemptBuffer.length || !crypto.timingSafeEqual(passwordBuffer, attemptBuffer)) {
    return res.sendStatus(403);
  }

  const jwt = signJwt({ userId: existing.id });

  return res.status(200).send({
    user: {
      email: existing.email,
      firstName: existing.firstName,
      lastName: existing.lastName,
      id: existing.id,
      username: existing.username,
    },
    jwt,
  });
};

export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
  const { email, firstName, lastName, password, username } = req.body;
  if (!email || !firstName || !lastName || !username || !password) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  const existing = (await db.getUserByEmail(email)) || (await db.getUserByUsername(username));
  if (existing) {
    return res.status(403).send({ error: 'User already exists' });
  }

  const hash = hashPassword(password);

  const user: User = {
    id: crypto.randomUUID(),
    email,
    firstName,
    lastName,
    username,
    password: hash,
  };

  await db.createUser(user);
  const jwt = signJwt({ userId: user.id });
  return res.status(200).send({ jwt });
};
