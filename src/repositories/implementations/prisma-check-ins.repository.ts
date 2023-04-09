import { Prisma, CheckIn } from '@prisma/client';
import { ICheckInsRepository } from '../check-ins-repository.interface';
import { prismaClient } from '@/lib/prisma';

export class PrismaCheckInsRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    return await prismaClient.checkIn.create({
      data,
    });
  }
}
