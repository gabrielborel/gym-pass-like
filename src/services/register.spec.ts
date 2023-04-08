import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository';
import { compare } from 'bcryptjs';
import { describe, it, expect, beforeEach } from 'vitest';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';
import { RegisterUserService } from './register.service';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUserService;

describe('Register User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUserService(usersRepository);
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
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
    const email = 'johndoe2@email.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });

    expect(async () => {
      await sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should not be able to register a user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
