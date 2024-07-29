import { Controller, Request, Post, Get, Render } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginDTO } from './dto/login.dto';

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
  async login(@Request() req: LoginDTO) {
    return this.authService.login(req);
  }
}
