import { prismaClient } from '@/lib/prisma';
import { Prisma, Gym } from '@prisma/client';
import {
  IFindManyNearbyParams,
  IGymsRepository,
} from '../gyms-repository.interface';

export class PrismaGymsRepository implements IGymsRepository {
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    return await prismaClient.gym.create({
      data,
    });
  }

  async findById(id: string): Promise<Gym | null> {
    return await prismaClient.gym.findUnique({
      where: {
        id,
      },
    });
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return await prismaClient.gym.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });
  }

  async findManyNearby({
    latitude,
    longitude,
  }: IFindManyNearbyParams): Promise<Gym[]> {
    return await prismaClient.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos ( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;
  }
}
