import { ICheckInsRepository } from '@/repositories/check-ins-repository.interface';
import { CheckIn } from '@prisma/client';
import { CheckInNotFoundError } from './errors/check-in-not-found.error';

interface IValidateCheckInRequest {
  checkInId: string;
}

interface IValidateCheckInResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute(
    request: IValidateCheckInRequest
  ): Promise<IValidateCheckInResponse> {
    const { checkInId } = request;

    const checkIn = await this.checkInsRepository.findById(checkInId);
    if (!checkIn) throw new CheckInNotFoundError();

    checkIn.validated_at = new Date();
    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
