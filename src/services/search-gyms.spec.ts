import { describe, it, beforeEach, expect } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';
import { SearchGymsService } from './search-gyms.service';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsService;

describe('Search Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(gymsRepository);
  });

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      name: 'Gym 1',
      description: 'Gym 1 description',
      phone: '123456789',
      latitude: 123,
      longitude: 123,
    });

    await gymsRepository.create({
      name: 'Gym 2',
      description: 'Gym 2 description',
      phone: '123456789',
      latitude: 123,
      longitude: 123,
    });

    const { gyms } = await sut.execute({
      query: 'Gym 1',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        name: 'Gym 1',
      }),
    ]);
  });

  it('should be able to search paginated gyms', async () => {
    for (let i = 0; i < 22; i++) {
      await gymsRepository.create({
        name: `Gym ${i}`,
        description: `Gym ${i} description`,
        phone: '123456789',
        latitude: 123,
        longitude: 123,
      });
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({
        name: 'Gym 20',
      }),
      expect.objectContaining({
        name: 'Gym 21',
      }),
    ]);
  });
});
