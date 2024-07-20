import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { username: 'silnex', email: 'silnex@silnex.kr' },
    { username: 'user', email: 'user@silnex.kr' },
    { username: 'user2', email: 'user2@silnex.kr' },
  ];
  fetchUsers() {
    return this.fakeUsers;
  }

  createUser(createUserDto: CreateUserDto) {
    this.fakeUsers.push(createUserDto);
  }

  fetchUserById(id: number) {
    return { id: id, username: 'silnex', email: 'silnex@silnex.kr' };
  }
}
