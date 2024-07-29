import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(user: LoginDTO) {
    const foundUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (foundUser) {
      const payload = { sub: foundUser.id, email: foundUser.email };
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
