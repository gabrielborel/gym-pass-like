import { PrismaCheckInsRepository } from '@/repositories/implementations/prisma-check-ins.repository';
import { PrismaGymsRepository } from '@/repositories/implementations/prisma-gyms.repository';
import { CheckInService } from '../check-in.service';

export function makeCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const service = new CheckInService(checkInsRepository, gymsRepository);
  return service;
}
