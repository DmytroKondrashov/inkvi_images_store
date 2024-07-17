import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create.user.dto';
import UserUniquenessGuard from './guards/user.uniqueness.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserUniquenessGuard)
  @Post('/create')
  async createUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body.email, body.password);
  }
}
