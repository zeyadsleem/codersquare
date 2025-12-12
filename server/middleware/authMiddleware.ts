import { verifyJwt } from '../auth';
import { db } from '../datastore';
import { ExpressHandler } from '../types';

export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
  const auth = req.headers.authorization;
  // Not Auth
  if (!auth) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }

  const [scheme, token] = auth.split(' ');

  // Not a valid Token
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid authorization format' });
  }

  try {
    const payload = verifyJwt(token);
    const user = await db.getUserById(payload.userId);

    if (!user) throw new Error('User not found');

    res.locals.userId = user.id;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
