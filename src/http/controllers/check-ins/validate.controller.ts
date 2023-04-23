import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamSchema.parse(request.params);

  const checkInService = makeValidateCheckInService();
  await checkInService.execute({
    checkInId,
  });

  return reply.status(204).send();
}
