import express from 'express';

import { initDb } from './datastore';
import { signInHandler, singUpHandler } from './handlers/authHandler';
import { createPostHandler, listPostsHandler } from './handlers/postHandler';
import { errHandler } from './middleware/errorMiddleware';
import { requestLoggerMiddleware } from './middleware/loggerMiddleware';

(async () => {
  await initDb();

  const app = express();

  app.use(express.json());
  app.use(requestLoggerMiddleware);

  app.get('/v1/posts', listPostsHandler);
  app.post('/v1/posts', createPostHandler);

  app.post('/v1/signup', singUpHandler);
  app.post('/v1/signin', signInHandler);

  app.use(errHandler);

  app.listen(3000);
})();
