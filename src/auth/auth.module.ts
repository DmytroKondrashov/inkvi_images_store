import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CommonService } from 'src/common/common.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, UserService, JwtService, JwtStrategy, CommonService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
