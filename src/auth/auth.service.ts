import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userRepository: Repository<User>,
  ) {}

  async login(user) {
    const foundUser = this.userRepository.findOne({
      where: { email: user.email },
    });
    if (foundUser) {
      const payload = { sub: user.id, email: user.email };
      return {
        token: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
        }),
      };
    } else {
      throw new BadRequestException('User not found!');
    }
  }
}
