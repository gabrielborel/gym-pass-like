import { PrismaCheckInsRepository } from '@/repositories/implementations/prisma-check-ins.repository';
import { GetUserMetricsService } from '../get-user-metrics.service';

export function makeGetUserMetricsService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const service = new GetUserMetricsService(checkInsRepository);
  return service;
}
