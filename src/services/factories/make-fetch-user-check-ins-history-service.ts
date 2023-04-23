import { FetchUserCheckInsHistoryService } from '../fetch-user-check-ins-history.service';
import { PrismaCheckInsRepository } from '@/repositories/implementations/prisma-check-ins.repository';

export function makeFetchUserCheckInsHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const service = new FetchUserCheckInsHistoryService(checkInsRepository);
  return service;
}
