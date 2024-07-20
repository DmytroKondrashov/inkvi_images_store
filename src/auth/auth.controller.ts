import { Controller, Request, Post, Get, Render } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/dto/create.user.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get('login')
  @Render('login')
  loginForm() {
    return {};
  }

  @Public()
  @Post('login')
  async login(@Request() req: CreateUserDTO) {
    return this.authService.login(req);
  }
}
