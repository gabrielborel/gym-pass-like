import { ValidateCheckInService } from '../validate-check-in.service';
import { PrismaCheckInsRepository } from '@/repositories/implementations/prisma-check-ins.repository';

export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const service = new ValidateCheckInService(checkInsRepository);
  return service;
}
