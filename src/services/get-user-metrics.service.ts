import { ICheckInsRepository } from '@/repositories/check-ins-repository.interface';

interface IGetUserMetricsRequest {
  userId: string;
}

interface IGetUserMetricsResponse {
  checkInsCount: number;
}

export class GetUserMetricsService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute(
    request: IGetUserMetricsRequest
  ): Promise<IGetUserMetricsResponse> {
    const { userId } = request;

    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
