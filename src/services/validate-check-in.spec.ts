import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ValidateCheckInService } from './validate-check-in.service';
import { CheckInNotFoundError } from './errors/check-in-not-found.error';
import { LateCheckInValidationError } from './errors/late-check-in-validation.error';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInService;

describe('Validate CheckIn Service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInService(checkInsRepository);
  });

  it('should be able to validate a check-in', async () => {
    const createdcheckIn = await checkInsRepository.create({
      user_id: 'user-id',
      gym_id: 'gym-id',
    });

    const { checkIn } = await sut.execute({
      checkInId: createdcheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.checkIns[0].validated_at).toEqual(
      expect.any(Date)
    );
  });

  it('should not be able to validate a non-existent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'any-check-in-id',
      })
    ).rejects.toBeInstanceOf(CheckInNotFoundError);
  });

  it('should not be able to validate a check-in after 20 minutes of its creation', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdcheckIn = await checkInsRepository.create({
      user_id: 'user-id',
      gym_id: 'gym-id',
    });

    const TWENTY_ONE_MINUTES_IN_MS = 21 * 60 * 1000;
    vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS);

    await expect(() =>
      sut.execute({
        checkInId: createdcheckIn.id,
      })
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
