import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserProfileDto } from '../dtos/create-user-profile.dto';
import { Profile } from '../../entities/Profile.entity';
import { CreateUserPostDto } from '../dtos/create-user-post.dto';
import { Post } from '../../entities/Post.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
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

  async createUserProfile(
    id: number,
    createUserProfileDto: CreateUserProfileDto,
  ) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    const newProfile = this.profileRepository.create(createUserProfileDto);
    const saveProfile = await this.profileRepository.save(newProfile);
    user.profile = saveProfile;

    return this.userRepository.save(user);
  }

  async createUserPost(id: number, createUserPostDto: CreateUserPostDto) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    const newPost = this.postRepository.create({
      ...createUserPostDto,
      user,
    });
    return await this.postRepository.save(newPost);
  }
}
