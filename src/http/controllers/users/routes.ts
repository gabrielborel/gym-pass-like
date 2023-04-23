import { FastifyInstance } from 'fastify';
import { register } from './register.controller';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { authenticate } from './authenticate.controller';
import { profile } from './profile.controller';
import { refresh } from './refresh.controller';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/authenticate', authenticate);

  app.patch('/token/refresh', refresh);
  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    profile
  );
}
