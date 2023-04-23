import { app } from '@/app';
import { prismaClient } from '@/lib/prisma';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create Check-In (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prismaClient.gym.create({
      data: {
        name: 'Gym name',
        description: 'Gym description',
        phone: '1199999999',
        latitude: -22.5039757,
        longitude: -43.9420998,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -22.5039757,
        longitude: -43.9420998,
      });

    expect(response.statusCode).toEqual(201);
  });
});
