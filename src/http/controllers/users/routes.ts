import { FastifyInstance } from 'fastify';
import { register } from './register.controller';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { authenticate } from './authenticate.controller';
import { profile } from './profile.controller';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/authenticate', authenticate);

  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    profile
  );
}
