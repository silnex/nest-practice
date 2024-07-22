import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../../services/users.service';
import { CreateUserDto } from '../../dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
