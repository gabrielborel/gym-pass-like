import { Prisma, CheckIn } from '@prisma/client';
import { ICheckInsRepository } from '../check-ins-repository.interface';
import { prismaClient } from '@/lib/prisma';

export class PrismaCheckInsRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    return await prismaClient.checkIn.create({
      data,
    });
  }

  async findById(id: string): Promise<CheckIn | null> {
    return await prismaClient.checkIn.findUnique({ where: { id }});
  }

  async save(data: CheckIn): Promise<CheckIn> {
    return await prismaClient.checkIn.update({
      where: {
        id: data.id
      },
      data
    });
  }

  async countByUserId(userId: string): Promise<number> {
    return await prismaClient.checkIn.count({
      where: {
        user_id: userId
      }
    });
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return await prismaClient.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20
    })
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDay(),
    ); 
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDay() + 1
    );
    return await prismaClient.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    });
  }
}
