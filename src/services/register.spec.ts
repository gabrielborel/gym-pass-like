import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository';
import { compare } from 'bcryptjs';
import { describe, it, expect } from 'vitest';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';
import { RegisterUserService } from './register.service';

describe('Register User Service', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterUserService(usersRepository);

    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    );

    expect(user.password_hash).not.toBe('123456');
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register a user, if the email already exists', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterUserService(usersRepository);

    const email = 'johndoe2@email.com';

    await registerService.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });

    expect(async () => {
      await registerService.execute({
        name: 'John Doe',
        email,
        password: '123456',
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should not be able to register a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterUserService(usersRepository);

    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
