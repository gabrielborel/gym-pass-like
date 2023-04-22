import { GetUserProfileService } from '../get-user-profile.service';
import { PrismaUsersRepository } from '@/repositories/implementations/prisma-users.repository';

export function makeGetUserProfileService() {
  const usersRepository = new PrismaUsersRepository();
  const service = new GetUserProfileService(usersRepository);
  return service;
}
