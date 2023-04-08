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
}
