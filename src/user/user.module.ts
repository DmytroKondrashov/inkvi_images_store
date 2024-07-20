import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import UserUniquenessGuard from './guards/user.uniqueness.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserUniquenessGuard],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
