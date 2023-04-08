import { IUsersRepository } from '@/repositories/users-repository.interface';
import { User } from '@prisma/client';
import { UserNotFoundError } from './errors/user-not-found.error';

interface IGetUserProfileRequest {
  userId: string;
}

interface IGetUserProfileResponse {
  user: User;
}

export class GetUserProfileService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    request: IGetUserProfileRequest
  ): Promise<IGetUserProfileResponse> {
    const { userId } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) throw new UserNotFoundError();

    return { user };
  }
}
