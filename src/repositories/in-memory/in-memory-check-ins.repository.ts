import { CheckIn, Prisma, User } from '@prisma/client';
import { ICheckInsRepository } from '../check-ins-repository.interface';
import crypto from 'node:crypto';

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  private checkIns: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: crypto.randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    ).getTime();
    const checkInOnSameDate = this.checkIns.find((c) => {
      const checkInDay = new Date(c.created_at).getTime();
      if (
        c.user_id === userId &&
        checkInDay >= startOfDay &&
        checkInDay <= endOfDay
      ) {
        return true;
      }
    });
    if (!checkInOnSameDate) return null;
    return checkInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const PER_PAGE = 20;
    return this.checkIns
      .filter((c) => c.user_id === userId)
      .slice((page - 1) * PER_PAGE, page * PER_PAGE);
  }

  async countByUserId(userId: string): Promise<number> {
    return this.checkIns.filter((c) => c.user_id === userId).length;
  }
}
