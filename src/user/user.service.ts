import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
import { CommonService } from 'src/common/common.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commonService: CommonService,
    private readonly jwtService: JwtService,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(body: CreateUserDTO): Promise<{ token: string }> {
    const { email, password, passwordConfirmation } = body;
    if (password === passwordConfirmation) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        email,
        password: hashedPassword,
      });
      await this.userRepository.save(user);
      const payload = { sub: user.id, email: user.email };
      const token = await this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
      return { token };
    } else {
      throw new BadRequestException(
        'Password and Passworch Confirmation should match',
      );
    }
  }

  async updateUser(body: UpdateUserDTO, token: string) {
    try {
      const userId = await this.commonService.getUserIdFromToken(token);
      await this.userRepository.update({ id: userId }, { email: body.email });
      return this.userRepository.findOne({ where: { id: userId } });
    } catch (error) {
      throw new BadRequestException('Could not update User');
    }
  }

  async deleteUser(userId: string): Promise<string> {
    try {
      await this.userRepository.delete({ id: userId });
      return 'User successfully deleted!';
    } catch (error) {
      throw new BadRequestException('Could not delete User');
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ...result } = user;
      return result;
    }
    return null;
  }
}
