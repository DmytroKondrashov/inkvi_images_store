import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import UserUniquenessGuard from './guards/user.uniqueness.guard';
import { CommonService } from 'src/common/common.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UserService, UserUniquenessGuard, CommonService, JwtService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
