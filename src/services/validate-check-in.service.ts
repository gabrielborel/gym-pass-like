import { ICheckInsRepository } from '@/repositories/check-ins-repository.interface';
import { CheckIn } from '@prisma/client';
import { CheckInNotFoundError } from './errors/check-in-not-found.error';
import { LateCheckInValidationError } from './errors/late-check-in-validation.error';

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

    const MAX_TIME_AFTER_CHECKIN_CREATION_IN_MINUTES = 20;
    const now = new Date();
    const checkInCreation = new Date(checkIn.created_at);
    const distanceInMinutesFromCheckInCreation =
      Math.abs(checkInCreation.getTime() - now.getTime()) / (1000 * 60);
    if (
      distanceInMinutesFromCheckInCreation >
      MAX_TIME_AFTER_CHECKIN_CREATION_IN_MINUTES
    )
      throw new LateCheckInValidationError();

    checkIn.validated_at = now;
    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
