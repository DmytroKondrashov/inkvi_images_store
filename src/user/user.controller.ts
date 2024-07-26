import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { UpdateUserDTO } from './dto/update.user.dto';
import { Token } from 'src/common/decorators/token.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/create')
  async createUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }

  @Post('/update')
  async updareUser(@Body() body: UpdateUserDTO, @Token() token: string) {
    return this.userService.updateUser(body, token);
  }

  @Post('/delete')
  async deleteUser(@Token() token: string) {
    return this.userService.deleteUser(token);
  }
}
