import { describe, it, beforeEach, expect } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';
import { FetchNearbyGymsService } from './fetch-nearby-gyms.service';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsService;

describe('Featch Nearby Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsService(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      name: 'Near Gym',
      description: 'Near Gym description',
      phone: '123456789',
      latitude: -22.5039757,
      longitude: -43.9420998,
    });

    await gymsRepository.create({
      name: 'Far Gym',
      description: 'Far Gym description',
      phone: '123456789',
      latitude: -13.075501,
      longitude: -47.934689,
    });

    const { gyms } = await sut.execute({
      userLatitude: -22.5039757,
      userLongitude: -43.9420998,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        name: 'Near Gym',
      }),
    ]);
  });
});
