import { IGymsRepository } from '@/repositories/gyms-repository.interface';
import { Gym } from '@prisma/client';

interface ISearchGymsService {
  query: string;
  page: number;
}

interface ISearchGymsResponse {
  gyms: Gym[];
}

export class SearchGymsService {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute(request: ISearchGymsService): Promise<ISearchGymsResponse> {
    const { query, page } = request;

    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }
}
