import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { UpdateUserDTO } from './dto/update.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/create')
  async createUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }

  @Post('/update/:userId')
  async updareUser(
    @Body() body: UpdateUserDTO,
    @Param('userId') userId: string,
  ) {
    return this.userService.updateUser(body, userId);
  }

  @Post('/delete/:userId')
  async deleteUser(@Param('userId') userId) {
    return this.userService.deleteUser(userId);
  }
}
