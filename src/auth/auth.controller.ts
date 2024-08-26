import {
  Controller,
  Request,
  Post,
  Get,
  Render,
  Response,
} from '@nestjs/common';
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
  async login(@Request() req: LoginDTO, @Response() res) {
    const token = await this.authService.login(req);
    res.cookie('token', token, {
      httpOnly: true, // Secure flag to prevent JavaScript access to the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure flag in production
      maxAge: 3600 * 1000, // 1 hour expiration
      sameSite: 'strict', // Prevent CSRF attacks
    });
    return res.redirect('/folders_list');
  }
}
