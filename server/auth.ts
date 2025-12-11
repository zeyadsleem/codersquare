import { JwtObject } from './types';
import jwt from 'jsonwebtoken';

function secretKey(): string {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is missing');
  }
  return secret;
}

export function signJwt(obj: JwtObject): string {
  return jwt.sign(obj, secretKey(), { expiresIn: '7d' });
}

export function verifyJwt(token: string): JwtObject {
  const payload = jwt.verify(token, secretKey());
  if (typeof payload !== 'object' || payload === null || !('userId' in payload)) {
    throw new Error('Invalid JWT payload');
  }
  return payload as JwtObject;
}
