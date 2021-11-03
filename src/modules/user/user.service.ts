import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async get(id: number): Promise<User> {
    const user = await this._userRepository.findOne(id, {
      where: { status: 'active' },
    });
    if (!user) {
      throw new NotAcceptableException();
    }
    return user;
  }

  async getAll(): Promise<User[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: 'active' },
    });

    return users;
  }

  async create(user: User): Promise<User> {
    const saveUser: User = await this._userRepository.save(user);
    return saveUser;
  }

  async update(id: number, user: User): Promise<any> {
    const updateUser = await this._userRepository.update(id, user);
    return updateUser;
  }

  async delete(id: number): Promise<any> {
    const userExists = await this._userRepository.findOne(id, {
      where: { status: 'active' },
    });
    if (!userExists) {
      throw new NotFoundException();
    }
    const deleteUser = await this._userRepository.delete(id);
    return deleteUser;
  }
}
