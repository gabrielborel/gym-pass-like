import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { page, query } = querySchema.parse(request.query);

  const searchGymsService = makeSearchGymsService();
  const { gyms } = await searchGymsService.execute({
    page,
    query,
  });

  return reply.status(200).send({ gyms });
}
