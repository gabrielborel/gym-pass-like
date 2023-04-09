import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository';
import { CheckInService } from './check-in.service';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';
import { CheckInOnSameDayError } from './errors/check-in-on-same-day.error';
import { Decimal } from '@prisma/client/runtime/library';
import { GymTooDistantError } from './errors/gym-too-distant.error';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInService;

describe('Authenticate User Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInService(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: 'gym-id',
      name: 'Gym Title',
      description: 'Gym Description',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in ', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(() =>
      sut.execute({
        userId: 'user-id',
        gymId: 'gym-id',
        userLatitude: 0,
        userLongitude: 0,
      })
    ).rejects.toBeInstanceOf(CheckInOnSameDayError);
  });

  it('should not be able to authenticate twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on a distant gym', async () => {
    const gym = await gymsRepository.create({
      name: 'Gym Title',
      description: 'Gym Description',
      phone: '',
      latitude: new Decimal(-22.5039757),
      longitude: new Decimal(-43.9420998),
    });

    await expect(() =>
      sut.execute({
        userId: 'user-id',
        gymId: gym.id,
        userLatitude: -22.495232,
        userLongitude: -44.0860672,
      })
    ).rejects.toBeInstanceOf(GymTooDistantError);
  });
});
