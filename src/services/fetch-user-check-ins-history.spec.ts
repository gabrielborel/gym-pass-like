import { describe, it, beforeEach, expect } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository';
import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history.service';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryService;

describe('Fetch User Check-ins History Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryService(checkInsRepository);
  });

  it('should be able to fetch user check-ins history', async () => {
    await checkInsRepository.create({
      user_id: 'user-id',
      gym_id: 'gym-id',
    });

    await checkInsRepository.create({
      user_id: 'user-id',
      gym_id: 'gym-id-2',
    });

    const { checkIns } = await sut.execute({
      userId: 'user-id',
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-id',
      }),
      expect.objectContaining({
        gym_id: 'gym-id-2',
      }),
    ]);
  });

  it('should be able to fetck paginated user check-ins history', async () => {
    for (let i = 0; i < 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-id-${i}`,
        user_id: 'user-id',
      });
    }

    const { checkIns } = await sut.execute({
      userId: 'user-id',
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-id-20',
      }),
      expect.objectContaining({
        gym_id: 'gym-id-21',
      }),
    ]);
  });
});
