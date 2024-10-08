import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
import { CommonService } from 'src/common/common.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from './dto/user.dto';

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

  async updateUser(body: UpdateUserDTO, token: string): Promise<UserDTO> {
    try {
      const userId = await this.commonService.getUserIdFromToken(token);
      const res = await this.userRepository.update(
        { id: userId },
        { email: body.email },
      );
      if (res.affected === 0) {
        throw new BadRequestException('Could not update User');
      }
      const user = await this.userRepository.findOne({ where: { id: userId } });
      return {
        id: user.id,
        email: user.email,
      };
    } catch (error) {
      throw new BadRequestException('Could not update User');
    }
  }

  async getUser(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(token: string): Promise<string> {
    try {
      const userId = await this.commonService.getUserIdFromToken(token);
      const res = await this.userRepository.delete({ id: userId });
      if (res.affected === 0) {
        throw new BadRequestException('Could not delete User');
      }
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
