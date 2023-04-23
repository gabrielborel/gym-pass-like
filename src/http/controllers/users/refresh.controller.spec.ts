import { afterAll, beforeAll, expect, it, test } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { describe } from 'vitest';

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const authResponse = await request(app.server).post('/authenticate').send({
      email: 'johndoe@example.com',
      password: '123456',
    });

    const cookies = authResponse.get('Set-Cookie');

    const res = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      token: expect.any(String),
    });
    expect(res.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ]);
  });
});
