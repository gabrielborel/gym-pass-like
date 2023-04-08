import { UserInvalidCredentialsError } from '@/services/errors/user-invalid-credentials.error';
import { makeAuthenticateUserService } from '@/services/factories/make-authenticate-user-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUserService = makeAuthenticateUserService();
    await authenticateUserService.execute({ email, password });
  } catch (err) {
    if (err instanceof UserInvalidCredentialsError)
      return reply.status(400).send({ message: err.message });

    throw err;
  }

  return reply.status(200).send({ message: 'User authenticated' });
}
