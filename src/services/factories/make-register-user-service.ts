import { PrismaUsersRepository } from '@/repositories/prisma-users.repository';
import { RegisterUserService } from '../register.service';

export function makeRegisterUserService() {
  const usersRespository = new PrismaUsersRepository();
  const registerUserService = new RegisterUserService(usersRespository);
  return registerUserService;
}
