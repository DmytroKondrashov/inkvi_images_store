import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(body: CreateUserDTO): Promise<User> {
    const { email, password, passwordConfirmation } = body;
    if (password === passwordConfirmation) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        email,
        password: hashedPassword,
      });
      return this.userRepository.save(user);
    } else {
      throw new BadRequestException(
        'Password and Passworch Confirmation should match',
      );
    }
  }

  async updateUser(body: UpdateUserDTO, userId: string) {
    try {
      await this.userRepository.update({ id: userId }, { email: body.email });
    } catch (error) {
      throw new BadRequestException('Could not update User');
    }
  }
}
