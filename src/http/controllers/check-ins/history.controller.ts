import { makeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInsHistoryQuerySchema.parse(request.query);

  const searchGymsService = makeFetchUserCheckInsHistoryService();
  const { checkIns } = await searchGymsService.execute({
    page,
    userId: request.user.sub,
  });

  return reply.status(200).send({ history });
}
