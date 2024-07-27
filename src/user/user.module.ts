import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import UserUniquenessGuard from './guards/user.uniqueness.guard';
import { CommonService } from 'src/common/common.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    UserUniquenessGuard,
    CommonService,
    JwtService,
    AuthService,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
