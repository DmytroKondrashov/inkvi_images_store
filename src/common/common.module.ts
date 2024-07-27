import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [CommonService, JwtService, UserService],
})
export class CommonModule {}
