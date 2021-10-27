import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async getAll(): Promise<User[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: 'active' },
    });

    return users;
  }
}
