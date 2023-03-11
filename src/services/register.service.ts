import { IUsersRepository } from '@/repositories/users-repository.interface';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';

interface IRegisterUserServiceRequest {
  name: string;
  email: string;
  password: string;
}

interface IRegisterUserServiceResponse {
  user: User;
}

export class RegisterUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    request: IRegisterUserServiceRequest
  ): Promise<IRegisterUserServiceResponse> {
    const { name, password, email } = request;
    const password_hash = await hash(password, 6);

    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) throw new UserAlreadyExistsError();

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    });

    return { user };
  }
}
