import { IGymsRepository } from '@/repositories/gyms-repository.interface';
import { Gym } from '@prisma/client';

interface ICreateGymServiceRequest {
  name: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface ICreateGymServiceResponse {
  gym: Gym;
}

export class CreateGymService {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute(
    request: ICreateGymServiceRequest
  ): Promise<ICreateGymServiceResponse> {
    const { name, description, latitude, longitude, phone } = request;

    const gym = await this.gymsRepository.create({
      latitude,
      longitude,
      name,
      description,
      phone,
    });

    return { gym };
  }
}
