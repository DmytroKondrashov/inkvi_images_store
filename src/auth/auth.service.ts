import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(user: LoginDTO) {
    const { email, password } = user;
    const foundUser = await this.userRepository.findOne({
      where: { email: email },
    });
    if (foundUser) {
      const passwordMatch = await await bcrypt.compare(
        password,
        foundUser.password,
      );
      if (!passwordMatch) {
        throw new BadRequestException('Invalid password!');
      }
      const payload = { sub: foundUser.id, email: foundUser.email };
      return this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
    } else {
      throw new BadRequestException('User not found!');
    }
  }
}
