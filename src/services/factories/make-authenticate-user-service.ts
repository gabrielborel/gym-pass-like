import { PrismaUsersRepository } from '@/repositories/implementations/prisma-users.repository';
import { AuthenticateUserService } from '../authenticate.service';

export function makeAuthenticateUserService() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUserService = new AuthenticateUserService(usersRepository);
  return authenticateUserService;
}
