import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository';
import { hash } from 'bcryptjs';
import { describe, it, expect, beforeEach } from 'vitest';
import { GetUserProfileService } from './get-user-profile.service';
import { UserNotFoundError } from './errors/user-not-found.error';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileService;

describe('Get User Profile Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileService(usersRepository);
  });

  it('should be able to get a user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(createdUser.id);
    expect(user.name).toEqual(createdUser.name);
  });

  it('should not be able to get a user profile, if the user does not exists', async () => {
    await expect(() =>
      sut.execute({
        userId: 'not-valid-user-id',
      })
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });
});
