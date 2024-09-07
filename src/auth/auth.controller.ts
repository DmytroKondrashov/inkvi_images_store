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

    const isProduction = process.env.NODE_ENV === 'production';

    // Set the cookie with options based on the environment
    res.cookie('token', token, {
      httpOnly: false, // Make the cookie inaccessible to JavaScript
      secure: isProduction, // Use secure flag only in production (HTTPS)
      maxAge: 3600 * 1000, // 1 hour expiration
      sameSite: isProduction ? 'strict' : 'lax', // Use 'strict' in production for more security
    });

    return res.redirect('/folder/folders');
  }

  @Public()
  @Post('logout')
  async logout(@Response() res) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });

    return res.redirect('/login');
  }
}
