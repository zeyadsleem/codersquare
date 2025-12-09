import express, { ErrorRequestHandler, RequestHandler } from 'express';

import { initDb } from './datastore';
import { createPostHandler, listPostsHandler } from './handlers/postHandler';
import { signInHandler, singUpHandler } from './handlers/userHandler';

(async () => {
  await initDb();

  const app = express();

  app.use(express.json());

  const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, '- body:', req.body);
    next();
  };

  app.use(requestLoggerMiddleware);

  app.get('/v1/posts', listPostsHandler);
  app.post('/v1/posts', createPostHandler);

  app.post('/v1/signup', singUpHandler);
  app.post('/v1/signin', signInHandler);

  const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error('Uncaught exception:', err);
    return res.status(500).send('Oops, an unexpected error occurred, please try again');
  };
  app.use(errHandler);

  app.listen(3000);
})();
