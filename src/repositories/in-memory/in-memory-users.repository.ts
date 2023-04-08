import { Prisma, User } from '@prisma/client';
import { IUsersRepository } from '../users-repository.interface';
import crypto from 'node:crypto';

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: crypto.randomUUID(),
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      created_at: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    if (!user) return null;
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    if (!user) return null;
    return user;
  }
}
