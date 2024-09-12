import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CommonService {
  constructor(private jwtService: JwtService) {}

  async getUserIdFromToken(token): Promise<string> {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return decoded.sub;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
