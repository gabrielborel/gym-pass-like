import { IGymsRepository } from '@/repositories/gyms-repository.interface';
import { Gym } from '@prisma/client';

interface IFetchNearbyGymsRequest {
  userLatitude: number;
  userLongitude: number;
}

interface IFetchNearbyGymsResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsService {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute(
    request: IFetchNearbyGymsRequest
  ): Promise<IFetchNearbyGymsResponse> {
    const { userLatitude, userLongitude } = request;

    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
