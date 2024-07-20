import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return [{ username: 'Anson', email: 'anson@ex.com' }];
  }

  @Get('/posts')
  getUsersPosts() {
    return [
      {
        username: 'Anson',
        email: 'anson@ex.com',
        posts: [
          { id: 1, title: 'Post 1' },
          { id: 2, title: 'Post 2' },
        ],
      },
    ];
  }

  @Get('posts/comments')
  getUsersPostsComments() {
    return [{ id: 1, title: 'Post 1', comments: [] }];
  }
}
