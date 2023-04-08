import { CheckIn } from '@prisma/client';
import { ICheckInsRepository } from '@/repositories/check-ins-repository.interface';

interface ICheckInRequest {
  userId: string;
  gymId: string;
}

interface ICheckInResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute(request: ICheckInRequest): Promise<ICheckInResponse> {
    const { userId, gymId } = request;

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
