import { CheckIn } from '@prisma/client';
import { ICheckInsRepository } from '@/repositories/check-ins-repository.interface';
import { IGymsRepository } from '@/repositories/gyms-repository.interface';
import { GymNotFoundError } from './errors/gym-not-found.error';
import { CheckInOnSameDayError } from './errors/check-in-on-same-day.error';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { GymTooDistantError } from './errors/gym-too-distant.error';

interface ICheckInRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface ICheckInResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository
  ) {}

  async execute(request: ICheckInRequest): Promise<ICheckInResponse> {
    const { userId, gymId, userLatitude, userLongitude } = request;

    const gym = await this.gymsRepository.findById(gymId);
    if (!gym) throw new GymNotFoundError();

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    );

    const MAX_DISTANCE = 0.1; // 0.1 KM = 100 M
    if (distance > MAX_DISTANCE) throw new GymTooDistantError();

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );
    if (checkInOnSameDay) throw new CheckInOnSameDayError();

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
