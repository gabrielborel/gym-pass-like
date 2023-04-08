import { IUsersRepository } from '@/repositories/users-repository.interface';
import { UserInvalidCredentialsError } from './errors/user-invalid-credentials.error';
import { compare } from 'bcryptjs';
import { User } from '@prisma/client';

interface IAuthenticateServiceRequest {
  email: string;
  password: string;
}

interface IAuthenticateServiceResponse {
  user: User;
}

export class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    request: IAuthenticateServiceRequest
  ): Promise<IAuthenticateServiceResponse> {
    const { email, password } = request;

    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new UserInvalidCredentialsError();

    const doesPasswordMatches = await compare(password, user.password_hash);
    if (!doesPasswordMatches) throw new UserInvalidCredentialsError();

    return { user };
  }
}
