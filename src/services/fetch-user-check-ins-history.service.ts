import { ICheckInsRepository } from '@/repositories/check-ins-repository.interface';
import { CheckIn } from '@prisma/client';

interface IFetchUserCheckInsHistoryRequest {
  userId: string;
  page: number;
}

interface IFetchUserCheckInsResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute(
    request: IFetchUserCheckInsHistoryRequest
  ): Promise<IFetchUserCheckInsResponse> {
    const { userId, page } = request;

    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );

    return { checkIns };
  }
}
