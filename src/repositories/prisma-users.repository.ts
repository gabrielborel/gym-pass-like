import { prismaClient } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { IUsersRepository } from './users-repository.interface';

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    return await prismaClient.user.create({ data });
  }

  async findByEmail(email: string) {
    return await prismaClient.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return await prismaClient.user.findUnique({ where: { id } });
  }
}
