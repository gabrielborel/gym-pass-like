import { IUsersRepository } from '@/repositories/users-repository.interface';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';

interface IRegisterUserServicePayload {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(payload: IRegisterUserServicePayload) {
    const { name, password, email } = payload;
    const password_hash = await hash(password, 6);

    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) throw new UserAlreadyExistsError();

    await this.usersRepository.create({ email, name, password_hash });
  }
}
