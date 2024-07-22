import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findUsers() {
    return this.userRepository.find();
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...createUserDto,
      createdAt: new Date(),
    });

    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id: id }, { ...updateUserDto });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id: id });
  }
}
