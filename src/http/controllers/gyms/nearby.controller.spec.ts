import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able fetch nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Gym name 1',
        description: 'Gym description',
        phone: '1199999999',
        latitude: -22.5039757,
        longitude: -43.9420998,
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Gym name 2',
        description: 'Gym description',
        phone: '1199999999',
        latitude: -13.075501,
        longitude: -47.934689,
      });

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -22.5039757,
        longitude: -43.9420998,
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'Gym name 1',
      }),
    ]);
  });
});
