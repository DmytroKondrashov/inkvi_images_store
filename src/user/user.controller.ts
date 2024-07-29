import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { UpdateUserDTO } from './dto/update.user.dto';
import { Token } from 'src/common/decorators/token.decorator';
import UserUniquenessGuard from './guards/user.uniqueness.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @UseGuards(UserUniquenessGuard)
  @Post('/create')
  async createUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }

  @Post('/update')
  @UseGuards(UserUniquenessGuard)
  async updareUser(@Body() body: UpdateUserDTO, @Token() token: string) {
    return this.userService.updateUser(body, token);
  }

  @Post('/delete')
  async deleteUser(@Token() token: string) {
    return this.userService.deleteUser(token);
  }
}
