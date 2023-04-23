import { makeCreateGymService } from '@/services/factories/make-create-gym-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { name, description, latitude, longitude, phone } =
    createGymBodySchema.parse(request.body);

  const createGymService = makeCreateGymService();
  await createGymService.execute({
    description,
    latitude,
    longitude,
    name,
    phone,
  });

  return reply.status(201).send({ message: 'User created' });
}
