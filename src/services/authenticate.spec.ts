import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository';
import { hash } from 'bcryptjs';
import { describe, it, expect, beforeEach } from 'vitest';
import { AuthenticateUserService } from './authenticate.service';
import { UserInvalidCredentialsError } from './errors/user-invalid-credentials.error';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUserService;

describe('Authenticate User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUserService(usersRepository);
  });

  it('should be able to authenticate a user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate a user, if the email is invalid', async () => {
    expect(async () => {
      await sut.execute({
        email: 'not-valid-email@email.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(UserInvalidCredentialsError);
  });

  it('should not be able to authenticate a user, if the password is invalid', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6),
    });

    expect(async () => {
      await sut.execute({
        email: 'johndoe@email.com',
        password: '654321',
      });
    }).rejects.toBeInstanceOf(UserInvalidCredentialsError);
  });
});
