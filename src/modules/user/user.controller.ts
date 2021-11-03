import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  async getUser(@Param() id: number) {
    const users = await this._userService.get(id);
    return users;
  }

  @Get()
  async getUsers() {
    const users = await this._userService.getAll();
    return users;
  }

  @Post()
  async createUser(@Body() user: User) {
    const createUser = await this._userService.create(user);
    return createUser;
  }

  @Patch(':id')
  async updateUser(@Param() id: number, @Body() user: User) {
    const updateUser = await this._userService.update(id, user);
    return updateUser;
  }

  @Delete()
  async deleteUser(@Param() id: number) {
    await this._userService.delete(id);
    return true;
  }
}
