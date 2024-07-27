import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CommonService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async getUserIdFromToken(token: string): Promise<string> {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return decoded.sub;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ...result } = user;
      return result;
    }
    return null;
  }
}
